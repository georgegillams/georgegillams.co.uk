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

import STYLES from '../pages.scss';
import STYLES_2 from '../../components/tag-filter.scss';

const getClassName = className =>
  STYLES[className] || STYLES_2[className] || 'UNKNOWN';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const LlAnimatedContent = withLazyLoading(AnimatedContent, documentIfExists);

const TagFilterRoutable = withRouter(TagFilter);

class TravelPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
      travelBlogs: null,
      refreshContinuously: true,
    };
  }

  componentDidMount() {
    const getTravelBlogs = () => {
      if (this.state.refreshContinuously) {
        DatabaseFunctions.getBlogs(
          'travel',
          '',
          this.state.selectedTags,
          results => {
            this.setState({
              travelBlogs: results,
            });
          },
        );
      }
    };

    getTravelBlogs();
    setInterval(getTravelBlogs, 2000);
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
        {!this.state.travelBlogs && <Loading />}
        {this.state.travelBlogs && (
          <div>
            {this.state.travelBlogs.map(b => (
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
                  linkUrl={`/travel/view?id=${b.blogId}`}
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

export default TravelPage;
