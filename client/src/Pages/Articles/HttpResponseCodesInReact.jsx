import React from 'react';
import PropTypes from 'prop-types';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import TextLink from '../../components/TextLink';
import Quote from '../../components/Quote';
import Code from '../../components/Code';
import ScrollIndicator from '../../components/ScrollIndicator';
import PageSwitchScroller from '../../components/PageSwitchScroller';

const DATE_WRITTEN = new Date(0, 0, 0, 0, 0, 0);
const PAGE_ID = 991846135;

const WeekOfRust = props => {
  const { className, ...rest } = props;
  const classNameFinal = [];
  if (className) {
    classNameFinal.push(className);
  }

  return (
    <main className={classNameFinal.join(' ')} {...rest}>
      <ScrollIndicator />
      <br />
      <PageSwitchScroller />
      <Section name="React.js and HTTP status codes">
        <ArticleDate date={DATE_WRITTEN} />
        <SubSection name="The Problem">
          In react, and many other modern web frameworks, the application
          abstracts routing away from the tradition mechanism of having a file
          structure which corresponds to the shape of the website. As a result,
          the routing mechanism (which in react determines what component should
          be shown for various different routes) happens in the client’s
          browser. The react app itself decides what to show the user based on
          their current url, and can therefore switch between pages without
          making new http requests for the entire page.
        </SubSection>
        <SubSection name="Adding a 404">
          Many developers implement a 404 page in a react app by simply
          returning their 404 page component for any route that has not already
          been swept up by the other routes defined in their react-router
          mapping. Although this is effective in providing the expected result
          to the user, the react-router has no concept of an error having even
          occurred. That’s because it’s simply delivering the 404 component it’s
          been asked to, and the server thinks everything is fine. Therefore, if
          we executed the two commands below, we would get the same http
          response code for each:
          <br />
          <br />
          <Code lang="bash">
            {'curl -i --raw https://www.georgegillams.co.uk/'}
            <br />
            {
              'curl -i --raw https://www.georgegillams.co.uk/example/non-existent-page'
            }
          </Code>
          <br />
          If we are being really picky, this is a bit odd. When we open up the
          network tab, we’re getting a OK 200 response which renders an ERROR
          404 to the user. It doesn’t seem quite right
        </SubSection>
        <SubSection name="A more correct solution">
          I wondered if there was a quick answer to this online already, but I
          couldn’t find one. My solution is, therefore, as follows:
          <br />
          &nbsp;&nbsp;1. Create an express app which runs allong side your react
          app on the server.
          <br />
          &nbsp;&nbsp;2. Have that express app process every request, and if it
          doesn’t know what to do with it revert to static built react-app
          files.
          <br />
          &nbsp;&nbsp;3. If the express app wants to send a 404, it can set the
          response value before serving the 404 page.
        </SubSection>
        <SubSection name="Gotcha's">
          Obviously the man catch here is that your server app need to know what
          routes should return a 404 and which shouldn’t (as this is currently
          only captured within the react-router mapping) In order to achieve
          this, I moved my route variables to a separated consumable module
          within my web app so as to be able to flick through them from my
          server.js app as well as from my react-app. The final result can be
          seen here on GitHub. Feel free to use this as a boilerplate for your
          own react-app to correctly handle non 200 HTTP status codes!
        </SubSection>
      </Section>
      {/* <Comments pageId={PAGE_ID} /> */}
    </main>
  );
};

WeekOfRust.propTypes = {
  className: PropTypes.string,
};

WeekOfRust.defaultProps = {
  className: null,
};

export default WeekOfRust;
