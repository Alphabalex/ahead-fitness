'use strict';

var catalog = require('./food-catalog');

var escapeHtml = catalog.escapeHtml;
var WHATSAPP_DISPLAY = '08066203522';
var SALON_PHONE = '08025310435';

function slide(file, name, price) {
  return { image: 'img/Food_Pictures/' + file, name: name, price: price };
}

var FOOD_PAGES = {
  'healthy-meals-kubwa.html': {
    brand: 'meals',
    place: 'Healthy Meals · Kubwa',
    shortPlace: 'Healthy Meals Kubwa',
    headline: ['Eat like', 'you ', 'train.'],
    lede: 'Protein-packed plates, crisp salads, and blended smoothies, cooked fresh opposite Dantata Estate in Kubwa. Pick up, eat in, or get it delivered.',
    backdrop: 'FRESH',
    ring: 'FRESH DAILY ✦ HIGH PROTEIN ✦ MADE TO ORDER ✦ ',
    plates: [
      slide('FD14.webp', 'Grilled Chicken Salad', '₦9,000'),
      slide('FD5.webp', 'Banana Yoghurt Smoothie', '₦3,000'),
      slide('FD12.webp', 'Chicken Stir Fry', '₦10,000')
    ],
    facts: [
      ['7am–7:30pm', 'Open and delivering daily'],
      ['47g', 'Protein in a Chicken Salad'],
      ['Glovo · Chowdeck', 'Also on your apps']
    ],
    ticker: ['High protein', 'Fresh daily', 'Salads', 'Stir fries', 'Smoothies', 'Delivery 7am–7:30pm', 'Glovo', 'Chowdeck']
  },
  'healthy-meals-karu.html': {
    brand: 'meals',
    place: 'Healthy Meals · Karu',
    shortPlace: 'Healthy Meals Karu',
    headline: ['Fuel that', '', 'tastes good.'],
    lede: 'Fresh plates, crisp salads, and cold smoothies from our Karu kitchen on Sen George Akume Way. Pick up, eat in, or get it delivered.',
    backdrop: 'FUEL',
    ring: 'FRESH DAILY ✦ HIGH PROTEIN ✦ MADE TO ORDER ✦ ',
    plates: [
      slide('FD15.webp', 'Chicken Salad', '₦6,000'),
      slide('FD3.webp', 'Tropical Blast', '₦3,000'),
      slide('FD16.webp', 'Boiled Plantain & Veggie Sauce', '₦9,500')
    ],
    facts: [
      ['7am–7:30pm', 'Open and delivering daily'],
      ['From ₦3,000', 'Smoothies and juices'],
      ['Glovo · Chowdeck', 'Also on your apps']
    ],
    ticker: ['High protein', 'Fresh daily', 'Salads', 'Plantain & veggie sauce', 'Smoothies', 'Delivery 7am–7:30pm', 'Glovo', 'Chowdeck']
  },
  'ahead-fitness-grills-karu.html': {
    brand: 'grills',
    place: 'Ahead Grills · Karu',
    shortPlace: 'Ahead Grills Karu',
    headline: ['Fire. Smoke.', '', 'Flavour.'],
    lede: 'Catfish, tilapia, croaker, chicken, and turkey, grilled to order on Sen George Akume Way, Karu. Every grill comes with a companion.',
    backdrop: 'GRILL',
    ring: 'OFF THE GRILL ✦ HOT AND FRESH ✦ KARU ✦ ',
    plates: [
      slide('FD19.webp', 'Grilled fish', 'From ₦10,000'),
      slide('FD13.webp', 'Power Booster', '₦4,000'),
      slide('FD21.webp', 'Watermelon Mix', '₦3,000')
    ],
    facts: [
      ['From ₦8,500', 'Chicken with a companion'],
      ['7am–7:30pm', 'Open and delivering daily'],
      ['Glovo · Chowdeck', 'Also on your apps']
    ],
    ticker: ['Catfish', 'Tilapia', 'Croaker', 'Chicken', 'Turkey', 'Platters', 'Shawarma', 'Delivery 7am–7:30pm']
  }
};

