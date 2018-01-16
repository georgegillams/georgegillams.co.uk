import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import GetSocial from '../components/GetSocial';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Contact = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Get in touch" >
        <a href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <SubSection name="Call +44 (0) 786759 2615" link />
        </a>
        <a href="mailto:g@georgegillams.co.uk" rel="noopener noreferrer" target="_blank">
          <SubSection name="Email g@georgegillams.co.uk" link />
        </a>
        <a href="https://georgegillams.typeform.com/to/oBmiJZ" rel="noopener noreferrer" target="_blank">
          <SubSection name="Contact me online" link />
        </a>
      </Section>
    </main>
  );
};
// <div dangerouslySetInnerHTML={{ __html: thisIsMyCopy }} />

export default Contact;
