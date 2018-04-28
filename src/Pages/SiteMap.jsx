import React, { Component } from 'react';
import TextLink from '../components/TextLink';
import SubSection from '../components/SubSection';
import DatabaseFunctions from '../DatabaseFunctions';
import { NON_EMOJI_REGEX } from '../shared/constants';

import STYLES from './pages.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

class SiteMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: null,
      travelBlogs: null,
      refreshContinuously: true,
    };
  }

  componentDidMount() {
    const getBlogs = () => {
      if (this.state.refreshContinuously) {
        DatabaseFunctions.getBlogs(
          '',
          ['tech', 'photography', 'events', 'security'],
          results => {
            this.setState({
              blogs: results,
            });
          },
        );
        DatabaseFunctions.getBlogs('', ['travel'], results => {
          this.setState({
            travelBlogs: results,
          });
        });
      }
    };

    getBlogs();
    setInterval(getBlogs, 2000);
  }

  componentWillUnmount() {
    this.setState({
      refreshContinuously: false,
    });
  }

  render() {
    return (
      <div>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Blog 📝"
        >
          {this.state.blogs &&
            this.state.blogs.map(b => {
              if (!b.blogShowInBlogsList) {
                return null;
              }
              return (
                <div>
                  <TextLink href={`/blog/view?id=${b.blogId}`}>
                    {b.blogName.match(NON_EMOJI_REGEX).join('')}
                  </TextLink>
                  <br />
                </div>
              );
            })}
        </SubSection>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Travel ✈️"
        >
          {this.state.travelBlogs &&
            this.state.travelBlogs.map(b => {
              if (!b.blogShowInBlogsList) {
                return null;
              }
              return (
                <div>
                  <TextLink href={`/blog/view?id=${b.blogId}`}>
                    {b.blogName.match(NON_EMOJI_REGEX).join('')}
                  </TextLink>
                  <br />
                </div>
              );
            })}
        </SubSection>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Photography 🎨"
        >
          <TextLink href="/photography">See some artistic creations</TextLink>
        </SubSection>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Work 📱"
        >
          <TextLink href="/work">Portfolio</TextLink>
          <br />
          <TextLink href="/apps/password-character-extractor">
            Password Character Extractor
          </TextLink>
        </SubSection>
        {/* <SubSection noAnchor className={getClassName('pages__site-map-item')} name="Documents 🥇">
        <TextLink  href="/documents/degree">
         <SubSection noAnchor nclassName={getClassName('pages__site-map-item')}oPadding link name="Degree Certificate - 2018
      </TextLink>
        <br />
    </SubSection> */}
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Other stuff 🤷‍♂️"
        >
          <TextLink href="/about">About me</TextLink>
          <br />
          <TextLink href="/contact">Contact</TextLink>
          <br />
          <TextLink href="/payments">Payments</TextLink>
        </SubSection>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Random 🐉"
        >
          <TextLink href="/418"> Error 418: I&apos;m a teapot</TextLink>
          <br />
          <TextLink href="/page-not-found"> 404 Page</TextLink>
        </SubSection>
      </div>
    );
  }
}

export default SiteMap;
