(function () {
  'use strict';

  var overlay = document.getElementById('site-search');
  var form = document.querySelector('.search-model-form');
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var closeButton = document.querySelector('.search-close-switch');
  var opener = null;
  var indexPromise = null;

  if (!overlay || !form || !input || !results || !closeButton) {
    return;
  }

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(new URL('search-index.json', document.baseURI), {
        headers: { Accept: 'application/json' }
      }).then(function (response) {
        if (!response.ok) {
          throw new Error('Search index request failed: ' + response.status);
        }
        return response.json();
      }).then(function (index) {
        if (!Array.isArray(index)) {
          throw new Error('Search index has an invalid format.');
        }
        return index;
      }).catch(function (error) {
        indexPromise = null;
        throw error;
      });
    }
    return indexPromise;
  }

  function setMessage(message, className) {
    var paragraph = document.createElement('p');
    paragraph.className = className;
    paragraph.textContent = message;
    results.replaceChildren(paragraph);
  }

  function normalize(value) {
    return value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
  }

  function safeHref(href) {
    if (typeof href !== 'string' || !href || href.indexOf('..') !== -1) {
      return null;
    }
    try {
      var url = new URL(href, document.baseURI);
      if (url.origin !== window.location.origin || !/\.html$/i.test(url.pathname)) {
        return null;
      }
      return url.href;
    } catch (error) {
      return null;
    }
  }

  function makeSnippet(text, terms) {
    var normalizedText = String(text || '').replace(/\s+/g, ' ').trim();
    if (!normalizedText) {
      return 'Open this page to explore more.';
    }
    var lowerText = normalizedText.toLocaleLowerCase();
    var firstMatch = -1;
    terms.forEach(function (term) {
      var match = lowerText.indexOf(term);
      if (match !== -1 && (firstMatch === -1 || match < firstMatch)) {
        firstMatch = match;
      }
    });
    if (firstMatch > 70) {
      normalizedText = '…' + normalizedText.slice(firstMatch - 55);
      firstMatch = 56;
    }
    if (normalizedText.length > 170) {
      var end = Math.min(normalizedText.length, Math.max(170, firstMatch + 115));
      normalizedText = normalizedText.slice(0, end).trimEnd();
      if (end < String(text || '').length) {
        normalizedText += '…';
      }
    }
    return normalizedText;
  }

  function collectMatches(index, terms) {
    var candidates = [];
    index.forEach(function (page) {
      var pageTitle = normalize(page.title || '');
      var pageText = normalize(page.text || '');
      var pageHref = safeHref(page.href);
      if (pageHref && terms.every(function (term) {
        return pageTitle.indexOf(term) !== -1 || pageText.indexOf(term) !== -1;
      })) {
        var titleScore = terms.reduce(function (score, term) {
          return score + (pageTitle.indexOf(term) !== -1 ? 10 : 0);
        }, 0);
        candidates.push({
          title: page.title,
          pageTitle: page.title,
          href: pageHref,
          text: page.text,
          score: titleScore + 1
        });
      }

      (Array.isArray(page.sections) ? page.sections : []).forEach(function (section) {
        var sectionTitle = normalize(section.title || '');
        var sectionText = normalize(section.text || '');
        var sectionHref = safeHref(section.href);
        if (!sectionHref || !terms.every(function (term) {
          return sectionTitle.indexOf(term) !== -1 || sectionText.indexOf(term) !== -1 ||
            pageTitle.indexOf(term) !== -1;
        })) {
          return;
        }
        var score = terms.reduce(function (total, term) {
          return total + (sectionTitle.indexOf(term) !== -1 ? 8 : 0) +
            (pageTitle.indexOf(term) !== -1 ? 5 : 0) +
            (sectionText.indexOf(term) !== -1 ? 2 : 0);
        }, 0);
        candidates.push({
          title: section.title,
          pageTitle: page.title,
          href: sectionHref,
          text: section.text,
          score: score + 2
        });
      });
    });

    var unique = new Map();
    candidates.sort(function (left, right) {
      return right.score - left.score || left.title.localeCompare(right.title);
    }).forEach(function (candidate) {
      if (!unique.has(candidate.href)) {
        unique.set(candidate.href, candidate);
      }
    });
    return Array.from(unique.values()).slice(0, 10);
  }

  function renderMatches(matches, terms) {
    if (!matches.length) {
      setMessage('No results found. Try another search.', 'search-empty');
      return;
    }

    var list = document.createElement('ul');
    list.className = 'search-result-list';
    matches.forEach(function (match) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      var title = document.createElement('span');
      var context = document.createElement('span');
      var snippet = document.createElement('span');
      link.className = 'search-result-link';
      link.href = match.href;
      title.className = 'search-result-title';
      title.textContent = match.title;
      context.className = 'search-result-context';
      context.textContent = match.pageTitle;
      snippet.className = 'search-result-snippet';
      snippet.textContent = makeSnippet(match.text, terms);
      link.append(title, context, snippet);
      item.appendChild(link);
      list.appendChild(item);
    });
    results.replaceChildren(list);
  }

  function runSearch() {
    var query = normalize(input.value);
    if (!query) {
      setMessage('Start typing to find pages and sections.', 'search-hint');
      return Promise.resolve([]);
    }

    var terms = query.split(' ').filter(Boolean);
    setMessage('Searching the website…', 'search-loading');
    return loadIndex().then(function (index) {
      if (query !== normalize(input.value)) {
        return [];
      }
      var matches = collectMatches(index, terms);
      renderMatches(matches, terms);
      return matches;
    }).catch(function () {
      if (query === normalize(input.value)) {
        setMessage('Search is temporarily unavailable. Please try again.', 'search-error');
      }
      return [];
    });
  }

  function openSearch(event) {
    opener = event.currentTarget;
    overlay.hidden = false;
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('is-open');
    document.body.classList.add('search-open');
    if (opener && opener.closest('.offcanvas-menu-wrapper') && window.jQuery) {
      window.jQuery('.offcanvas-menu-wrapper').removeClass('show-offcanvas-menu-wrapper')
        .attr('aria-hidden', 'true').prop('inert', true);
      window.jQuery('.offcanvas-menu-overlay').removeClass('active').attr('aria-hidden', 'true');
      window.jQuery('.canvas-open').attr('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-open');
    }
    window.requestAnimationFrame(function () {
      input.focus();
    });
  }

  function closeSearch() {
    if (overlay.hidden) {
      return;
    }
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.hidden = true;
    document.body.classList.remove('search-open');
    input.value = '';
    setMessage('Start typing to find pages and sections.', 'search-hint');
    if (opener && typeof opener.focus === 'function') {
      var focusTarget = opener.closest('.offcanvas-menu-wrapper') ? document.querySelector('.canvas-open') : opener;
      if (focusTarget) {
        focusTarget.focus();
      }
    }
  }

  document.querySelectorAll('.search-switch').forEach(function (trigger) {
    trigger.addEventListener('click', openSearch);
  });
  closeButton.addEventListener('click', closeSearch);
  input.addEventListener('input', runSearch);
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    runSearch().then(function () {
      var firstResult = results.querySelector('.search-result-link');
      if (firstResult) {
        firstResult.focus();
      }
    });
  });
  overlay.addEventListener('click', function (event) {
    if (event.target === overlay) {
      closeSearch();
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !overlay.hidden) {
      event.preventDefault();
      closeSearch();
      return;
    }
    if (event.key === 'Tab' && !overlay.hidden) {
      var focusable = overlay.querySelectorAll('button, input, a[href]');
      if (!focusable.length) {
        return;
      }
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