var SALON_PAGES = {
  'ahead-barbers-nadrem.html': {
    place: 'Ahead Barbers Unisex Salon · Nadrem',
    headline: ['Fresh', 'cut', 'culture.'],
    lede: 'Cuts, fades, braids, locs, beard care, and nails, in a bright salon beside Nadrem Super Market on Gado Nasko Road.',
    servicesHref: '#services',
    frames: [
      { image: 'img/Nadrem_Salon/NDS2.webp', alt: 'Inside Ahead Barbers Nadrem, a row of styling chairs and arched mirrors' },
      { image: 'img/Nadrem_Salon/NDS6.webp', alt: 'Pedicure chairs at Ahead Barbers Nadrem' }
    ],
    facts: [['Unisex', 'Everyone is welcome'], ['Hair · Beard · Nails', 'One visit, head to toe']],
    ticker: ['Haircuts', 'Fades', 'Braids', 'Dreadlocks', 'Beard grooming', 'Manicure', 'Pedicure'],
    finish: 'Add a beard line-up, a manicure, or a pedicure, and leave fresh from head to toe.',
    directions: 'https://www.google.com/maps/search/?api=1&query=Plot+154%2C+Gado+Nasko+Road%2C+Kubwa%2C+beside+Nadrem+Super+Market'
  },
  'ahead-barbers-beauty-kubwa.html': {
    place: 'Ahead Barbers & Beauty Salon · Kubwa',
    headline: ['Look', 'sharp.', 'Feel good.'],
    lede: 'A bright, open salon at Shop A1, Central Market Plaza, Kubwa. Bring the look you have in mind and settle in.',
    servicesHref: '#salon-experience',
    frames: [
      { image: 'img/Kubwa_Salon/KBS5.webp', alt: 'Styling chairs and mirrors inside Ahead Barbers and Beauty Kubwa' },
      { image: 'img/Kubwa_Salon/KBS10.webp', alt: 'The beauty corner at Ahead Barbers and Beauty Kubwa' }
    ],
    facts: [['Barbers & Beauty', 'Under one roof'], ['Central Market Plaza', 'In the heart of Kubwa']],
    ticker: ['Fresh cuts', 'Beauty', 'Style', 'Barbers', 'Central Market Plaza', 'Kubwa'],
    finish: 'Take a last look in the mirror, and step back out feeling like yourself.',
    directions: 'https://www.google.com/maps/search/?api=1&query=Shop+A1%2C+Central+Market+Plaza%2C+Kubwa%2C+Abuja'
  }
};

function foodSpec(filename) {
  var spec = FOOD_PAGES[filename];
  if (!spec) {
    throw new Error('No food page design for ' + filename);
  }
  return spec;
}

function salonSpec(filename) {
  var spec = SALON_PAGES[filename];
  if (!spec) {
    throw new Error('No salon page design for ' + filename);
  }
  return spec;
}

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function external(href) {
  return 'href="' + escapeHtml(href) + '" target="_blank" rel="noopener noreferrer"';
}

function renderHeadline(parts) {
  return '<h1>' + escapeHtml(parts[0]) + '<br />' + escapeHtml(parts[1]) + '<em>' + escapeHtml(parts[2]) + '</em></h1>';
}

function renderTicker(words) {
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('A ticker needs at least one word');
  }
  var once = words.map(function (word) {
    return '<span>' + escapeHtml(word) + '</span><i>✦</i>';
  }).join('');
  var run = once + once;
  return '<div class="brand-ticker"><p class="sr-only">' + escapeHtml(words.join(', ')) + '</p>' +
    '<div class="brand-ticker__track" aria-hidden="true"><div>' + run + '</div><div>' + run + '</div></div></div>';
}

function renderRing(text) {
  return '<svg class="kitchen-hero__ring" viewBox="0 0 200 200" aria-hidden="true" focusable="false">' +
    '<defs><path id="kitchen-ring-path" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" /></defs>' +
    '<text><textPath href="#kitchen-ring-path" textLength="512" lengthAdjust="spacing">' + escapeHtml(text) + '</textPath></text></svg>';
}

function renderPlate(plate, modifier) {
  return '<figure class="plate plate--' + modifier + '">' +
    '<img src="' + escapeHtml(plate.image) + '" alt="' + escapeHtml(plate.name) + '" />' +
    '<figcaption><b>' + escapeHtml(plate.name) + '</b><span>' + escapeHtml(plate.price) + '</span></figcaption></figure>';
}

