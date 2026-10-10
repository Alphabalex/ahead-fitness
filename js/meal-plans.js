'use strict';

var catalog = require('./food-catalog');

var escapeHtml = catalog.escapeHtml;
var formatNaira = catalog.formatNaira;

var PHONE = '08066203522';
var DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var DAY_NAMES = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };
// The Lean flyer measures every day against a 2,500 kcal baseline and 7,700 kcal per kg of fat.
var LEAN_BASELINE_KCAL = 2500;
var KCAL_PER_KG = 7700;
var BUILD_PROTEIN_TARGET = 120;
var WHEY = 'Whey Protein Shake';

// Drink values are calories on the Lean flyer and grams of protein on the Build flyer.
function meal(name, cal, protein, drink, drinkValue, grill) {
  return { name: name, cal: cal, protein: protein, drink: drink, drinkValue: drinkValue, grill: Boolean(grill) };
}

function day(breakfast, dinner) {
  return { breakfast: breakfast, dinner: dinner };
}

var ROTATIONS = {
  lean: [
    [
      day(meal('Scrambled Eggs & Veggies', 150, 13, 'Zobo', 28), meal('Plantain Porridge', 1121, 98, 'Flat Tummy Flush', 64)),
      day(meal('Quinoa Stir Fry', 620, 61, 'Orange Juice', 120), meal('Grilled Catfish (Medium)', 339, 38, 'Beetroot Juice', 75, true)),
      day(meal('Omelette', 255, 22, 'Cucumber Mix', 30), meal('Ofada Rice & Veg Sauce', 1155, 69, 'Watermelon Juice', 80)),
      day(meal('Chicken Sandwich', 420, 40, 'Pineapple Juice', 100), meal('Grilled Tilapia (Big)', 443, 50, 'Pineapple Energy Rush', 134, true)),
      day(meal('Chicken Wrap', 598, 28, 'Watermelon, Pine & Orange', 110), meal('Grilled Fish Salad', 515, 32, 'Beet Berry Boost', 295)),
      day(meal('Protein Pancake', 480, 18, 'Orange, Pine & Ginger', 105), meal('Grilled Turkey (Big)', 403, 45, 'Yoghurt Coconut', 140, true))
    ],
    [
      day(meal('Scrambled Eggs & Veggies', 150, 13, 'Flat Tummy Flush', 64), meal('Fried Rice & Mixed Veggies', 1211, 53, 'Zobo', 28)),
      day(meal('Avocado & Egg Sandwich', 544, 21, 'Yoghurt Fura', 120), meal('Grilled Croaker (Medium)', 400, 30, 'Pineapple Juice', 100, true)),
      day(meal('Egg Sandwich', 383, 19, 'Beetroot Juice', 75), meal('Brown Basmati Jollof', 605, 34, 'Pineapple Yoghurt', 207)),
      day(meal('Turkey Sandwich', 501, 25, 'Mixed Juice', 90), meal('Grilled Chicken (Medium)', 400, 30, 'Watermelon Mix', 335, true)),
      day(meal('Tuna Sandwich', 400, 33, 'Tigernut, Coconut, Date & Ginger', 180), meal('Chicken Salad', 324, 47, 'Tropical Blast', 315)),
      day(meal('Chicken Wrap', 598, 28, 'Yoghurt Coconut', 140), meal('Peppered Gizzard', 284, 20, 'Banana Yoghurt', 95, true))
    ],
    [
      day(meal('Scrambled Eggs & Veggies', 150, 13, 'Zobo', 28), meal('Ahead Protein Rice', 1209, 60, 'Flat Tummy Flush', 64)),
      day(meal('Chicken Sandwich', 420, 40, 'Pineapple Energy Rush', 134), meal('Grilled Turkey (Big)', 403, 45, 'Watermelon Juice', 80, true)),
      day(meal('Tuna Sandwich', 400, 33, 'Watermelon, Pine & Orange', 110), meal('Boiled Sweet Potatoes & Veg Sauce', 1000, 48, 'Beetroot Juice', 75)),
      day(meal('Avocado & Egg Sandwich', 544, 21, 'Orange, Pine & Ginger', 105), meal('Grilled Catfish (Big)', 478, 52, 'Cucumber Mix', 30, true)),
      day(meal('Protein Pancake', 480, 18, 'Yoghurt Fura', 120), meal('Chicken Stir Fry', 735, 41, 'Pineapple Yoghurt', 207)),
      day(meal('Quinoa Stir Fry', 620, 61, 'Yoghurt', 95), meal('Peppered Snail', 313, 22, 'Tigernut, Coconut, Date & Ginger', 180, true))
    ],
    [
      day(meal('Omelette', 255, 22, 'Flat Tummy Flush', 64), meal('Stir Fried Basmati Rice', 973, 50, 'Zobo', 28)),
      day(meal('Turkey Sandwich', 501, 25, 'Orange Juice', 120), meal('Grilled Croaker (Big)', 463, 52, 'Beetroot Juice', 75, true)),
      day(meal('Scrambled Eggs & Veggies', 150, 13, 'Pineapple Juice', 100), meal('Thai Beef Salad', 710, 52, 'Beet Berry Boost', 295)),
      day(meal('Quinoa Stir Fry', 620, 61, 'Mixed Juice', 90), meal('Grilled Tilapia (Big)', 443, 50, 'Pineapple Energy Rush', 134, true)),
      day(meal('Avocado & Egg Sandwich', 544, 21, 'Yoghurt Coconut', 140), meal('Ahead Combo Salad', 480, 52, 'Banana Yoghurt', 95)),
      day(meal('Tuna Sandwich', 400, 33, 'Tigernut, Coconut, Date & Ginger', 180), meal('Grilled Chicken (Big)', 433, 50, 'Watermelon Mix', 335, true))
    ]
  ],
  build: [
    [
      day(meal('Sweet Potato Porridge', 938, 60, 'Power Booster', 21), meal('Grilled Chicken Salad', 362, 47, WHEY, 30)),
      day(meal('Turkey Sandwich', 501, 25, WHEY, 30), meal('Grilled Catfish (Big)', 478, 52, 'Pineapple & Orange', 0, true)),
      day(meal('Chicken Sandwich', 420, 40, 'Tropical Blast', 0), meal('Chicken Stir Fry', 735, 41, WHEY, 30)),
      day(meal('Tuna Sandwich', 400, 33, 'Tigernut, Coconut, Date & Ginger', 3), meal('Grilled Tilapia (Big)', 443, 50, WHEY, 30, true)),
      day(meal('Chicken Wrap', 598, 28, 'Pineapple Yoghurt', 7), meal('Quinoa Stir Fry', 620, 61, WHEY, 30)),
      day(meal('Avocado & Egg Sandwich', 544, 21, WHEY, 30), meal('Grilled Turkey (Big)', 403, 45, 'Yoghurt Coconut', 5, true))
    ],
    [
      day(meal('Sweet Potato Porridge', 938, 60, 'Pineapple & Orange', 0), meal('Ahead Combo Salad', 480, 52, WHEY, 30)),
      day(meal('Chicken Sandwich', 420, 40, 'Tropical Blast', 0), meal('Grilled Croaker (Big)', 463, 52, WHEY, 30, true)),
      day(meal('Avocado & Egg Sandwich', 544, 21, 'Yoghurt Fura', 5), meal('Plantain Porridge', 1121, 98, WHEY, 30)),
      day(meal('Turkey Sandwich', 501, 25, 'Pineapple Juice', 0), meal('Grilled Chicken (Full)', 433, 50, WHEY, 30, true)),
      day(meal('Chicken Wrap', 598, 28, WHEY, 30), meal('Thai Beef Salad', 710, 52, 'Pineapple Yoghurt', 7)),
      day(meal('Egg Sandwich', 383, 19, 'Yoghurt Coconut', 5), meal('Grilled Catfish (Big)', 478, 52, WHEY, 30, true))
    ],
    [
      day(meal('Sweet Potato Porridge', 938, 60, 'Power Booster', 21), meal('Stir Fried Basmati Rice', 973, 50, WHEY, 30)),
      day(meal('Chicken Wrap', 598, 28, 'Banana Yoghurt', 8), meal('Grilled Croaker (Big)', 463, 52, WHEY, 30, true)),
      day(meal('Turkey Sandwich', 501, 25, WHEY, 30), meal('Ahead Combo Salad', 480, 52, 'Tropical Blast', 0)),
      day(meal('Tuna Sandwich', 400, 33, 'Tigernut, Coconut, Date & Ginger', 3), meal('Grilled Tilapia (Big)', 443, 50, WHEY, 30, true)),
      day(meal('Avocado & Egg Sandwich', 544, 21, 'Yoghurt Fura', 5), meal('Quinoa Stir Fry', 620, 61, WHEY, 30)),
      day(meal('Chicken Sandwich', 420, 40, 'Pineapple Yoghurt', 7), meal('Grilled Turkey (Big)', 403, 45, WHEY, 30, true))
    ],
    [
      day(meal('Sweet Potato Porridge', 938, 60, 'Pineapple & Orange', 0), meal('Brown Basmati Jollof', 605, 34, WHEY, 30)),
      day(meal('Chicken Wrap', 598, 28, 'Watermelon Mix', 0), meal('Grilled Chicken (Big)', 433, 50, WHEY, 30, true)),
      day(meal('Avocado & Egg Sandwich', 544, 21, 'Orange, Pine & Ginger', 0), meal('Ahead Combo Salad', 480, 52, WHEY, 30)),
      day(meal('Turkey Sandwich', 501, 25, 'Pineapple Energy Rush', 0), meal('Grilled Catfish (Big)', 478, 52, WHEY, 30, true)),
      day(meal('Chicken Sandwich', 420, 40, 'Yoghurt Coconut', 5), meal('Grilled Chicken (Big)', 433, 50, WHEY, 30, true)),
      day(meal('Tuna Sandwich', 400, 33, 'Beetroot Juice', 0), meal('Ahead Combo Salad', 480, 52, WHEY, 30))
    ]
  ]
};

