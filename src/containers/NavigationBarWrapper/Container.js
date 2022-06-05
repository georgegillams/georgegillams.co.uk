import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from '@george-gillams/components/navigation-bar';
import NavigationItem from 'components/common/NavigationItem';

import Logo from 'components/Logo';
import BurgerButtonLink from './BurgerButtonLink';

const NavigationBarWrapper = props => {
  const { authenticatorState } = props;
  const { user } = authenticatorState;

  const adminItem = user && user.admin ? <NavigationItem name="Admin" href="/admin" /> : null;

  const menuItems = [
    <NavigationItem key="blog" name="Blog" href="/blog" />,
    <NavigationItem key="photography" name="Photography" href="/photography" />,
    <NavigationItem key="work" name="Work" href="/work" />,
    <NavigationItem key="contact" name="Contact" href="/contact" />,
    adminItem,
  ];

  const date = new Date();
  const isPride = date.getMonth() === 5;

  return (
    <NavigationBar
      menuItems={menuItems}
      logo={<Logo padding={false} pride={isPride} animated noJsLinkProvider={BurgerButtonLink} />}
    />
  );
};

NavigationBarWrapper.propTypes = {
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

export default NavigationBarWrapper;