function renderKitchenHero(spec) {
  var facts = spec.facts.map(function (fact) {
    return '<li><strong>' + escapeHtml(fact[0]) + '</strong><span>' + escapeHtml(fact[1]) + '</span></li>';
  }).join('');
  return [
    '<section class="kitchen-hero kitchen-hero--' + spec.brand + '">',
    '<p class="kitchen-hero__backdrop" aria-hidden="true">' + escapeHtml(spec.backdrop) + '</p>',
    '<div class="kitchen-hero__copy">',
    '<p class="brand-kicker"><span aria-hidden="true"></span>' + escapeHtml(spec.place) + '</p>',
    renderHeadline(spec.headline),
    '<p class="kitchen-hero__lede">' + escapeHtml(spec.lede) + '</p>',
    '<div class="brand-actions"><a class="primary-btn" href="#menu">See the menu</a>',
    '<a class="ghost-btn" ' + external(catalog.orderHref('something from ' + spec.shortPlace)) + '><i class="fa fa-whatsapp" aria-hidden="true"></i> Order on WhatsApp</a></div>',
    '<ul class="kitchen-hero__facts">' + facts + '</ul>',
    '</div>',
    '<div class="kitchen-hero__plates">',
    renderRing(spec.ring),
    renderPlate(spec.plates[0], 'main'),
    renderPlate(spec.plates[1], 'side-a'),
    renderPlate(spec.plates[2], 'side-b'),
    '</div>',
    '</section>'
  ].join('');
}

function renderDishCarousel(spec) {
  var slides = catalog.slidesFor(spec.brand).map(function (entry) {
    return [
      '<article class="dish-slide">',
      '<img src="' + escapeHtml(entry.image) + '" alt="' + escapeHtml(entry.name) + '" loading="lazy" decoding="async" />',
      '<span class="dish-slide__price">' + escapeHtml(entry.priceLabel) + '</span>',
      '<div class="dish-slide__caption">',
      '<h3>' + escapeHtml(entry.name) + '</h3>',
      '<p class="dish-slide__detail">' + escapeHtml(entry.detail) + '</p>',
      '<a class="dish-slide__order" ' + external(catalog.orderHref(entry.name)) + '>Order this <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>',
      '</div></article>'
    ].join('');
  }).join('');
  return [
    '<section class="dish-showcase" id="dishes">',
    '<div class="brand-heading"><p class="brand-kicker"><span aria-hidden="true"></span>Swipe the plates</p>',
    '<h2>Straight from <em>the pass</em></h2></div>',
    '<div class="dish-carousel" data-dish-carousel>',
    '<button type="button" class="dish-carousel__nav dish-carousel__nav--prev" aria-label="Previous dish"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
    '<div class="dish-carousel__track">' + slides + '</div>',
    '<button type="button" class="dish-carousel__nav dish-carousel__nav--next" aria-label="Next dish"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
    '</div></section>'
  ].join('');
}

function renderMenuCover(group, index) {
  var number = '<span class="menu-cover__number">' + String(index + 1).padStart(2, '0') + '</span>';
  var copy = '<div class="menu-cover__copy">' + number + '<h3>' + escapeHtml(group.title) + '</h3>' +
    (group.note ? '<p>' + escapeHtml(group.note) + '</p>' : '') +
    '<p class="menu-cover__count">' + group.items.length + ' items</p></div>';
  if (group.cover) {
    return '<header class="menu-cover menu-cover--photo"><img src="' + escapeHtml(group.cover.image) + '" alt="' +
      escapeHtml(group.cover.alt) + '" loading="lazy" decoding="async" />' + copy + '</header>';
  }
  return '<header class="menu-cover menu-cover--type"><span class="menu-cover__word" aria-hidden="true">' +
    escapeHtml(group.title) + '</span>' + copy + '</header>';
}

function bestBadge(entry) {
  return entry.best ? '<em class="menu-badge">Best seller</em>' : '';
}

function renderPhotoDish(entry, photo) {
  return [
    '<article class="menu-dish">',
    '<figure><img src="' + escapeHtml(photo.image) + '" alt="' + escapeHtml(entry.name) + '" loading="lazy" decoding="async" />',
    '<span class="menu-dish__price">' + catalog.formatNaira(entry.price) + '</span>' + bestBadge(entry) + '</figure>',
    '<div class="menu-dish__body"><h4>' + escapeHtml(entry.name) + '</h4>',
    '<p>' + escapeHtml(entry.detail || photo.detail) + '</p>',
    '<a ' + external(catalog.orderHref(entry.name)) + '>Order <i class="fa fa-whatsapp" aria-hidden="true"></i></a></div>',
    '</article>'
  ].join('');
}