// Only dishes whose photo is already identified in the food catalog get a picture.
var DISH_PHOTOS = {
  'Grilled Chicken Salad': 'img/Food_Pictures/FD14.webp',
  'Chicken Salad': 'img/Food_Pictures/FD15.webp',
  'Chicken Stir Fry': 'img/Food_Pictures/FD12.webp',
  'Avocado & Egg Sandwich': 'img/Food_Pictures/FD27.webp',
  'Scrambled Eggs & Veggies': 'img/Food_Pictures/FD10.webp',
  'Fried Rice & Mixed Veggies': 'img/Food_Pictures/FD20.webp',
  'Boiled Sweet Potatoes & Veg Sauce': 'img/Food_Pictures/FD30.webp'
};
var GRILLED_FISH_PHOTO = 'img/Food_Pictures/FD19.webp';

var PLAN_COPY = {
  build: {
    slogan: ['Eat more.', 'Build more.'],
    aim: 'Muscle and protein',
    flags: ['Low skeletal muscle', 'Low protein'],
    promises: ['A fresh whey protein shake every day', 'Protein-forward breakfasts and dinners', '120g daily protein target'],
    heroPhoto: { src: 'img/Food_Pictures/FD14.webp', alt: 'Grilled chicken salad from the Build Plan' },
    chartTitle: 'Protein, every day',
    chartNote: 'Bars show each day’s protein, meals and drinks together. The line is the 120g daily target. Muscle builds gradually, so pair the plan with strength training and re-scan every 2–4 weeks.'
  },
  lean: {
    slogan: ['Eat ahead.', 'Live leaner.'],
    aim: 'Weight loss and fat reduction',
    flags: ['High body fat', 'Excess visceral fat', 'High metabolic age'],
    promises: ['Every meal paired with a light drink', 'Full calorie data on every plate', 'No calorie counting on your side'],
    heroPhoto: { src: 'img/Food_Pictures/FD19.webp', alt: 'Grilled fish with quinoa and broccoli from the Lean Plan' },
    chartTitle: 'Calories, every day',
    chartNote: 'Bars show each day’s calories, meals and drinks together. The line is a 2,500 kcal day. Estimates are from diet alone at 7,700 kcal per kg. Training speeds results up, and results vary.'
  }
};

