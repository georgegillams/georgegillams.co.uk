import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const Contact = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [getClassName('pages__page')];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Get in touch" >
        <a className={getClassName('pages__link')} href="tel:+447867592615" rel="noopener noreferrer" target="_blank">
          <SubSection name="Phone me" />
        </a>
        <a className={getClassName('pages__link')} href="mailto:georgegillams@hotmail.co.uk" rel="noopener noreferrer" target="_blank">
          <SubSection name="Email me" />
        </a>
        <a className={getClassName('pages__link')} href="https://georgegillams.typeform.com/to/oBmiJZ" rel="noopener noreferrer" target="_blank">
          <SubSection name="Contact me online" />
        </a>
      </Section>
    </main>
  );
};
// <div dangerouslySetInnerHTML={{ __html: thisIsMyCopy }} />

export default Contact;
