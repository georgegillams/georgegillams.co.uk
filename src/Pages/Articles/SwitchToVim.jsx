import React from 'react';
import PropTypes from 'prop-types';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import TextLink from '../../components/TextLink';

// import STYLES from '../pages.scss';
//
// const getClassName = className => STYLES[className] || 'UNKNOWN';
const DATE_WRITTEN = new Date(2017, 11, 23, 14, 3, 0);
const PAGE_ID = 729471;

/* eslint-disable max-len */
const SwitchToVim = (props) => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) { classNameFinal.push(className); }

  return (
    <main className={classNameFinal.join(' ')} {...rest} >
      <Section name="Switching to Vim">
        <ArticleDate date={DATE_WRITTEN} />
        <SubSection name="Why I did it">
	It started with the classic situation of knowing someone at work who is some sort of Vim Jedi. I was in awe of his workflow since I arrived and soon decided that if I could dance around my code like he does I&apos;d be able to achieve far more with every hour in my day. As I&apos;m currently juggling a Masters, a part-time Software Engineering job, and going on more holidays than the average student, that seemed a nice prospect. Maybe I&apos;d even find enough save myself enough time to start contributing to Mozilla, which I&apos;ve been trying to fit in for a while!
        </SubSection>
        <SubSection name="Getting started">
        I started by getting hooked on vim-adventures - an online game designed to teach you all the Vim commands. It was odd, because I haven&apos;t played a video game for at least 5 years, but something about it was strangely addictive (maybe the fact that it wasn&apos;t group coursework?!).
	<br />
          <br />
          The next step was to install <TextLink href="https://atom.io/packages/vim-mode-plus">vim-mode-plus</TextLink> for Atom (currently my JS editor of choice). Tbh I thought my Atom setup wasn&apos;t half bad - I was barely touching the mouse and was often editing more than 1 line of code at a time - but adding in vim features made me realise that I was actually missing out on a lot of handy shortcuts. Before long I'd ditched Atom for Neovim, enabled Vim mode in my .zshrc and installed Vimium for Firefox as I wanted to use Vim everywhere.
        <br />
          <br />
          <SubSection name="Learning Curve">
          A lot of people told me that learning Vim was a terrible mistake simply due to the learning curve. A lot of bloggers deemed their productivity in the coming weeks far too precious to invest time in increasing their productivity long-term, but despite my work-load and approaching deadlines I stuck with it. I guess I spent around a week at half speed as I found my way around and configured all the Plugins I wanted, and maybe I haven't yet even got back up to full-speed, but I'm getting faster every day. I've learnt a new, awesome tool which has changed my outlook on how code should be written. And so far I've only scratched the surface of what it is capable of. So, was it worth it? Hell yes!
        <br />
            <br />
            <SubSection name="My new workflow">
            As it happens, I've switched back to Atom for it's modern UI, powerful search features and the packages I'm already familiar with. But I'm certainly going to be keeping <TextLink href="https://atom.io/packages/vim-mode-plus">vim-mode-plus</TextLink> and using the mouse a lot less!
            My speed of work is much greater for learning and using Vim, and the amount of time I will save in the coming weeks/months/years will definitely be worth the learning process.
            </SubSection>
          </SubSection>
        </SubSection>
      </Section>
      <Comments pageId={PAGE_ID} />
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
