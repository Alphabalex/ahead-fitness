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

function item(name, price, best, detail) {
  return { name: name, price: price, best: Boolean(best), detail: detail || '' };
}

function cover(file, alt) {
  return { image: 'img/Food_Pictures/' + file, alt: alt };
}

var DRINKS = [
  {
    title: 'Smoothies',
    cover: cover('HM/BANANA_YOGHURT_SMOOTHIE.webp', 'Banana Yoghurt Smoothie'),
    items: [
      item('Flat Tummy Flush', 3000, false, 'Watermelon, cucumber, lemon, mint · 91 cal · Plant-based'),
      item('Tropical Blast', 3000, false, 'Banana, watermelon, pineapple, dates · 450 cal · Plant-based'),
      item('Beet Berry Boost', 3000, false, 'Watermelon, pineapple, beetroot, dates · 422 cal · Plant-based'),
      item('Pineapple & Orange', 3000, false, 'Pineapple, orange, dates · 590 cal · 21g fiber · Plant-based'),
      item('Watermelon Mix', 3000, false, 'Watermelon, banana, pineapple, dates · 478 cal · Plant-based'),
      item('Banana Yoghurt Smoothie', 3000, true, '358 cal · 10g protein'),
      item('Pineapple Yoghurt Smoothie', 3000, false, '295 cal · 10g protein'),
      item('Pineapple Energy Rush', 3000, false, '192 cal · 1g protein'),
      item('Power Booster', 4000, true, '818 cal · 21g protein · 18g fiber')
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
      cover: cover('HM/AVOCADO_AND_EGG_SANDWICH.webp', 'Avocado and egg sandwich'),
      items: [
        item('Scrambled Eggs with Veggies', 5000, false, '315 cal · 15g protein · Contains egg'),
        item('Omelette', 6000, false, '343 cal · 20g protein · Contains egg'),
        item('Protein Pancake', 6000, false, '741 cal · 27g protein · 7g fiber'),
        item('Chicken Sandwich', 4000, true, '405 cal · 25g protein'),
        item('Chicken Wrap', 8000, false, '598 cal · 28g protein'),
        item('Turkey Sandwich', 6000, false, '501 cal · 25g protein'),
        item('Tuna Sandwich', 6500, false, '406 cal · 31g protein · Contains fish'),
        item('Egg Sandwich', 4000, false, '358 cal · 13g protein · Contains egg'),
        item('Avocado & Egg Sandwich', 5000, false, '544 cal · 21g protein · 9g fiber · Contains egg')
      ]
    },
    {
      title: 'Salads',
      cover: cover('HM/AHEAD_COMBO_SALAD.webp', 'Ahead Combo Salad'),
      items: [
        item('Grilled Chicken Salad', 9000, false, '362 cal · 47g protein · 5g fiber'),
        item('Chicken Salad', 6000, true, '324 cal · 47g protein'),
        item('Ahead Combo Salad', 9000, true, '494 cal · 41g protein · 8g fiber'),
        item('Grilled Fish Salad', 9000, false, '515 cal · 32g protein · Contains fish'),
        item('Tuna Salad', 7500, false, '247 cal · 25g protein · Contains fish'),
        item('Thai Beef Salad', 7500, false, '484 cal · 34g protein'),
        item('Egg & Veggies Salad', 7500, false, '363 cal · 27g protein · Contains egg'),
        item('Greek Salad', 7500, false, '384 cal · 5g protein · 7g fiber · Plant-based')
      ]
    },
    {
      title: 'Mains',
      cover: cover('HM/CHICKEN_PLATTER.webp', 'Chicken platter'),
      items: [
        item('Chicken Stir Fry', 10000, false, '735 cal · 41g protein · 8g fiber'),
        item('Quinoa Stir Fry', 12500, false, 'Chicken or fish · 917 cal · 58g protein · 15g fiber'),
        item('Stir Fried Basmati Rice', 10000, false, 'Chicken or fish · 973 cal · 50g protein · 6g fiber'),
        item('Chicken Platter', 10000, false, '1084 cal · 67g protein · 16g fiber'),
        item('Brown Basmati Rice Jollof', 10000, false, 'Chicken or fish · 952 cal · 50g protein · 11g fiber'),
        item('Ahead Protein Rice', 10000, false, '1209 cal · 60g protein · 5g fiber'),
        item('Fried Rice & Mixed Veggies', 12000, false, '1211 cal · 53g protein · 10g fiber'),
        item('Ofada Rice & Vegetable Sauce', 12000, false, '1155 cal · 69g protein · 12g fiber'),
        item('Boiled Plantain & Veggie Sauce', 9500, true, 'Chicken or fish · 700 cal · 19g protein · 9g fiber'),
        item('Boiled Plantain & Egg Sauce', 9000, true, '721 cal · 34g protein · 6g fiber · Contains egg'),
        item('Plantain Porridge', 10000, false, '1121 cal · 98g protein · 9g fiber · Contains fish'),
        item('Sweet Potato Porridge', 7000, true, 'Chicken or fish · 938 cal · 60g protein · 21g fiber'),
        item('Boiled Sweet Potatoes & Vegetable Sauce', 9000, false, '1000 cal · 48g protein · 19g fiber')
      ]
    },
    {
      title: 'Sides',
      items: [
        item('Plantain', 1000, false, '183 cal boiled · 298 cal air fried'),
        item('Sweet Potatoes', 1000, false, '129 cal boiled · 244 cal air fried'),
        item('Irish Potatoes', 2000, false, '116 cal boiled · 230 cal air fried'),
        item('Basmati Rice', 2000, false, '363 cal · 8g protein'),
        item('Brown Rice', 2000, false, '362 cal · 8g protein')
      ]
    },
    {
      title: 'Shawarma',
      items: [
        item('Chicken Shawarma', 4000, false, 'No sausage'),
        item('Chicken Shawarma + 1 Sausage', 4500),
        item('Chicken Shawarma + 2 Sausage', 5000),
        item('Beef Shawarma', 4000, false, 'No sausage'),
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
        item('Quick Bite Combo', 6500, false, 'Chicken Sandwich + Flat Tummy Flush'),
        item('Protein Boost Combo', 8500, false, 'Scrambled Eggs or Omelette + Banana Yoghurt Smoothie'),
        item('Power Lunch Combo', 11500, false, 'Grilled Chicken Salad + Pineapple Energy Rush'),
        item('Buddy Combo', 16000, false, 'Chicken Platter + 1 Fruity Smoothie')
      ]
    }
  ]),
  grills: [
    {
      title: 'Chicken & turkey',
      note: 'Comes with 1 companion of your choice.',
      cover: cover('Grills/GRILLED_CHICKEN.webp', 'Grilled chicken'),
      items: [
        item('Chicken Medium', 8500, true),
        item('Chicken Big', 10000),
        item('Turkey', 10000),
        item('Peppered Gizzard', 6000, false, '3 pieces'),
        item('Peppered Snail', 15000, false, '3 pieces')
      ]
    },
    {
      title: 'Grilled fish',
      note: 'Comes with 1 companion of your choice.',
      cover: cover('Grills/CATFISH_AND_CHIPS.webp', 'Catfish and chips'),
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
        item('Side Chick', 15500, false, '2 medium chicken · coleslaw & chips'),
        item('Side Turks', 18000, false, '2 turkey · coleslaw & chips'),
        item('Full Chicken', 17000, false, 'Yam chips · sweet potato chips · coleslaw'),
        item('Ahead Classic', 32000, false, '1 big catfish · 1 turkey · 1 big chicken · coleslaw & chips'),
        item('Family Combo', 62000, false, 'Any medium grilled fish · 3 turkey · 3 medium chicken · 3 sides of your choice · coleslaw & chips')
      ]
    },
    {
      title: 'Shawarma',
      cover: cover('Grills/SHAWARMA.webp', 'Shawarma'),
      items: [
        item('Chicken Shawarma', 4000, true, 'No sausage'),
        item('Chicken Shawarma + 1 Sausage', 4500),
        item('Chicken Shawarma + 2 Sausage', 5000),
        item('Beef Shawarma', 4000, false, 'No sausage'),
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

function hmPhoto(file) {
  return 'img/Food_Pictures/HM/' + file;
}

function grillPhoto(file) {
  return 'img/Food_Pictures/Grills/' + file;
}

// Picture filenames are the dish names. CROCKER is the filename for croaker.
var MEAL_PHOTO_FILES = {
  'Protein Pancake': 'PROTEIN_PANCAKE.webp',
  'Ahead Protein Rice': 'AHEAD_PROTEIN_RICE.webp',
  'Ahead Combo Salad': 'AHEAD_COMBO_SALAD.webp',
  'Plantain Porridge': 'PLANTAIN_PORRIDGE.webp',
  'Sweet Potato Porridge': 'SWEET_POTATO_PORRIDGE.webp',
  'Avocado & Egg Sandwich': 'AVOCADO_AND_EGG_SANDWICH.webp',
  'Banana Yoghurt Smoothie': 'BANANA_YOGHURT_SMOOTHIE.webp',
  'Pineapple Yoghurt Smoothie': 'PINEAPPLE_YOGHURT_SMOOTHIE.webp',
  'Chicken Platter': 'CHICKEN_PLATTER.webp',
  'Greek Salad': 'GREEK_SALAD.webp',
  'Quinoa Stir Fry': 'QUINOA_STIR_FRY.webp',
  'Stir Fried Basmati Rice': 'BASMATI_STIR_FRY.webp'
};

var GRILL_PHOTO_FILES = {
  'Chicken Medium': 'GRILLED_CHICKEN.webp',
  'Chicken Big': 'GRILLED_CHICKEN.webp',
  'Turkey': 'GRILLED_TURKEY.webp',
  'Peppered Snail': 'PEPPERED_SNAIL.webp',
  'Catfish Medium': 'CATFISH_AND_CHIPS.webp',
  'Catfish Big': 'CATFISH_AND_CHIPS.webp',
  'Tilapia Medium': 'TILAPIA_AND_CHIPS.webp',
  'Tilapia Big': 'TILAPIA_AND_CHIPS.webp',
  'Croaker Medium': 'CROCKER_AND_CHIPS.webp',
  'Croaker Big': 'CROCKER_AND_CHIPS.webp'
};

function namedPhoto(brand, dishName) {
  if (brand === 'meals' && MEAL_PHOTO_FILES[dishName]) {
    return hmPhoto(MEAL_PHOTO_FILES[dishName]);
  }
  if (brand === 'grills') {
    if (GRILL_PHOTO_FILES[dishName]) {
      return grillPhoto(GRILL_PHOTO_FILES[dishName]);
    }
    if (dishName.indexOf('Shawarma') !== -1) {
      return grillPhoto('SHAWARMA.webp');
    }
  }
  return null;
}

var DISH_SLIDES = [
  slide('img/Food_Pictures/FD14.webp', 'Grilled Chicken Salad', 9000, '47g protein', ['meals']),
  slide('img/Food_Pictures/FD15.webp', 'Chicken Salad', 6000, 'Best seller · 47g protein', ['meals']),
  slide(hmPhoto('AHEAD_COMBO_SALAD.webp'), 'Ahead Combo Salad', 9000, 'Best seller · 41g protein', ['meals']),
  slide(hmPhoto('GREEK_SALAD.webp'), 'Greek Salad', 7500, 'Plant-based', ['meals']),
  slide('img/Food_Pictures/FD19.webp', 'Grilled fish', 10000, 'Catfish, tilapia, or croaker', ['meals'], 'From ₦10,000'),
  slide('img/Food_Pictures/FD16.webp', 'Boiled Plantain & Veggie Sauce', 9500, 'Best seller', ['meals']),
  slide(hmPhoto('PLANTAIN_PORRIDGE.webp'), 'Plantain Porridge', 10000, '98g protein', ['meals']),
  slide(hmPhoto('SWEET_POTATO_PORRIDGE.webp'), 'Sweet Potato Porridge', 7000, 'Best seller · 60g protein', ['meals']),
  slide('img/Food_Pictures/FD20.webp', 'Fried Rice & Mixed Veggies', 12000, '53g protein', ['meals']),
  slide('img/Food_Pictures/FD12.webp', 'Chicken Stir Fry', 10000, '41g protein', ['meals']),
  slide(hmPhoto('QUINOA_STIR_FRY.webp'), 'Quinoa Stir Fry', 12500, '58g protein', ['meals']),
  slide(hmPhoto('BASMATI_STIR_FRY.webp'), 'Stir Fried Basmati Rice', 10000, '50g protein', ['meals']),
  slide(hmPhoto('CHICKEN_PLATTER.webp'), 'Chicken Platter', 10000, '67g protein', ['meals']),
  slide(hmPhoto('AHEAD_PROTEIN_RICE.webp'), 'Ahead Protein Rice', 10000, '60g protein', ['meals']),
  slide(hmPhoto('PROTEIN_PANCAKE.webp'), 'Protein Pancake', 6000, '27g protein', ['meals']),
  slide(hmPhoto('AVOCADO_AND_EGG_SANDWICH.webp'), 'Avocado & Egg Sandwich', 5000, '21g protein', ['meals']),
  slide('img/Food_Pictures/FD10.webp', 'Scrambled Eggs with Veggies', 5000, '15g protein', ['meals']),
  slide('img/Food_Pictures/FD30.webp', 'Boiled Sweet Potatoes & Vegetable Sauce', 9000, '48g protein', ['meals']),
  slide(grillPhoto('GRILLED_CHICKEN.webp'), 'Grilled Chicken', 8500, 'With a companion', ['grills'], 'From ₦8,500'),
  slide(grillPhoto('GRILLED_TURKEY.webp'), 'Grilled Turkey', 10000, 'With a companion', ['grills']),
  slide(grillPhoto('CATFISH_AND_CHIPS.webp'), 'Catfish and Chips', 10000, 'Medium or big', ['grills'], 'From ₦10,000'),
  slide(grillPhoto('TILAPIA_AND_CHIPS.webp'), 'Tilapia and Chips', 10000, 'Medium or big', ['grills'], 'From ₦10,000'),
  slide(grillPhoto('CROCKER_AND_CHIPS.webp'), 'Croaker and Chips', 12000, 'Medium or big', ['grills'], 'From ₦12,000'),
  slide(grillPhoto('PEPPERED_SNAIL.webp'), 'Peppered Snail', 15000, '3 pieces', ['grills']),
  slide(grillPhoto('SNAIL_AND_CHIPS.webp'), 'Snail and Chips', 15000, '3 pieces, with chips', ['grills']),
  slide(grillPhoto('SHAWARMA.webp'), 'Shawarma', 4000, 'Chicken or beef', ['grills'], 'From ₦4,000'),
  slide(hmPhoto('BANANA_YOGHURT_SMOOTHIE.webp'), 'Banana Yoghurt Smoothie', 3000, 'Best seller', ['meals', 'grills']),
  slide('img/Food_Pictures/FD13.webp', 'Power Booster', 4000, 'Best seller · 21g protein', ['meals', 'grills']),
  slide('img/Food_Pictures/FD1.webp', 'Beet Berry Boost', 3000, '422 cal', ['meals', 'grills']),
  slide('img/Food_Pictures/FD3.webp', 'Tropical Blast', 3000, '450 cal', ['meals', 'grills']),
  slide('img/Food_Pictures/FD2.webp', 'Flat Tummy Flush', 3000, '91 cal', ['meals', 'grills']),
  slide(hmPhoto('PINEAPPLE_YOGHURT_SMOOTHIE.webp'), 'Pineapple Yoghurt Smoothie', 3000, '10g protein', ['meals', 'grills']),
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
    twoWeek: 290000,
    fourWeek: 550000
  },
  lean: {
    name: 'The Lean Plan',
    twoWeek: 270000,
    fourWeek: 530000
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

function findMenuItem(brand, dishName) {
  var found = null;
  MENUS[brand].forEach(function (group) {
    group.items.forEach(function (entry) {
      if (entry.name === dishName) {
        found = entry;
      }
    });
  });
  return found;
}

function photoFor(brand, dishName) {
  assertBrand(brand);
  var image = namedPhoto(brand, dishName);
  var match = slidesFor(brand).filter(function (entry) {
    return entry.name === dishName;
  })[0];
  if (image && match) {
    return Object.assign({}, match, { image: image });
  }
  if (image) {
    var menuItem = findMenuItem(brand, dishName);
    return {
      image: image,
      name: dishName,
      price: menuItem ? menuItem.price : 0,
      priceLabel: menuItem ? formatNaira(menuItem.price) : '',
      detail: menuItem ? menuItem.detail : '',
      brands: [brand]
    };
  }
  return match || null;
}

function renderWorlds() {
  return [
    '<section class="worlds-section" id="worlds" aria-label="Ahead Fitness worlds">',
    '<a class="world-tile world-tile--train" href="./danglo-plaza.html">',
    '<img src="img/hero/gyms-karu-coaching.webp" alt="Coach guiding a member at Ahead Fitness Karu" />',
    '<span class="world-tile__copy"><small>Train</small><strong>The gyms</strong><em>Five gyms across Abuja</em></span></a>',
    '<div class="world-tile world-tile--eat">',
    '<img src="img/Food_Pictures/FD14.webp" alt="Plated meal from Ahead Fitness" />',
    '<div class="world-tile__copy"><small>Eat</small><strong>Food worth coming back for</strong>',
    '<span class="world-tile__links">',
    '<a href="./healthy-meals-kubwa.html">Healthy Meals Kubwa</a>',
    '<a href="./healthy-meals-karu.html">Healthy Meals Karu</a>',
    '<a href="./healthy-meals-gwarinpa.html">Healthy Meals Gwarinpa</a>',
    '<a href="./ahead-fitness-grills-karu.html">Ahead Grills</a>',
    '<a href="./meal-plans.html">Meal Plans</a>',
    '</span></div></div>',
    '<a class="world-tile world-tile--restore" href="./spa-gwarinpa.html">',
    '<img src="img/Gwarimpa_Spa/GWS1.webp" alt="Ahead Fitness Spa Gwarinpa" />',
    '<span class="world-tile__copy"><small>Restore</small><strong>Spa and salon</strong><em>Slow down, then step out</em></span></a>',
    '</section>'
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
  subscribeHref: subscribeHref
};
