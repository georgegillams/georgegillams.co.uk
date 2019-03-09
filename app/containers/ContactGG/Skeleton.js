import React, { Fragment } from 'react';
import {
  CompactCardSkeleton,
  ButtonSkeleton,
  SectionSkeleton,
} from 'components/Skeletons';

const ContactSkeleton = props => {
  const { className, ...rest } = props;

  const outerClassNameFinal = [
    'pages__container',
    'pages__container--centered',
  ];

  if (className) {
    outerClassNameFinal.push(className);
  }

  return (
    <div className={outerClassNameFinal.join(' ')} {...rest}>
      <SectionSkeleton />
      <div className="pages__compact-card-container">
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
        <CompactCardSkeleton />
      </div>
      <ButtonSkeleton />
      <ButtonSkeleton />
      <SectionSkeleton />
    </div>
  );
};

export default ContactSkeleton;
