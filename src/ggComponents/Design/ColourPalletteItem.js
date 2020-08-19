import React from 'react';
import PropTypes from 'prop-types';

import { CodeInline } from '../Code';
import { Subsection } from '../Subsection';

const ColourPalletteItem = props => {
  const { colourName, colour, ...rest } = props;

  return (
    <div
      style={{
        margin: '0 1rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      {...rest}>
      <Subsection anchor={false}>
        {colourName}
        <br />
        <CodeInline>{colour}</CodeInline>
      </Subsection>
      <div
        style={{
          width: '5rem',
          height: '5rem',
          backgroundColor: colour,
          borderRadius: '5rem',
        }}
      />
    </div>
  );
};

ColourPalletteItem.propTypes = {
  colourName: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
};

export default ColourPalletteItem;
