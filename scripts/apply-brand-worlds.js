'use strict';

const fs = require('fs');
const path = require('path');
const { renderNavItems, brandClassFor } = require('../js/world-nav');
const { renderWorlds, renderMealPlansMain } = require('../js/food-catalog');
const {
  FOOD_PAGES,
  SALON_PAGES,
  renderKitchenHero,
  renderFoodLead,
  renderSalonHero,
  renderSalonVisit,
  renderTicker
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

function applyNav(html, filename) {
  const items = renderNavItems(filename);
  let next = replaceListInner(html, /<nav id="mobile-menu"[^>]*>\s*<ul>/, items);
  next = replaceListInner(next, /<ul class="nav">/, items);
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
  <meta name="description" content="Subscribe to an Ahead Fitness meal plan. The Build Plan is for muscle and protein. The Lean Plan is for weight loss. Meals are delivered six days a week." />
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
    <nav id="mobile-menu" class="canvas-menu mobile-menu" aria-label="Mobile navigation">
      <ul>
${nav}
      </ul>
    </nav>
    <div id="mobile-menu-wrap"></div>
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
            <button type="button" class="to-search search-switch" aria-label="Search the website" aria-controls="site-search"><i class="fa fa-search"></i></button>
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

const htmlFiles = fs.readdirSync(root).filter((name) => name.endsWith('.html'));
htmlFiles.forEach((filename) => {
  const fullPath = path.join(root, filename);
  let html = fs.readFileSync(fullPath, 'utf8');
  html = applyNav(html, filename);
  html = applyBrand(html, filename);
  html = applyFood(html, filename);
  html = applySalon(html, filename);
  html = applyWorlds(html, filename);
  fs.writeFileSync(fullPath, html);
  console.log('updated', filename);
});

fs.writeFileSync(path.join(root, 'meal-plans.html'), mealPlansDocument());
console.log('wrote meal-plans.html');

const indexPath = path.join(root, 'search-index.json');
const searchIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
if (!searchIndex.some((entry) => entry.href === 'meal-plans.html')) {
  searchIndex.push({
    title: 'Meal Plans | Ahead Fitness',
    href: 'meal-plans.html',
    text: 'Meal Plans The Build Plan The Lean Plan muscle protein weight loss delivered meals WhatsApp 08066203522',
    sections: [
      { title: 'The Build Plan', href: 'meal-plans.html#plans', text: 'Muscle and protein. ₦290,000 for 2 weeks. ₦550,000 for 4 weeks.' },
      { title: 'The Lean Plan', href: 'meal-plans.html#plans', text: 'Weight loss and fat reduction. ₦270,000 for 2 weeks. ₦530,000 for 4 weeks.' }
    ]
  });
  fs.writeFileSync(indexPath, JSON.stringify(searchIndex, null, 4) + '\n');
  console.log('updated search index');
}
