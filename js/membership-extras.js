'use strict';

const { renderNavItems, renderAppStoreLinks } = require('./world-nav');

function renderMembershipExtrasPage() {
  const nav = renderNavItems('membership-extras.html');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Explore Ahead Fitness membership extras: guest passes, loyalty rewards, and flexible subscription pauses." />
  <title>Membership Extras | Ahead Fitness</title>
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
<body class="brand-gym">
  <div id="preloder"><div class="loader"></div></div>
  <button type="button" class="offcanvas-menu-overlay" aria-label="Close navigation menu"></button>
  <div class="offcanvas-menu-wrapper" aria-hidden="true">
    <a class="mobile-menu-brand" href="./index.html" aria-label="Ahead Fitness home"><img src="img/logo2.png" alt="" /><span>AHEAD FITNESS<small>TRAIN · MOVE · THRIVE</small></span></a>
    <button type="button" class="canvas-close" aria-label="Close navigation menu"><i class="fa fa-close"></i></button>
    <button type="button" class="canvas-search search-switch" aria-label="Search the website" aria-controls="site-search"><i class="fa fa-search"></i></button>
    ${renderAppStoreLinks('mobile')}
    <nav id="mobile-menu" class="canvas-menu mobile-menu" aria-label="Mobile navigation"><ul>
${nav}
    </ul></nav>
    <div id="mobile-menu-wrap"></div>
    <div class="canvas-social"><a href="https://www.instagram.com/ahead_fitness301" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="https://www.tiktok.com/@ahead.fitness" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></div>
  </div>
  <header class="header-section"><div class="container-fluid"><div class="row justify-content-center align-items-center">
    <div class="col-lg-2"><div class="logo"><a href="./index.html"><img src="img/logo2.png" alt="Ahead Fitness" style="max-height: 100px; width: auto" /></a></div></div>
    <div class="col-lg-8"><nav class="nav-menu"><ul class="nav">
${nav}
    </ul></nav></div>
    <div class="col-lg-2"><div class="top-option">${renderAppStoreLinks('desktop')}<button type="button" class="to-search search-switch" aria-label="Search the website" aria-controls="site-search"><i class="fa fa-search"></i></button><div class="to-social"><a href="https://www.instagram.com/ahead_fitness301" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="https://www.tiktok.com/@ahead.fitness" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></div></div></div>
  </div><button type="button" class="canvas-open" aria-label="Open navigation menu" aria-controls="mobile-menu" aria-expanded="false"><i class="fa fa-bars"></i></button></div></header>
  <main>
    <header class="membership-extras-hero"><p class="brand-kicker"><span aria-hidden="true"></span>Membership extras</p><h1>More than <em>the gym.</em></h1><p>Guest passes, loyalty points, and a pause button when life gets in the way. All in the Ahead Fitness app.</p><nav class="membership-extras-jump" aria-label="Membership extras"><a href="#guest-pass">Guest passes</a><a href="#rewards">Loyalty points</a><a href="#pause-plan">Pause your plan</a></nav></header>
    <section class="gym-perks" id="perks" aria-labelledby="gym-perks-title">
      <div class="brand-heading"><p class="brand-kicker"><span aria-hidden="true"></span>Membership extras</p><h2 id="gym-perks-title">More than <em>the gym.</em></h2><p class="gym-perks__lede">Guest passes, loyalty points, and a pause button when life gets in the way. All of it lives in the Ahead Fitness app.</p></div>
      <article class="gym-perk" id="guest-pass"><p class="gym-perk__badge">100% free for members</p><h3>Guest <em>passes</em></h3><p class="gym-perk__intro">Bring a friend to train with you — on us.</p><h4>How it works</h4>
        <ol class="gym-perk__steps"><li><strong>Open the Guest Pass section</strong><span>In the app, go to Complimentary Guest Passes and fill in your guest’s details — full name, and their phone number or email.</span></li><li><strong>We send the activation code</strong><span>Your guest instantly receives an email and SMS containing their unique activation code.</span></li><li><strong>Guest activates and trains</strong><span>When your guest signs up and enters the code, their guest pass appears automatically — ready to use.</span></li></ol>
        <h4>How many you get</h4><dl class="gym-perk__counts"><div><dt>Monthly</dt><dd><strong>1</strong><span>pass</span></dd></div><div><dt>Quarterly</dt><dd><strong>4</strong><span>passes</span></dd></div><div><dt>Half Yearly</dt><dd><strong>9</strong><span>passes</span></dd></div><div><dt>Yearly</dt><dd><strong>20</strong><span>passes</span></dd></div></dl>
        <h4>Good to know</h4><ul class="gym-perk__notes"><li>Guest passes are tied to your subscription — they can only be used while your plan is active.</li><li>Any passes not used before your plan ends will lapse.</li><li>Each guest pass is valid for one day and expires if the code isn’t used.</li><li>No code handy? Guests can also activate at the front desk — just have them show up.</li><li>Check how many passes you have left anytime in the Guest Pass section.</li></ul>
      </article>
      <article class="gym-perk" id="rewards"><p class="gym-perk__badge">New member rewards</p><h3>Earn points for <em>everything</em></h3><p class="gym-perk__intro">Every naira you spend, every visit, every referral — turn it into rewards you can redeem.</p>
        <div class="gym-perk__unlock"><p>What your points unlock</p><strong>Free memberships, PT, spa, and shopping</strong><ul><li>Memberships</li><li>Personal training</li><li>Spa treatments</li><li>Healthy Meals</li><li>Grills</li><li>Merchandise</li></ul></div>
        <h4>Bonus points for</h4><div class="gym-perk__bonuses"><section><h5>Quick start</h5><ul><li><span>Activate in 7 days</span><strong>1,000 pts</strong></li><li><span>Activate in 30 days</span><strong>500 pts</strong></li></ul></section><section><h5>Longer plans</h5><ul><li><span>Quarterly</span><strong>+1,500 pts</strong></li><li><span>Half-Yearly</span><strong>+4,000 pts</strong></li><li><span>Yearly</span><strong>+10,000 pts</strong></li></ul></section><section><h5>Stay active</h5><ul><li><span>20 visits in a month</span><strong>1,000 pts</strong></li><li><span>Renew before expiry</span><strong>500 pts</strong></li></ul></section><section><h5>Special days</h5><ul><li><span>Your birthday</span><strong>1,000 pts</strong></li><li><span>Membership anniversary</span><strong>500 pts</strong></li></ul></section><section class="gym-perk__bonuses-wide"><h5>Spread the word</h5><ul><li><span>Refer a friend</span><strong>5% of their first payment</strong></li><li><span>App Store or Google review</span><strong>500 pts each</strong></li><li><span>Social mention on Instagram, TikTok, or YouTube</span><strong>200 pts</strong></li></ul></section></div>
        <p class="gym-perk__app">Update the Ahead Fitness app to start earning. Available on the App Store and Google Play.</p>
      </article>
      <article class="gym-perk" id="pause-plan"><p class="gym-perk__badge">Need time off?</p><h3>Pause your <em>plan</em></h3><p class="gym-perk__intro">Each member may pause a subscription for a minimum of 5 consecutive days, and for up to 30 days within a calendar year.</p>
        <ul class="gym-perk__facts"><li><strong>5 days</strong><span>Minimum pause</span></li><li><strong>30 days</strong><span>Maximum each year</span></li><li><strong>24 hours</strong><span>Customer Service activates it</span></li></ul><h4>How to pause in the app</h4>
        <ol class="gym-perk__steps"><li><strong>Open Plans</strong><span>Log in to the Ahead Fitness app and select the Plans icon at the bottom right of the screen.</span></li><li><strong>Tap Pause</strong><span>In Plans, click the Pause button at the top right, next to the details of your current plan.</span></li><li><strong>Confirm the request</strong><span>Choose the reason for pausing, then click Pause Plan. Customer Service will activate the pause within 24 hours.</span></li></ol><p class="gym-perk__app">You can also contact the support team via in-app chat for help pausing your subscription.</p>
      </article>
    </section>
  </main>
  <section class="footer-section"><div class="container"><div class="row"><div class="col-lg-12 text-center"><div class="fa-social"><a href="https://www.instagram.com/ahead_fitness301" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a><a href="https://www.tiktok.com/@ahead.fitness" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a></div><div class="copyright-text"><p>Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | Ahead Fitness</p></div></div></div></div></section>
  <script src="js/jquery-3.3.1.min.js"></script><script src="js/bootstrap.min.js"></script><script src="js/jquery.magnific-popup.min.js"></script><script src="js/masonry.pkgd.min.js"></script><script src="js/jquery.barfiller.js"></script><script src="js/jquery.slicknav.js"></script><script src="js/owl.carousel.min.js"></script><script src="js/main.js"></script>
  <div class="search-model" id="site-search" role="dialog" aria-modal="true" aria-labelledby="search-dialog-title" aria-hidden="true" hidden><div class="h-100 d-flex align-items-center justify-content-center"><button type="button" class="search-close-switch" aria-label="Close search">×</button><form class="search-model-form" role="search"><h2 id="search-dialog-title">Search Ahead Fitness</h2><label class="visually-hidden" for="search-input">Search the website</label><div class="search-input-row"><input type="search" id="search-input" placeholder="Search services, locations, and more…" autocomplete="off" /><button type="submit" class="search-submit">Search</button></div><div class="search-results" id="search-results" aria-live="polite"><p class="search-hint">Start typing to find pages and sections.</p></div></form></div></div>
  <script src="js/search.js"></script>
</body>
</html>
`;
}

module.exports = { renderMembershipExtrasPage };
