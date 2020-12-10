import React from 'react';
import PropTypes from 'prop-types';
import { NavigationBar } from 'gg-components/NavigationBar';
import NavigationItem from 'components/common/NavigationItem';
import SmallButtonSkeleton from 'gg-components/Skeletons/SmallButtonSkeleton';
import BurgerButtonWrapper from './BurgerButtonWrapper';

import Logo from 'components/Logo';

const NavigationBarWrapper = props => {
  const { authenticatorState } = props;
  const { user } = authenticatorState;

  const accountItem = <NavigationItem name={'Home page v2'} href={'/home-v2'} />;

  const adminItem = user && user.admin ? <NavigationItem name="Admin" href="/admin" /> : null;

  const menuItems = [
    <NavigationItem key="home" name="Home" href="/" />,
    <NavigationItem key="blog" name="Blog" href="/blog" />,
    <NavigationItem key="photography" name="Photography" href="/photography" />,
    <NavigationItem key="work" name="Work" href="/work" />,
    <NavigationItem key="contact" name="Contact" href="/contact" />,
    <NavigationItem key="github" name="GitHub" hrefExternal href="https://github.com/georgegillams" />,
    adminItem,
    accountItem,
    <NavigationItem key="sitemap" name="Site map" href="/sitemap" />,
  ];

  const date = new Date();
  const isPride = date.getMonth() === 5;

  return (
    <NavigationBar
      menuItems={menuItems}
      logo={<Logo padding={false} pride={isPride} animated />}
      accountMenuItem={accountItem}
      burgerButtonWrapper={BurgerButtonWrapper}
    />
  );
};

NavigationBarWrapper.propTypes = {
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

export default NavigationBarWrapper;
