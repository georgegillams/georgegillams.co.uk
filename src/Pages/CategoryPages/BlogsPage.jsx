import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLazyLoading from '../../components/withLazyLoading';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import Loading from '../../components/Loading';
import Tag from '../../components/Tag';
import TagFilter from '../../components/TagFilter';
import DatabaseFunctions from '../../DatabaseFunctions';
import { NON_EMOJI_REGEX } from '../../shared/constants';
import AnimatedContent from '../../components/AnimatedContent';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

import STYLES from '../pages.scss';
import STYLES_2 from '../../components/tag-filter.scss';

const getClassName = className =>
  STYLES[className] || STYLES_2[className] || 'UNKNOWN';

const TagFilterRoutable = withRouter(TagFilter);

class BlogsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      blogs: null,
      refreshContinuously: true,
    };
  }

  getBlogs = selectedTags => {
    if (this.state.refreshContinuously) {
      DatabaseFunctions.getBlogs('blog', '', selectedTags, results => {
        this.setState({
          blogs: results,
        });
      });
    }
  };

  componentDidMount() {
    this.getBlogs(this.state.selectedTags);
    setInterval(() => {
      this.getBlogs(this.state.selectedTags);
    }, 2000);
  }

  componentWillUnmount() {
    this.setState({
      refreshContinuously: false,
    });
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <PageSwitchScroller />
        <TagFilterRoutable
          selectedTags={this.state.selectedTags}
          onSelectedTagsChanged={nst => {
            this.setState({ selectedTags: nst });
            this.getBlogs(nst);
          }}
          className={getClassName('pages__tag-filter')}
        />
        {!this.state.blogs && <Loading />}
        {this.state.blogs && (
          <div>
            {this.state.blogs.map(b => (
              <LlAnimatedContent>
                <ArticleCard
                  day={
                    b.blogCardDate
                      ? b.blogCardDate
                      : new Date(1000 * b.publishedTimestamp).getDate()
                  }
                  month={new Date(1000 * b.publishedTimestamp).getMonth()}
                  className={getClassName('pages__card')}
                  fillImageSrc={b.blogHeroImage}
                  imageSrc={b.blogImage}
                  linkUrl={`/blog/view?id=${b.blogId}`}
                  title={b.blogName.match(NON_EMOJI_REGEX).join('')}
                  imageBorder={
                    b.blogImageBorderColor ? b.blogImageBorderColor : null
                  }
                  bannerColor={b.blogBannerColor ? b.blogBannerColor : null}
                  autoTallLayout
                  light={b.blogCardLight}
                >
                  {b &&
                    b.blogTags &&
                    b.blogTags.map(t => (
                      <Tag
                        className={getClassName('tag-filter__tag')}
                        type={t}
                      />
                    ))}
                </ArticleCard>
              </LlAnimatedContent>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default BlogsPage;
