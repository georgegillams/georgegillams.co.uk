import React from 'react';
import PropTypes from 'prop-types';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import Tag, { TAG_TYPES } from '../../components/Tag';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import ScrollIndicator from '../../components/ScrollIndicator';
import YoutubeEmbedVideo from 'george-fork-youtube-embed-video';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const DATE_WRITTEN = new Date(2018, 2, 28, 9, 42, 0, 0);
const PAGE_ID = 9275661;

const LightroomWorkflow = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <br />
      <PageSwitchScroller />
      <Section name="My Lightroom Workflow">
        <ArticleDate date={DATE_WRITTEN} />
        <Tag
          type={TAG_TYPES.photography}
          link
          style={{ marginBottom: '0.5rem' }}
        />
        <SubSection name="The steps">
          My Lightroom workflow provides me with 4 opportunities to discard any
          given photo:
          <br />
          <br />
          - Import photos
          <br />
          - Apply ‘auto settings’ to all of them
          <br />
          - And then…
          <br />
          <br />
          1. For each photo, I give a rating (0 to 5) based on technical
          features (focus, grain etc). To do this I often zoom in on key
          features to see how sharp they are.
          <br />
          2. Filter out all photos with a rating of 0.
          <br />
          3. For each remaining photo, I adjust cropping / settings, and, if the
          composition is poor, reduce the rating. I rarely increase a photo’s
          rating the second time round, but may quite well drop it back down to
          0 (ie get rid) for poor composition.
          <br />
          4. For each remaining photo, if I think it’s worthy of
          exporting/uploading I set a ‘green’ flag
          <br />
          5. For each photo with a green flag, I finely (re)-tune cropping,
          rotation, shadows, colour etc. Sometimes if I just don’t like the
          changes I am making I remove the green-flag again (ie get rid).
          <br />
          6. Save the metadata of the edited files (so that changes are not lost
          forever) and export JPEGs for uploading / sharing.
        </SubSection>
        <SubSection name="A video showing the process">
          <YoutubeEmbedVideo
            className={getClassName('pages__image')}
            style={{ height: '45vw', maxHeight: '23rem' }}
            videoId="3GVO4TwRyiw"
            suggestions={false}
          />
        </SubSection>
      </Section>
      <Comments pageId={PAGE_ID} />
    </main>
  );
};

LightroomWorkflow.propTypes = {
  className: PropTypes.string,
};

LightroomWorkflow.defaultProps = {
  className: null,
};

export default LightroomWorkflow;
