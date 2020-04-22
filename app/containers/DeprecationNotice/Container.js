import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';

import STYLES from './deprecation-notice.scss';

import { Paragraph, SubSection, TextLink, PageTitle } from 'gg-components/Typography';

const getClassName = cssModules(STYLES);

class DeprecationNotice extends Component {
  render() {
    const { className, ...rest } = this.props;
    const classNameFinal = [getClassName('deprecation-notice__container')];
    if (className) {
      classNameFinal.push(className);
    }

    return (
      <main className={classNameFinal.join(' ')} {...rest}>
        <PageTitle
          className={getClassName('not-found__container')}
          name="This feature has been deprecated"
        >
          <SubSection anchor={false}>
            <Paragrah>
              The page you&apos;re looking for has been deprecated, but you can
              find more awesome stuff in the{' '}
              <TextLink href="/site-map">sitemap</TextLink>.
            </Paragrah>
          </SubSection>
        </PageTitle>
      </main>
    );
  }
}

DeprecationNotice.propTypes = {
  className: PropTypes.string,
};

DeprecationNotice.defaultProps = {
  className: null,
};

export default DeprecationNotice;