function renderMenuRow(entry) {
  var detail = entry.detail ? '<p class="menu-row__detail">' + escapeHtml(entry.detail) + '</p>' : '';
  return '<li class="menu-row"><div class="menu-row__line"><span class="menu-row__name">' + escapeHtml(entry.name) + bestBadge(entry) + '</span>' +
    '<span class="menu-row__dots" aria-hidden="true"></span><strong>' + catalog.formatNaira(entry.price) + '</strong>' +
    '<a class="menu-row__order" ' + external(catalog.orderHref(entry.name)) + ' aria-label="Order ' + escapeHtml(entry.name) +
    ' on WhatsApp"><i class="fa fa-whatsapp" aria-hidden="true"></i></a></div>' + detail + '</li>';
}

function renderPictureMenu(brand, placeName) {
  catalog.assertBrand(brand);
  var groups = catalog.MENUS[brand];
  var tabs = groups.map(function (group, index) {
    var slug = slugify(group.title);
    return '<button type="button" class="picture-menu__tab" id="menu-tab-' + slug + '" data-menu-target="menu-panel-' + slug + '"' +
      (index === 0 ? ' aria-selected="true"' : ' aria-selected="false"') + '>' + escapeHtml(group.title) +
      '<small>' + group.items.length + '</small></button>';
  }).join('');
  var panels = groups.map(function (group, index) {
    var slug = slugify(group.title);
    var dishes = [];
    var rows = [];
    group.items.forEach(function (entry) {
      var photo = catalog.photoFor(brand, entry.name);
      if (photo) {
        dishes.push(renderPhotoDish(entry, photo));
      } else {
        rows.push(renderMenuRow(entry));
      }
    });
    return '<section class="picture-menu__panel" id="menu-panel-' + slug + '" data-menu-panel aria-label="' + escapeHtml(group.title) + '">' +
      renderMenuCover(group, index) +
      '<div class="picture-menu__items">' +
      (dishes.length ? '<div class="picture-menu__dishes">' + dishes.join('') + '</div>' : '') +
      (rows.length ? '<ul class="picture-menu__list">' + rows.join('') + '</ul>' : '') +
      '</div></section>';
  }).join('');
  return [
    '<section class="picture-menu" id="menu" data-picture-menu>',
    '<div class="brand-heading brand-heading--split"><div><p class="brand-kicker"><span aria-hidden="true"></span>' + escapeHtml(placeName) + ' · The menu</p>',
    '<h2>Pick your <em>plate</em></h2></div>',
    '<p>Every price is in naira. Tap any dish to order it on WhatsApp, or find us on Glovo and Chowdeck.</p></div>',
    '<div class="picture-menu__tabs" hidden>' + tabs + '</div>',
    '<div class="picture-menu__panels">' + panels + '</div>',
    '</section>'
  ].join('');
}

function renderKitchenWall() {
  var frames = catalog.KITCHEN_PLATES.map(function (file) {
    return '<figure><img src="img/Food_Pictures/' + file + '" alt="A plate from the Healthy Meals kitchen" loading="lazy" decoding="async" /></figure>';
  }).join('');
  return '<section class="kitchen-wall" aria-labelledby="kitchen-wall-title">' +
    '<div class="brand-heading"><p class="brand-kicker"><span aria-hidden="true"></span>Real plates, real kitchen</p>' +
    '<h2 id="kitchen-wall-title">More from <em>the kitchen</em></h2></div>' +
    '<div class="kitchen-wall__track">' + frames + '</div></section>';
}

function renderOrderBand(spec) {
  return [
    '<section class="order-band">',
    '<div class="order-band__copy"><p class="brand-kicker brand-kicker--light"><span aria-hidden="true"></span>Hungry now?</p>',
    '<h2>It’s on <em>the way.</em></h2>',
    '<p>Order on WhatsApp, call, or find ' + escapeHtml(spec.shortPlace) + ' on Glovo and Chowdeck. Delivery runs 7am–7:30pm, every day.</p></div>',
    '<div class="order-band__actions">',
    '<a class="order-band__btn" ' + external(catalog.orderHref('something from ' + spec.shortPlace)) + '><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp ' + WHATSAPP_DISPLAY + '</a>',
    '<a class="order-band__btn order-band__btn--outline" href="tel:' + WHATSAPP_DISPLAY + '"><i class="fa fa-phone" aria-hidden="true"></i> Call to order</a>',
    '<a class="order-band__plans" href="./meal-plans.html">Want it every day? See the meal plans <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>',
    '</div></section>'
  ].join('');
}

