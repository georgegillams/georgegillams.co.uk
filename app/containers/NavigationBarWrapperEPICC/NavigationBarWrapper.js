import React from 'react';
import { WessexCCPLogo } from 'components/Typography';
import NavigationBar, { NavigationItem } from 'components/NavigationBar';
import { SmallButtonSkeleton } from 'components/Skeletons';

const NavigationBarWrapper = props => {
  const { user, userLoading, ...rest } = props;

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
    adminItem,
    <NavigationItem name="Contact" linkUrl="/contact" />,
    accountItem,
  ];

  const logo = null;

  return (
    <NavigationBar
      menuItems1={null}
      menuItems2={menuItems2}
      logo={logo}
      accountMenuItem={accountItem}
      {...rest}
    />
  );
};

export default NavigationBarWrapper;
