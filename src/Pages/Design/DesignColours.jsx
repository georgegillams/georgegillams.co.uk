import React from 'react';
import { BpkSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import BpkInput from 'bpk-component-input';
import Section from '../../components/Section';
import TextLink from '../../components/TextLink';
import SubSection from '../../components/SubSection';
import Button from '../../components/Button';
import ColourPalleteItem from '../../components/ColourPalleteItem';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

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
          <ColourPalleteItem colourName="Not black" colour="#1e1e1e" />
          <ColourPalleteItem colourName="Blue" colour="#44aeff" />
          <ColourPalleteItem colourName="Red" colour="#e02626" />
          <ColourPalleteItem colourName="Dark orchid" colour="darkorchid" />
          <ColourPalleteItem colourName="Hot pink" colour="hotpink" />
        </div>
      </Section>
    );
  }
}

export default DesignColours;
