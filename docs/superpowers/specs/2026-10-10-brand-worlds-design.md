# Brand worlds

**Date:** 2026-10-10
**Status:** Ready for review

## Goal

Keep one Ahead Fitness identity, and make each brand feel like its own place. Food and meal plans should be obvious from the homepage, and the food itself should be what sells Ahead Grills and Healthy Meals.

## Locked decisions

- Main menu is **Home, Train, Eat, Restore, Careers** on desktop and mobile, on every page.
- Meal Plans live under **Eat**.
- Subscribing is a call or WhatsApp to **08066203522**. There is no on-site checkout.
- The logo, header structure, and footer stay shared. Colour, photography, and layout change per brand.
- A dish photo is labeled only when the picture or its existing name identifies that dish. Menu text from the flyers can appear without a photo. Unidentified plates stay in the venue gallery.

## Menu

Parent items open their submenu. They do not link to `#locations`.

**Train**

- Danglo Plaza, Gwarinpa
- All Female Gym, Gwarinpa
- Kubwa (Chikakore)
- Kubwa (Dantata)
- Karu
- Membership → homepage `#pricing`
- BMI → homepage `#bmi`
- About → homepage `#about`

**Eat**

- Healthy Meals Kubwa
- Healthy Meals Karu
- Ahead Grills Karu
- Meal Plans → new `meal-plans.html`

**Restore**

- Ahead Fitness Spa Gwarinpa
- Ahead Fitness Spa Dantata
- Ahead Fitness Spa Karu
- Ahead Barbers Unisex Salon, Nadrem
- Ahead Barbers & Beauty Salon, Kubwa

**Careers** stays a direct link. Contact stays on each page’s own contact area and is not a sixth top-level item.

The homepage keeps its current About, gym services, pricing, and BMI sections. Those links move under Train so the bar stays short.

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
| Meal Plans | `brand-plans` | Site palette. Build is a black card; Lean is a white card with a red top rule. |
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

Grouped as on the flyers, with name and price on every item. Each group is a tab. A group shows a cover photo only when a real photo of that kind of dish exists; otherwise it gets a typographic red cover. Items with an identified photo show as picture cards; every other item is a priced row with a WhatsApp order button. Without JavaScript all groups stay visible.

Healthy Meals: Breakfast, Salads, Mains, Sides, Shawarma, Smoothies, Fresh Juices, Combos.

Ahead Grills: Quickie (chicken and turkey), Fishy, Companions, Platters, Shawarma, Smoothies, Fresh Juices.

Hours on both: open and delivery 7am–7:30pm daily. Phone 08066203522.

The venue photo grid stays below the menu and keeps its current row-complete behaviour.

## Meal Plans page

`meal-plans.html`, linked from Eat and from the homepage Eat tile.

Two plans, side by side:

| | Build | Lean |
|---|---|---|
| Aim | Muscle and protein | Weight loss and fat reduction |
| 2 weeks | ₦290,000 | ₦270,000 |
| 4 weeks | ₦550,000 | ₦530,000 |
| Rhythm | 2 meals + 2 drinks, 6 days a week, Monday–Saturday | Same |
| Signal | About 121g protein a day, daily whey shake, 12 grill nights in 4 weeks | About 1,272 calories a day |
| Flyer estimate | Muscle change is gradual and is tracked on a re-scan | About 1.9kg in 2 weeks, about 3.8kg in 4 weeks, diet only |

Both plans say results vary, and that training at Ahead Fitness is what the flyers pair with the food. Build is recommended when a BIA scan flags low muscle or low protein. Lean is recommended when a scan flags high fat, excess visceral fat, or a high metabolic-age gap.

**How it works**

1. Choose the 2-week or 4-week plan. Plans start on Monday. Pay by the Sunday before.
2. Send a delivery address and a good time. Delivery is home, office, or gym.
3. Meals and drinks arrive together, six days a week.
4. Re-scan on the Bio Impedance Analyser at any Ahead Fitness location every 2–4 weeks.

A plan can pause for up to 5 days in a plan period, with at least 24 hours’ notice. Paused days are added to the end.

The page shows Week 1 from each flyer only: the six days, with breakfast and dinner names. It does not print the full four-week rotation.

The subscribe button opens WhatsApp on +234 806 620 3522 with a prefilled message naming the plan. The same number is shown for calls.

## Build order

1. Shared menu on all 19 pages, and the homepage worlds strip.
2. Healthy Meals and Grills skins, menus, and labeled carousels.
3. Meal Plans page, linked from Eat and the homepage.
4. Spa and salon skins.

Gym page interiors stay as they are in passes 1–3.

## Tests

The site is static HTML, CSS, and JS. Add a Node test file that checks:

- Every page’s desktop and mobile menus contain Train, Eat, and Restore, and Eat contains Meal Plans.
- No menu parent still points at `#locations`.
- Build and Lean prices match the figures in this spec.
- Every carousel slide has a name, a price, and an image path that exists.
- Food galleries that remain on the page still fill each row at the breakpoints those galleries already use.

## Out of scope

- Card or transfer checkout
- A new Gwarinpa meals page
- Compressing the existing multi-megabyte photo library
- Rewriting gym, pricing, or BMI content
