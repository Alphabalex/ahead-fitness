(function (root, factory) {
    var api = factory();
    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    } else {
        root.AheadPictureMenu = api;
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

    function nextTabIndex(current, key, count) {
        if (!Number.isInteger(count) || count < 1) {
            throw new RangeError('A tab list needs at least one tab');
        }
        if (key === 'ArrowRight') {
            return (current + 1) % count;
        }
        if (key === 'ArrowLeft') {
            return (current - 1 + count) % count;
        }
        if (key === 'Home') {
            return 0;
        }
        if (key === 'End') {
            return count - 1;
        }
        return current;
    }

    function enhance(menu) {
        var tabList = menu.querySelector('.picture-menu__tabs');
        var tabs = Array.prototype.slice.call(menu.querySelectorAll('.picture-menu__tab'));
        var panels = tabs.map(function (tab) {
            return menu.querySelector('#' + tab.getAttribute('data-menu-target'));
        });
        if (!tabList || !tabs.length || panels.indexOf(null) !== -1) {
            return;
        }

        tabList.setAttribute('role', 'tablist');
        tabList.setAttribute('aria-label', 'Menu categories');
        tabList.hidden = false;
        menu.classList.add('is-tabbed');

        function select(index, moveFocus) {
            tabs.forEach(function (tab, tabIndex) {
                var active = tabIndex === index;
                tab.setAttribute('aria-selected', String(active));
                tab.tabIndex = active ? 0 : -1;
                panels[tabIndex].hidden = !active;
            });
            if (moveFocus) {
                tabs[index].focus();
            }
            tabs[index].scrollIntoView({ block: 'nearest', inline: 'center' });
        }

        tabs.forEach(function (tab, index) {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', panels[index].id);
            panels[index].setAttribute('role', 'tabpanel');
            panels[index].setAttribute('aria-labelledby', tab.id);
            panels[index].removeAttribute('aria-label');
            tab.addEventListener('click', function () { select(index, false); });
            tab.addEventListener('keydown', function (event) {
                var next = nextTabIndex(index, event.key, tabs.length);
                if (next !== index) {
                    event.preventDefault();
                    select(next, true);
                }
            });
        });

        var initial = tabs.findIndex(function (tab) { return tab.getAttribute('aria-selected') === 'true'; });
        tabs.forEach(function (tab, index) {
            tab.tabIndex = index === Math.max(initial, 0) ? 0 : -1;
            panels[index].hidden = index !== Math.max(initial, 0);
        });
    }

    function initialize(doc) {
        Array.prototype.forEach.call(doc.querySelectorAll('[data-picture-menu]'), enhance);
    }

    return {
        nextTabIndex: nextTabIndex,
        initialize: initialize
    };
}));
