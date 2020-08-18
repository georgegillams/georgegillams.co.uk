import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'gg-components/helpers/cssModules';

import BlogCard from './BlogCard';
import STYLES from './blogs-list.scss';
import Button from 'components/common/Button';
import FeatureCard from 'components/common/FeatureCard';

const getClassName = cssModules(STYLES);

const BlogsList = props => {
  const { admin, blogs, deleteBlog, linkPrefix, ...rest } = props;

  return (
    <div {...rest}>
      {admin && <FeatureCard title="Add a new blog" href="/create-blog" className={getClassName('blogs-list__card')} />}
      {blogs.map(blog => (
        <>
          <BlogCard
            key={`card_${blog.id}`}
            blog={blog}
            linkPrefix={linkPrefix}
            className={getClassName('blogs-list__card', deleteBlog ? 'blogs-list__card--with-controls' : null)}
          />
          {deleteBlog && (
            <Button
              key={`delete_button_${blog.id}`}
              destructive
              onClick={() => deleteBlog(blog.id)}
              disabled={blog.deleted}
              className={getClassName('blogs-list__control')}>
              Delete blog
            </Button>
          )}
        </>
      ))}
    </div>
  );
};

BlogsList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.object).isRequired,
  linkPrefix: PropTypes.string.isRequired,
  admin: PropTypes.bool,
  deleteBlog: PropTypes.func,
};

BlogsList.defaultProps = {
  admin: false,
  deleteBlog: null,
};

export default BlogsList;