function renderFoodLead(filename) {
  var spec = foodSpec(filename);
  return [
    renderTicker(spec.ticker),
    renderDishCarousel(spec),
    renderPictureMenu(spec.brand, spec.shortPlace),
    spec.brand === 'meals' ? renderKitchenWall() : '',
    renderOrderBand(spec)
  ].join('\n');
}

function renderSalonHero(filename) {
  var spec = salonSpec(filename);
  var facts = spec.facts.map(function (fact) {
    return '<li><strong>' + escapeHtml(fact[0]) + '</strong><span>' + escapeHtml(fact[1]) + '</span></li>';
  }).join('');
  return [
    '<section class="salon-hero">',
    '<div class="salon-hero__pole" aria-hidden="true"></div>',
    '<div class="salon-hero__copy">',
    '<p class="brand-kicker"><span aria-hidden="true"></span>' + escapeHtml(spec.place) + '</p>',
    '<h1><span>' + escapeHtml(spec.headline[0]) + '</span> <span>' + escapeHtml(spec.headline[1]) + '</span> <em>' + escapeHtml(spec.headline[2]) + '</em></h1>',
    '<p class="salon-hero__lede">' + escapeHtml(spec.lede) + '</p>',
    '<div class="brand-actions"><a class="primary-btn" href="tel:' + SALON_PHONE + '"><i class="fa fa-phone" aria-hidden="true"></i> Call ' + SALON_PHONE + '</a>',
    '<a class="ghost-btn" href="' + spec.servicesHref + '">See the salon</a></div>',
    '<ul class="salon-hero__facts">' + facts + '</ul>',
    '</div>',
    '<div class="salon-hero__frames">',
    '<figure class="arch arch--tall"><img src="' + escapeHtml(spec.frames[0].image) + '" alt="' + escapeHtml(spec.frames[0].alt) + '" /></figure>',
    '<figure class="arch arch--small"><img src="' + escapeHtml(spec.frames[1].image) + '" alt="' + escapeHtml(spec.frames[1].alt) + '" /></figure>',
    '<p class="salon-hero__badge"><span>Walk in</span> or call ahead</p>',
    '</div>',
    '</section>'
  ].join('');
}

function renderSalonVisit(filename) {
  var spec = salonSpec(filename);
  var steps = [
    ['Call or walk in', 'Ring ' + SALON_PHONE + ' to check a good time, or simply stop by.'],
    ['Share the look', 'Bring a photo or an idea, and we shape the style around you.'],
    ['Step out fresh', spec.finish]
  ].map(function (step, index) {
    return '<li><span class="salon-visit__number">0' + (index + 1) + '</span><h3>' + escapeHtml(step[0]) + '</h3><p>' + escapeHtml(step[1]) + '</p></li>';
  }).join('');
  return [
    '<section class="salon-visit" aria-labelledby="salon-visit-title">',
    '<div class="salon-visit__steps"><p class="brand-kicker"><span aria-hidden="true"></span>Your visit</p>',
    '<h2 id="salon-visit-title">Three steps to <em>fresh</em></h2><ol>' + steps + '</ol></div>',
    '<div class="salon-visit__cta"><p class="salon-visit__big">Your chair is <em>waiting.</em></p>',
    '<a class="order-band__btn" href="tel:' + SALON_PHONE + '"><i class="fa fa-phone" aria-hidden="true"></i> Call ' + SALON_PHONE + '</a>',
    '<a class="order-band__btn order-band__btn--outline" ' + external(spec.directions) + '><i class="fa fa-map-marker" aria-hidden="true"></i> Get directions</a>',
    '</div></section>'
  ].join('');
}

var SPA_RITUALS = [
  {
    id: 'face',
    title: 'Face',
    note: 'A clear, calm finish.',
    items: [
      { name: 'Deep cleansing facials', price: 25000 },
      { name: 'Acne facials', price: 15000 },
      { name: 'Hydra facials', price: 12000 }
    ]
  },
  {
    id: 'body',
    title: 'Hands and body',
    word: 'Body',
    note: 'Waxing, plus a neat finish for hands and feet.',
    items: [
      { name: 'Full body waxing', price: 40000 },
      { name: 'Brazilian waxing', price: 20000 },
      { name: 'Bikini waxing', price: 12000 },
      { name: 'Underarm waxing', price: 8000 },
      { name: 'Pedicure', price: 10000 },
      { name: 'Manicure', price: 7000 }
    ]
  },
  {
    id: 'massage',
    title: 'Massage',
    note: 'The longer hours on the menu.',
    items: [
      { name: 'Swedish massage', time: '45–60', price: 25000 },
      { name: 'Deep tissue', time: '45–60', price: 30000 },
      { name: 'Thigh massage', time: '25', price: 15000 },
      { name: 'Hot stone massage', time: '45–60', price: 40000 },
      { name: 'Four hand massage', time: '45–60', price: 45000 }
    ]
  }
];

