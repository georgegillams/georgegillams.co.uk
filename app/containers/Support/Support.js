import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import BpkInput, { INPUT_TYPES, CLEAR_BUTTON_MODES } from 'bpk-component-input';
import { cssModules } from 'bpk-react-utils';
import { associate } from 'helpers/objects';

import Skeleton from './Skeleton';

import HelperFunctions from 'helpers/HelperFunctions';
import { MoneyPot } from 'gg-components/dist/MoneyPot';
import { Button } from 'gg-components/dist/Button';
import { Section, SubSection, TextLink } from 'gg-components/dist/Typography';
import { LoadingCover } from 'gg-components/dist/Auth';
import STYLES from 'containers/pages.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class Support extends React.Component {
  componentDidMount() {
    console.log(`calling loadLinks`);
    this.props.loadLinks();
  }

  render() {
    const {
      links,
      loadLinks,
      loadingLinks,
      loadLinksSuccess,
      loadLinksError,
      addLink,
      addLinkLoading,
      addLinkSuccess,
      addLinkErrored,
      deleteLink,
      deleteLinkLoading,
      deleteLinkSuccess,
      deleteLinkError,
      className,
      ...rest
    } = this.props;

    console.log(`loadLinksSuccess`, loadLinksSuccess);
    console.log(`loadLinksError`, loadLinksError);
    console.log(`links`, links);
    const outerClassNameFinal = [];

    if (className) {
      outerClassNameFinal.push(className);
    }

    const noSupport = loadLinksSuccess && (links && links.length === 0);
    const showLinks = links && links.length > 0;

    return (
      <div className={outerClassNameFinal.join(' ')} {...rest}>
        <Helmet title="Support" />
        <Section>
          <Section name="Support">
            <Button
              onClick={() => {
                loadLinks();
              }}
              disabled={loadingLinks}
            >
              Reload
            </Button>
            <br />
            <br />
            {noSupport && <span>No support session is currently active.</span>}
            {showLinks &&
              links.map(l => (
                <SubSection anchor={false} name={l.name || 'untitled'}>
                  {l.url && (
                    <TextLink external href={l.url}>
                      {l.url}
                    </TextLink>
                  )}
                  {l.description && (
                    <Fragment>
                      <br />
                      {l.description}
                    </Fragment>
                  )}
                </SubSection>
              ))}
          </Section>
        </Section>
      </div>
    );
  }
}

Support.propTypes = {
  user: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  blog: PropTypes.object,
  filter: PropTypes.func,
  linkPrefix: PropTypes.string,
  loadBlogs: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Support.defaultProps = {
  user: null,
  loading: false,
  error: null,
  blog: null,
  filter: null,
  linkPrefix: '',
  className: null,
};
