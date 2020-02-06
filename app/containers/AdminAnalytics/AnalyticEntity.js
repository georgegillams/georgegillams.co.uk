import React, { Fragment, useState } from 'react';
import { Card } from 'gg-components/dist/Cards';
import { Paragraph, Section } from 'gg-components/dist/Typography';

import { Button } from 'gg-components/dist/Button';
import {
  STRING_REGEX,
  INT_REGEX,
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  DECIMAL_REGEX,
} from 'helpers/constants';
import {
  DebugObject,
  APIEntity,
  AdminOnly,
  LoadingCover,
} from 'gg-components/dist/Auth';
import STYLES from 'containers/pages.scss';

const AnalyticEntity = props => {
  const { entity, children, ...rest } = props;

  return (
    <Card {...rest}>
      <Section name={entity.url}>
        {entity.id && (
          <Fragment>
            <Paragraph>{entity.id}</Paragraph>
            <br />
          </Fragment>
        )}
        {entity.utm_source && (
          <Fragment>
            <Paragraph>{entity.utm_source}</Paragraph>
            <br />
          </Fragment>
        )}
        {entity.utm_medium && (
          <Fragment>
            <Paragraph>{entity.utm_medium}</Paragraph>
            <br />
          </Fragment>
        )}
        <DebugObject debugTitle="Analytic" debugObject={entity} />
        {children && children}
      </Section>
    </Card>
  );
};

export default AnalyticEntity;
