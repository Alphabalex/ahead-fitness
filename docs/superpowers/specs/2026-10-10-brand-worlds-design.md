# Brand worlds

**Date:** 2026-10-10
**Status:** Ready for review

## Goal

Keep one Ahead Fitness identity, and make each brand feel like its own place. Food and meal plans should be obvious from the homepage, and the food itself should be what sells Ahead Grills and Healthy Meals.

## Locked decisions

- Main menu is **Home, Gym, Food, Spa & Salon, Careers** on desktop and mobile, on every page.
- Meal Plans live under **Food**.
- Subscribing is a call or WhatsApp to **08066203522**. There is no on-site checkout.
- The logo, header structure, and footer stay shared. Colour, photography, and layout change per brand.
- A dish photo is labeled only when the picture or its existing name identifies that dish. Menu text from the flyers can appear without a photo. Unidentified plates stay in the venue gallery.

## Menu

Parent items open their submenu. They do not link to `#locations`.

**Gym**

- Danglo Plaza, Gwarinpa
- All Female Gym, Gwarinpa
- Kubwa (Chikakore)
- Kubwa (Dantata)
- Karu
- Membership → homepage `#pricing`
- BMI → homepage `#bmi`
- About → homepage `#about`

**Food**

- Healthy Meals Kubwa
- Healthy Meals Karu
- Ahead Grills Karu
- Meal Plans → new `meal-plans.html`

**Spa & Salon**

- Ahead Fitness Spa Gwarinpa
- Ahead Fitness Spa Dantata
- Ahead Fitness Spa Karu
- Ahead Barbers Unisex Salon, Nadrem
- Ahead Barbers & Beauty Salon, Kubwa

**Careers** stays a direct link. Contact stays on each page’s own contact area and is not a sixth top-level item.

The homepage keeps its current About, gym services, pricing, and BMI sections. Those links move under Gym so the bar stays short.

There is no Healthy Meals Gwarinpa page yet. The flyer lists Gwarinpa as a kitchen, so the meals pages can name it. A new page waits until that location has its own photos and details.

## Homepage

Directly under the hero, a **worlds** strip of three large photographs:

- **Train** — the gyms
- **Eat** — Healthy Meals, Ahead Grills, and Meal Plans
- **Restore** — spa and salon

Each tile is a real link into that world. Eat’s tile is the one most people should notice: food photography, with the two kitchens and Meal Plans named on it.

## Brand skins

A class on `body` switches the skin. Headlines stay in Oswald and body text stays in Muli, so the company still reads as one family.

| Brand | Class | Feel |
|---|---|---|
| Gym | `brand-gym` | Current athletic dark skin and red accent. Unchanged. |
| Healthy Meals | `brand-meals` | Site palette (red `#ed3331`, black, white). Kitchen hero with floating plates and price stickers, red ticker, picture menu. |
| Ahead Grills | `brand-grills` | Same kitchen system, with a lower red glow and ember sparks in the hero. |
| Meal Plans | `brand-plans` | Site palette. A Build/Lean switch re-skins the page: the chart and rotation are black for Build and white for Lean. Build is a black card; Lean is a white card with a red top rule. |
| Spa | `brand-spa` | Site palette. A ripple around one treatment-room photo, then the real ritual menu (face, body, massage) with each location’s own booking number. |
| Salon | `brand-salon` | Site palette. Arched photo frames echoing the salon mirrors, a barber-pole edge, numbered services, and a three-step visit band. |

`brand-meals` is applied on `healthy-meals-kubwa.html` and `healthy-meals-karu.html`. `brand-grills` is applied on `ahead-fitness-grills-karu.html`. `brand-plans` is applied on `meal-plans.html`. `brand-spa` is applied on the three spa pages. `brand-salon` is applied on the two salon pages. Every other page stays `brand-gym`.

## Food pages

Healthy Meals Kubwa, Healthy Meals Karu, and Ahead Grills Karu each lead with the kitchen hero, a ticker, the dish carousel, the picture menu, a kitchen photo wall (Healthy Meals only), and an order band, then the existing venue gallery. Page content lives in `js/brand-pages.js`; `node scripts/apply-brand-worlds.js` writes it into the HTML and can be re-run safely.

**Carousel slide**

- Large food photograph
- Dish name
- Price in naira
- One true detail from the menu: calories, protein, or Best Seller
- Order action: WhatsApp, plus Glovo and Chowdeck where the flyer lists them

Slides use verified photos only, starting with labeled drinks in `img/Food_Pictures` (for example Beet Berry Boost). Plated photos join a slide only after the dish is identified. The carousel must not show an empty slide or a repeated last tile to fill a row.

