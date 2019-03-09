import React from 'react';
import NavigationBar, { NavigationItem } from 'components/NavigationBar';
import { SmallButtonSkeleton } from 'components/Skeletons';

const NavigationBarWrapper = props => {
  const { user, userLoading, ...rest } = props;

  const menuItems1 = [
    <NavigationItem name="Blog" linkUrl="/blog" />,
    <NavigationItem name="Travel" linkUrl="/travel" />,
    <NavigationItem name="Photography" linkUrl="/photography" />,
    <NavigationItem name="Work" linkUrl="/work" />,
  ];

  const accountItem = userLoading ? (
    <SmallButtonSkeleton />
  ) : (
    <NavigationItem
      name={user ? 'Account' : 'Login'}
      linkUrl={user ? '/account' : '/login'}
    />
  );

  const adminItem =
    user && user.admin ? (
      <NavigationItem name="Admin" linkUrl="/admin" />
    ) : null;

  const menuItems2 = [
    <NavigationItem name="About" linkUrl="/about" />,
    <NavigationItem name="Contact" linkUrl="/contact" />,
    <NavigationItem
      name="Github"
      linkUrl="https://github.com/georgegillams"
      hrefExternal
    />,
    adminItem,
    accountItem,
  ];

  const logo = null;

  return (
    <NavigationBar
      menuItems1={menuItems1}
      menuItems2={menuItems2}
      logo={logo}
      accountMenuItem={accountItem}
      {...rest}
    />
  );
};

export default NavigationBarWrapper;
