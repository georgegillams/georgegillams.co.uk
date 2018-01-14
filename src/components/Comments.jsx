import React from 'react';
import Section from './Section';
import SubSection from './SubSection';
import CommentInput from './CommentInput';

import STYLES from './card.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

/* eslint-disable max-len */
const Comments = (props) => {
  const {
    blogId, className, ...rest
  } = props;

  const classNameFinal = [getClassName('card__image')];
  if (className) classNameFinal.push(className);

  // TODO - if get comments for blog ID, and then use results to display list of comments

  return (
    <Section name="Comments" >
      <SubSection name="Edward Gillams - 5 Jan 2018">
            My god - you've changed my entire outlook on politics.
      </SubSection >
      <CommentInput blogId={blogId} />
    </Section >
  );
};

export default Comments;
