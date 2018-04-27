import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import Funnies from 'funnies';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import Tag, { TAG_TYPES } from '../../components/Tag';
import TagFilter from '../../components/TagFilter';
import Section from '../../components/Section';
import SubSection from '../../components/SubSection';
import netNeutrality from '../Articles/images/spinner.gif';
import netNeutralitySm from '../Articles/images/netNeutralitySm.jpg';
import vim from '../Articles/images/vim.jpg';
import vimSm from '../Articles/images/vimSm.png';
import toughMudder from '../Articles/images/toughMudder.jpg';
import toughMudderSm from '../Articles/images/toughMudderSm.jpg';
import rustSm from '../Articles/images/rustSm.jpg';
import lrSm from '../Articles/images/lrSm.jpg';
import teapotGif from '../Articles/images/teapot.gif';
import teapot from '../Articles/images/teapot.jpg';
import HelperFunctions from '../../HelperFunctions';
import DatabaseFunctions from '../../DatabaseFunctions';

const funnies = new Funnies();

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
      DatabaseFunctions.getBlogs('', results => {
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
        {!this.state.blogs && (
          <SubSection
            noAnchor
            style={{ textAlign: 'center' }}
            name="Loading..."
          >
            {funnies.message()}
            <br />
            <br />
            <BpkExtraLargeSpinner large type={SPINNER_TYPES.dark} />
          </SubSection>
        )}
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
