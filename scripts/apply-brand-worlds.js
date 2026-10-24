'use strict';

const fs = require('fs');
const path = require('path');
const { renderNavItems, renderAppStoreLinks, brandClassFor } = require('../js/world-nav');
const { renderSocialLinks } = require('../js/social-links');
const { renderWorlds } = require('../js/food-catalog');
const { renderMealPlansMain } = require('../js/meal-plans');
const { renderMembershipExtrasPage } = require('../js/membership-extras');
const {
  FOOD_PAGES,
  SALON_PAGES,
  renderKitchenHero,
  renderFoodLead,
  renderSalonHero,
  renderSalonVisit,
  renderTicker,
  SPA_PAGES,
  renderSpaHero,
  renderSpaFilms,
  renderSpaRitual,
  withMenuSearch
} = require('../js/brand-pages');

const root = path.join(__dirname, '..');

function replaceListInner(html, openPattern, inner) {
  const match = openPattern.exec(html);
  if (!match) {
    throw new Error('Could not find ' + openPattern);
  }
  const start = match.index + match[0].length;
  let depth = 1;
  let index = start;
  while (index < html.length) {
    const nextOpen = html.indexOf('<ul', index);
    const nextClose = html.indexOf('</ul>', index);
    if (nextClose === -1) {
      throw new Error('Unclosed list');
    }
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      index = nextOpen + 3;
      continue;
    }
    depth -= 1;
    if (depth === 0) {
      return html.slice(0, start) + '\n' + inner + '\n' + html.slice(nextClose);
    }
    index = nextClose + 5;
  }
  throw new Error('Unclosed list');
}

function replaceOnce(html, pattern, replacement, filename, description) {
  if (!pattern.test(html)) {
    throw new Error(filename + ' is missing ' + description);
  }
  return html.replace(pattern, replacement);
}

function applyNav(html, filename) {
  const items = renderNavItems(filename);
  let next = replaceListInner(html, /<nav id="mobile-menu"[^>]*>\s*<ul>/, items);
  next = replaceListInner(next, /<ul class="nav">/, items);
  next = next.replace(/[ \t]*\n?[ \t]*<div class="app-store-links app-store-links--(?:mobile|desktop)"[^>]*>[\s\S]*?<\/div>[ \t]*\n?/g, '');
  next = replaceOnce(next, /(<button type="button" class="canvas-search\b[^>]*>[\s\S]*?<\/button>)\s*(?=<nav id="mobile-menu")/,
    '$1\n    ' + renderAppStoreLinks('mobile') + '\n    ', filename, 'mobile app-store placement');
  next = replaceOnce(next, /(<div class="top-option">)/,
    '$1' + renderAppStoreLinks('desktop'), filename, 'desktop app-store placement');
  return next;
}

function applyBrand(html, filename) {
  const brand = brandClassFor(filename);
  if (html.includes('class="' + brand + '"') || html.includes("class='" + brand + "'")) {
    return html;
  }
  return html.replace('<body>', '<body class="' + brand + '">');
}

function insertOnce(html, marker, block) {
  if (html.includes(marker)) {
    return html;
  }
  const anchor = '<!-- Hero Section End -->';
  if (!html.includes(anchor)) {
    throw new Error('Missing hero end');
  }
  return html.replace(anchor, anchor + '\n' + block);
}

function replaceBetween(html, startMarker, endMarker, block, filename) {
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker, start + startMarker.length);
  if (start === -1 || end === -1) {
    throw new Error(filename + ' is missing ' + startMarker + ' or ' + endMarker);
  }
  return html.slice(0, start + startMarker.length) + '\n' + block + '\n' + html.slice(end);
}

function addScriptOnce(html, script) {
  const tag = '<script src="' + script + '"></script>';
  if (html.includes(tag)) {
    return html;
  }
  return html.replace('<script src="js/main.js"></script>', tag + '\n    <script src="js/main.js"></script>');
}

function applyFood(html, filename) {
  if (!FOOD_PAGES[filename]) {
    return html;
  }
  let next = replaceBetween(html, '<!-- Hero Section Begin -->', '<!-- Hero Section End -->', renderKitchenHero(filename), filename);
  next = replaceBetween(next, '<!-- Hero Section End -->', '<!-- Gallery Section Begin -->', renderFoodLead(filename), filename);
  if (filename === 'ahead-fitness-grills-karu.html') {
    next = next.replace('gallery gallery--balanced"', 'gallery gallery--balanced gallery--grills"');
  }
  next = addScriptOnce(next, 'js/dish-carousel.js');
  return addScriptOnce(next, 'js/picture-menu.js');
}

