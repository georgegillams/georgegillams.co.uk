import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import Section from './../../components/Section';
import SubSection from './../../components/SubSection';
import ArticleDate from '../../components/ArticleDate';
import Comments from '../../components/Comments';
import TextLink from '../../components/TextLink';
import Tag, { TAG_TYPES } from '../../components/Tag';
import Quote from '../../components/Quote';
import Code from '../../components/Code';
import CodeInline from '../../components/CodeInline';
import CodeBashArrow from '../../components/CodeBashArrow';
import ScrollIndicator from '../../components/ScrollIndicator';
import PageSwitchScroller from '../../components/PageSwitchScroller';
import httpReactHomePage from './images/http-react-home-page.png';
import httpReact418 from './images/http-react-418.png';

import STYLES from '../Work/apps.scss';

const getClassName = className => STYLES[className] || 'UNKNOWN';

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

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
        <Tag type={TAG_TYPES.tech} />
        <ArticleDate date={DATE_WRITTEN} />
        <Tag type={TAG_TYPES.tech} />
        <SubSection name="TL;DR">
          Out of the box, your react-router app will serve a 200 HTTP status
          code regardless of route. I made an app that can also return 404 and
          418 status codes, and it&apos;s{' '}
          <TextLink
            external
            href="https://github.com/georgegillams/React-app-with-HTTP-response-codes"
          >
            here{' '}
          </TextLink>.
        </SubSection>
        <SubSection name="The Problem">
          In React apps (and many other modern front-end web-app frameworks) the
          web application handles routing itself, rather than relying on a
          web-server to handle requests differently based on the URL route.
          Instead of getting a server to construct a different page dependeing
          on the route, the server can just serve the same static files to
          everyone. The client is responsible for executing the routing
          mechanism, which is achieved with React-router by swapping in
          different components depending on the route. The react app itself
          decides what to show the user based on their current URL, and can
          therefore switch between pages without making new HTTP requests for
          the entire page. You&apos;ll notice this if you open the network tab
        </SubSection>
        <SubSection name="Adding a 418 page">
          In a react app using react-router, the component to be shown is
          determined by <CodeInline>route =&gt; component</CodeInline> mappings.
          We can define a component to be returned when the route is{' '}
          <CodeInline>/teapot</CodeInline>. We can also define the component to
          be returned when no route is matched, which is an easy way to
          effectively return a &quot;404&quot; page to the user (and is{' '}
          <span role="img" aria-label="100">
            💯
          </span>⨉ better than just showing a white page). The catch, however,
          is that the react-router has no concept of a 418 or 404 error. That’s
          because it’s simply delivering the component it&apos;s been asked to
          for any given route, and the server thinks everything is fine. The
          side-effect of this is that any <CodeInline>GET</CodeInline> request
          to a non-existent page on their website will return a 200 status code.
          We can see this when executing the two commands below:
          <br />
          <br />
          <Code lang="bash">
            <CodeBashArrow />
            {'curl -i --raw https://www.georgegillams.co.uk/'}
            <br />
            {`HTTP/1.1 200 OK`}
            <br />
            {`Server: Cowboy`}
            <br />
            {`Connection: keep-alive`}
            <br />
            {`X-Powered-By: Express`}
            <br />
            {`...`}
            <br />
            <br />
            <CodeBashArrow />
            {'curl -i --raw https://www.georgegillams.co.uk/example-418/'}
            <br />
            {`HTTP/1.1 200 OK`}
            <br />
            {`Server: Cowboy`}
            <br />
            {`Connection: keep-alive`}
            <br />
            {`X-Powered-By: Express`}
            <br />
            {`...`}
            <br />
            <br />
          </Code>
          <br />
          If we are being really picky, this behaviour is a bit off. Our user is
          seeing an
          <CodeInline>ERROR 418</CodeInline> page (see below) whilst their
          browser is seeing an <CodeInline>OK 200</CodeInline>.
          <br />
          <FadingLazyLoadedImage
            className={getClassName('apps__image')}
            altText="Password Character Extraction Tool"
            style={{ width: '100%' }}
            width={2046}
            height={1500}
            src={httpReact418}
          />
        </SubSection>
        <SubSection name="A more correct solution">
          Due to using a front-end routing mechanism (which has many performance
          benefits) there is no easy fix for this. We need to give the server
          some understanding of our application structure so that it
          doesn&apos;t send the same response to all routes. The only way we can
          get requests to the server to return the correct status code is by
          implementing a more complete server application. My solution is,
          therefore, as follows:
          <br />
          &nbsp;&nbsp;1. Create an express app which runs allong side the react
          app.
          <br />
          &nbsp;&nbsp;2. Have the express app process every request, reverting
          to static built react-app files so that the react web app can be
          enjoyed in all its glory!
          <br />
          &nbsp;&nbsp;3. If the express app wants to send a 404 (or 418), it can
          set the response value before serving the web-app files.
          <br />
          <br />
          To make this change to our single-package web app, we need to create a
          new backend package. We need a <CodeInline>
            package.json
          </CodeInline>{' '}
          file containing scripts for building and running the two apps
          separately. We&apos;ll need a project structure similar to this:
          <br />
          <br />
          <Code>
            {`.`}
            <br />
            {`├── README.md`}
            <br />
            {`├── client`}
            <br />
            {`│   ├── index.html`}
            <br />
            {`│   ├── package.json`}
            <br />
            {`│   ├── public`}
            <br />
            {`│   ├── src`}
            <br />
            {`├── server`}
            <br />
            {`│   ├── package.json`}
            <br />
            {`│   ├── server.js`}
            <br />
            {`└── package.json`}
            <br />
          </Code>
          <br />
          <br />
          Our <CodeInline>./client/package.json</CodeInline> will need the
          following scripts...
          <Code lang="JSON">
            {`"scripts": {`}
            <br />
            &nbsp;&nbsp;{`"start": "react-scripts start",`}
            <br />
            &nbsp;&nbsp;{`"build": "react-scripts build"`}
            <br />
            {`}`}
          </Code>
          <br />
          <br />
          ... our <CodeInline>./server/package.json</CodeInline> will need the
          following scripts...
          <Code lang="JSON">
            {`"scripts": {`}
            <br />
            &nbsp;&nbsp;{`"build": "babel . --ignore node_modules,build --out-dir build`}
            <br />
            &nbsp;&nbsp;{`"start": "nodemon -r babel-register server.js",`}
            <br />
            &nbsp;&nbsp;{`"start:prod": "node build/server.js"`}
            <br />
            {`}`}
          </Code>
          <br />
          <br />
          ... and our <CodeInline>./package.json</CodeInline> will need the
          following scripts...
          <Code lang="JSON">
            {`"scripts": {`}
            <br />
            &nbsp;&nbsp;{`"build": "concurrently \\"cd client && yarn build\\" \\"cd server && yarn build\\"",`}
            <br />
            &nbsp;&nbsp;{`"clean": "concurrently \\"rimraf node_modules\\" \\"cd client && rimraf node_modules build\\" \\"cd server && rimraf node_modules build\\"",`}
            <br />
            &nbsp;&nbsp;{`"install": "(cd client && yarn) && (cd server && yarn)",`}
            <br />
            &nbsp;&nbsp;{`"start": "concurrently \\"cd client && PORT=3000 yarn start\\" \\"cd server && PORT=3001 yarn start\\"",`}
            <br />
            &nbsp;&nbsp;{`"start:prod": "cd server && yarn start:prod"`}
            <br />
            {`}`}
          </Code>
          <br />
          <br />
          The full project structure decribed above is availble in this repo on{' '}
          <TextLink
            external
            href="https://github.com/georgegillams/React-app-with-HTTP-response-codes"
          >
            Github{' '}
          </TextLink>.
        </SubSection>
        <SubSection name="Implementation">
          So the main parts of the app that we are intersted in are as follows:
          <br />
          <br />
          A react app, using react-router, provides different pages to the user
          according to the URL route:
          <Code
            lang="js"
            githubUrl="https://github.com/georgegillams/React-app-with-HTTP-response-codes/"
          >
            {`<BrowserRouter>`}
            <br />
            &nbsp;&nbsp;{`<Switch>`}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{`<Route exact path="/" component={HomePage} />`}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;{`<Route path="/example-418" component={Example418} />`}
            <br />
            &nbsp;&nbsp;{`</Switch>`}
            <br />
            {`</BrowserRouter>`}
          </Code>
          <br />
          <br />
          The react-app is built so that it can be served as static files. A
          server app is run which handles each request, reverting to serving the
          static files if the route is not matched:
          <Code
            lang="js"
            githubUrl="https://github.com/georgegillams/React-app-with-HTTP-response-codes/"
          >
            <br />
            {`let staticFiles = express.static(path.join(__dirname, "../client/build"));`}
            <br />
            {`const router = express.Router();`}
            <br />
            {``}
            <br />
            {`app.use(staticFiles);`}
            <br />
            {``}
            <br />
            {`router.get("/api/hello", (req, res) => {`}
            <br />
            &nbsp;&nbsp;{`res.send({ express: "Hello From Express" });`}
            <br />
            {`});`}
            <br />
            {``}
            <br />
            {`router.get("/teapot", (req, res) => {`}
            <br />
            &nbsp;&nbsp;{`res.status(418);`}
            <br />
            &nbsp;&nbsp;{`res.sendFile(path.join(__dirname, "./pages", "FourOneEight.html"));`}
            <br />
            {`});`}
            <br />
            {``}
            <br />
            {`app.use(router);`}
          </Code>
          <br />
          <br />
          So now if you clone the Github repo above and run{' '}
          <CodeInline>npm run build &amp;&amp; npm run start</CodeInline>,
          you&apos;ll have a server application running which is capable of
          handling backend requests, which reverts to the built react app static
          files for any routes it doesn&apos;t recognise, but correctly returns
          a 418 status for our <CodeInline>/teapot</CodeInline> route.
        </SubSection>
        <SubSection name="Gotcha's">
          In theory it&apos;d be easy enough to do something similar with 404
          routes. There&apos;s a gotcha, though! Our server app currently knows
          nothing about which routes are valid / invalid as the react-router
          handles the routes in the client app. We need to make changes so that
          our valid routes are captured somewhere other than within the
          react-router mapping. In order to achieve this, I simply moved route
          variables to a separate consumable file so as to allow access from
          both server and client apps.
          <br />
          <br />
          The final result can be seen here on GitHub. Feel free to use this as
          a boilerplate for your own react-app to correctly handle non-200 HTTP
          status codes!
        </SubSection>
      </Section>
      <Comments pageId={PAGE_ID} />
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