**Menu**

Grouped as on the flyers, with name and price on every item, plus the flyer’s own line under it: calories and protein, “chicken or fish”, “no sausage”, “3 pieces”, platter contents, and combo contents. A drink or side with no line on the flyer stays bare. Each group is a tab. A group shows a cover photo only when a real photo of that kind of dish exists; otherwise it gets a typographic red cover. Items with an identified photo show as picture cards; every other item is a priced row with a WhatsApp order button. Without JavaScript all groups stay visible.

Healthy Meals: Breakfast, Salads, Mains, Sides, Shawarma, Smoothies, Fresh Juices, Combos.

Ahead Grills: Quickie (chicken and turkey), Fishy, Companions, Platters, Shawarma, Smoothies, Fresh Juices.

Hours on both: open and delivery 7am–7:30pm daily. Phone 08066203522.

The venue photo grid stays below the menu and keeps its current row-complete behaviour.

## Meal Plans page

`meal-plans.html`, linked from Food and from the homepage Eat tile. Content and data live in `js/meal-plans.js`; prices stay in `PLANS` in `js/food-catalog.js`. `js/plan-switch.js` runs the Build/Lean switch.

| | Build | Lean |
|---|---|---|
| Aim | Muscle and protein | Weight loss and fat reduction |
| Headline | Eat more. Build more. | Eat ahead. Live leaner. |
| For scans that show | Low skeletal muscle, low protein | High body fat, excess visceral fat, high metabolic age |
| 2 weeks (12 days) | ₦290,000 | ₦270,000 |
| 4 weeks (24 days) | ₦550,000, saving ₦30,000 | ₦530,000, saving ₦10,000 |
| Headline number | 120g protein a day on average, against a 120g target | 1,289 calories a day on average |
| Estimate | Gradual muscle change, tracked on a re-scan | About 1.9kg in 2 weeks, about 3.8kg in 4 weeks, diet only |

Averages, savings, and estimates are computed from the transcribed rotation and prices, not copied from the flyers. The flyers disagree with themselves on a few of these numbers (for example, a ₦18,000 Lean saving and a 1,272 calorie average). The Lean estimate uses a 2,500 kcal day and 7,700 kcal per kg, as the flyer does.

**Sections, top to bottom**

1. Hero: the plan headline, a Build/Lean switch, and a plate photo inside a six-segment ring (Monday to Saturday) with the headline number and starting price.
2. Start with your scan: both plans side by side with scan flags, promises, both prices, the saving, and a WhatsApp subscribe button.
3. A red band of facts: 2 meals, 2 drinks, 6 days, 12 grill nights, and the plan's headline number.
4. A 24-day bar chart: daily protein against the 120g line (Build), or daily calories against the 2,500 kcal line (Lean). Grill nights are red.
5. Four weeks on the plate: every week of the active plan as an expandable section, with Week 1 open. Each day shows breakfast and dinner with calories, protein, and the paired drink, plus the day total. Dishes with an identified photo get a thumbnail.
6. In every delivery: what is included, and drink sizes (smoothies 10oz; juices, zobo, and yoghurt drinks 35cl).
7. How it works: choose, share an address, eat, re-scan. Pausing is up to 5 days per plan with 24 hours' notice, with paused days added to the end.
8. Subscribe: WhatsApp per plan, a call button for 08066203522, and the three kitchens with hours (open 8am–8pm, deliveries 9am–7pm).

The switch reads `#build` or `#lean` from the address, and the site search links to both. Without JavaScript the switch stays hidden and both plans show in full.

## Build order

1. Shared menu on all 19 pages, and the homepage worlds strip.
2. Healthy Meals and Grills skins, menus, and labeled carousels.
3. Meal Plans page, linked from Eat and the homepage.
4. Spa and salon skins.

Gym page interiors stay as they are in passes 1–3.

## Tests

The site is static HTML, CSS, and JS. Add a Node test file that checks:

- Every page’s desktop and mobile menus contain Gym, Food, and Spa & Salon, and Food contains Meal Plans.
- No menu parent still points at `#locations`.
- Build and Lean prices match the figures in this spec, and each week of the rotation adds up to the flyer's weekly total.
- Every carousel slide has a name, a price, and an image path that exists.
- Food galleries that remain on the page still fill each row at the breakpoints those galleries already use.

## Out of scope

- Card or transfer checkout
- A new Gwarinpa meals page
- Compressing the existing multi-megabyte photo library
- Rewriting gym, pricing, or BMI content