const SALON_VISIT_BEGIN = '<!-- Salon Visit Begin -->';
const SALON_VISIT_END = '<!-- Salon Visit End -->';

function applySalon(html, filename) {
  if (!SALON_PAGES[filename]) {
    return html;
  }
  const spec = SALON_PAGES[filename];
  let next = replaceBetween(html, '<!-- Hero Section Begin -->', '<!-- Hero Section End -->', renderSalonHero(filename), filename);
  next = replaceBetween(next, '<!-- Hero Section End -->', '<!-- Gallery Section Begin -->', renderTicker(spec.ticker), filename);
  if (!next.includes(SALON_VISIT_BEGIN)) {
    next = next.replace('<!-- Contact Section Begin -->', SALON_VISIT_BEGIN + '\n' + SALON_VISIT_END + '\n\n    <!-- Contact Section Begin -->');
  }
  return replaceBetween(next, SALON_VISIT_BEGIN, SALON_VISIT_END, renderSalonVisit(filename), filename);
}

function applySpa(html, filename) {
  if (!SPA_PAGES[filename]) {
    return html;
  }
  const spec = SPA_PAGES[filename];
  let next = replaceBetween(html, '<!-- Hero Section Begin -->', '<!-- Hero Section End -->', renderSpaHero(filename), filename);
  next = replaceBetween(next, '<!-- Hero Section End -->', '<!-- Gallery Section Begin -->', renderTicker(spec.ticker), filename);
  next = replaceBetween(next, '<!-- Videos Section Begin -->', '<!-- Videos Section End -->', renderSpaFilms(), filename);
  return replaceBetween(next, '<!-- Pricing Section Begin -->', '<!-- Pricing Section End -->', renderSpaRitual(filename), filename);
}

function fillSocial(html, className, inner, filename) {
  const pattern = new RegExp('(<div class="' + className + '">)[\\s\\S]*?(</div>)');
  if (!pattern.test(html)) {
    throw new Error(filename + ' is missing ' + className);
  }
  return html.replace(pattern, '$1' + inner + '$2');
}

