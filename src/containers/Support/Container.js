import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'ggComponents/helpers/cssModules';
import DebugObject from 'components/common/DebugObject';
import { LoadingCover } from 'ggComponents/LoadingCover';

import SupportSkeleton from './SupportSkeleton';

import STYLES from './support.module.scss';
import PageTitle from 'components/common/PageTitle';
import Paragraph from 'ggComponents/Paragraph/Paragraph';
import LoadableSupportForm from './LoadableSupportForm';
import Section from 'ggComponents/Section/Section';
import SupportLink from './SupportLink';
import Button from 'components/common/Button';

const getClassName = cssModules(STYLES);

const Support = props => {
  const { loadLinks, createLink, deleteLink, supportState, authenticatorState, className } = props;

  const [newLink, setNewLink] = useState(null);

  useEffect(() => {
    loadLinks();

    const interval = setInterval(() => loadLinks(), 30000);

    const cleanUp = () => {
      clearInterval(interval);
    };
    return cleanUp;
  }, []);

  let supportLinks = null;
  if (supportState.links && supportState.links.map) {
    supportLinks = supportState.links;
  }

  const noSupport = !!supportLinks && supportLinks.length === 0;
  const admin = !!(authenticatorState.user && authenticatorState.user.admin);

  return (
    <>
      <DebugObject
        debugTitle="Support"
        debugObject={{
          loadLinks,
          createLink,
          deleteLink,
          supportState,
          authenticatorState,
          className,
        }}
      />
      <PageTitle name="Support">
        <>
          <div className={getClassName('support__controls')}>
            <Button onClick={() => loadLinks()} disabled={supportState.loadingLinks}>
              Reload
            </Button>
          </div>
          {supportState.loadLinksError && (
            <>
              {/* <Error> */}
              <Paragraph className={getClassName('support__error')}>
                Something has gone wrong while loading the support session.
                <br />
                {supportState.loadLinksError.errorMessage}
              </Paragraph>
              {/* </Error> */}
            </>
          )}
          <LoadingCover loadingSkeleton={SupportSkeleton} loading={!supportLinks}>
            <>
              {noSupport && (
                <Paragraph className={getClassName('support__error')}>
                  No support session is currently active.
                </Paragraph>
              )}
              {supportLinks &&
                supportLinks.map(sL => <SupportLink key={sL.name} admin={admin} link={sL} deleteLink={deleteLink} />)}
            </>
          </LoadingCover>
          {admin && (
            <Section name="ADD LINK">
              {supportState.createLinkError && (
                <Paragraph style={{ width: '100%', marginBottom: '1rem' }}>
                  {supportState.createLinkError.errorMessage}
                </Paragraph>
              )}
              {supportState.deleteLinkError && (
                <Paragraph className={getClassName('support__error')}>
                  {supportState.deleteLinkError.errorMessage}
                </Paragraph>
              )}
              <LoadableSupportForm
                link={newLink || {}}
                onDataChanged={setNewLink}
                onSubmit={() => createLink(newLink)}
                disabled={supportState.creatingLink}
              />
            </Section>
          )}
        </>
      </PageTitle>
    </>
  );
};

Support.propTypes = {
  supportState: PropTypes.object.isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
  loadLinks: PropTypes.func.isRequired,
  createLink: PropTypes.func.isRequired,
  deleteLink: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Support.defaultProps = {
  className: null,
};

export default Support;
