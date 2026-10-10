'use strict';

var WHATSAPP = '2348066203522';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatNaira(amount) {
  return '₦' + String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function orderHref(dishName) {
  return 'https://wa.me/' + WHATSAPP + '?text=' +
    encodeURIComponent('Hello Ahead Fitness, I would like to order ' + dishName + '.');
}

function subscribeHref(planName) {
  return 'https://wa.me/' + WHATSAPP + '?text=' +
    encodeURIComponent('Hello Ahead Fitness, I would like to subscribe to ' + planName + '.');
}

function item(name, price, best) {
  return { name: name, price: price, best: Boolean(best) };
}

function cover(file, alt) {
  return { image: 'img/Food_Pictures/' + file, alt: alt };
}

var DRINKS = [
  {
    title: 'Smoothies',
    cover: cover('FD3.webp', 'Tropical Blast smoothie'),
    items: [
      item('Flat Tummy Flush', 3000),
      item('Tropical Blast', 3000),
      item('Beet Berry Boost', 3000),
      item('Pineapple & Orange', 3000),
      item('Watermelon Mix', 3000),
      item('Banana Yoghurt Smoothie', 3000, true),
      item('Pineapple Yoghurt Smoothie', 3000),
      item('Pineapple Energy Rush', 3000),
      item('Power Booster', 4000, true)
    ]
  },
  {
    title: 'Fresh juices',
    cover: cover('FD8.webp', 'Yoghurt Fura'),
    items: [
      item('Zobo', 2000),
      item('Orange Juice', 3000),
      item('Watermelon Juice', 3000),
      item('Beetroot Juice', 3000),
      item('Pineapple Juice', 3000),
      item('Cucumber Mix', 3000),
      item('Mixed Juice', 3000),
      item('Watermelon, Pineapple & Orange', 3000),
      item('Orange, Pineapple & Ginger', 3000),
      item('Tigernut, Coconut, Date & Ginger', 3000),
      item('Yoghurt', 3500),
      item('Yoghurt Fura', 4000),
      item('Yoghurt Coconut', 4000)
    ]
  }
];

var MENUS = {
  meals: [
    {
      title: 'Breakfast',
      cover: cover('FD27.webp', 'Avocado and egg sandwich'),
      items: [
        item('Scrambled Eggs with Veggies', 5000),
        item('Omelette', 6000),
        item('Protein Pancake', 6000),
        item('Chicken Sandwich', 4000, true),
        item('Chicken Wrap', 8000),
        item('Turkey Sandwich', 6000),
        item('Tuna Sandwich', 6500),
        item('Egg Sandwich', 4000),
        item('Avocado & Egg Sandwich', 5000)
      ]
    },
    {
      title: 'Salads',
      cover: cover('FD23.webp', 'Green salad'),
      items: [
        item('Grilled Chicken Salad', 9000),
        item('Chicken Salad', 6000, true),
        item('Ahead Combo Salad', 9000, true),
        item('Grilled Fish Salad', 9000),
        item('Tuna Salad', 7500),
        item('Thai Beef Salad', 7500),
        item('Egg & Veggies Salad', 7500),
        item('Greek Salad', 7500)
      ]
    },
    {
      title: 'Mains',
      cover: cover('FD26.webp', 'Jollof rice with chicken'),
      items: [
        item('Chicken Stir Fry', 10000),
        item('Quinoa Stir Fry', 12500),
        item('Stir Fried Basmati Rice', 10000),
        item('Chicken Platter', 10000),
        item('Brown Basmati Rice Jollof', 10000),
        item('Ahead Protein Rice', 10000),
        item('Fried Rice & Mixed Veggies', 12000),
        item('Ofada Rice & Vegetable Sauce', 12000),
        item('Boiled Plantain & Veggie Sauce', 9500, true),
        item('Boiled Plantain & Egg Sauce', 9000, true),
        item('Plantain Porridge', 10000),
        item('Sweet Potato Porridge', 7000, true),
        item('Boiled Sweet Potatoes & Vegetable Sauce', 9000)
      ]
    },
    {
      title: 'Sides',
      items: [
        item('Plantain', 1000),
        item('Sweet Potatoes', 1000),
        item('Irish Potatoes', 2000),
        item('Basmati Rice', 2000),
        item('Brown Rice', 2000)
      ]
    },
    {
      title: 'Shawarma',
      items: [
        item('Chicken Shawarma', 4000),
        item('Chicken Shawarma + 1 Sausage', 4500),
        item('Chicken Shawarma + 2 Sausage', 5000),
        item('Beef Shawarma', 4000),
        item('Beef Shawarma + 1 Sausage', 4500),
        item('Beef Shawarma + 2 Sausage', 5000),
        item('Combo Shawarma', 5000),
        item('Combo Shawarma + 1 Sausage', 5500),
        item('Extra Chicken or Beef', 1000),
        item('Extra Sausage', 500)
      ]
    }
  ].concat(DRINKS).concat([
    {
      title: 'Combos',
      items: [
        item('Quick Bite Combo', 6500),
        item('Protein Boost Combo', 8500),
        item('Power Lunch Combo', 11500),
        item('Buddy Combo', 16000)
      ]
    }
  ]),
  grills: [
    {
      title: 'Chicken & turkey',
      note: 'Comes with 1 companion of your choice.',
      items: [
        item('Chicken Medium', 8500, true),
        item('Chicken Big', 10000),
        item('Turkey', 10000),
        item('Peppered Gizzard', 6000),
        item('Peppered Snail', 15000)
      ]
    },
    {
      title: 'Grilled fish',
      note: 'Comes with 1 companion of your choice.',
      cover: cover('FD19.webp', 'Grilled fish with quinoa and broccoli'),
      items: [
        item('Catfish Medium', 10000, true),
        item('Catfish Big', 15000),
        item('Tilapia Medium', 10000),
        item('Tilapia Big', 12000),
        item('Croaker Medium', 12000),
        item('Croaker Big', 14000)
      ]
    },
    {
      title: 'Companions',
      items: [
        item('Sweet Potato Chips', 1000, true),
        item('Yam Chips', 1000),
        item('Fried Plantain', 1000),
        item('Bole', 1000),
        item('Extra Sauce', 1000),
        item('French Fries', 2000),
        item('Coleslaw', 2000)
      ]
    },
    {
      title: 'Platters',
      items: [
        item('Side Chick', 15500),
        item('Side Turks', 18000),
        item('Full Chicken', 17000),
        item('Ahead Classic', 32000),
        item('Family Combo', 62000)
      ]
    },
    {
      title: 'Shawarma',
      items: [
        item('Chicken Shawarma', 4000, true),
        item('Chicken Shawarma + 1 Sausage', 4500),
        item('Chicken Shawarma + 2 Sausage', 5000),
        item('Beef Shawarma', 4000),
        item('Beef Shawarma + 1 Sausage', 4500),
        item('Beef Shawarma + 2 Sausage', 5000),
        item('Combo Shawarma', 5000),
        item('Combo Shawarma + 1 Sausage', 5500),
        item('Combo Shawarma + 2 Sausage', 6000),
        item('Extra Chicken or Beef', 1000),
        item('Extra Sausage', 500)
      ]
    }
  ].concat(DRINKS)
};

function slide(image, name, price, detail, brands, priceLabel) {
  return {
    image: image,
    name: name,
    price: price,
    priceLabel: priceLabel || formatNaira(price),
    detail: detail,
    brands: brands
  };
}

var DISH_SLIDES = [
  slide('img/Food_Pictures/FD14.webp', 'Grilled Chicken Salad', 9000, '47g protein', ['meals']),
  slide('img/Food_Pictures/FD15.webp', 'Chicken Salad', 6000, 'Best seller · 47g protein', ['meals']),
  slide('img/Food_Pictures/FD19.webp', 'Grilled fish', 10000, 'Catfish, tilapia, or croaker', ['meals', 'grills'], 'From ₦10,000'),
  slide('img/Food_Pictures/FD16.webp', 'Boiled Plantain & Veggie Sauce', 9500, 'Best seller', ['meals']),
  slide('img/Food_Pictures/FD20.webp', 'Fried Rice & Mixed Veggies', 12000, '53g protein', ['meals']),
  slide('img/Food_Pictures/FD12.webp', 'Chicken Stir Fry', 10000, '41g protein', ['meals']),
  slide('img/Food_Pictures/FD27.webp', 'Avocado & Egg Sandwich', 5000, '21g protein', ['meals']),
  slide('img/Food_Pictures/FD10.webp', 'Scrambled Eggs with Veggies', 5000, '15g protein', ['meals']),
  slide('img/Food_Pictures/FD30.webp', 'Boiled Sweet Potatoes & Vegetable Sauce', 9000, '48g protein', ['meals']),
  slide('img/Food_Pictures/FD5.webp', 'Banana Yoghurt Smoothie', 3000, 'Best seller', ['meals', 'grills']),
  slide('img/Food_Pictures/FD13.webp', 'Power Booster', 4000, 'Best seller · 21g protein', ['meals', 'grills']),
  slide('img/Food_Pictures/FD1.webp', 'Beet Berry Boost', 3000, '422 cal', ['meals', 'grills']),
  slide('img/Food_Pictures/FD3.webp', 'Tropical Blast', 3000, '450 cal', ['meals', 'grills']),
  slide('img/Food_Pictures/FD2.webp', 'Flat Tummy Flush', 3000, '91 cal', ['meals', 'grills']),
  slide('img/Food_Pictures/FD9.webp', 'Pineapple Yoghurt Smoothie', 3000, '10g protein', ['meals', 'grills']),
  slide('img/Food_Pictures/FD18.webp', 'Pineapple Energy Rush', 3000, 'Pre-workout', ['meals', 'grills']),
  slide('img/Food_Pictures/FD21.webp', 'Watermelon Mix', 3000, '478 cal', ['meals', 'grills']),
  slide('img/Food_Pictures/FD7.webp', 'Yoghurt Coconut', 4000, '35cl', ['meals', 'grills']),
  slide('img/Food_Pictures/FD8.webp', 'Yoghurt Fura', 4000, '35cl', ['meals', 'grills'])
];

var KITCHEN_PLATES = [
  'FD4.webp', 'FD11.webp', 'FD17.webp', 'FD22.webp', 'FD23.webp', 'FD24.webp', 'FD25.webp', 'FD26.webp'
];

var PLANS = {
  build: {
    name: 'The Build Plan',
    aim: 'Muscle and protein',
    twoWeek: 290000,
    fourWeek: 550000,
    signal: 'About 121g protein a day, a daily whey shake, and 12 grill nights in 4 weeks.',
    estimate: 'Muscle change is gradual and is tracked on a re-scan.',
    recommend: 'Recommended when a BIA scan flags low muscle or low protein.',
    week: [
      ['Mon', 'Sweet Potato Porridge', 'Grilled Chicken Salad'],
      ['Tue', 'Turkey Sandwich', 'Grilled Catfish'],
      ['Wed', 'Chicken Sandwich', 'Chicken Stir Fry'],
      ['Thu', 'Tuna Sandwich', 'Grilled Tilapia'],
      ['Fri', 'Chicken Wrap', 'Quinoa Stir Fry'],
      ['Sat', 'Avocado & Egg Sandwich', 'Grilled Turkey']
    ]
  },
  lean: {
    name: 'The Lean Plan',
    aim: 'Weight loss and fat reduction',
    twoWeek: 270000,
    fourWeek: 530000,
    signal: 'About 1,272 calories a day.',
    estimate: 'About 1.9kg in 2 weeks, about 3.8kg in 4 weeks, from diet alone.',
    recommend: 'Recommended when a scan flags high fat, excess visceral fat, or a high metabolic-age gap.',
    week: [
      ['Mon', 'Scrambled Eggs & Veggies', 'Plantain Porridge'],
      ['Tue', 'Quinoa Stir Fry', 'Grilled Catfish'],
      ['Wed', 'Omelette', 'Ofada Rice & Veg Sauce'],
      ['Thu', 'Chicken Sandwich', 'Grilled Tilapia'],
      ['Fri', 'Chicken Wrap', 'Grilled Fish Salad'],
      ['Sat', 'Protein Pancake', 'Grilled Turkey']
    ]
  }
};

function slidesFor(brand) {
  return DISH_SLIDES.filter(function (entry) {
    return entry.brands.indexOf(brand) !== -1;
  });
}

function assertBrand(brand) {
  if (!Object.prototype.hasOwnProperty.call(MENUS, brand)) {
    throw new Error('Unknown food brand: ' + brand);
  }
}

function photoFor(brand, dishName) {
  assertBrand(brand);
  var match = slidesFor(brand).filter(function (entry) {
    return entry.name === dishName;
  })[0];
  return match || null;
}

function renderWorlds() {
  return [
    '<section class="worlds-section" id="worlds" aria-label="Ahead Fitness worlds">',
    '<a class="world-tile world-tile--train" href="./danglo-plaza.html">',
    '<img src="img/hero/hero-1.jpg" alt="" />',
    '<span class="world-tile__copy"><small>Train</small><strong>The gyms</strong><em>Five floors across Abuja</em></span></a>',
    '<div class="world-tile world-tile--eat">',
    '<img src="img/Food_Pictures/FD14.webp" alt="" />',
    '<div class="world-tile__copy"><small>Eat</small><strong>Food worth coming back for</strong>',
    '<span class="world-tile__links">',
    '<a href="./healthy-meals-kubwa.html">Healthy Meals Kubwa</a>',
    '<a href="./healthy-meals-karu.html">Healthy Meals Karu</a>',
    '<a href="./ahead-fitness-grills-karu.html">Ahead Grills</a>',
    '<a href="./meal-plans.html">Meal Plans</a>',
    '</span></div></div>',
    '<a class="world-tile world-tile--restore" href="./spa-gwarinpa.html">',
    '<img src="img/Gwarimpa_Spa/GWS1.webp" alt="" />',
    '<span class="world-tile__copy"><small>Restore</small><strong>Spa and salon</strong><em>Slow down, then step out</em></span></a>',
    '</section>'
  ].join('');
}

function renderPlanCard(plan) {
  return [
    '<article class="plan-card plan-card--' + (plan.name.indexOf('Build') !== -1 ? 'build' : 'lean') + '">',
    '<p class="plan-card__aim">' + escapeHtml(plan.aim) + '</p>',
    '<h2>' + escapeHtml(plan.name) + '</h2>',
    '<p>' + escapeHtml(plan.signal) + '</p>',
    '<p>' + escapeHtml(plan.estimate) + '</p>',
    '<p>' + escapeHtml(plan.recommend) + '</p>',
    '<ul class="plan-card__prices">',
    '<li><span>2 weeks</span><strong>' + formatNaira(plan.twoWeek) + '</strong></li>',
    '<li><span>4 weeks</span><strong>' + formatNaira(plan.fourWeek) + '</strong></li>',
    '</ul>',
    '<p class="plan-card__rhythm">2 meals + 2 drinks, 6 days a week, Monday–Saturday.</p>',
    '<a class="primary-btn" href="' + escapeHtml(subscribeHref(plan.name)) + '" target="_blank" rel="noopener noreferrer">Subscribe on WhatsApp</a>',
    '</article>'
  ].join('');
}

function renderWeek(plan) {
  var rows = plan.week.map(function (day) {
    return '<tr><th scope="row">' + day[0] + '</th><td>' + escapeHtml(day[1]) + '</td><td>' + escapeHtml(day[2]) + '</td></tr>';
  }).join('');
  return '<section class="plan-week"><h3>' + escapeHtml(plan.name) + ' · Week 1</h3>' +
    '<table><thead><tr><th scope="col">Day</th><th scope="col">Breakfast</th><th scope="col">Dinner</th></tr></thead><tbody>' +
    rows + '</tbody></table></section>';
}

function renderMealPlansMain() {
  return [
    '<section class="plan-hero">',
    '<p class="plan-hero__kicker">Ahead Fitness · Healthy Bites</p>',
    '<h1>Meals that follow the goal.</h1>',
    '<p>Subscribe, tell us where you are, and we deliver. Two meals and two drinks, six days a week, Monday to Saturday.</p>',
    '</section>',
    '<section class="plan-grid" id="plans">' + renderPlanCard(PLANS.build) + renderPlanCard(PLANS.lean) + '</section>',
    '<section class="plan-steps"><h2>How it works</h2><ol>',
    '<li>Choose the 2-week or 4-week plan. Plans start on Monday. Pay by the Sunday before.</li>',
    '<li>Send a delivery address and a good time. Delivery is home, office, or gym.</li>',
    '<li>Meals and drinks arrive together, six days a week.</li>',
    '<li>Re-scan on the Bio Impedance Analyser at any Ahead Fitness location every 2–4 weeks.</li>',
    '</ol>',
    '<p>You can pause for up to 5 days in a plan period, with at least 24 hours’ notice. Paused days are added to the end. Results vary, and training at Ahead Fitness is what these plans are built to sit beside.</p>',
    '<p>Call <a href="tel:08066203522">08066203522</a> or subscribe on WhatsApp.</p>',
    '</section>',
    '<section class="plan-weeks" aria-label="Sample weeks">' + renderWeek(PLANS.build) + renderWeek(PLANS.lean) + '</section>'
  ].join('');
}

module.exports = {
  MENUS: MENUS,
  DISH_SLIDES: DISH_SLIDES,
  PLANS: PLANS,
  formatNaira: formatNaira,
  slidesFor: slidesFor,
  KITCHEN_PLATES: KITCHEN_PLATES,
  escapeHtml: escapeHtml,
  orderHref: orderHref,
  assertBrand: assertBrand,
  photoFor: photoFor,
  renderWorlds: renderWorlds,
  renderMealPlansMain: renderMealPlansMain,
  subscribeHref: subscribeHref
};
