import React from 'react';
import PropTypes from 'prop-types';
import Paragraph from '@george-gillams/components/paragraph';
import Skeleton, { SKELETON_STYLES } from '@george-gillams/components/skeleton';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';

import redirects from 'helpers/redirects';
import DebugObject from 'components/common/DebugObject';

import PageContainer from 'components/common/PageContainer';
import { StyledSubsection } from './site-map.styles';
import { withScrollAnimation } from '@george-gillams/components/effects';
import { useEffectOnce } from 'react-use';
const StyledSubsectionWithScroll = withScrollAnimation(StyledSubsection);

const SiteMap = props => {
  const { ssrBlogs, loadBlogs, blogListState, authenticatorState } = props;

  useEffectOnce(() => {
    loadBlogs();
  });

  let blogList = null;
  let writingBlogList = null;
  if (blogListState && blogListState.blogs) {
    blogList = blogListState.blogs;
  } else if (ssrBlogs) {
    blogList = ssrBlogs;
  }

  if (blogList) {
    writingBlogList = blogList.filter(b => !b.deleted && b.title && b.published && b.showInBlogsList);
  }
  const admin = !!(authenticatorState && authenticatorState.user && authenticatorState.user.admin);

  return (
    <PageContainer bottomPadding>
      <PageTitle name="Site map" {...props}>
        <DebugObject debugTitle="Sitemap" debugObject={{ loadBlogs, authenticatorState, blogListState }} />
        <StyledSubsectionWithScroll anchor={false} name="Blog 📝">
          <Paragraph>
            <TextLink href={`/blog`}>Blog list</TextLink>
            <br />
            {!writingBlogList && (
              <>
                <Skeleton skeletonStyle={SKELETON_STYLES.textLink} />
                <Skeleton skeletonStyle={SKELETON_STYLES.textLink} />
                <Skeleton skeletonStyle={SKELETON_STYLES.textLink} />
                <Skeleton skeletonStyle={SKELETON_STYLES.textLink} />
                <Skeleton skeletonStyle={SKELETON_STYLES.textLink} />
                <Skeleton skeletonStyle={SKELETON_STYLES.textLink} />
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
        </StyledSubsectionWithScroll>
        {admin && (
          <StyledSubsectionWithScroll anchor={false} name="All blogs">
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
          </StyledSubsectionWithScroll>
        )}
        <StyledSubsectionWithScroll anchor={false} name="Photography 📷">
          <Paragraph>
            <TextLink href="/photography">Photography</TextLink>
            <br />
            <TextLink href="/drone">Drone certification and Operator IDs</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Reading list 📚">
          <Paragraph>
            <TextLink href="/reading-list">Reading list</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Races 🏅">
          <Paragraph>
            <TextLink href="/races">Races</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Work 📱">
          <Paragraph>
            <TextLink href="/work">Overview</TextLink>
            <br />
            <TextLink href="/work/qualifications">Qualifications</TextLink>
            <br />
            <TextLink href="/work/backpack">Backpack</TextLink>
            <br />
            <TextLink href="/work/degree">Degree</TextLink>
            <br />
            <TextLink href="/work/epicc">EPICC</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Apps 🖥️">
          <Paragraph>
            <TextLink href="/app-privacy-policy">App privacy Policy</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Design 🎨">
          <Paragraph>
            <TextLink href="/privacy-policy">Privacy Policy</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Other stuff 🤷‍♂️">
          <Paragraph>
            <TextLink href="/contact">Contact</TextLink>
            <br />
            <TextLink href="/support">Support</TextLink>
            <br />
            <TextLink href="/debug">Debug tools</TextLink>
            <br />
            <TextLink href="/status">Status</TextLink>
            <br />
            <TextLink href="/coffee">Coffee</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Random 🐉">
          <Paragraph>
            <TextLink hrefExternal href="/robots.txt">
              Robots.txt
            </TextLink>
            <br />
            <TextLink hrefExternal href="/sitemap.xml">
              SiteMap.xml
            </TextLink>
            <br />
            <TextLink href="/404">Error page - not found</TextLink>
            <br />
            <TextLink href="/teapot">Error page - I&apos;m a teapot</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="API">
          <Paragraph>
            <TextLink href="/api-docs">API docs</TextLink>
          </Paragraph>
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Accounts 🔑">
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
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Admin 👮‍♂️">
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
        </StyledSubsectionWithScroll>
        <StyledSubsectionWithScroll anchor={false} name="Redirects 👉">
          <Paragraph>
            {redirects.map(redirect => (
              <div key={redirect.from}>
                <TextLink href={`${redirect.from}`}>{`${redirect.from} ⇒ ${redirect.to}`}</TextLink>
                <br />
              </div>
            ))}
          </Paragraph>
        </StyledSubsectionWithScroll>
      </PageTitle>
    </PageContainer>
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
