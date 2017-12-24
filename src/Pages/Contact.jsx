import React from 'react';
import { Helmet } from 'react-helmet';
import renderHTML from 'react-render-html';
import DOMPurify from 'dompurify';

// const thisIsMyCopy = '<script type="text/javascript" defer src="//www.123formbuilder.com/embed/3282738.js" data-role="form" data-default-width="650px" />';
const thisIsMyCopy = '<iframe style="border: none;width: 100%;height: 40rem;" src="http://www.123formbuilder.com/form-3282738/My-Form"></iframe> ';

const Contact = () => (
  <div>
    <h2>Get in touch</h2>
    <div dangerouslySetInnerHTML={{ __html: thisIsMyCopy }} />
  </div>
);

// {renderHTML('<script type="text/javascript" defer src="//www.123formbuilder.com/embed/3282738.js" data-role="form" data-default-width="650px" />')}

export default Contact;