function applySocial(html, filename) {
  const spots = ['canvas-social', 'to-social', 'fa-social'];
  const missing = spots.some((className) => !html.includes('class="' + className + '"'));
  if (missing) {
    if (filename === 'meal-plans.html') {
      return html;
    }
    throw new Error(filename + ' is missing a social link spot');
  }
  const links = renderSocialLinks(filename);
  const footer = html.match(/<div class="fa-social">([\s\S]*?)<\/div>/);
  const mail = (footer[1].match(/<a\b[^>]*href="mailto:[^"]*"[^>]*>[\s\S]*?<\/a>/g) || []).join('');
  let next = fillSocial(html, 'canvas-social', links, filename);
  next = fillSocial(next, 'to-social', links, filename);
  return fillSocial(next, 'fa-social', links + mail, filename);
}

function applyWorlds(html, filename) {
  if (filename !== 'index.html') {
    return html;
  }
  let next = insertOnce(html, 'id="worlds"', renderWorlds());
  next = next.replace(/href="#" class="primary-btn">Get info/g, 'href="#worlds" class="primary-btn">Explore');
  return next;
}

function mealPlansDocument() {
  const nav = renderNavItems('meal-plans.html');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Ahead Fitness meal plans: the Build Plan for muscle and the Lean Plan for weight loss. See all four weeks of meals, prices, and how to subscribe." />
  <title>Meal Plans | Ahead Fitness</title>
  <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
  <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
  <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
  <link rel="stylesheet" href="css/flaticon.css" type="text/css" />
  <link rel="stylesheet" href="css/owl.carousel.min.css" type="text/css" />
  <link rel="stylesheet" href="css/barfiller.css" type="text/css" />
  <link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />
  <link rel="stylesheet" href="css/slicknav.min.css" type="text/css" />
  <link rel="stylesheet" href="css/style.css" type="text/css" />
  <link href="https://fonts.googleapis.com/css?family=Muli:300,400,500,600,700,800,900&display=swap" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css?family=Oswald:300,400,500,600,700&display=swap" rel="stylesheet" />
</head>
<body class="brand-plans">
  <button type="button" class="offcanvas-menu-overlay" aria-label="Close navigation menu"></button>
  <div class="offcanvas-menu-wrapper" aria-hidden="true">
    <a class="mobile-menu-brand" href="./index.html" aria-label="Ahead Fitness home"><img src="img/logo2.png" alt="" /><span>AHEAD FITNESS<small>TRAIN · MOVE · THRIVE</small></span></a>
    <button type="button" class="canvas-close" aria-label="Close navigation menu"><i class="fa fa-close"></i></button>
    <button type="button" class="canvas-search search-switch" aria-label="Search the website" aria-controls="site-search"><i class="fa fa-search"></i></button>
    ${renderAppStoreLinks('mobile')}
    <nav id="mobile-menu" class="canvas-menu mobile-menu" aria-label="Mobile navigation">
      <ul>
${nav}
      </ul>
    </nav>
    <div id="mobile-menu-wrap"></div>
    <div class="canvas-social">${renderSocialLinks('meal-plans.html')}</div>
  </div>
  <header class="header-section">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-2">
          <div class="logo"><a href="./index.html"><img src="img/logo2.png" alt="Ahead Fitness logo" style="max-height: 100px; width: auto" /></a></div>
        </div>
        <div class="col-lg-8">
          <nav class="nav-menu">
            <ul class="nav">
${nav}
            </ul>
          </nav>
        </div>
        <div class="col-lg-2">
          <div class="top-option">
            ${renderAppStoreLinks('desktop')}
            <button type="button" class="to-search search-switch" aria-label="Search the website" aria-controls="site-search"><i class="fa fa-search"></i></button>
            <div class="to-social">${renderSocialLinks('meal-plans.html')}</div>
          </div>
        </div>
      </div>
      <button type="button" class="canvas-open" aria-label="Open navigation menu" aria-controls="mobile-menu" aria-expanded="false"><i class="fa fa-bars"></i></button>
    </div>
  </header>
  <main>
${renderMealPlansMain()}
  </main>
  <section class="footer-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <div class="fa-social">${renderSocialLinks('meal-plans.html')}</div>
          <div class="copyright-text"><p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | Ahead Fitness</p></div>
        </div>
      </div>
    </div>
  </section>
  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/jquery.magnific-popup.min.js"></script>
  <script src="js/masonry.pkgd.min.js"></script>
  <script src="js/jquery.barfiller.js"></script>
  <script src="js/jquery.slicknav.js"></script>
  <script src="js/owl.carousel.min.js"></script>
  <script src="js/main.js"></script>
  <script src="js/plan-switch.js"></script>
  <div class="search-model" id="site-search" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title" aria-hidden="true" hidden>
    <div class="h-100 d-flex align-items-center justify-content-center">
      <button type="button" class="search-close-switch" aria-label="Close search">×</button>
      <form class="search-model-form" role="search">
        <h2 id="search-dialog-title">Search Ahead Fitness</h2>
        <label class="visually-hidden" for="search-input">Search the website</label>
        <div class="search-input-row"><input type="search" id="search-input" placeholder="Search services, locations, and more…" autocomplete="off" />
          <button type="submit" class="search-submit">Search</button>
        </div>
        <div class="search-results" id="search-results" aria-live="polite"><p class="search-hint">Start typing to find pages and sections.</p></div>
      </form>
    </div>
  </div>
  <script src="js/search.js"></script>
</body>
</html>
`;
}

const htmlFiles = fs.readdirSync(root).filter((name) =>
  name.endsWith('.html') && name !== 'gyms.html' && name !== 'membership-extras.html'
);
htmlFiles.forEach((filename) => {
  const fullPath = path.join(root, filename);
  let html = fs.readFileSync(fullPath, 'utf8');
  html = applyNav(html, filename);
  html = applyBrand(html, filename);
  html = applyFood(html, filename);
  html = applySalon(html, filename);
  html = applySpa(html, filename);
  html = applySocial(html, filename);
  html = applyWorlds(html, filename);
  if (filename === 'index.html') {
    html = html.replace(/href="#guest-pass">Guest Passes/, 'href="./membership-extras.html#guest-pass">Guest Passes');
    html = html.replace(/href="#rewards">Loyalty Points/, 'href="./membership-extras.html#rewards">Loyalty Points');
    html = html.replace(/href="#pause-plan">Pause Your Subscription/, 'href="./membership-extras.html#pause-plan">Pause Your Subscription');
    html = html.replace(/  <section class="gym-perks" id="perks"[\s\S]*?  <\/section>\n/, '');
  }
  fs.writeFileSync(fullPath, html);
  console.log('updated', filename);
});

fs.writeFileSync(path.join(root, 'meal-plans.html'), mealPlansDocument());
console.log('wrote meal-plans.html');

fs.writeFileSync(path.join(root, 'membership-extras.html'), renderMembershipExtrasPage());
console.log('wrote membership-extras.html');

const indexPath = path.join(root, 'search-index.json');
const searchIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const mealPlansEntry = {
  title: 'Meal Plans | Ahead Fitness',
  href: 'meal-plans.html',
  text: 'Meal Plans The Build Plan The Lean Plan muscle protein weight loss delivered meals four week menu grill nights WhatsApp 08066203522',
  sections: [
    { title: 'The Build Plan', href: 'meal-plans.html#build', text: 'Muscle and protein. ₦290,000 for 2 weeks. ₦550,000 for 4 weeks.' },
    { title: 'The Lean Plan', href: 'meal-plans.html#lean', text: 'Weight loss and fat reduction. ₦270,000 for 2 weeks. ₦530,000 for 4 weeks.' },
    { title: 'Four-week meal rotation', href: 'meal-plans.html#rotation', text: 'Every breakfast, dinner, and drink for all four weeks, with calories and protein.' }
  ]
};
const existingIndex = searchIndex.findIndex((entry) => entry.href === 'meal-plans.html');
const membershipExtrasEntry = {
  title: 'Membership Extras | Ahead Fitness',
  href: 'membership-extras.html',
  text: 'Membership extras Guest passes Loyalty points Pause your plan. Bring a friend to train with you. Monthly 1 pass, Quarterly 4 passes, Half Yearly 9 passes, Yearly 20 passes. Earn points for visits, renewals, and referrals. Activate in 7 days 1,000 pts, in 30 days 500 pts. Quarterly +1,500, Half-Yearly +4,000, Yearly +10,000 pts. Pause a subscription for a minimum of 5 consecutive days, and up to 30 days in a calendar year. Customer Service activates it within 24 hours.',
  sections: [
    { title: 'Guest passes', href: 'membership-extras.html#guest-pass', text: 'Bring a friend to train with you. Monthly 1 pass, Quarterly 4 passes, Half Yearly 9 passes, Yearly 20 passes. Complimentary Guest Passes in the app.' },
    { title: 'Loyalty points', href: 'membership-extras.html#rewards', text: 'Earn points for visits, renewals, and referrals. Activate in 7 days 1,000 pts. Yearly +10,000 pts. Refer a friend for 5% of their first payment.' },
    { title: 'Pause plan', href: 'membership-extras.html#pause-plan', text: 'Pause a subscription for a minimum of 5 consecutive days, and for up to 30 days within a calendar year. Customer Service activates it within 24 hours.' }
  ]
};
const membershipExtrasIndex = searchIndex.findIndex((entry) => entry.href === 'membership-extras.html');
const withExtras = (membershipExtrasIndex === -1
  ? searchIndex.concat([membershipExtrasEntry])
  : searchIndex.map((entry, index) => (index === membershipExtrasIndex ? membershipExtrasEntry : entry))
).map(withMenuSearch);
const nextIndex = (existingIndex === -1
  ? withExtras.concat([mealPlansEntry])
  : withExtras.map((entry) => (entry.href === 'meal-plans.html' ? mealPlansEntry : entry))
).map(withMenuSearch);
const homepageIndex = nextIndex.find((entry) => entry.href === 'index.html');
if (homepageIndex) {
  homepageIndex.sections = homepageIndex.sections.filter((section) => section.href !== 'index.html#bmi');
  homepageIndex.text = homepageIndex.text.replace(/ check your body BMI CALCULATOR CHART[\s\S]*? DOWNLOAD AHEAD FITNESS APP/, ' DOWNLOAD AHEAD FITNESS APP');
}
const serializedIndex = JSON.stringify(nextIndex, null, 4) + '\n';
if (serializedIndex !== fs.readFileSync(indexPath, 'utf8')) {
  fs.writeFileSync(indexPath, serializedIndex);
  console.log('updated search index');
}
