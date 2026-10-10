'use strict';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function homeHref(hash, currentFile) {
  if (!hash) {
    return './index.html';
  }
  return currentFile === 'index.html' ? '#' + hash : './index.html#' + hash;
}

function worldsFor(currentFile) {
  return [
    {
      id: 'train',
      label: 'Train',
      links: [
        { href: './danglo-plaza.html', label: 'Danglo Plaza, Gwarinpa, Abuja' },
        { href: './female-gym-gwarinpa.html', label: 'All Female Gym, Gwarinpa, Abuja' },
        { href: './kubwa.html', label: 'Kubwa (Chikakore), Abuja' },
        { href: './kubwa-dantata.html', label: 'Kubwa (Dantata), Abuja' },
        { href: './karu.html', label: 'Karu, Abuja' },
        { href: homeHref('pricing', currentFile), label: 'Membership' },
        { href: homeHref('bmi', currentFile), label: 'BMI' },
        { href: homeHref('about', currentFile), label: 'About' }
      ]
    },
    {
      id: 'eat',
      label: 'Eat',
      links: [
        { href: './healthy-meals-kubwa.html', label: 'Healthy Meals Kubwa' },
        { href: './healthy-meals-karu.html', label: 'Healthy Meals Karu' },
        { href: './ahead-fitness-grills-karu.html', label: 'Ahead Grills Karu' },
        { href: './meal-plans.html', label: 'Meal Plans' }
      ]
    },
    {
      id: 'restore',
      label: 'Restore',
      links: [
        { href: './spa-gwarinpa.html', label: 'Ahead Fitness Spa Gwarinpa' },
        { href: './spa-dantata.html', label: 'Ahead Fitness Spa Dantata' },
        { href: './spa-karu.html', label: 'Ahead Fitness Spa Karu' },
        { href: './ahead-barbers-nadrem.html', label: 'Ahead Barbers Unisex Salon, Nadrem' },
        { href: './ahead-barbers-beauty-kubwa.html', label: 'Ahead Barbers & Beauty Salon, Kubwa' }
      ]
    }
  ];
}

function linkIsCurrent(href, currentFile) {
  var path = href.split('#')[0].split('/').pop();
  return path === currentFile;
}

function renderNavItems(currentFile) {
  var homeCurrent = currentFile === 'index.html';
  var careersCurrent = currentFile === 'careers.html';
  var items = [
    '<li' + (homeCurrent ? ' class="active"' : '') + '><a href="./index.html"' +
      (homeCurrent ? ' aria-current="page"' : '') + '>Home</a></li>'
  ];

  worldsFor(currentFile).forEach(function (world) {
    var childCurrent = world.links.some(function (link) {
      return linkIsCurrent(link.href, currentFile);
    });
    var links = world.links.map(function (link) {
      var current = linkIsCurrent(link.href, currentFile);
      return '<li' + (current ? ' class="active"' : '') + '><a href="' + escapeHtml(link.href) + '"' +
        (current ? ' aria-current="page"' : '') + '>' + escapeHtml(link.label) + '</a></li>';
    }).join('');
    items.push(
      '<li class="nav-world' + (childCurrent ? ' active' : '') + '">' +
      '<a href="#" aria-haspopup="true">' + escapeHtml(world.label) + '</a>' +
      '<ul class="dropdown">' + links + '</ul></li>'
    );
  });

  items.push(
    '<li' + (careersCurrent ? ' class="active"' : '') + '><a href="./careers.html"' +
      (careersCurrent ? ' aria-current="page"' : '') + '>Careers</a></li>'
  );
  return items.join('\n');
}

var BRAND_CLASS = {
  'healthy-meals-kubwa.html': 'brand-meals',
  'healthy-meals-karu.html': 'brand-meals',
  'ahead-fitness-grills-karu.html': 'brand-grills',
  'meal-plans.html': 'brand-plans',
  'spa-gwarinpa.html': 'brand-spa',
  'spa-dantata.html': 'brand-spa',
  'spa-karu.html': 'brand-spa',
  'ahead-barbers-nadrem.html': 'brand-salon',
  'ahead-barbers-beauty-kubwa.html': 'brand-salon'
};

function brandClassFor(filename) {
  return BRAND_CLASS[filename] || 'brand-gym';
}

module.exports = {
  renderNavItems: renderNavItems,
  brandClassFor: brandClassFor,
  worldsFor: worldsFor
};
