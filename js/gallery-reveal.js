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

    function normalizePlacement(placement, columns) {
        if (typeof placement === 'number') {
            return { span: Math.max(1, Math.min(columns, placement)), startColumn: null };
        }
        return {
            span: Math.max(1, Math.min(columns, placement.span || 1)),
            startColumn: Number.isInteger(placement.startColumn) ? placement.startColumn : null
        };
    }

    // Model the balanced gallery's grid-auto-flow: row dense placement algorithm.
    function simulateRows(placements, columns) {
        var rows = [];
        var tilePositions = [];

        placements.forEach(function (rawPlacement) {
            var placement = normalizePlacement(rawPlacement, columns);
            var placed = false;
            for (var rowIndex = 0; rowIndex < rows.length && !placed; rowIndex += 1) {
                var row = rows[rowIndex];
                var firstColumn = placement.startColumn === null ? 0 : placement.startColumn;
                var lastColumn = placement.startColumn === null ? columns - placement.span : placement.startColumn;
                for (var startColumn = firstColumn; startColumn <= lastColumn; startColumn += 1) {
                    var fits = true;
                    for (var column = startColumn; column < startColumn + placement.span; column += 1) {
                        if (row[column]) {
                            fits = false;
                            break;
                        }
                    }
                    if (fits) {
                        for (column = startColumn; column < startColumn + placement.span; column += 1) {
                            row[column] = true;
                        }
                        tilePositions.push({ row: rowIndex, startColumn: startColumn, span: placement.span });
                        placed = true;
                        break;
                    }
                }
            }
            if (!placed) {
                var newRow = new Array(columns).fill(false);
                var newStart = placement.startColumn === null ? 0 : placement.startColumn;
                for (var newColumn = newStart; newColumn < newStart + placement.span; newColumn += 1) {
                    newRow[newColumn] = true;
                }
                tilePositions.push({ row: rows.length, startColumn: newStart, span: placement.span });
                rows.push(newRow);
            }
        });

        return { rows: rows, tilePositions: tilePositions };
    }

    function getVisibleTileCount(placements, columns, targetRows) {
        if (!Array.isArray(placements) || !placements.length || columns < 1 || targetRows < 1) {
            return 0;
        }
        columns = Math.floor(columns);
        targetRows = Math.floor(targetRows);
        var visibleCount = 0;

        for (var count = 1; count <= placements.length; count += 1) {
            var layout = simulateRows(placements.slice(0, count), columns);
            if (layout.rows.length > targetRows) {
                break;
            }
            var lastRowComplete = layout.rows.length > 0 && layout.rows[layout.rows.length - 1].every(Boolean);
            var earlierRowsComplete = layout.rows.slice(0, -1).every(function (row) { return row.every(Boolean); });
            if (lastRowComplete && earlierRowsComplete) {
                visibleCount = count;
            }
        }
        return visibleCount;
    }

    function getColumns(gallery) {
        var columns = window.getComputedStyle(gallery).gridTemplateColumns
            .split(/\s+/)
            .filter(Boolean);
        return Math.max(1, columns.length);
    }

    function getPlacement(tile, columns) {
        var style = window.getComputedStyle(tile);
        var start = style.gridColumnStart;
        var end = style.gridColumnEnd;
        var spanMatch = end.match(/^span\s+(\d+)/);
        if (start === '1' && end === '-1') {
            return { span: columns, startColumn: 0 };
        }
        var absoluteStart = /^\d+$/.test(start) ? Number(start) - 1 : null;
        return {
            span: spanMatch ? Number(spanMatch[1]) : 1,
            startColumn: absoluteStart
        };
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

            var targetRows = ROWS_PER_BATCH;
            var previousVisibleCount = 0;
            var resizeTimer;
            var initialGridRules = tiles.map(function (tile) {
                return {
                    rowStart: tile.style.gridRowStart,
                    columnStart: tile.style.gridColumnStart,
                    columnEnd: tile.style.gridColumnEnd
                };
            });

            function updateGallery() {
                var columns = getColumns(gallery);
                tiles.forEach(function (tile, index) {
                    tile.style.gridRowStart = initialGridRules[index].rowStart;
                    tile.style.gridColumnStart = initialGridRules[index].columnStart;
                    tile.style.gridColumnEnd = initialGridRules[index].columnEnd;
                });
                var placements = tiles.map(function (tile) {
                    return getPlacement(tile, columns);
                });
                var visibleCount = getVisibleTileCount(placements, columns, targetRows);
                if (visibleCount === 0) {
                    visibleCount = getVisibleTileCount(placements, columns, targetRows + ROWS_PER_BATCH);
                    if (visibleCount === 0) {
                        visibleCount = tiles.length;
                    }
                }
                if (targetRows > ROWS_PER_BATCH && visibleCount <= previousVisibleCount && visibleCount < tiles.length) {
                    visibleCount = tiles.length;
                }

                var visibleLayout = simulateRows(placements.slice(0, visibleCount), columns);
                var lastRow = visibleLayout.rows[visibleLayout.rows.length - 1];
                if (lastRow && lastRow.some(function (cell) { return !cell; })) {
                    var lastPosition = visibleLayout.tilePositions[visibleCount - 1];
                    var lastTile = tiles[visibleCount - 1];
                    lastTile.style.gridRowStart = String(lastPosition.row + 1);
                    lastTile.style.gridColumnStart = String(lastPosition.startColumn + 1);
                    lastTile.style.gridColumnEnd = '-1';
                }

                tiles.forEach(function (tile, index) {
                    tile.classList.toggle('gallery-reveal__item--hidden', index >= visibleCount);
                });
                button.hidden = visibleCount >= tiles.length;
                previousVisibleCount = visibleCount;
                status.textContent = 'Showing ' + visibleCount + ' of ' + tiles.length + ' photos.';
                control.hidden = button.hidden;
            }

            button.addEventListener('click', function () {
                targetRows += ROWS_PER_BATCH;
                updateGallery();
            });

            window.addEventListener('resize', function () {
                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(updateGallery, 120);
            });

            updateGallery();
        });
    }

    return {
        simulateRows: simulateRows,
        getVisibleTileCount: getVisibleTileCount,
        initialize: initialize
    };
}));