var SPA_PAGES = {
  'spa-gwarinpa.html': {
    place: 'Ahead Fitness Spa · Gwarinpa',
    shortPlace: 'Ahead Fitness Spa Gwarinpa',
    headline: ['Breathe', 'in.', 'Let go.'],
    lede: 'Facials, massage, waxing, and nail care at 301 Palmall, 4th Avenue, Gwarinpa. Book the hour, and leave the day outside.',
    photo: 'img/Gwarimpa_Spa/GWS1.webp',
    photoAlt: 'Reception at Ahead Fitness Spa Gwarinpa',
    photoPosition: 'center 18%',
    phone: '08025310435',
    phoneLabel: '08025310435',
    facts: [['From ₦7,000', 'Manicures and more'], ['Up to 60 min', 'On the massage menu'], ['301 Palmall', '4th Avenue, Gwarinpa']],
    directionsQuery: '301 Palmall, 4th Ave, Gwarinpa, Abuja',
    ticker: ['Facials', 'Massage', 'Hot stone', 'Waxing', 'Manicure', 'Pedicure', 'Deep tissue']
  },
  'spa-dantata.html': {
    place: 'Ahead Fitness Spa · Dantata',
    shortPlace: 'Ahead Fitness Spa Dantata',
    headline: ['The city', 'stays', 'outside.'],
    lede: 'A quiet treatment room opposite Dantata Estate in Kubwa. Facials, massage, waxing, and nails, booked on WhatsApp.',
    photo: 'img/Dantata_Spa/DTS3.webp',
    photoAlt: 'Massage bed at Ahead Fitness Spa Dantata',
    photoPosition: 'center',
    whatsapp: '2348160701693',
    phoneLabel: '08160701693',
    facts: [['From ₦7,000', 'Hands, face, and body'], ['WhatsApp', '08160701693'], ['Dantata Estate', 'Kubwa, Abuja']],
    directionsQuery: 'Eminond Plaza, Byazhin Road, opposite Dantata Estate, Kubwa, Abuja',
    ticker: ['Facials', 'Massage', 'Hot stone', 'Waxing', 'Manicure', 'Pedicure', 'Deep tissue']
  },
  'spa-karu.html': {
    place: 'Ahead Fitness Spa · Karu',
    shortPlace: 'Ahead Fitness Spa Karu',
    headline: ['One hour.', 'Nothing', 'else.'],
    lede: 'Treatment rooms on George Akume Way, Karu. Facials, massage, waxing, and nails, with an hour that belongs to you.',
    photo: 'img/Spa_Karu/KRS1.webp',
    photoAlt: 'Treatment room at Ahead Fitness Spa Karu',
    photoPosition: 'center',
    whatsapp: '2349135825499',
    phoneLabel: '09135825499',
    facts: [['From ₦12,000', 'Facials'], ['Up to 60 min', 'On the massage menu'], ['Akume Way', 'Karu, Abuja']],
    directionsQuery: '2 George Akume Way, Karu, Abuja',
    ticker: ['Facials', 'Massage', 'Hot stone', 'Waxing', 'Manicure', 'Pedicure', 'Deep tissue']
  }
};

function spaSpec(filename) {
  var spec = SPA_PAGES[filename];
  if (!spec) {
    throw new Error('No spa page design for ' + filename);
  }
  return spec;
}

function mapsHref(query) {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(query);
}

function bookHref(spec, treatmentName) {
  if (spec.whatsapp) {
    return 'https://wa.me/' + spec.whatsapp + '?text=' + encodeURIComponent(
      'Hello Ahead Fitness, I would like to book ' + treatmentName + ' at ' + spec.shortPlace + '.'
    );
  }
  if (!spec.phone) {
    throw new Error(spec.shortPlace + ' has no booking number');
  }
  return 'tel:' + spec.phone;
}