var PLAN_KEYS = ['build', 'lean'];

function assertPlan(key) {
  if (PLAN_KEYS.indexOf(key) === -1) {
    throw new Error('Unknown meal plan: ' + key);
  }
}

function formatNumber(value) {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function dayCalories(entry) {
  return entry.breakfast.cal + entry.breakfast.drinkValue + entry.dinner.cal + entry.dinner.drinkValue;
}

function dayFoodProtein(entry) {
  return entry.breakfast.protein + entry.dinner.protein;
}

function dayProtein(entry) {
  return dayFoodProtein(entry) + entry.breakfast.drinkValue + entry.dinner.drinkValue;
}

// Lean days are measured in calories; Build days in protein including drinks.
function dayValue(key, entry) {
  assertPlan(key);
  return key === 'lean' ? dayCalories(entry) : dayProtein(entry);
}

function weekTotal(key, weekIndex) {
  assertPlan(key);
  var week = ROTATIONS[key][weekIndex];
  if (!week) {
    throw new RangeError('No week ' + (weekIndex + 1) + ' in the ' + key + ' plan');
  }
  return week.reduce(function (total, entry) { return total + dayValue(key, entry); }, 0);
}

function allDays(key) {
  assertPlan(key);
  return ROTATIONS[key].reduce(function (list, week) { return list.concat(week); }, []);
}

function grillNights(key) {
  return allDays(key).filter(function (entry) { return entry.dinner.grill || entry.breakfast.grill; }).length;
}

function leanEstimateKg(weeks) {
  var days = ROTATIONS.lean.slice(0, weeks).reduce(function (list, week) { return list.concat(week); }, []);
  var deficit = days.reduce(function (total, entry) { return total + (LEAN_BASELINE_KCAL - dayCalories(entry)); }, 0);
  return Math.round((deficit / KCAL_PER_KG) * 10) / 10;
}

function averagePerDay(key) {
  var days = allDays(key);
  var total = days.reduce(function (sum, entry) { return sum + dayValue(key, entry); }, 0);
  return Math.round(total / days.length);
}

function fourWeekSaving(key) {
  assertPlan(key);
  var plan = catalog.PLANS[key];
  return plan.twoWeek * 2 - plan.fourWeek;
}

function headlineStat(key) {
  return key === 'lean'
    ? { value: formatNumber(averagePerDay('lean')), label: 'calories a day, on average' }
    : { value: averagePerDay('build') + 'g', label: 'protein a day, on average' };
}

function photoForDish(name) {
  if (DISH_PHOTOS[name]) {
    return DISH_PHOTOS[name];
  }
  return /^Grilled (Catfish|Tilapia|Croaker)/.test(name) ? GRILLED_FISH_PHOTO : null;
}

function planAttr(key) {
  return ' data-plan="' + key + '"';
}

function renderHero() {
  var titles = PLAN_KEYS.map(function (key) {
    var slogan = PLAN_COPY[key].slogan;
    return '<span class="plans-hero__line"' + planAttr(key) + '>' + escapeHtml(slogan[0]) + ' <em>' + escapeHtml(slogan[1]) + '</em></span>';
  }).join('');
  var plates = PLAN_KEYS.map(function (key) {
    var copy = PLAN_COPY[key];
    var stat = headlineStat(key);
    return '<div class="plate-clock__face"' + planAttr(key) + '>' +
      '<img src="' + copy.heroPhoto.src + '" alt="' + escapeHtml(copy.heroPhoto.alt) + '" />' +
      '<p class="plate-clock__stat"><strong>' + stat.value + '</strong><span>' + stat.label + '</span></p>' +
      '<p class="plate-clock__price">From<strong>' + formatNaira(catalog.PLANS[key].twoWeek) + '</strong></p>' +
      '</div>';
  }).join('');
  var dayMarks = DAYS.map(function (name, index) {
    return '<li style="--i:' + index + '"><span>' + name + '</span></li>';
  }).join('');
  return [
    '<section class="plans-hero" aria-labelledby="plans-title">',
    '<div class="plans-hero__copy">',
    '<p class="brand-kicker"><span aria-hidden="true"></span>AF Healthy Bites meal plans</p>',
    '<h1 id="plans-title">' + titles + '</h1>',
    '<p class="plans-hero__lede">Chef-made meals and drinks built around your body scan, delivered fresh six days a week.</p>',
    renderSwitch('plan-switch--hero'),
    '<div class="brand-actions"><a class="primary-btn" href="#rotation">See all 4 weeks</a><a class="ghost-btn" href="#subscribe">Subscribe</a></div>',
    '</div>',
    '<div class="plate-clock">',
    '<ol class="plate-clock__days" aria-label="Delivered Monday to Saturday">' + dayMarks + '</ol>',
    plates,
    '</div>',
    '</section>'
  ].join('');
}

function renderSwitch(modifier) {
  return '<div class="plan-switch ' + modifier + '" role="group" aria-label="Show a plan" hidden>' +
    PLAN_KEYS.map(function (key) {
      return '<button type="button" class="plan-switch__option" data-plan-choice="' + key + '" aria-pressed="false">' +
        (key === 'build' ? 'Build' : 'Lean') + '</button>';
    }).join('') + '</div>';
}

function renderChoice(key) {
  var plan = catalog.PLANS[key];
  var copy = PLAN_COPY[key];
  return [
    '<article class="plan-choice plan-choice--' + key + '" data-plan-card="' + key + '" aria-labelledby="choice-' + key + '">',
    '<p class="plan-choice__aim">' + escapeHtml(copy.aim) + '</p>',
    '<h3 id="choice-' + key + '">' + escapeHtml(plan.name) + '</h3>',
    '<p class="plan-choice__slogan">' + escapeHtml(copy.slogan.join(' ')) + '</p>',
    '<p class="plan-choice__label">For scans that show</p>',
    '<ul class="plan-choice__flags">' + copy.flags.map(function (flag) { return '<li>' + escapeHtml(flag) + '</li>'; }).join('') + '</ul>',
    '<ul class="plan-choice__promises">' + copy.promises.map(function (line) {
      return '<li><i class="fa-solid fa-check" aria-hidden="true"></i>' + escapeHtml(line) + '</li>';
    }).join('') + '</ul>',
    '<dl class="plan-choice__prices">',
    '<div><dt>2 weeks<small>12 days</small></dt><dd>' + formatNaira(plan.twoWeek) + '</dd></div>',
    '<div><dt>4 weeks<small>24 days</small></dt><dd>' + formatNaira(plan.fourWeek) + '<small>Save ' + formatNaira(fourWeekSaving(key)) + '</small></dd></div>',
    '</dl>',
    '<div class="plan-choice__actions">',
    '<a class="primary-btn" href="' + escapeHtml(catalog.subscribeHref(plan.name)) + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Subscribe</a>',
    '<a class="plan-choice__menu" href="#rotation" data-plan-choice="' + key + '">See the menu</a>',
    '</div>',
    '</article>'
  ].join('');
}

function renderChooser() {
  return [
    '<section class="plans-chooser" id="plans" aria-labelledby="plans-chooser-title">',
    '<div class="plans-chooser__intro">',
    '<h2 id="plans-chooser-title">Start with <em>your scan.</em></h2>',
    '<p>Your Bio Impedance scan at any Ahead Fitness gym shows where your body is today. Pick the plan that answers it.</p>',
    '</div>',
    '<div class="plans-chooser__pair">' + renderChoice('build') + renderChoice('lean') + '</div>',
    '</section>'
  ].join('');
}

function renderGlance() {
  var facts = [
    ['2', 'meals a day'],
    ['2', 'drinks a day'],
    ['6', 'days a week'],
    [String(grillNights('build')), 'grill nights in 4 weeks']
  ];
  var common = facts.map(function (fact) {
    return '<li><strong>' + fact[0] + '</strong><span>' + fact[1] + '</span></li>';
  }).join('');
  var planFacts = PLAN_KEYS.map(function (key) {
    var stat = headlineStat(key);
    return '<li' + planAttr(key) + '><strong>' + stat.value + '</strong><span>' + stat.label + '</span></li>';
  }).join('');
  return '<section class="plans-glance" aria-label="Every plan at a glance"><ul>' + planFacts + common + '</ul></section>';
}

function renderBars(key) {
  var max = key === 'lean' ? 2600 : 170;
  var target = key === 'lean' ? LEAN_BASELINE_KCAL : BUILD_PROTEIN_TARGET;
  var unit = key === 'lean' ? ' cal' : 'g protein';
  var weeks = ROTATIONS[key].map(function (week, weekIndex) {
    var bars = week.map(function (entry, dayIndex) {
      var value = dayValue(key, entry);
      var height = Math.min(100, (value / max) * 100).toFixed(1);
      return '<li style="--h:' + height + '%" title="Week ' + (weekIndex + 1) + ', ' + DAY_NAMES[DAYS[dayIndex]] + ': ' + formatNumber(value) + unit + '">' +
        '<span class="plans-chart__bar' + (entry.dinner.grill ? ' is-grill' : '') + '"></span></li>';
    }).join('');
    return '<li class="plans-chart__week"><ol>' + bars + '</ol><span>Week ' + (weekIndex + 1) + '</span></li>';
  }).join('');
  var lineAt = Math.min(100, (target / max) * 100).toFixed(1);
  var label = key === 'lean'
    ? 'Daily calories across 24 days, between ' + formatNumber(Math.min.apply(null, allDays('lean').map(dayCalories))) + ' and ' + formatNumber(Math.max.apply(null, allDays('lean').map(dayCalories))) + ', every day under 2,500.'
    : 'Daily protein across 24 days, averaging ' + averagePerDay('build') + 'g against a 120g target.';
  return '<div class="plans-chart" role="img" aria-label="' + escapeHtml(label) + '" style="--line:' + lineAt + '%">' +
    '<span class="plans-chart__line"><b>' + (key === 'lean' ? '2,500 kcal day' : '120g target') + '</b></span>' +
    '<ol class="plans-chart__weeks">' + weeks + '</ol></div>' +
    '<p class="plans-chart__legend"><span aria-hidden="true"></span>Red bars are grill nights</p>';
}

function renderResultFigures(key) {
  if (key === 'lean') {
    return '<ul class="plans-result__figures">' +
      '<li><strong>' + leanEstimateKg(2) + 'kg</strong><span>estimated in 2 weeks</span></li>' +
      '<li><strong>' + leanEstimateKg(4) + 'kg</strong><span>estimated in 4 weeks</span></li></ul>';
  }
  return '<ul class="plans-result__figures">' +
    '<li><strong>' + averagePerDay('build') + 'g</strong><span>protein a day, on average</span></li>' +
    '<li><strong>1.6g</strong><span>per kg of bodyweight, the bar for muscle growth</span></li></ul>';
}

function renderResults() {
  var panels = PLAN_KEYS.map(function (key) {
    var copy = PLAN_COPY[key];
    return '<div class="plans-result"' + planAttr(key) + '>' +
      '<div class="plans-result__copy"><h2>' + escapeHtml(copy.chartTitle) + '</h2>' + renderResultFigures(key) +
      '<p>' + escapeHtml(copy.chartNote) + '</p></div><div class="plans-result__chart">' + renderBars(key) + '</div></div>';
  }).join('');
  return '<section class="plans-results" aria-label="What the plans deliver">' + panels + '</section>';
}

function renderMeal(key, slot, item) {
  var photo = photoForDish(item.name);
  var drinkFact = key === 'lean' ? item.drinkValue + ' cal' : item.drinkValue + 'g protein';
  return '<div class="plan-meal' + (photo ? ' has-photo' : '') + '">' +
    (photo ? '<img src="' + photo + '" alt="" loading="lazy" />' : '') +
    '<div><p class="plan-meal__slot">' + slot + (item.grill ? '<span class="plan-meal__grill"><i class="fa-solid fa-fire" aria-hidden="true"></i> Grill night</span>' : '') + '</p>' +
    '<h5>' + escapeHtml(item.name) + '</h5>' +
    '<p class="plan-meal__facts">' + formatNumber(item.cal) + ' cal · ' + item.protein + 'g protein</p>' +
    '<p class="plan-meal__drink"><i class="fa-solid fa-glass-water" aria-hidden="true"></i>' + escapeHtml(item.drink) + ' · ' + drinkFact + '</p>' +
    '</div></div>';
}

function renderDayTotal(key, entry) {
  if (key === 'lean') {
    return '<p class="plan-day__total"><strong>' + formatNumber(dayCalories(entry)) + '</strong> cal<span>' + dayFoodProtein(entry) + 'g protein from food</span></p>';
  }
  var protein = dayProtein(entry);
  var gap = protein - BUILD_PROTEIN_TARGET;
  return '<p class="plan-day__total"><strong>' + protein + 'g</strong> protein<span>' + (gap >= 0 ? '+' : '') + gap + 'g vs 120g target</span></p>';
}

function weekSummary(key, weekIndex) {
  var total = weekTotal(key, weekIndex);
  var average = Math.round(total / DAYS.length);
  if (key === 'lean') {
    var deficit = DAYS.length * LEAN_BASELINE_KCAL - total;
    return 'avg ' + formatNumber(average) + ' cal a day · about ' + (Math.round((deficit / KCAL_PER_KG) * 100) / 100) + 'kg';
  }
  return 'avg ' + average + 'g protein a day';
}

function renderRotation(key) {
  assertPlan(key);
  var plan = catalog.PLANS[key];
  var weeks = ROTATIONS[key].map(function (week, weekIndex) {
    var days = week.map(function (entry, dayIndex) {
      return '<article class="plan-day' + (entry.dinner.grill ? ' is-grill' : '') + '">' +
        '<h4><abbr title="' + DAY_NAMES[DAYS[dayIndex]] + '">' + DAYS[dayIndex] + '</abbr></h4>' +
        renderMeal(key, 'Breakfast', entry.breakfast) +
        renderMeal(key, 'Dinner', entry.dinner) +
        renderDayTotal(key, entry) +
        '</article>';
    }).join('');
    return '<details class="plan-week"' + (weekIndex === 0 ? ' open' : '') + '>' +
      '<summary><h3>Week ' + (weekIndex + 1) + '</h3><span>' + weekSummary(key, weekIndex) + '</span>' +
      '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary>' +
      '<div class="plan-week__days">' + days + '</div></details>';
  }).join('');
  return '<div class="plans-rotation__plan"' + planAttr(key) + '>' +
    '<p class="plans-rotation__plan-name">' + escapeHtml(plan.name) + '<span>Weeks 1 and 2 are the 2-week plan. The 4-week plan adds weeks 3 and 4.</span></p>' +
    weeks + '</div>';
}

function renderRotations() {
  return [
    '<section class="plans-rotation" id="rotation" aria-labelledby="rotation-title">',
    '<div class="plans-rotation__head">',
    '<h2 id="rotation-title">Four weeks <em>on the plate.</em></h2>',
    '<p>48 meals and 48 drinks, Monday to Saturday, with calories and protein on every plate.</p>',
    renderSwitch('plan-switch--rotation'),
    '</div>',
    renderRotation('build'),
    renderRotation('lean'),
    '</section>'
  ].join('');
}

function renderInclusions() {
  var included = [
    ['fa-utensils', 'Two chef-prepared meals a day, six days a week'],
    ['fa-glass-water', 'A drink with every meal, set for your plan'],
    ['fa-chart-simple', 'Calories and protein listed for every meal'],
    ['fa-fire', String(grillNights('lean')) + ' grill nights across four weeks'],
    ['fa-truck', 'Delivered to your home, office, or gym'],
    ['fa-leaf', 'No processed ingredients']
  ];
  var drinks = [['Smoothies', '10oz'], ['Fresh juices', '35cl'], ['Zobo', '35cl'], ['Yoghurt drinks', '35cl']];
  return [
    '<section class="plans-box" aria-labelledby="plans-box-title">',
    '<div class="plans-box__list"><h2 id="plans-box-title">In every <em>delivery.</em></h2><ul>',
    included.map(function (entry) {
      return '<li><i class="fa-solid ' + entry[0] + '" aria-hidden="true"></i><span>' + escapeHtml(entry[1]) + '</span></li>';
    }).join(''),
    '</ul></div>',
    '<div class="plans-box__drinks"><img src="img/Food_Pictures/FD1.webp" alt="Beet Berry Boost smoothie" loading="lazy" />',
    '<div class="plans-box__sizes"><h3>Drink sizes</h3><ul>',
    drinks.map(function (entry) { return '<li><strong>' + entry[1] + '</strong><span>' + entry[0] + '</span></li>'; }).join(''),
    '</ul></div></div>',
    '</section>'
  ].join('');
}

function renderSteps() {
  var steps = [
    ['Choose', 'Pick 2 or 4 weeks. Plans start on a Monday, so pay by the Sunday before.'],
    ['Share', 'Send your delivery address and a good time. Home, office, or gym.'],
    ['Eat', 'Meals and drinks arrive together, fresh, Monday to Saturday.'],
    ['Re-scan', 'Check your progress on the Bio Impedance Analyser every 2–4 weeks.']
  ];
  return [
    '<section class="plans-steps" aria-labelledby="plans-steps-title">',
    '<h2 id="plans-steps-title">How it <em>works.</em></h2>',
    '<ol>' + steps.map(function (step, index) {
      return '<li><span class="plans-steps__number" aria-hidden="true">0' + (index + 1) + '</span><h3>' + step[0] + '</h3><p>' + escapeHtml(step[1]) + '</p></li>';
    }).join('') + '</ol>',
    '<p class="plans-steps__pause"><i class="fa-solid fa-pause" aria-hidden="true"></i><span><strong>Going away?</strong> Pause for up to 5 days per plan with 24 hours’ notice. Paused days are added to the end.</span></p>',
    '</section>'
  ].join('');
}

function renderSubscribe() {
  var locations = [
    ['Karu', '2 Sen. George Akume Way'],
    ['Gwarinpa', 'Clever Plaza, 6th Avenue'],
    ['Kubwa', 'Eminond Plaza, Byazhin Road, opposite Dantata Estate']
  ];
  return [
    '<section class="plans-subscribe" id="subscribe" aria-labelledby="plans-subscribe-title">',
    '<div class="plans-subscribe__cta">',
    '<h2 id="plans-subscribe-title">Subscribe <em>today.</em></h2>',
    '<p>Tell us your name, your plan, and your delivery address. We confirm your start date and delivery window.</p>',
    '<div class="plans-subscribe__actions">',
    PLAN_KEYS.map(function (key) {
      var plan = catalog.PLANS[key];
      return '<a class="plans-subscribe__btn plans-subscribe__btn--' + key + '" href="' + escapeHtml(catalog.subscribeHref(plan.name)) + '" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-whatsapp" aria-hidden="true"></i> ' + escapeHtml(plan.name) + '</a>';
    }).join(''),
    '<a class="plans-subscribe__btn plans-subscribe__btn--call" href="tel:' + PHONE + '"><i class="fa-solid fa-phone" aria-hidden="true"></i> Call ' + PHONE + '</a>',
    '</div></div>',
    '<div class="plans-subscribe__kitchens"><h3>Our kitchens</h3><ul>',
    locations.map(function (entry) {
      return '<li><strong>' + entry[0] + '</strong><span>' + escapeHtml(entry[1]) + '</span></li>';
    }).join(''),
    '</ul><p>Open 8am–8pm. Deliveries 9am–7pm.</p></div>',
    '</section>'
  ].join('');
}

function renderMealPlansMain() {
  return '<div class="plans-page" data-plan-root>' +
    renderHero() + renderChooser() + renderGlance() + renderResults() + renderRotations() +
    renderInclusions() + renderSteps() + renderSubscribe() +
    '</div>';
}

module.exports = {
  DAYS: DAYS,
  ROTATIONS: ROTATIONS,
  PLAN_KEYS: PLAN_KEYS,
  LEAN_BASELINE_KCAL: LEAN_BASELINE_KCAL,
  BUILD_PROTEIN_TARGET: BUILD_PROTEIN_TARGET,
  dayCalories: dayCalories,
  dayProtein: dayProtein,
  weekTotal: weekTotal,
  grillNights: grillNights,
  leanEstimateKg: leanEstimateKg,
  averagePerDay: averagePerDay,
  fourWeekSaving: fourWeekSaving,
  photoForDish: photoForDish,
  renderRotation: renderRotation,
  renderMealPlansMain: renderMealPlansMain
};
