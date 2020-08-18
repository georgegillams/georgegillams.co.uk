import React from 'react';
import PropTypes from 'prop-types';
import FeatureCard from 'components/common/FeatureCard';
import { Tag } from 'gg-components/Tag';

import { NON_EMOJI_REGEX } from 'helpers/regexConstants';

const BlogCard = props => {
  const { blog, linkPrefix, ...rest } = props;

  let title = blog.title ? blog.title.match(NON_EMOJI_REGEX).join('') : 'Untitled blog';
  if (blog.deleted) {
    title += ' (DELETED)';
  }

  const day = blog.blogCardDate ? blog.blogCardDate : '' + new Date(1000 * blog.publishedTimestamp).getDate();
  const month = '' + new Date(1000 * blog.publishedTimestamp).toLocaleString('default', { month: 'short' });

  return (
    <FeatureCard
      annotations={[day, month]}
      fillImageSrc={blog.blogHeroImage}
      imageSrc={blog.blogImage}
      href={`${linkPrefix}/${blog.id}`}
      title={title}
      imageBorder={blog.blogImageBorderColor ? blog.blogImageBorderColor : null}
      bannerColor={blog.blogBannerColor ? blog.blogBannerColor : null}
      light={blog.light}
      {...rest}>
      {blog &&
        blog.tags &&
        !blog.tags.split &&
        blog.tags.map(tag => <Tag key={tag} ariaLabel={`${tag} tag`} type={tag} />)}
    </FeatureCard>
  );
};

BlogCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  blog: PropTypes.object.isRequired,
  linkPrefix: PropTypes.string.isRequired,
};

export default BlogCard;
