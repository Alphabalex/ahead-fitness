(function (root, factory) {
    var api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    } else {
        root.AheadGalleryReveal = api;
        if (root.document) {
            var start = function () { api.initialize(root.document); };
            if (root.document.readyState === 'loading') {
                root.document.addEventListener('DOMContentLoaded', start, { once: true });
            } else {
                start();
            }
        }
    }
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    'use strict';

    var ROWS_PER_BATCH = 4;
    var DESKTOP_COLUMNS = 4;
    var MAX_SAME_ROWS_IN_A_ROW = 2;

    // Model grid-auto-flow: row dense placement so tests can check markup-only layouts.
    function simulateRows(placements, columns) {
        var rows = [];
        var tilePositions = [];

        placements.forEach(function (rawSpan) {
            var span = Math.max(1, Math.min(columns, rawSpan));
            var placed = false;
            for (var rowIndex = 0; rowIndex < rows.length && !placed; rowIndex += 1) {
                var row = rows[rowIndex];
                for (var startColumn = 0; startColumn <= columns - span && !placed; startColumn += 1) {
                    var fits = row.slice(startColumn, startColumn + span).every(function (cell) { return !cell; });
                    if (fits) {
                        row.fill(true, startColumn, startColumn + span);
                        tilePositions.push({ row: rowIndex, startColumn: startColumn, span: span });
                        placed = true;
                    }
                }
            }
            if (!placed) {
                var newRow = new Array(columns).fill(false).fill(true, 0, span);
                tilePositions.push({ row: rows.length, startColumn: 0, span: span });
                rows.push(newRow);
            }
        });

        return { rows: rows, tilePositions: tilePositions };
    }

    function hashSeed(text) {
        var hash = 2166136261;
        for (var i = 0; i < text.length; i += 1) {
            hash ^= text.charCodeAt(i);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    // Seeded so a gallery keeps the same arrangement across reloads and resizes.
    function seededRandom(seedText) {
        var state = hashSeed(String(seedText));
        return function () {
            state = (state + 0x6D2B79F5) >>> 0;
            var t = state;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    // Returns how many photos sit in each row. Desktop rows hold 2 or 4 photos; narrower grids
    // fill every column. An odd photo left over becomes one full-width tile on the last row.
    function planRows(count, columns, random) {
        if (!Number.isInteger(count) || count < 0) {
            throw new RangeError('Photo count must be a whole number of zero or more');
        }
        if (!Number.isInteger(columns) || columns < 1) {
            throw new RangeError('Column count must be a whole number of one or more');
        }
        var pick = typeof random === 'function' ? random : Math.random;
        var rows = [];
        var remaining = count;

        while (remaining > 0) {
            var size;
            if (columns !== DESKTOP_COLUMNS) {
                size = Math.min(columns, remaining);
            } else if (remaining < 4) {
                size = remaining >= 2 ? 2 : 1;
            } else {
                size = pick() < 0.5 ? 2 : 4;
                var recent = rows.slice(-MAX_SAME_ROWS_IN_A_ROW);
                if (recent.length === MAX_SAME_ROWS_IN_A_ROW && recent.every(function (row) { return row === size; })) {
                    size = size === 4 ? 2 : 4;
                }
            }
            rows.push(size);
            remaining -= size;
        }
        return rows;
    }

    function tileSpans(rows, columns) {
        var spans = [];
        rows.forEach(function (size) {
            for (var i = 0; i < size; i += 1) {
                spans.push(columns / size);
            }
        });
        return spans;
    }

    function visibleCount(rows, rowLimit) {
        return rows.slice(0, Math.max(0, rowLimit)).reduce(function (total, size) { return total + size; }, 0);
    }

    function getColumns(gallery) {
        var columns = window.getComputedStyle(gallery).gridTemplateColumns
            .split(/\s+/)
            .filter(Boolean);
        return Math.max(1, columns.length);
    }

    function initialize(document) {
        var galleries = document.querySelectorAll('.gallery.gallery--balanced[id]');
        galleries.forEach(function (gallery) {
            var control = gallery.closest('.gallery-section').querySelector('.gallery-reveal[aria-controls="' + gallery.id + '"]');
            if (!control) {
                return;
            }
            var button = control.querySelector('button');
            var status = control.querySelector('[aria-live]');
            var tiles = Array.prototype.slice.call(gallery.querySelectorAll('.gs-item'));
            if (!button || !status || tiles.length === 0) {
                return;
            }

            var rowLimit = ROWS_PER_BATCH;
            var plans = {};
            var resizeTimer;

            function planFor(columns) {
                if (!plans[columns]) {
                    plans[columns] = planRows(tiles.length, columns, seededRandom(gallery.id + ':' + columns));
                }
                return plans[columns];
            }

            function updateGallery(focusFrom) {
                var columns = getColumns(gallery);
                var rows = planFor(columns);
                var spans = tileSpans(rows, columns);
                var shown = Math.min(tiles.length, visibleCount(rows, rowLimit));

                tiles.forEach(function (tile, index) {
                    tile.style.gridColumn = 'span ' + spans[index];
                    tile.style.gridRowStart = '';
                    tile.classList.toggle('gallery-reveal__item--hidden', index >= shown);
                });

                button.hidden = shown >= tiles.length;
                control.hidden = button.hidden;
                status.textContent = 'Showing ' + shown + ' of ' + tiles.length + ' photos.';

                if (typeof focusFrom === 'number' && tiles[focusFrom]) {
                    var link = tiles[focusFrom].querySelector('a');
                    if (link) {
                        link.focus({ preventScroll: true });
                    }
                }
            }

            gallery.classList.add('gallery--planned');

            button.addEventListener('click', function () {
                var firstNew = visibleCount(planFor(getColumns(gallery)), rowLimit);
                rowLimit += ROWS_PER_BATCH;
                updateGallery(firstNew);
            });

            window.addEventListener('resize', function () {
                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(function () { updateGallery(); }, 120);
            });

            updateGallery();
        });
    }

    return {
        ROWS_PER_BATCH: ROWS_PER_BATCH,
        simulateRows: simulateRows,
        seededRandom: seededRandom,
        planRows: planRows,
        tileSpans: tileSpans,
        visibleCount: visibleCount,
        initialize: initialize
    };
}));
