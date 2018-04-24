import PropTypes from 'prop-types';
import React from 'react';
import TextLink from './TextLink';
import Strikethrough from './Strikethrough';
import Quote from './Quote';
import SubSection from './SubSection';

import STYLES from './blog-viewer.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const MD_LINK_REGEX = /(.*)\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_LINK_BIG_REGEX = /(.*)!\[([^\[\]]*)\]\(([^\(\)]*)\)(.*)/gi;
const MD_STRIKETHROUGH_REGEX = /(.*)~([^~]*)~(.*)/gi;
const MD_BOLD_REGEX = /(.*)\*\*([^\*]*)\*\*(.*)/gi;
const MD_QUOTATION_REGEX = /(.*)\>([^\>\<]*)\<(.*)/gi;

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

  if (!content || content === '') {
    return null;
  }

  // If it's bold, return a TextLink component:
  const mdBold = content.split(MD_BOLD_REGEX);
  if (mdBold.length > 2) {
    console.log(content);
    console.log(content.split(MD_BOLD_REGEX));
    const preBoldText = `${mdBold.shift()} ${mdBold.shift()}`;
    const boldText = mdBold.shift();
    const postBoldText = mdBold.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
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
          elementClassName={elementClassName}
          content={postBoldText}
        />
      </span>
    );
  }

  // If it's a strikethrough, return a TextLink component:
  const mdStrikethrough = content.split(MD_STRIKETHROUGH_REGEX);
  if (mdStrikethrough.length > 2) {
    const preStrikeText = `${mdStrikethrough.shift()} ${mdStrikethrough.shift()}`;
    const strikenText = mdStrikethrough.shift();
    const postStrikeText = mdStrikethrough.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          elementClassName={elementClassName}
          content={preStrikeText}
        />
        <Strikethrough className={elementClassNameFinal.join(' ')}>
          {strikenText}
        </Strikethrough>
        <BlogPreviewContent
          elementClassName={elementClassName}
          content={postStrikeText}
        />
      </span>
    );
  }

  // If it's a quotation, return a TextLink component:
  const mdQuotation = content.split(MD_QUOTATION_REGEX);
  if (mdQuotation.length > 2) {
    const preQuotationText = `${mdQuotation.shift()} ${mdQuotation.shift()}`;
    const quotation = mdQuotation.shift();
    const postQuotationText = mdQuotation.join('');
    return (
      <span className={classNameFinal.join(' ')} {...rest}>
        <BlogPreviewContent
          elementClassName={elementClassName}
          content={preQuotationText}
        />
        <Quote className={null /* elementClassNameFinal.join(' ') */}>
          {quotation}
        </Quote>
        <BlogPreviewContent
          elementClassName={elementClassName}
          content={postQuotationText}
        />
      </span>
    );
  }

  // If it's a **BIG** hyperlink, return a TextLink component:
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
          elementClassName={elementClassName}
          content={preLinkText}
        />
        <TextLink external={external} inline href={linkRef}>
          {linkText}
          {external ? ' ' : ''}
        </TextLink>
        <BlogPreviewContent
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
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  noAnchor: PropTypes.bool,
};

BlogPreviewContent.defaultProps = {
  className: null,
  elementClassName: null,
  light: false,
  noAnchor: false,
};

export default BlogPreviewContent;
