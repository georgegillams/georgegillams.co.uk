import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Subsection from '@george-gillams/components/subsection';
import Paragraph from '@george-gillams/components/paragraph';
import TextLinkSkeleton from '@george-gillams/components/skeleton/text-link-skeleton';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import redirects from 'helpers/redirects';
import DebugObject from 'components/common/DebugObject';

import STYLES from './site-map.scss';
import { cssModules } from '@george-gillams/components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const SiteMap = props => {
  const { ssrBlogs, loadBlogs, blogListState, authenticatorState } = props;

  useEffect(() => {
    loadBlogs();
  }, []);

  let blogList = null;
  let writingBlogList = null;
  let travelBlogList = null;
  if (blogListState && blogListState.blogs) {
    blogList = blogListState.blogs;
  } else if (ssrBlogs) {
    blogList = ssrBlogs;
  }

  if (blogList) {
    writingBlogList = blogList.filter(b => !b.deleted && b.title && b.published && b.showInBlogsList);
    travelBlogList = blogList.filter(b => !b.deleted && b.title && b.published && b.showInTravelBlogsList);
  }
  const admin = !!(authenticatorState && authenticatorState.user && authenticatorState.user.admin);

  return (
    <PageTitle name="Site map" {...props}>
      <DebugObject debugTitle="Sitemap" debugObject={{ loadBlogs, authenticatorState, blogListState }} />
      <Subsection anchor={false} name="Blog 📝" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href={`/blog`}>Blog list</TextLink>
          <br />
          {!writingBlogList && (
            <>
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
            </>
          )}
          {writingBlogList && (
            <>
              {writingBlogList.map(b => (
                <>
                  <TextLink href={`/blog/${b.id}`}>{b.title}</TextLink>
                  <br />
                </>
              ))}
            </>
          )}
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Travel ✈️" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href={`/travel`}>Travel blog list</TextLink>
          <br />
          {!travelBlogList && (
            <>
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
              <TextLinkSkeleton />
            </>
          )}
          {travelBlogList && (
            <>
              {travelBlogList.map(b => (
                <>
                  <TextLink href={`/travel/${b.id}`}>{b.title}</TextLink>
                  <br />
                </>
              ))}
            </>
          )}
        </Paragraph>
      </Subsection>
      {admin && (
        <Subsection anchor={false} name="All blogs" className={getClassName('site-map__section')}>
          {blogList && (
            <Paragraph>
              {blogList.map(b => (
                <>
                  <TextLink href={`/blog/${b.id}`}>
                    {b.title || 'Untitled blog'}
                    {b.deleted && ' (deleted)'}
                  </TextLink>
                  <br />
                </>
              ))}
            </Paragraph>
          )}
        </Subsection>
      )}
      <Subsection anchor={false} name="Photography 📷" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/photography">Photography</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Work 📱" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/work">Overview</TextLink>
          <br />
          <TextLink href="/work/backpack">Backpack</TextLink>
          <br />
          <TextLink href="/work/degree">Degree</TextLink>
          <br />
          <TextLink href="/work/epicc">EPICC</TextLink>
          <br />
          <TextLink href="/work/side-projects">Side projects</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Design 🎨" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/privacy-policy">Privacy Policy</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Other stuff 🤷‍♂️" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/contact">Contact</TextLink>
          <br />
          <TextLink href="/support">Support</TextLink>
          <br />
          <TextLink href="/debug">Debug tools</TextLink>
          <br />
          <TextLink href="/status">Status</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Random 🐉" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink hrefExternal href="/robots.txt">
            Robots.txt
          </TextLink>
          <br />
          <TextLink hrefExternal href="/sitemap.xml">
            SiteMap.xml
          </TextLink>
          <br />
          <TextLink href="/404">404 error page - not found</TextLink>
          <br />
          <TextLink href="/teapot">418 error page - I&apos;m a teapot</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="API" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/api-docs">API docs</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Accounts 🔑" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/account">Account</TextLink>
          <br />
          <TextLink href="/sign-up">Sign up</TextLink>
          <br />
          <TextLink href="/login">Log in</TextLink>
          <br />
          <TextLink href="/email-verification">Email verification</TextLink>
          <br />
          <TextLink href="/magic-login">Magic login</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Admin 👮‍♂️" className={getClassName('site-map__section')}>
        <Paragraph>
          <TextLink href="/admin">Admin navigation</TextLink>
          <br />
          <TextLink href="/blog">Blogs</TextLink>
          <br />
          <TextLink href="/admin/analytics">Analytics</TextLink>
          <br />
          <TextLink href="/admin/emails">Emails</TextLink>
          <br />
          <TextLink href="/admin/notifications">Notifications</TextLink>
          <br />
          <TextLink href="/admin/users">Users</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Redirects 👉" className={getClassName('site-map__section')}>
        <Paragraph>
          {redirects.map(redirect => (
            <div key={redirect.from}>
              <TextLink href={`${redirect.from}`}>{`${redirect.from} ⇒ ${redirect.to}`}</TextLink>
              <br />
            </div>
          ))}
        </Paragraph>
      </Subsection>
    </PageTitle>
  );
};

SiteMap.propTypes = {
  ssrBlogs: PropTypes.arrayOf(PropTypes.object),
  loadBlogs: PropTypes.func.isRequired,
  blogListState: PropTypes.shape({
    blogs: PropTypes.arrayOf(PropTypes.object),
    blogsLoadError: PropTypes.object,
  }),
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
  }).isRequired,
};

SiteMap.defaultProps = {
  ssrBlogs: null,
};

export default SiteMap;