function bookAnchor(spec, treatmentName, className) {
  var href = bookHref(spec, treatmentName);
  var label = spec.whatsapp ? 'Book' : 'Call';
  var icon = spec.whatsapp ? 'fa-whatsapp' : 'fa-phone';
  var attrs = href.indexOf('tel:') === 0 ? 'href="' + escapeHtml(href) + '"' : external(href);
  return '<a class="' + className + '" ' + attrs + ' aria-label="' + escapeHtml(label + ' to book ' + treatmentName) +
    '"><i class="fa ' + icon + '" aria-hidden="true"></i> ' + label + '</a>';
}

function renderSpaHero(filename) {
  var spec = spaSpec(filename);
  var facts = spec.facts.map(function (fact) {
    return '<li><strong>' + escapeHtml(fact[0]) + '</strong><span>' + escapeHtml(fact[1]) + '</span></li>';
  }).join('');
  var book = spec.whatsapp
    ? '<a class="ghost-btn" ' + external(bookHref(spec, 'a spa treatment')) + '><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp ' + escapeHtml(spec.phoneLabel) + '</a>'
    : '<a class="ghost-btn" href="tel:' + escapeHtml(spec.phone) + '"><i class="fa fa-phone" aria-hidden="true"></i> Call ' + escapeHtml(spec.phoneLabel) + '</a>';
  return [
    '<section class="spa-hero">',
    '<div class="spa-hero__copy">',
    '<p class="brand-kicker"><span aria-hidden="true"></span>' + escapeHtml(spec.place) + '</p>',
    '<h1><span>' + escapeHtml(spec.headline[0]) + '</span> <span>' + escapeHtml(spec.headline[1]) + '</span> <em>' + escapeHtml(spec.headline[2]) + '</em></h1>',
    '<p class="spa-hero__lede">' + escapeHtml(spec.lede) + '</p>',
    '<div class="brand-actions"><a class="primary-btn" href="#pricing">See the ritual</a>' + book + '</div>',
    '<ul class="spa-hero__facts">' + facts + '</ul>',
    '</div>',
    '<div class="spa-hero__ripple">',
    '<span class="spa-ring" aria-hidden="true"></span><span class="spa-ring" aria-hidden="true"></span><span class="spa-ring" aria-hidden="true"></span>',
    '<figure class="spa-hero__photo"><img src="' + escapeHtml(spec.photo) + '" alt="' + escapeHtml(spec.photoAlt) + '" style="object-position:' + escapeHtml(spec.photoPosition) + '" /></figure>',
    '<p class="spa-hero__seal"><span>Book</span> the hour</p>',
    '</div>',
    '</section>'
  ].join('');
}

function renderSpaFilms() {
  var clips = [
    ['videos/SV1.mp4', 'img/hero/spa2.jpg', 'A look inside Ahead Fitness Spa'],
    ['videos/SV2.mp4', 'img/hero/spa3.jpg', 'Another look inside Ahead Fitness Spa']
  ].map(function (clip) {
    return '<figure><video controls preload="none" poster="' + clip[1] + '" aria-label="' + escapeHtml(clip[2]) + '">' +
      '<source src="' + clip[0] + '" type="video/mp4" />Your browser does not support the video tag.</video>' +
      '<figcaption>' + escapeHtml(clip[2]) + '</figcaption></figure>';
  }).join('');
  return [
    '<section class="spa-films" id="about" aria-labelledby="spa-films-title">',
    '<div class="brand-heading"><p class="brand-kicker"><span aria-hidden="true"></span>Before you book</p>',
    '<h2 id="spa-films-title">See the <em>room</em></h2></div>',
    '<div class="spa-films__pair">' + clips + '</div>',
    '</section>'
  ].join('');
}

function renderRitualRow(spec, item, index) {
  var mark = item.time
    ? '<p class="ritual-row__time">' + escapeHtml(item.time) + '<span>min</span></p>'
    : '<p class="ritual-row__index">' + String(index + 1).padStart(2, '0') + '</p>';
  return '<li class="ritual-row">' + mark +
    '<h3>' + escapeHtml(item.name) + '</h3>' +
    '<strong>' + catalog.formatNaira(item.price) + '</strong>' +
    bookAnchor(spec, item.name, 'ritual-row__book') + '</li>';
}

