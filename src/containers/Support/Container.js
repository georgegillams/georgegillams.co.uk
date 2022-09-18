import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';

import SupportSkeleton from './SupportSkeleton';

import PageTitle from 'components/common/PageTitle';
import LoadableSupportForm from './LoadableSupportForm';
import Section from '@george-gillams/components/section';
import SupportLink from './SupportLink';
import Button from 'components/common/Button';
import ErrorDisplay from 'components/common/ErrorDisplay';
import PageContainer from 'components/common/PageContainer';
import { Controls, SupportError } from './support.styles';

const Support = props => {
  const { loadLinks, createLink, deleteLink, supportState, authenticatorState } = props;

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
    <PageContainer bottomPadding>
      <DebugObject
        debugTitle="Support"
        debugObject={{
          loadLinks,
          createLink,
          deleteLink,
          supportState,
          authenticatorState,
        }}
      />
      <PageTitle name="Support">
        <>
          <Controls>
            <Button onClick={() => loadLinks()} disabled={supportState.loadingLinks}>
              Reload
            </Button>
          </Controls>
          <ErrorDisplay message="The support session failed to load" error={supportState.loadLinksError} />
          <LoadingCover loadingSkeleton={SupportSkeleton} loading={!supportLinks}>
            <>
              {noSupport && <SupportError>No support session is currently active.</SupportError>}
              {supportLinks &&
                supportLinks.map(sL => <SupportLink key={sL.name} admin={admin} link={sL} deleteLink={deleteLink} />)}
            </>
          </LoadingCover>
          {admin && (
            <Section name="ADD LINK">
              <ErrorDisplay message="Failed to add link" error={supportState.createLinkError} />
              <ErrorDisplay message="Failed to delete link" error={supportState.deleteLinkError} />
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
    </PageContainer>
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
};

Support.defaultProps = {};

export default Support;
