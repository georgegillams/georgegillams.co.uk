import React, { Fragment, useState } from 'react';
import { Card } from 'gg-components/Cards';
import { Paragraph, PageTitle } from 'gg-components/Typography';
import { Button } from 'gg-components/Button';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/Auth';

import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import STYLES from 'containers/pages.scss';

const AnalyticEntity = props => {
  const { entity, children } = props;

  return (
    <Card>
      <PageTitle name={entity.url}>
        {entity.count && (
          <>
            <Paragraph>Matches: {entity.count}</Paragraph>
            <br />
          </>
        )}
        {entity.browser && (
          <>
            <Paragraph>Browser {entity.browser}</Paragraph>
            <br />
          </>
        )}
        {entity.os && (
          <>
            <Paragraph>os {entity.os}</Paragraph>
            <br />
          </>
        )}
        {entity.url && (
          <>
            <Paragraph>Path {entity.url}</Paragraph>
            <br />
          </>
        )}
        {entity.utm_source && (
          <>
            <Paragraph>Source {entity.utm_source}</Paragraph>
            <br />
          </>
        )}
        {entity.utm_medium && (
          <>
            <Paragraph>Medium {entity.utm_medium}</Paragraph>
            <br />
          </>
        )}
        <DebugObject debugTitle="Analytic" debugObject={entity} />
        {children && children}
      </PageTitle>
    </Card>
  );
};

export default AnalyticEntity;
