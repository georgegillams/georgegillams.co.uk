import React from 'react';
import { Paragraph } from 'gg-components/Paragraph';
import PageTitle from 'components/common/PageTitle';
import TextLink from 'components/common/TextLink';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from './api-docs.scss';
import apiStructure from 'helpers/common/apiStructureWithDescriptions';

const getClassName = cssModules(STYLES);

const Container = () => (
  <PageTitle name="API docs">
    <table className={getClassName('api-docs__table')} cellSpacing="4" cellPadding="4">
      <thead>
        <tr>
          <th className={getClassName('api-docs__cell')}>
            <Paragraph>Path</Paragraph>
          </th>
          <th className={getClassName('api-docs__cell')}>
            <Paragraph>Method</Paragraph>
          </th>
          <th className={getClassName('api-docs__cell')}>
            <Paragraph>Arguments</Paragraph>
          </th>
          <th className={getClassName('api-docs__cell')}>
            <Paragraph>Authorisation</Paragraph>
          </th>
          <th className={getClassName('api-docs__cell')}>
            <Paragraph>Description</Paragraph>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(apiStructure).map(key => {
          const apiCapability = apiStructure[key];
          return (
            <tr key={key}>
              <td className={getClassName('api-docs__cell')}>
                <TextLink href={apiCapability.fullPath} hrefExternal>
                  {apiCapability.path}
                </TextLink>
              </td>
              <td className={getClassName('api-docs__cell')}>
                <Paragraph className={getClassName('api-docs__method')}>{apiCapability.method}</Paragraph>
              </td>
              <td className={getClassName('api-docs__cell')}>
                <Paragraph>{apiCapability.arguments}</Paragraph>
              </td>
              <td className={getClassName('api-docs__cell')}>
                <Paragraph>{apiCapability.authorisation}</Paragraph>
              </td>
              <td className={getClassName('api-docs__cell')}>
                <Paragraph className={getClassName('api-docs__description')}>{apiCapability.description}</Paragraph>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </PageTitle>
);

export default Container;
