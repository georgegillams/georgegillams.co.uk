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

class Articles extends Component {
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
    console.log('this.state.blogs');
    console.log(this.state.blogs);

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
          <Section name="Database articles (beta)">
            {this.state.blogs.map(b => (
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
            ))}
          </Section>
        )}
        <Section name="Hardcoded articles (depreciated)">
          {(this.state.selectedTags.length === 0 ||
            HelperFunctions.includes(
              this.state.selectedTags,
              'photography',
            )) && (
            <ArticleCard
              day={28}
              month="Mar"
              className={getClassName('pages__card')}
              imageSrc={lrSm}
              linkUrl="/blog/lightroom-workflow"
              title="My Lightroom Workflow"
              autoTallLayout
            >
              <Tag type={TAG_TYPES.photography} />
            </ArticleCard>
          )}
          {/* <ArticleCard
        light
        day={0}
        month="NaN"
        className={getClassName('pages__card')}
        imageBorder="cornflowerblue"
        imageSrc={teapotGif}
        fillImageSrc={teapot}
        linkUrl="/blog/react-http-response-codes"
        title="Sending a 418 in React.js"
      >
        <Tag type={TAG_TYPES.tech}  />
      </ArticleCard>
      <ArticleCard
        day={0}
        month="NaN"
        className={getClassName('pages__card')}
        imageSrc={rustSm}
        linkUrl="/blog/week-of-rust"
        title="My week of Rust"
      >
        <Tag type={TAG_TYPES.tech}  />
      </ArticleCard>{' '} */}
          {(this.state.selectedTags.length === 0 ||
            HelperFunctions.includes(this.state.selectedTags, 'events')) && (
            <ArticleCard
              light
              bannerColor="darkorange"
              imageBorder="darkorange"
              day={19}
              month="Feb"
              className={getClassName('pages__card')}
              fillImageSrc={toughMudder}
              imageSrc={toughMudderSm}
              linkUrl="/blog/tough-mudder"
              title="Running 5 Tough Mudders"
              autoTallLayout
            >
              <Tag type={TAG_TYPES.events} />
            </ArticleCard>
          )}
          {(this.state.selectedTags.length === 0 ||
            HelperFunctions.includes(this.state.selectedTags, 'tech')) && (
            <ArticleCard
              backgroundImageClassName={getClassName(
                'pages__nn-background-image',
              )}
              imageBorder="red"
              bannerColor="red"
              day={8}
              month="Dec"
              className={getClassName('pages__card')}
              fillImageSrc={netNeutrality}
              imageSrc={netNeutralitySm}
              linkUrl="/blog/net-neutrality"
              title="My Take on Net Neutrality"
              autoTallLayout
            >
              <Tag type={TAG_TYPES.tech} />
            </ArticleCard>
          )}
          {(this.state.selectedTags.length === 0 ||
            HelperFunctions.includes(this.state.selectedTags, 'tech')) && (
            <ArticleCard
              light
              day={23}
              bannerColor="#E2344F"
              imageBorder="lightgray"
              month="Dec"
              className={getClassName('pages__card')}
              fillImageSrc={vim}
              imageSrc={vimSm}
              linkUrl="/blog/vim"
              title="Switching to Vim"
              autoTallLayout
            >
              <Tag type={TAG_TYPES.tech} />
            </ArticleCard>
          )}
        </Section>
      </div>
    );
  }
}

export default Articles;
