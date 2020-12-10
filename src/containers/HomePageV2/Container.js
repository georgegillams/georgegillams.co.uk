import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';
import PageTitle from 'components/common/PageTitle';
import WorkSection from 'components/HomePageV2/WorkSection';

import STYLES from './home.scss';

const getClassName = cssModules(STYLES);

const HomePage = props => {
  const { ...rest } = props;

  return (
    <PageTitle name="Hey! I'm George." pageTitle="Home" {...rest}>
      <WorkSection className={getClassName('home__work-section')} />
      <WorkSection className={getClassName('home__work-section')} />
      <WorkSection className={getClassName('home__work-section')} />
      <WorkSection className={getClassName('home__work-section')} />
      <WorkSection className={getClassName('home__work-section')} />
    </PageTitle>
  );
};

HomePage.propTypes = {
  className: PropTypes.string,
};

HomePage.defaultProps = {
  className: null,
};

export default HomePage;
