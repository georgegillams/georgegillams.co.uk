import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar, { NavigationItem } from '@george-gillams/components/navigation-bar';

import Logo from 'components/Logo';
import BurgerButtonLink from './BurgerButtonLink';
import { withRouter } from 'next/router';

const NavigationBarWrapper = props => {
  const { authenticatorState, router } = props;
  const { user } = authenticatorState;

  const pathname = router?.pathname ?? '';

  const adminItem =
    user && user.admin ? <NavigationItem name="Admin" href="/admin" selected={pathname.startsWith('/admin')} /> : null;

  const menuItems = [
    <NavigationItem key="blog" name="Blog" href="/blog" selected={pathname.startsWith('/blog')} />,
    <NavigationItem
      key="photography"
      name="Photography"
      href="/photography"
      selected={pathname.startsWith('/photography')}
    />,
    <NavigationItem
      key="reading-list"
      name="Reading"
      href="/reading-list"
      selected={pathname.startsWith('/reading-list')}
    />,
    <NavigationItem key="work" name="Work" href="/work" selected={pathname.startsWith('/work')} />,
    <NavigationItem key="contact" name="Contact" href="/contact" selected={pathname.startsWith('/contact')} />,
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
  authenticatorState: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(NavigationBarWrapper);
