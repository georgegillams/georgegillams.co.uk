import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import AccountPage from 'containers/Account/Loadable';
import AdminPage from 'containers/Admin/Loadable';
import AdminUsersPage from 'containers/AdminUsers/Loadable';
import Authenticator from 'containers/Authenticator';
import BlogViewer from 'containers/BlogViewer/Loadable';
import BlogsPage from 'containers/Blogs/Loadable';
import ContactPage from 'containers/ContactGG/Loadable';
import EmailVerificationPage from 'containers/EmailVerification/Loadable';
import Footer from 'components/Footer';
import GtsPage from 'containers/GeorgeTrackingSystem/Loadable';
import HomePage from 'containers/HomePageGG/Loadable';
import LoginPage from 'containers/Login/Loadable';
import MagicLoginPage from 'containers/MagicLogin/Loadable';
import NavigationBarWrapper from 'containers/NavigationBarWrapperGG';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NotificationCenter from 'containers/NotificationCenter';
import PaymentsPage from 'containers/Payments/Loadable';
import Photography from 'containers/Photography';
import RequestStatusWrapper from 'containers/RequestStatusWrapper';
import SignUpPage from 'containers/SignUpGG/Loadable';
import SiteMap from 'containers/SiteMap/Loadable';
import Work from 'containers/Work/Loadable';
import AboutDegree from 'containers/AboutDegree/Loadable';
import BpkDemoPage from 'containers/BpkDemoPage/Loadable';
import MonzoPots from 'containers/MonzoPots/Loadable';
import PasswordCharacterExtractor from 'containers/PasswordCharacterExtractor/Loadable';
import { SITE_URL } from 'helpers/constants';
import redirects from 'helpers/redirects';
import './style.scss';

const cleanWindowLocation = location => {
  let result = location;
  result = location.split('http://localhost:3000')[1];
  result = location.split(SITE_URL)[1];
  return result;
};

const getFullRedirect = destination => {
  if (window && window.location && window.location.toString().includes('?')) {
    const fullPath = cleanWindowLocation(window.location.toString());
    for (let i = 0; i < redirects.length; i += 1) {
      if (redirects[i].from === fullPath) {
        return redirects[i].to;
      }
    }
  }
  return destination;
};

const App = () => (
  <div>
    <Helmet titleTemplate="%s - George Gillams" defaultTitle="George Gillams">
      <meta
        name="description"
        content="George Gillams - open source software engineer"
      />
    </Helmet>
    <RequestStatusWrapper />
    <NavigationBarWrapper />
    <Authenticator />
    <NotificationCenter />
    <Switch>
      {redirects.map(red => (
        <Route
          exact
          path={red.from}
          render={() => <Redirect to={getFullRedirect(red.to)} />}
          status={301}
        />
      ))}

      <Route exact path="/" component={HomePage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/photography" component={Photography} />
      <Route exact path="/work" component={Work} />
      <Route path="/account" component={AccountPage} />
      <Route path="/monzoPots" component={MonzoPots} />
      <Route path="/admin/users" component={AdminUsersPage} />
      <Route
        path="/apps/password-character-extractor"
        component={PasswordCharacterExtractor}
      />
      <Route
        exact
        path="/blog"
        component={() => (
          <BlogsPage
            linkPrefix="blog"
            selectedNav="Writing"
            filter={b => b.showInBlogsList}
          />
        )}
      />
      <Route path="/blog/:id" component={BlogViewer} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/email-verification" component={EmailVerificationPage} />
      <Route path="/gts" component={GtsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/magic-login" component={MagicLoginPage} />
      <Route path="/payments" component={PaymentsPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/sitemap" component={SiteMap} />
      <Route
        exact
        path="/travel"
        component={() => (
          <BlogsPage
            linkPrefix="travel"
            selectedNav="Travel"
            filter={b => b.showInTravelBlogsList}
          />
        )}
      />
      <Route path="/travel/:id" component={BlogViewer} />
      <Route path="/work/bpk-component-demo" component={BpkDemoPage} />
      <Route path="/work/degree" component={AboutDegree} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    <Footer />
  </div>
);

export default App;