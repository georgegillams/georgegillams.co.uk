import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import Button from 'components/common/Button';
import { AdminOnly } from 'components/common/Walls';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import ErrorDisplay from 'components/common/ErrorDisplay';

import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';
import { VStack } from 'components/common/Stacks';
import { useEffectOnce } from 'react-use';
import ImageEntity from './ImageEntity';
import Paragraph from '@george-gillams/components/paragraph';
import SplitDetailView, { SplitDetailItem } from 'components/common/SplitDetailView';
import Subsection from '@george-gillams/components/subsection';
import ImageUploadForm from './ImageUploadForm';

const AdminImages = props => {
  const {
    load,
    remove,
    create,
    downloadZip,

    adminImagesState,
    authenticatorState,

    router,
  } = props;

  const { loadError, images } = adminImagesState;
  const { user } = authenticatorState;

  const [highlightId, setHighlightId] = useState(null);
  const [highlightToScrollTo, setHighlightToScrollTo] = useState(null);
  const [newImage, setNewImage] = useState({ title: '', image: null });

  useTabMadeVisible(load);

  useEffectOnce(() => {
    load();
  });

  const scrollToHighlightedId = () => {
    if (!highlightToScrollTo) {
      return;
    }

    const scrollToElement = document.getElementById(highlightToScrollTo);
    if (scrollToElement) {
      scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightToScrollTo(null);
    }
  };

  const firstPageHitDone = useRef(false);

  useEffect(() => {
    if (!router || !router.query || !router.query.highlight) {
      setHighlightId(null);
      firstPageHitDone.current = true;
      return;
    }

    const highlight = router.query.highlight;
    setHighlightId(highlight);
    if (!firstPageHitDone.current) {
      setHighlightToScrollTo(highlight);
      firstPageHitDone.current = true;
    }
  }, [router]);

  useEffect(() => {
    scrollToHighlightedId();
  });

  const showImages = !!images && !!images.map && images.length > 0;

  const listView = (
    <VStack>
      <SplitDetailItem scroll={false} highlighted={highlightId === 'new'} href="/admin/images?highlight=new">
        <Subsection name="New +" anchor={false} padding={false} />
      </SplitDetailItem>
      {showImages &&
        images.map(image => (
          <ImageEntity
            key={image.id}
            entity={image}
            href={`/admin/images?highlight=${image.id}`}
            highlighted={highlightId === image.id}
            compact={true}
            imagesState={adminImagesState}
            removeImage={remove}
          />
        ))}
    </VStack>
  );

  let detailView = null;
  if (highlightId === 'new') {
    detailView = (
      <Subsection name="New image" anchor={false}>
        <Paragraph style={{ width: '100%' }}>
          <ImageUploadForm
            image={newImage}
            onDataChanged={setNewImage}
            onSubmit={() => {
              create(newImage);
              setNewImage({ title: '', image: null });
            }}
            loading={adminImagesState.creating}
            submitLabel="Upload image"
          />
        </Paragraph>
      </Subsection>
    );
  } else {
    const detailImage = adminImagesState?.images?.filter(image => image.id === highlightId)?.[0];

    detailView = detailImage && (
      <ImageEntity entity={detailImage} imagesState={adminImagesState} removeImage={remove} />
    );
  }

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={authenticatorState.loadAuthError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/images');
          }}>
          <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin images" />
          <Paragraph>
            <Button loading={adminImagesState.loading} onClick={() => load()}>
              Reload images
            </Button>
            <Button
              loading={adminImagesState.downloadingZip}
              onClick={() => downloadZip()}
              style={{ marginLeft: '10px' }}>
              Download all as ZIP
            </Button>
          </Paragraph>
          <VStack topPadding>
            <ErrorDisplay message="Could not load images" error={loadError} />
            <SplitDetailView listView={listView} detailView={detailView} closeLink="/admin/images" />
          </VStack>
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminImages"
        debugObject={{
          load,
          imagesState: adminImagesState,
          authenticatorState,
        }}
      />
    </>
  );
};

AdminImages.propTypes = {
  load: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  downloadZip: PropTypes.func.isRequired,
  adminImagesState: PropTypes.object.isRequired,
  authenticatorState: PropTypes.object.isRequired,
  router: PropTypes.object,
};

export default withRouter(AdminImages);
