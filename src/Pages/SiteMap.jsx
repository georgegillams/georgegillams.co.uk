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
      refreshContinuously: true,
    };
  }

  componentDidMount() {
    const getBlogs = () => {
      if (this.state.refreshContinuously) {
        DatabaseFunctions.getBlogs('all', '', [], results => {
          this.setState({
            blogs: results,
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
          {this.state.blogs &&
            this.state.blogs.map(b => {
              if (!b.blogShowInTravelBlogsList) {
                return null;
              }
              return (
                <div>
                  <TextLink href={`/travel/view?id=${b.blogId}`}>
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
          name="Other 👻"
        >
          {this.state.blogs &&
            this.state.blogs.map(b => {
              if (b.blogShowInBlogsList || b.blogShowInTravelBlogsList) {
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
          <TextLink href="/work/degree">Degree</TextLink>
          <br />
          <TextLink href="/work">Portfolio</TextLink>
          <br />
          <TextLink href="/work/bpk-component-demo">
            Backpack Demo Component
          </TextLink>
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
          name="Design 🎨"
        >
          <TextLink href="/design/privacy-policy">Privacy Policy</TextLink>
          <br />
          <TextLink href="/design/colours">Colours</TextLink>
          <br />
          <TextLink href="/design/components">Components</TextLink>
          <br />
          <TextLink href="/design/typography">Typograhpy</TextLink>
        </SubSection>
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
          <TextLink external href="/robots.txt">
            Robots.txt{' '}
          </TextLink>
          <br />
          <TextLink external href="/sitemap.xml">
            SiteMap.xml{' '}
          </TextLink>
          <br />
          <TextLink href="/418"> Error 418: I&apos;m a teapot</TextLink>
          <br />
          <TextLink href="/page-not-found"> 404 Page</TextLink>
        </SubSection>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="API"
        >
          <TextLink external href="/api/greasemonkey/find_backpack_components">
            /api/greasemonkey/find_backpack_components{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/github_travis_new_tab">
            /api/greasemonkey/github_travis_new_tab{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/github_squash_reminder">
            /api/greasemonkey/github_squash_reminder{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/gurushots_boost">
            /api/greasemonkey/gurushots_boost{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/secureEcs_download">
            /api/greasemonkey/secureEcs_download{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/skyscanner_buttons">
            /api/greasemonkey/skyscanner_buttons{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/github_highlight_name">
            /api/greasemonkey/github_highlight_name{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/github_expand_comments">
            /api/greasemonkey/github_expand_comments{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/hackthis_coding_1">
            /api/greasemonkey/hackthis_coding_1{' '}
          </TextLink>
          <br />
          <TextLink external href="/api/greasemonkey/hackthis_coding_2">
            /api/greasemonkey/hackthis_coding_2{' '}
          </TextLink>
        </SubSection>
        <SubSection
          noAnchor
          className={getClassName('pages__site-map-item')}
          name="Admin 👮‍♂️"
        >
          <TextLink href="/admin/login">Login</TextLink>
          <br />
          <TextLink href="/admin/sessions">Sessions</TextLink>
          <br />
          <TextLink href="/admin/blogs">Blogs</TextLink>
          <br />
          <TextLink href="/admin/blog-comments">Blog comments</TextLink>
          <br />
          <TextLink href="/admin/notifications">Notifications</TextLink>
          <br />
          <TextLink href="/admin/payments">Payments</TextLink>
          <br />
          <TextLink href="/admin/ping-pen-testing">Ping pen-testing</TextLink>
        </SubSection>
      </div>
    );
  }
}

export default SiteMap;
