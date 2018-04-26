import PropTypes from 'prop-types';
import React from 'react';
import YoutubeEmbedVideo from 'youtube-embed-video';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import scrollIntoView from 'scroll-into-view';
import {
  citation,
  References,
  REFERENCE_STYLES,
} from 'react-component-academic-reference';
import TextLink from './TextLink';
import Strikethrough from './Strikethrough';
import Quote from './Quote';
import SubSection from './SubSection';
import Code from './Code';
import CodeInline from './CodeInline';
import CodeBashArrow from './CodeBashArrow';

import STYLES from './blog-viewer.scss';
import PAGES_STYLES from './../Pages/pages.scss';

const getClassName = className =>
  STYLES[className] || PAGES_STYLES[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const MD_LINK_REGEX = /(.*)\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_BLOCK_CODE_REGEX = /(.*)```\(([^\(\)]*)\)\(([^\(\)]*)\)\n([.\s\S]*)\n```(.*)/gi;
const MD_IMAGE_REGEX = /(.*)!\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_LAZY_LOAD_IMAGE_REGEX = /(.*)!\[([0-9]+)x([0-9]+)\]\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_LINK_BIG_REGEX = /(.*)!ssLink\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_YOUTUBE_REGEX = /(.*)!yt\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_STRIKETHROUGH_REGEX = /(.*)~([^~]*)~(.*)/gi;
const MD_INLINE_CODE_REGEX = /(.*)`([^`]*)`(.*)/gi;
const MD_BOLD_REGEX = /(.*)\*\*([^\*]*)\*\*(.*)/gi;
const MD_QUOTATION_REGEX = /(.*)\>([^\>\<]*)\<(.*)/gi;
const MD_CITATION_REGEX = /(.*)!cite\(([^\(\)]*)\)(.*)/gi;
const MD_REFERENCES_REGEX = /(.*)!printReferences\(\)(.*)/gi;

// This component works recursively. Each time it checks for a feature (such as a link, stikethrough etc)
// At each stage, if it finds one it renders the appropriate component, passing the surrounding text to
// another instance of BlogPreviewContent. if no such feature is found, the content is simply rendered.

const BlogPreviewContent = props => {
  const {
    content,
    className,
    elementClassName,
    light,
    noAnchor,
    references,
    ...rest
  } = props;

  const classNameFinal = [getClassName('article-date__date')];
  if (className) {
    classNameFinal.push(className);
  }
  const elementClassNameFinal = [getClassName('blog-viewer__element')];
  if (elementClassName) {
    elementClassNameFinal.push(elementClassName);
  }

  if (!content || content === '' || content === '\n') {
    return null;
  }

  const onSelection = (event, identifier) => {
    const reference = document.getElementById(identifier);
    if (!reference) return;

    scrollIntoView(reference, {
      time: 1000,
    });
  };

  const Cite = references ? citation(references, onSelection) : null;

  // If it's bold, return a span with fontWeight: 'bold' component:
  const mdBold = content.split(MD_BOLD_REGEX);
  if (mdBold.length > 2) {
    // console.log(content);
    // console.log(content.split(MD_BOLD_REGEX));
    const preBoldText = `${mdBold.shift()} ${mdBold.shift()}`;
    const boldText = mdBold.shift();
    const postBoldText = mdBold.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preBoldText}
        />
        <span
          style={{ fontWeight: 'bold' }}
          className={elementClassNameFinal.join(' ')}
        >
          {boldText}
        </span>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postBoldText}
        />
      </span>
    );
  }

  // If it's a reference citation, return the Citation:
  const mdCitation = content.split(MD_CITATION_REGEX);
  if (mdCitation.length > 2) {
    // console.log(content);
    // console.log(content.split(MD_BOLD_REGEX));
    const preCitationText = `${mdCitation.shift()} ${mdCitation.shift()}`;
    const referenceIdentifier = mdCitation.shift();
    const postCitationText = mdCitation.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preCitationText}
        />
        {Cite && <Cite identifier={referenceIdentifier} />}
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postCitationText}
        />
      </span>
    );
  }

  // If it's reference print-out, return a references section:
  const mdReferencesPrintout = content.split(MD_REFERENCES_REGEX);
  if (mdReferencesPrintout.length > 1) {
    // console.log('references');
    // console.log(references);
    // console.log(content.split(MD_BOLD_REGEX));
    const preReferencesText = `${mdReferencesPrintout.shift()} ${mdReferencesPrintout.shift()}`;
    const postReferencesText = mdReferencesPrintout.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preReferencesText}
        />
        {Cite && (
          <SubSection
            className={elementClassNameFinal.join(' ')}
            noAnchor={noAnchor}
            light={light}
            name="References"
          >
            <References
              className={`${getClassName(
                'pages__references',
              )} ${elementClassNameFinal.join(' ')}`}
              referenceStyle={REFERENCE_STYLES.harvard}
              references={references}
            />
          </SubSection>
        )}
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postReferencesText}
        />
      </span>
    );
  }

  // If it's a strikethrough, return a Strikethrough component:
  const mdStrikethrough = content.split(MD_STRIKETHROUGH_REGEX);
  if (mdStrikethrough.length > 2) {
    const preStrikeText = `${mdStrikethrough.shift()} ${mdStrikethrough.shift()}`;
    const strikenText = mdStrikethrough.shift();
    const postStrikeText = mdStrikethrough.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preStrikeText}
        />
        <Strikethrough className={elementClassNameFinal.join(' ')}>
          {strikenText}
        </Strikethrough>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postStrikeText}
        />
      </span>
    );
  }

  // If it's inline code, return a CodeInline component:
  const mdBlockCode = content.split(MD_BLOCK_CODE_REGEX);
  if (mdBlockCode.length > 4) {
    const preInlineCodeText = `${mdBlockCode.shift()} ${mdBlockCode.shift()}`;
    const language = mdBlockCode.shift();
    const githubLink = mdBlockCode.shift();
    const blockCode = mdBlockCode.shift();
    const postInlineCodeText = mdBlockCode.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preInlineCodeText}
        />
        <Code lang={language} githubUrl={githubLink}>
          {blockCode.split('\n\n').map(b => (
            <span>
              <CodeBashArrow />{' '}
              {b.split('\n').map(l => (
                <span>
                  {l}
                  <br />
                </span>
              ))}
              <br />
            </span>
          ))}
        </Code>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postInlineCodeText}
        />
      </span>
    );
  }

  // If it's inline code, return a CodeInline component:
  const mdInlineCode = content.split(MD_INLINE_CODE_REGEX);
  if (mdInlineCode.length > 2) {
    const preInlineCodeText = `${mdInlineCode.shift()} ${mdInlineCode.shift()}`;
    const inlineCode = mdInlineCode.shift();
    const postInlineCodeText = mdInlineCode.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preInlineCodeText}
        />
        <CodeInline className={elementClassNameFinal.join(' ')}>
          {inlineCode}
        </CodeInline>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postInlineCodeText}
        />
      </span>
    );
  }

  // If it's a quotation, return a Quote component:
  const mdQuotation = content.split(MD_QUOTATION_REGEX);
  if (mdQuotation.length > 2) {
    const preQuotationText = `${mdQuotation.shift()} ${mdQuotation.shift()}`;
    const quotation = mdQuotation.shift();
    const postQuotationText = mdQuotation.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preQuotationText}
        />
        <Quote className={null /* elementClassNameFinal.join(' ') */}>
          {quotation}
        </Quote>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postQuotationText}
        />
      </span>
    );
  }

  // If it's a regular image, return an Image component:
  const mdImage = content.split(MD_IMAGE_REGEX);
  if (mdImage.length > 3) {
    const preImageText = `${mdImage.shift()} ${mdImage.shift()}`;
    const imageAltText = mdImage.shift();
    const imageSrc = mdImage.shift();
    const postImageText = mdImage.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preImageText}
        />
        <img
          className={getClassName('pages__image')}
          alt={imageAltText}
          src={imageSrc}
        />
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postImageText}
        />
      </span>
    );
  }

  // If it's a lazy-loaded image, return an Image component:
  const mdLazyLoadedImage = content.split(MD_LAZY_LOAD_IMAGE_REGEX);
  if (mdLazyLoadedImage.length > 5) {
    const preImageText = `${mdLazyLoadedImage.shift()} ${mdLazyLoadedImage.shift()}`;
    const aspectX = parseInt(mdLazyLoadedImage.shift(), 10);
    const aspectY = parseInt(mdLazyLoadedImage.shift(), 10);
    const imageAltText = mdLazyLoadedImage.shift();
    const imageSrc = mdLazyLoadedImage.shift();
    const postImageText = mdLazyLoadedImage.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preImageText}
        />
        <FadingLazyLoadedImage
          className={getClassName('pages__image')}
          altText={imageAltText}
          width={aspectX}
          height={aspectY}
          src={imageSrc}
        />
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postImageText}
        />
      </span>
    );
  }

  // If it's a YouTube video, return a YoutubeEmbedVideo component:
  const mdYtVideo = content.split(MD_YOUTUBE_REGEX);
  if (mdYtVideo.length > 3) {
    const preLinkText = `${mdYtVideo.shift()} ${mdYtVideo.shift()}`;
    const showSuggestions = mdYtVideo.shift() === 'true';
    const videoId = mdYtVideo.shift();
    const postLinkText = mdYtVideo.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preLinkText}
        />
        <YoutubeEmbedVideo
          className={getClassName('pages__image')}
          style={{ maxWidth: '100%', height: '45vw', maxHeight: '23rem' }}
          videoId={videoId}
          suggestions={showSuggestions}
        />
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postLinkText}
        />
      </span>
    );
  }

  // If it's a **BIG** hyperlink, return a <a>-wrapped Section component:
  const mdBigLink = content.split(MD_LINK_BIG_REGEX);
  if (mdBigLink.length > 3) {
    const preLinkText = `${mdBigLink.shift()} ${mdBigLink.shift()}`;
    const linkText = mdBigLink.shift();
    const linkRef = mdBigLink.shift();
    const postLinkText = mdBigLink.join('');
    const external = linkRef.includes('.');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preLinkText}
        />
        <a
          className={getClassName('pages__link')}
          href={linkRef}
          rel={external ? 'noopener noreferrer' : ''}
          target={external ? '_blank' : ''}
        >
          <SubSection
            className={elementClassNameFinal.join(' ')}
            noAnchor
            name={linkText}
            link
          />
        </a>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postLinkText}
        />
      </span>
    );
  }

  // If it's a hyperlink, return a TextLink component:
  const mdLink = content.split(MD_LINK_REGEX);
  if (mdLink.length > 3) {
    const preLinkText = `${mdLink.shift()} ${mdLink.shift()}`;
    const linkText = mdLink.shift();
    const linkRef = mdLink.shift();
    const postLinkText = mdLink.join('');
    const external = linkRef.includes('.');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={preLinkText}
        />
        <TextLink external={external} inline href={linkRef}>
          {linkText}
          {external ? ' ' : ''}
        </TextLink>
        <BlogPreviewContent
          references={references}
          elementClassName={elementClassName}
          content={postLinkText}
        />
      </span>
    );
  }

  // Otherwise we just return the block of text:
  const contentParts = content.split('\n');

  return (
    <span className={classNameFinal.join(' ')} {...rest}>
      {contentParts.map(
        s =>
          s === '' ? (
            <br />
          ) : (
            <p className={elementClassNameFinal.join(' ')}>{s}</p>
          ),
      )}
    </span>
  );
};

BlogPreviewContent.propTypes = {
  references: PropTypes.object,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogPreviewContent.defaultProps = {
  references: null,
  className: null,
  elementClassName: null,
  light: false,
  noAnchor: false,
};

export default BlogPreviewContent;
