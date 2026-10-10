(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else {
    root.AFPlanSwitch = api;
    api.initialize(root.document);
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var PLANS = ['build', 'lean'];
  var DEFAULT_PLAN = 'build';

  function resolvePlan(hash, fallback) {
    var chosen = fallback === undefined ? DEFAULT_PLAN : fallback;
    if (PLANS.indexOf(chosen) === -1) {
      throw new RangeError('Fallback plan must be one of: ' + PLANS.join(', '));
    }
    var key = String(hash || '').replace(/^#/, '').toLowerCase();
    return PLANS.indexOf(key) === -1 ? chosen : key;
  }

  function apply(rootElement, plan) {
    rootElement.setAttribute('data-active-plan', plan);
    Array.prototype.forEach.call(rootElement.querySelectorAll('.plan-switch__option'), function (button) {
      button.setAttribute('aria-pressed', String(button.getAttribute('data-plan-choice') === plan));
    });
    Array.prototype.forEach.call(rootElement.querySelectorAll('[data-plan-card]'), function (card) {
      card.classList.toggle('is-active', card.getAttribute('data-plan-card') === plan);
    });
  }

  function revealCharts(rootElement, win) {
    var charts = rootElement.querySelectorAll('.plans-chart');
    if (!('IntersectionObserver' in win)) {
      Array.prototype.forEach.call(charts, function (chart) { chart.classList.add('is-drawn'); });
      return;
    }
    var observer = new win.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    Array.prototype.forEach.call(charts, function (chart) { observer.observe(chart); });
  }

  function initialize(doc) {
    var rootElement = doc && doc.querySelector('[data-plan-root]');
    if (!rootElement) {
      return;
    }
    var win = doc.defaultView;
    Array.prototype.forEach.call(rootElement.querySelectorAll('.plan-switch'), function (group) {
      group.hidden = false;
    });
    apply(rootElement, resolvePlan(win.location.hash));

    rootElement.addEventListener('click', function (event) {
      var trigger = event.target.closest('[data-plan-choice]');
      if (!trigger) {
        return;
      }
      var plan = resolvePlan(trigger.getAttribute('data-plan-choice'));
      apply(rootElement, plan);
      if (win.history && win.history.replaceState && trigger.tagName === 'BUTTON') {
        win.history.replaceState(null, '', '#' + plan);
      }
    });

    win.addEventListener('hashchange', function () {
      var hash = win.location.hash.replace(/^#/, '');
      if (PLANS.indexOf(hash) !== -1) {
        apply(rootElement, hash);
      }
    });

    revealCharts(rootElement, win);
  }

  return {
    PLANS: PLANS,
    resolvePlan: resolvePlan,
    initialize: initialize
  };
});
