import React from 'react';
import PropTypes from 'prop-types';
import BpkText from 'bpk-component-text';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';

// import STYLES from '../pages.scss';
//
// const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const SwitchToVim = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Switching to Vim">
        {/* <SubSection name="Abstract">
          TODO
        </SubSection> */}
        <SubSection name="Why?">
	It started with the classic situation of knowing someone at work who is some sort of Vim jedi. I was in awe of his workflow since I arrived, and soon realised that if I could dance around my code like he does I'd soon be able to achieve far more with every hour in my day. As I&apos;m currently juggling a Masters, a part-time Software Engineering job, and going on more holidays than the average student, that seemed a nice prospect. Maybe I&apos;d even find enough time to contribute to Mozilla, which I&apos;ve been trying to fit in for a while!
        </SubSection>
        <SubSection name="Getting started">
        I started by getting hooked on vim-adventures - an online game designed to teach you all the Vim commands. It was odd, because I havn't played a video game for at least 5 years, but something about it was strangely addictive (maybe the fact that it wasn't group coursework?!).
	<br />
          <br />
	The next step was to install vim-mode-plus for Atom (currently my JS editor of choice). I thought my Atom setup wasn't half bad - I was rarely touching the mouse and was often editting more than 1 line of code at a time - but adding in vim features made me realise just how much I was missing.
        </SubSection>
      </Section>
    </main>
  );
};

SwitchToVim.propTypes = {
  className: PropTypes.string,
};

SwitchToVim.defaultProps = {
  className: null,
};

export default SwitchToVim;
