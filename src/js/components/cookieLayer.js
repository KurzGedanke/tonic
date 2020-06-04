let cookieLayer = document.getElementById('cookie-layer__wrapper');
let selectAllButton = document.getElementById('selectAllButton');
let selectSomeButton = document.getElementById('selectSomeButton');
let checkBoxAnalysis = document.getElementById('analyse');
let checkBoxThirdParty = document.getElementById('thirdParty');
let localeStorageKey = 'cookie-layer';

function selectAll() {
  store.set(localeStorageKey, {
    tracking: true,
    thridParty: true
  });
}

function selectSome() {
  store.set(localeStorageKey, {
    tracking: checkBoxAnalysis.checked,
    thridParty: checkBoxThirdParty.checked
  });
}

selectAllButton.onclick = function () {
  selectAll();
  _paq.push(['setConsentGiven']);
  checkCookieLayer();
};

selectSomeButton.onclick = function () {
  selectSome();
  checkCookieLayer();
};

function checkCookieLayer() {
  console.log("checkCookieLayer");
  if (localStorage.getItem(localeStorageKey)) {
    cookieLayer.classList.add('hide-it');
  } else {
    cookieLayer.classList.remove('hide-it');
  }
}

function initCookieLayer() {
  console.log("INITCOOKIELAYER");
  checkCookieLayer();
}

document.addEventListener("DOMContentLoaded", function(event) {
  //do work
});

function toggleDetails() {
  let detailsButton = document.getElementById('details_button');
  let details = document.getElementById('details-text');

  detailsButton.onclick = function () {
    if (details.classList.contains('hide-it-details')) {
      details.classList.remove('hide-it-details');
      details.setAttribute('aria-expanded', 'true');
    } else {
      details.classList.add('hide-it-details');
      details.setAttribute('aria-expanded', 'false');
    }
  };
}
