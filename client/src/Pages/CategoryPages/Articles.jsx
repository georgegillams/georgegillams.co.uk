import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ArticleCard from '../../components/ArticleCard';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import Tag, { TAG_TYPES } from '../../components/Tag';
import TagFilter from '../../components/TagFilter';
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

import STYLES from '../pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const TagFilterRoutable = withRouter(TagFilter);

class Articles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTags: [],
    };
  }

  render() {
    return (
      <div>
        <PageSwitchScroller />
        <TagFilterRoutable
          selectedTags={this.state.selectedTags}
          onSelectedTagsChanged={nst => {
            this.setState({ selectedTags: nst });
          }}
          className={getClassName('pages__card')}
        />
        {/* <ArticleCard
        day={0}
        month="NaN"
        className={getClassName('pages__card')}
        imageSrc={lrSm}
        linkUrl="/blog/lightroom-workflow"
        title="My Lightroom Workflow"
      >
        <Tag type={TAG_TYPES.photography} />
      </ArticleCard>
      <ArticleCard
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
          this.state.selectedTags.includes('events')) && (
          <ArticleCard
            light
            imageBorder="darkorange"
            day={19}
            month="Feb"
            className={getClassName('pages__card')}
            fillImageSrc={toughMudder}
            imageSrc={toughMudderSm}
            linkUrl="/blog/tough-mudder"
            title="Running 5 Tough Mudders"
          >
            <Tag type={TAG_TYPES.events} />
          </ArticleCard>
        )}
        {(this.state.selectedTags.length === 0 ||
          this.state.selectedTags.includes('tech')) && (
          <ArticleCard
            backgroundImageClassName={getClassName(
              'pages__nn-background-image',
            )}
            imageBorder="red"
            day={8}
            month="Dec"
            className={getClassName('pages__card')}
            fillImageSrc={netNeutrality}
            imageSrc={netNeutralitySm}
            linkUrl="/blog/net-neutrality"
            title="My Take on Net Neutrality"
          >
            <Tag type={TAG_TYPES.tech} />
          </ArticleCard>
        )}
        {(this.state.selectedTags.length === 0 ||
          this.state.selectedTags.includes('tech')) && (
          <ArticleCard
            light
            day={23}
            imageBorder="lightgray"
            month="Dec"
            className={getClassName('pages__card')}
            fillImageSrc={vim}
            imageSrc={vimSm}
            linkUrl="/blog/vim"
            title="Switching to Vim"
          >
            <Tag type={TAG_TYPES.tech} />
          </ArticleCard>
        )}
      </div>
    );
  }
}

export default Articles;
