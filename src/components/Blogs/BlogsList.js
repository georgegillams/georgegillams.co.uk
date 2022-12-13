import React from 'react';
import PropTypes from 'prop-types';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import { StyledBlogCard, StyledButton, StyledFeatureCard } from './blogs-list.styles';

const BlogsList = props => {
  const { admin, blogs, deleteBlog, linkPrefix, ...rest } = props;

  return (
    <div {...rest}>
      {admin && <StyledFeatureCard title="Add a new blog" href="/create-blog" />}
      {blogs.map(blog => (
        <div key={blog.id}>
          <StyledBlogCard key={`card_${blog.id}`} blog={blog} linkPrefix={linkPrefix} withControls={!!deleteBlog} />
          {deleteBlog && (
            <StyledButton
              key={`delete_button_${blog.id}`}
              buttonType={BUTTON_TYPES.destructive}
              onClick={() => deleteBlog(blog.id)}
              disabled={blog.deleted}>
              Delete blog
            </StyledButton>
          )}
        </div>
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
