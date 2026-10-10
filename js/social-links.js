'use strict';

var ACCOUNTS = {
  fitness: {
    instagram: 'https://www.instagram.com/ahead_fitness301',
    tiktok: 'https://www.tiktok.com/@ahead.fitness'
  },
  meals: {
    instagram: 'https://www.instagram.com/af_healthybites',
    tiktok: 'https://www.tiktok.com/@aheadhealthymeals'
  },
  grills: {
    instagram: 'https://www.instagram.com/af_grills01',
    tiktok: 'https://www.tiktok.com/@afgrills1'
  },
  spa: {
    instagram: 'https://www.instagram.com/ahead_fitness_spa',
    tiktok: 'https://www.tiktok.com/@aheadfitnessspa'
  },
  female: {
    instagram: 'https://www.instagram.com/aheadfitnessfemalegym',
    tiktok: 'https://www.tiktok.com/@aheadfitnessfemalegym'
  }
};

var PAGE_ACCOUNT = {
  'healthy-meals-kubwa.html': 'meals',
  'healthy-meals-karu.html': 'meals',
  'meal-plans.html': 'meals',
  'ahead-fitness-grills-karu.html': 'grills',
  'spa-gwarinpa.html': 'spa',
  'spa-dantata.html': 'spa',
  'spa-karu.html': 'spa',
  'female-gym-gwarinpa.html': 'female'
};

function accountFor(filename) {
  if (!filename || typeof filename !== 'string') {
    throw new Error('A page name is required');
  }
  var key = Object.prototype.hasOwnProperty.call(PAGE_ACCOUNT, filename) ? PAGE_ACCOUNT[filename] : 'fitness';
  var account = ACCOUNTS[key];
  ['instagram', 'tiktok'].forEach(function (network) {
    if (account[network].indexOf('?') !== -1) {
      throw new Error('Social links must not include query parameters: ' + account[network]);
    }
  });
  return account;
}

function socialLink(href, label, inner) {
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" aria-label="' + label + '">' + inner + '</a>';
}

function renderSocialLinks(filename) {
  var account = accountFor(filename);
  return socialLink(account.instagram, 'Instagram', '<i class="fa-brands fa-instagram" aria-hidden="true"></i>') +
    socialLink(account.tiktok, 'TikTok', '<i class="fa-brands fa-tiktok" aria-hidden="true"></i>');
}

module.exports = {
  ACCOUNTS: ACCOUNTS,
  accountFor: accountFor,
  renderSocialLinks: renderSocialLinks
};
