// ==UserScript==
// @name        secure ecs
// @namespace   urn://https://www.georgegillams.co.uk/api/greasemonkey/secureEcs_download
// @include     https://*.ecs.soton.ac.uk/*
// @exclude     none
// @version     1
// @grant    		none
// ==/UserScript==

const allElements = document.getElementsByTagName("*");
for (let i = 0; i < allElements.length; i += 1) {
  const element = allElements[i];
  if (element.tagName === "A") {
    element.style.color = "cornflowerblue";
    element.style.textDecoration = "none";
    element.style.border = "none";
    element.style.border = "none";
    element.style.backgroundColor = "transparent";
  }
  if (element.tagName === "SPAN") {
    element.style.backgroundColor = "white";
    element.style.color = "cornflowerblue";
    element.style.textDecoration = "none";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (
    element.tagName === "SELECT" ||
    element.style.backgroundColor.toString() === "rgb(221, 187, 187)"
  ) {
    element.style.backgroundColor = "cornflowerblue";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (element.style.backgroundColor.toString() === "rgb(241, 227, 227)") {
    element.style.backgroundColor = "whitesmoke";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (
    element.style.backgroundColor.toString() === "rgb(138, 76, 81)" ||
    element.className === "intra_menu_title" ||
    element.className === "intra_menu" ||
    element.className === "handin_sectiontitle"
  ) {
    element.style.backgroundColor = "rgb(0,93,137)";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (element.style.color.toString() === "rgb(138, 76, 81)") {
    element.style.color = "rgb(0,93,137)";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (
    element.className === "ecsmenu" ||
    element.className.includes("ecs_intra_student") ||
    element.tagName === "DT"
  ) {
    element.style.backgroundColor = "transparent";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (element.tagName === "H1") {
    element.style.color = "cornflowerblue";
    element.style.borderColor = "cornflowerblue";
  }
  if (element.className === "intra_menu" || element.tagName === "DT") {
    element.style.backgroundColor = "transparent";
    element.style.borderColor = "rgb(0, 93, 137)";
  }
  if (element.className === "tableerror") {
    element.style.backgroundColor = "rgb(255,150,150)";
  }
  if (
    element.src ===
    "https://secure.ecs.soton.ac.uk/style/images/header/ecs_logo.gif"
  ) {
    element.src =
      "https://www.southampton.ac.uk/assets/site/design/images/uos-brand.png";
  }
  if (
    element.src ===
      "https://secure.ecs.soton.ac.uk/style/images/header/go.gif" ||
    element.src === "titlebar_icon_a.png" ||
    element.className === "round_box_title"
  ) {
    element.style.filter = "hue-rotate(210deg)";
  }
  if (element.id === "title") {
    element.style.backgroundImage = "none";
    element.style.backgroundColor = "rgb(0,93,137)";
  }
}
