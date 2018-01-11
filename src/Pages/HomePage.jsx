import React from 'react';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import { Carousel } from 'react-responsive-carousel';
import Slider from 'react-slick';
import iceland0 from './Travel/images/iceland0.jpg';
import iceland1 from './Travel/images/iceland1.jpg';
import iceland2 from './Travel/images/iceland2.jpg';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const HomePage = () => (
  <main>
    <Slider
      dots
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
    >
      <div><h3 /></div>
      <div><h3 /></div>
      <div><h3 /></div>
      <div><h3 /></div>
      <div><h3 /></div>
      <div><h3 /></div>
    </Slider>
    <div className={getClassName('pages__home-page-tree')}>
      <div>
        <SubSection className={getClassName('pages__home-page-item')} name="Articles 📝">
          <a className={getClassName('pages__link')} href="/articles/vim">
          Switching to Vim
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/articles/net-neutrality">
          My Take on Net Neutrality
          </a>
        </SubSection>
        <SubSection className={getClassName('pages__home-page-item')} name="Travel ✈️">
          {/* <a className={getClassName('pages__link')} href="https://flic.kr/s/aHsm9VxHMV"> */}
          <a className={getClassName('pages__link')} href="/travel/iceland-2018">
          Iceland
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/travel/longleat-2017">
          Longleat
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/travel/munich-2017">
          Munich
          </a>
        </SubSection>
        {/* <SubSection className={getClassName('pages__home-page-item')} name="Documents 🥇">
        <a className={getClassName('pages__link')} href="/documents/degree">
         Degree Certificate - 2018
        </a>
        <br />
      </SubSection> */}
        <SubSection className={getClassName('pages__home-page-item')} name="Other stuff 🤷‍♂️">
          <a className={getClassName('pages__link')} href="/about">
          About me
          </a>
          <br />
          <a className={getClassName('pages__link')} href="/contact">
          Contact
          </a>
        </SubSection>
      </div>
    </div>
  </main>
);

export default HomePage;
