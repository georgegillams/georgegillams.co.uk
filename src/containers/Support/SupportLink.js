import React from 'react';
import PropTypes from 'prop-types';
import Subsection from '@george-gillams/components/subsection';
import TextLink from 'components/common/TextLink';

import { BUTTON_TYPES } from '@george-gillams/components/button/constants';
import { DeleteButton, StyledParagraph } from './support-link.styles';

const SupportLink = props => {
  const { link, deleteLink, admin, ...rest } = props;

  return (
    <Subsection anchor={false} name={link.name || 'Untitled support link'} {...rest}>
      <StyledParagraph>
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
      </StyledParagraph>
      {admin && (
        <DeleteButton
          buttonType={BUTTON_TYPES.destructive}
          onClick={() => {
            deleteLink(link);
          }}>
          Delete
        </DeleteButton>
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
