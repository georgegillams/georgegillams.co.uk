import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';

import BlogCard from './BlogCard';

import { ArticleCard } from 'gg-components/Cards';
import { Tag } from 'gg-components/Tag';
import { NON_EMOJI_REGEX } from 'helpers/constants';
import STYLES from './blogs-list.scss';

const getClassName = cssModules(STYLES);

const BlogsList = props => {
  const { blogs, linkPrefix, ...rest } = props;

  return (
    <div {...rest}>
      {blogs.map(blog => (
        <BlogCard
          className={getClassName('blogs-list__card')}
          blog={blog}
          linkPrefix={linkPrefix}
        />
      ))}
    </div>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPrefix: PropTypes.string.isRequired,
};

export default BlogsList;