function renderSpaRitual(filename) {
  var spec = spaSpec(filename);
  if (!SPA_RITUALS.length) {
    throw new Error('Spa rituals are empty');
  }
  var jumps = SPA_RITUALS.map(function (group) {
    return '<a href="#ritual-' + group.id + '">' + escapeHtml(group.title) + '</a>';
  }).join('');
  var chapters = SPA_RITUALS.map(function (group) {
    if (!group.items.length) {
      throw new Error('Spa group has no treatments: ' + group.title);
    }
    var rows = group.items.map(function (item, index) {
      if (!item.name || typeof item.price !== 'number' || item.price <= 0) {
        throw new Error('Invalid spa treatment: ' + item.name);
      }
      return renderRitualRow(spec, item, index);
    }).join('');
    var display = group.word || group.title;
    var heading = display === group.title
      ? '<h3 id="ritual-title-' + group.id + '" class="spa-chapter__word">' + escapeHtml(group.title) + '</h3>'
      : '<p class="spa-chapter__word" aria-hidden="true">' + escapeHtml(display) + '</p>' +
        '<h3 id="ritual-title-' + group.id + '">' + escapeHtml(group.title) + '</h3>';
    return '<section class="spa-chapter" id="ritual-' + group.id + '" aria-labelledby="ritual-title-' + group.id + '">' +
      '<header class="spa-chapter__label">' + heading + '<p>' + escapeHtml(group.note) + '</p></header>' +
      '<ol class="spa-chapter__list">' + rows + '</ol></section>';
  }).join('');
  var bandBook = spec.whatsapp
    ? '<a class="order-band__btn" ' + external(bookHref(spec, 'a spa treatment')) + '><i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp ' + escapeHtml(spec.phoneLabel) + '</a>'
    : '<a class="order-band__btn" href="tel:' + escapeHtml(spec.phone) + '"><i class="fa fa-phone" aria-hidden="true"></i> Call ' + escapeHtml(spec.phoneLabel) + '</a>';
  return [
    '<section class="spa-ritual" id="pricing">',
    '<div class="brand-heading brand-heading--split"><div><p class="brand-kicker"><span aria-hidden="true"></span>' + escapeHtml(spec.shortPlace) + '</p>',
    '<h2>Choose the <em>hour</em></h2></div>',
    '<nav class="spa-jump" aria-label="Treatments">' + jumps + '</nav></div>',
    chapters,
    '</section>',
    '<section class="spa-book">',
    '<p class="spa-book__line">The table is <em>ready.</em></p>',
    '<div class="spa-book__actions">' + bandBook +
    '<a class="order-band__btn order-band__btn--outline" ' + external(mapsHref(spec.directionsQuery)) + '><i class="fa fa-map-marker" aria-hidden="true"></i> Get directions</a>',
    '</div></section>'
  ].join('');
}

function menuSearchSections(filename, brand, placeName) {
  return catalog.MENUS[brand].map(function (group) {
    var lines = group.items.map(function (item) {
      return [item.name, catalog.formatNaira(item.price), item.detail].filter(Boolean).join(' · ');
    });
    return {
      title: placeName + ' · ' + group.title,
      href: filename + '#menu-panel-' + slugify(group.title),
      text: (group.note ? group.note + ' ' : '') + lines.join('. ')
    };
  });
}

function withMenuSearch(entry) {
  var spec = FOOD_PAGES[entry && entry.href];
  if (!spec) {
    return entry;
  }
  var sections = menuSearchSections(entry.href, spec.brand, spec.shortPlace);
  var menuText = sections.map(function (section) {
    return section.title + '. ' + section.text;
  }).join(' ');
  var baseText = String(entry.text || '').replace(/\s*Menu:[\s\S]*$/, '');
  var kept = (entry.sections || []).filter(function (section) {
    return String(section.href).indexOf('#menu-panel-') === -1;
  });
  return {
    title: entry.title,
    href: entry.href,
    text: (baseText + ' Menu: ' + menuText).replace(/\s+/g, ' ').trim(),
    sections: kept.concat(sections)
  };
}

module.exports = {
  FOOD_PAGES: FOOD_PAGES,
  SALON_PAGES: SALON_PAGES,
  SPA_PAGES: SPA_PAGES,
  SPA_RITUALS: SPA_RITUALS,
  slugify: slugify,
  withMenuSearch: withMenuSearch,
  renderTicker: renderTicker,
  renderKitchenHero: function (filename) {
    return renderKitchenHero(foodSpec(filename));
  },
  renderFoodLead: renderFoodLead,
  renderPictureMenu: renderPictureMenu,
  renderSalonHero: renderSalonHero,
  renderSalonVisit: renderSalonVisit,
  renderSpaHero: renderSpaHero,
  renderSpaFilms: renderSpaFilms,
  renderSpaRitual: renderSpaRitual
};
