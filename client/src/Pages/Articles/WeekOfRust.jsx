import React from 'react';
import PropTypes from 'prop-types';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import TextLink from '../../components/TextLink';
import Quote from '../../components/Quote';
import ScrollIndicator from '../../components/ScrollIndicator';
import PageSwitchScroller from '../../components/PageSwitchScroller';

const DATE_WRITTEN = new Date(2018, 2, 4, 17, 16, 0);
const PAGE_ID = 918651;

const WeekOfRust = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <br />
      <PageSwitchScroller />
      <Section name="A week of Rust development">
        <ArticleDate date={DATE_WRITTEN} />
        <SubSection name="Previous Experience">
          I&apos;m not a low level programmer...
        </SubSection>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

WeekOfRust.propTypes = {
  className: PropTypes.string,
};

WeekOfRust.defaultProps = {
  className: null,
};

export default WeekOfRust;
