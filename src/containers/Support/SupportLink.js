import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import { Subsection } from '@george-gillams/components/Subsection';
import TextLink from 'components/common/TextLink';
import { cssModules } from '@george-gillams/components/helpers/cssModules';

import STYLES from './support-link.scss';
import Paragraph from '@george-gillams/components/Paragraph/Paragraph';

const getClassName = cssModules(STYLES);

const SupportLink = props => {
  const { link, deleteLink, admin, ...rest } = props;

  return (
    <Subsection anchor={false} name={link.name || 'Untitled support link'} {...rest}>
      <Paragraph className={getClassName('support-link__link')}>
        {link.url && (
          <TextLink hrefExternal href={link.url}>
            {link.url}
          </TextLink>
        )}
        {link.description && (
          <>
            <br />
            {link.description}
          </>
        )}
      </Paragraph>
      {admin && (
        <Button
          className={getClassName('support-link__delete-button')}
          destructive
          onClick={() => {
            deleteLink(link);
          }}>
          Delete
        </Button>
      )}
    </Subsection>
  );
};

SupportLink.propTypes = {
  link: PropTypes.object.isRequired,
  deleteLink: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
};

export default SupportLink;
