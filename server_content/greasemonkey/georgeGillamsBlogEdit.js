// ==UserScript==
// @name        georgegillams.co.uk blog edit
// @namespace   urn://https://www.georgegillams.co.uk/api/greasemonkey/george_gillams_blog_edit
// @include     https://www.georgegillams.co.uk/*
// @exclude     none
// @version     1
// @description:en	Adds an edit button to blogs on my personal website
// @grant    		none
// ==/UserScript==

let linkAdded = false;

function addEditButton() {
  if (linkAdded) {
    return;
  }

  if (`${window.location}`.includes('blog/view/?id=')) {
    const blogId = `${window.location}`.split('blog/view/?id=')[1];
    // console.log(blogId);
    // console.log('its a blog page');
    const blogElement = document.getElementById('greasy_blog_handle');
    if (blogElement) {
      blogElement.innerHTML =
        `<a style="text-decoration: none;font-weight: bold;font-size: 1.5rem;font-family: Quattrocento Sans,sans-serif;color: cornflowerblue;" href=/admin/blog-editor?id=${ 
        blogId 
        }>EDIT THIS BLOG</a> <br/> <br/>${ 
        blogElement.innerHTML}`;
      linkAdded = true;
    }
  }
}

setTimeout(addEditButton, 500);
