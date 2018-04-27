import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import Loading from '../../components/Loading';
import Tag from '../../components/Tag';
import TagFilter from '../../components/TagFilter';
import DatabaseFunctions from '../../DatabaseFunctions';

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TagFilterRoutable = withRouter(TagFilter);

class BlogsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      blogs: null,
    };
  }

  componentDidMount() {
    const getBlogs = () => {
      DatabaseFunctions.getBlogs('', this.state.selectedTags, results => {
        this.setState({
          blogs: results,
        });
      });
    };

    getBlogs();
    setInterval(getBlogs, 2000);
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <PageSwitchScroller />
        <TagFilterRoutable
          selectedTags={this.state.selectedTags}
          onSelectedTagsChanged={nst => {
            this.setState({ selectedTags: nst });
          }}
          className={getClassName('pages__tag-filter')}
        />
        {!this.state.blogs && <Loading />}
        {this.state.blogs && (
          <div>
            {this.state.blogs.map(
              b =>
                !b.blogShowInBlogsList ? null : (
                  <ArticleCard
                    day={new Date(1000 * b.publishedTimestamp).getDate()}
                    month={new Date(1000 * b.publishedTimestamp).getMonth()}
                    className={getClassName('pages__card')}
                    fillImageSrc={b.blogHeroImage}
                    imageSrc={b.blogImage}
                    linkUrl={`/blog/view?id=${b.blogId}`}
                    title={b.blogName}
                    imageBorder={
                      b.blogImageBorderColor ? b.blogImageBorderColor : null
                    }
                    bannerColor={b.blogBannerColor ? b.blogBannerColor : null}
                    autoTallLayout
                    light={b.blogCardLight}
                  >
                    {b && b.blogTags && b.blogTags.map(t => <Tag type={t} />)}
                  </ArticleCard>
                ),
            )}
          </div>
        )}
      </div>
    );
  }
}

export default BlogsPage;
