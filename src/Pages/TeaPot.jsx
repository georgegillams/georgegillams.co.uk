import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from '../components/Section';
import SubSection from '../components/SubSection';
import TextLink from '../components/TextLink';

import STYLES from './for-oh-four.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class TeaPot extends Component {
  // componentDidMount() {
  //   const url = this.props.apiUrl;
  //   Request.get(url)
  //     .then(response => {
  //       this.setState({
  //         result: JSON.stringify(response.currently.summary),
  //       });
  //     })
  //     .catch(error => {});
  // }

  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('for-oh-four__container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')} {...rest}>
        <Section
          className={getClassName('for-oh-four__container')}
          name="ERROR 418: I'm a Teapot"
        >
          <SubSection noAnchor>
            Error: Attempted to brew coffee in a teapot. Cannot brew coffee in
            borrowed tea context.
            <br />
            Maybe the <TextLink href="/site-map">sitemap</TextLink> can help
          </SubSection>
        </Section>
      </main>
    );
  }
}

TeaPot.propTypes = {
  className: PropTypes.string,
};

TeaPot.defaultProps = {
  className: null,
};

export default TeaPot;
