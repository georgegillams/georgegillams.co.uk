import React from 'react';
import Section from '../../components/Section';
import ColourPalleteItem from '../../components/ColourPalleteItem';

import STYLES from '../pages.scss';

import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES);

class DesignColours extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Colour pallete">
        <div className={getClassName('pages__compact-card-container')}>
          <ColourPalleteItem colourName="Not black" colour="#1E1E1E" />
          <ColourPalleteItem colourName="Grey" colour="#343B49" />
          <ColourPalleteItem colourName="Blue" colour="#44AEFF" />
          <ColourPalleteItem colourName="Red" colour="#E02626" />
          <ColourPalleteItem colourName="Dark orchid" colour="#9932CC" />
          <ColourPalleteItem colourName="Hot pink" colour="#FF69B4" />
        </div>
      </Section>
    );
  }
}

export default DesignColours;
