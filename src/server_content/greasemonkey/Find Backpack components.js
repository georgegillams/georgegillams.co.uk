// ==UserScript==
// @name        Find Backpack components
// @namespace   urn://https://www.georgegillams.co.uk/api/greasemonkey/find_backpack_components
// @include     *
// @version     3
// @description:en  Identifies Backpack components by making them red
// @grant    		none
// ==/UserScript==

function fixButtons() {
  const allElements = document.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i += 1) {
    const element = allElements[i];
    const elementClassName = `${element.className}`;
    if (elementClassName.includes('bpk-')) {
      console.log('found it!');
      console.log(element);
      element.style.backgroundImage = 'none';
      element.style.backgroundColor = 'red';
    }
  }
}

fixButtons();
setInterval(fixButtons, 5000);
