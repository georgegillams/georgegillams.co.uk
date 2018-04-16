// ==UserScript==
// @name        GuruShots Boost
// @namespace   urn://https://www.georgegillams.co.uk/api/greasemonkey/guruShotsBoost_download
// @include     https://gurushots.com/*
// @exclude     none
// @version     2
// @description:en	Makes the boost buttons on GuruShots.com stand out more when a free boost is available.
// @grant    		none
// ==/UserScript==

function checkForFreeBoosts() {
  const allElements = document.getElementsByTagName('DIV');
  for (let i = 0; i < allElements.length; i += 1) {
    const element = allElements[i];
    if (element.className.includes('boost')) {
      if (
        element.className.includes('boost--boosting') ||
        element.className.includes('boost-state-locked') ||
        element.className.includes('boost-state-used')
      ) {
        continue;
      }
      element.style.backgroundColor = 'red';
      element.style.color = 'white';
      element.style.borderColor = 'black';
      element.style.opacity = '1';
    }
  }
}

setInterval(checkForFreeBoosts, 5000);
