import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Subsection } from 'gg-components/Subsection';
import { Paragraph } from 'gg-components/Paragraph';
import TextLinkSkeleton from 'gg-components/Skeletons/TextLinkSkeleton';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import redirects from 'helpers/redirects';
import DebugObject from 'components/common/DebugObject';

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
      <Subsection anchor={false} name="Blog 📝">
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
          <Paragraph>
            {writingBlogList.map(b => (
              <>
                <TextLink href={`/blog/${b.id}`}>{b.title}</TextLink>
                <br />
              </>
            ))}
          </Paragraph>
        )}
      </Subsection>
      <Subsection anchor={false} name="Travel ✈️">
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
          <Paragraph>
            {travelBlogList.map(b => (
              <>
                <TextLink href={`/travel/${b.id}`}>{b.title}</TextLink>
                <br />
              </>
            ))}
          </Paragraph>
        )}
      </Subsection>
      {admin && (
        <Subsection anchor={false} name="All blogs">
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
      <Subsection anchor={false} name="Photography 📷">
        <Paragraph>
          <TextLink href="/photography">Photography</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Work 📱">
        <Paragraph>
          <TextLink href="/work">Overview</TextLink>
          <br />
          <TextLink href="/work/backpack">Backpack</TextLink>
          <br />
          <TextLink href="/work/degree">Degree</TextLink>
          <br />
          <TextLink href="/work/EPICC">EPICC</TextLink>
          <br />
          <TextLink href="/work/side-projects">Side projects</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Design 🎨">
        <Paragraph>
          <TextLink href="/privacy-policy">Privacy Policy</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Other stuff 🤷‍♂️">
        <Paragraph>
          <TextLink href="/contact">Contact</TextLink>
          <br />
          <TextLink href="/support">Support</TextLink>
          <br />
          <TextLink href="/status">Status</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Random 🐉">
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
      <Subsection anchor={false} name="API">
        <Paragraph>
          <TextLink href="/api-docs">API docs</TextLink>
          <br />
          <TextLink hrefExternal href="/browser-scripts/disney_plus_play_pause">
            /browser-scripts/disney_plus_play_pause
          </TextLink>
          <br />
          <TextLink hrefExternal href="/browser-scripts/github_actual-time">
            /browser-scripts/github_actual-time
          </TextLink>
          <br />
          <TextLink hrefExternal href="/browser-scripts/github_auto_merge">
            /browser-scripts/github_auto_merge
          </TextLink>
          <br />
          <TextLink hrefExternal href="/browser-scripts/github_expand_rich_diffs">
            /browser-scripts/github_expand_rich_diffs
          </TextLink>
          <br />
          <TextLink hrefExternal href="https://github.com/georgegillams/browser-scripts/#browser-scripts">
            More scripts on GitHub
          </TextLink>
          <br />
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Accounts 🔑">
        <Paragraph>
          <TextLink href="/sign-up">Sign up</TextLink>
          <br />
          <TextLink href="/login">Log in</TextLink>
          <br />
          <TextLink href="/account">Account</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Admin 👮‍♂️">
        <Paragraph>
          <TextLink href="/admin">Admin navigation</TextLink>
          <br />
          <TextLink href="/blogs">Blogs</TextLink>
          <br />
          <TextLink href="/admin/users">Users</TextLink>
          <br />
          <TextLink href="/admin/analytics">Analytics</TextLink>
          <br />
          <TextLink href="/admin/emails">Emails</TextLink>
          <br />
          <TextLink href="/admin/notifications">Notifications</TextLink>
        </Paragraph>
      </Subsection>
      <Subsection anchor={false} name="Redirects 👉">
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
