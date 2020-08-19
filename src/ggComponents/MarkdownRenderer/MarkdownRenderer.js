/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import YoutubeEmbedVideo from 'youtube-embed-video';

import { cssModules } from '../helpers/cssModules';
import { withTheme } from '../Theming';
import HelperFunctions from '../helpers/HelperFunctions';
import { Image } from '../Image';
import { CodeInline, Code } from '../Code';
import { Paragraph } from '../Paragraph';
import { TextLink } from '../TextLink';
import { Quote } from '../Quote';
import { Section } from '../Section';
import { Subsection } from '../Subsection';
import { Citation, Reference } from '../References';

import { markdownLexer } from './markdownLexer';
import { DEFAULT_SUPPORTED_FEATURES } from './constants';
import STYLES from './markdown-renderer.module.scss';

const getClassName = cssModules(STYLES);

const ThemedTextLink = withTheme(TextLink);

const MarkdownRenderer = props => {
  const { content, supportedFeatures, light, className, elementClassName } = props;

  const [lexedContent, setLexedContent] = useState(null);

  useEffect(() => {
    const lexingResult = markdownLexer(content, supportedFeatures);
    setLexedContent(lexingResult);
  }, [content, supportedFeatures]);

  if (!lexedContent) {
    return null;
  }

  const classNames = [getClassName(`markdown-renderer__outer`)];
  if (className) {
    classNames.push(className);
  }

  const elementClassNames = [getClassName(`markdown-renderer__element`)];
  if (elementClassName) {
    classNames.push(elementClassName);
    elementClassNames.push(elementClassName);
  }

  /* eslint-disable no-use-before-define */
  return (
    <div className={classNames.join(' ')}>{elementForContent(lexedContent, 0, light, elementClassNames.join(' '))}</div>
  );
  /* eslint-enable */
};

const elementForContent = (content, depth, light, elementClassName) => {
  if (!content) {
    return null;
  }

  if (HelperFunctions.isArray(content)) {
    return content.map(c => elementForContent(c, depth, light, elementClassName));
  }

  let childElement = content.children;
  if (typeof childElement === 'object') {
    childElement = elementForContent(childElement, depth + 1, light, elementClassName);
  }

  if (typeof content === 'string' || !content.type || content.type === 'text') {
    return content;
  }

  if (content.type === 'paragraph') {
    return (
      <>
        <Paragraph className={[elementClassName, getClassName('markdown-renderer__paragraph')].join(' ')}>
          {childElement}
        </Paragraph>
        <br />
      </>
    );
  }

  if (content.type === 'footnoteReference') {
    return <sup>{content.number}</sup>;
  }

  if (content.type === 'footnote') {
    return (
      <sup>
        {content.number}: {childElement}
      </sup>
    );
  }

  if (content.type === 'bulletList') {
    childElement = childElement.map(c => <li>{c}</li>);
    return <ul>{childElement}</ul>;
  }

  if (content.type === 'numberedList') {
    childElement = childElement.map(c => <li>{c}</li>);
    return <ol>{childElement}</ol>;
  }

  if (content.type === 'quotation') {
    if (childElement.length > 1) {
      childElement = childElement.map(c => <Paragraph>{c}</Paragraph>);
    }
    return <Quote>{childElement}</Quote>;
  }

  if (content.type === 'link') {
    return (
      <ThemedTextLink hrefExternal={content.hrefExternal} href={content.href}>
        {childElement}
      </ThemedTextLink>
    );
  }

  if (content.type === 'code') {
    return (
      <CodeInline inheritColor className={elementClassName}>
        {content.text}
      </CodeInline>
    );
  }

  if (content.type === 'strikethrough') {
    return (
      <span style={{ textDecorationLine: 'line-through' }} className={elementClassName}>
        {childElement}
      </span>
    );
  }

  if (content.type === 'italic') {
    return (
      <span style={{ fontStyle: 'italic' }} className={elementClassName}>
        {childElement}
      </span>
    );
  }

  if (content.type === 'blockCode') {
    return (
      <Code lang={content.language} githubUrl={content.url}>
        {content.codeLines.map(c => (
          <>
            {c.replace(/ /g, '\u00a0')}
            <br />
          </>
        ))}
      </Code>
    );
  }

  if (content.type === 'youtube') {
    return <YoutubeEmbedVideo showSuggestions={content.showSuggestions} videoId={content.videoID} />;
  }

  if (content.type === 'section') {
    return (
      <Section anchor padding={false} name={content.name}>
        {childElement}
      </Section>
    );
  }

  if (content.type === 'subsection') {
    return (
      <Subsection anchor padding={false} name={content.name}>
        {childElement}
      </Subsection>
    );
  }

  if (content.type === 'subsubsection') {
    return [
      <br />,
      <br />,
      <span style={{ fontWeight: 'bold' }} className={elementClassName}>
        {content.name}
      </span>,
      <br />,
      <br />,
      childElement,
      <br />,
    ];
  }

  if (content.type === 'bigLink') {
    return (
      <a
        href={content.href}
        target={content.hrefExternal && '_blank'}
        rel={content.hrefExternal && 'noopener noreferrer'}>
        <Subsection anchor={false} padding={false} link name={content.text} />
      </a>
    );
  }

  if (content.type === 'bold') {
    return (
      <span style={{ fontWeight: 'bold' }} className={elementClassName}>
        {childElement}
      </span>
    );
  }

  if (content.type === 'image') {
    return <img className={elementClassName} src={content.src} alt={content.caption} />;
  }

  if (content.type === 'smartImage') {
    return (
      <Image
        className={elementClassName}
        lightSrc={content.lightSrc}
        darkSrc={content.darkSrc}
        aspectX={content.aspectX}
        aspectY={content.aspectY}
        imgProps={{ alt: content.caption }}
      />
    );
  }

  if (content.type === 'citation') {
    return <Citation identifier={content.identifier} />;
  }

  if (content.type === 'reference') {
    return <Reference identifier={content.identifier} reference={content.reference} />;
  }

  // Finally, default to returning the raw content
  return content;
};

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  elementClassName: PropTypes.string,
  light: PropTypes.bool,
  supportedFeatures: PropTypes.arrayOf(PropTypes.string),
};

MarkdownRenderer.defaultProps = {
  className: null,
  elementClassName: null,
  light: false,
  supportedFeatures: DEFAULT_SUPPORTED_FEATURES,
};

export default MarkdownRenderer;
