import React from 'react';
import BpkHorizontalNav, {
  BpkHorizontalNavItem,
} from 'bpk-component-horizontal-nav';
import Section from '../../components/Section';
import DesignColours from './DesignColours';
import DesignComponents from './DesignComponents';
import DesignTypography from './DesignTypography';
import DesignPrivacyPolicy from './DesignPrivacyPolicy';

import STYLES from '../pages.scss';

const getClassName = className => className; //STYLES[className] || 'UNKNOWN';

class Design extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: `${window.location}`.split('design/')[1].replace('/', ''),
    };
  }

  onClick = e => {
    this.setState({
      selected: e.target.name,
    });
    this.props.history.push(`/design/${e.target.name}`);
  };

  render() {
    const { className, ...rest } = this.props;

    const classNameFinal = [];
    if (className) classNameFinal.push(className);

    return (
      <Section name="Design" className={classNameFinal.join(' ')} {...rest}>
        This is a page all about the design of this website. It&apos;s mainly
        here for my benefit, but since you&apos;re here you might as well have a
        look around.
        <br />
        <BpkHorizontalNav style={{ margin: '1.2rem 0' }}>
          <BpkHorizontalNavItem
            name="privacy-policy"
            selected={this.state.selected === 'privacy-policy'}
            onClick={this.onClick}
          >
            Privacy policy
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="colours"
            selected={this.state.selected === 'colours'}
            onClick={this.onClick}
          >
            Colours
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="components"
            selected={this.state.selected === 'components'}
            onClick={this.onClick}
          >
            Components
          </BpkHorizontalNavItem>
          <BpkHorizontalNavItem
            name="typography"
            selected={this.state.selected === 'typography'}
            onClick={this.onClick}
          >
            Typography
          </BpkHorizontalNavItem>
        </BpkHorizontalNav>
        {this.state.selected === 'privacy-policy' && <DesignPrivacyPolicy />}
        {this.state.selected === 'colours' && <DesignColours />}
        {this.state.selected === 'components' && <DesignComponents />}
        {this.state.selected === 'typography' && <DesignTypography />}
      </Section>
    );
  }
}

export default Design;
