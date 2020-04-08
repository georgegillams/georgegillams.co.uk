import React from 'react';
import appConfig from '../../../config/app-config';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { cssModules } from 'bpk-react-utils';

import STYLES from './style.scss';
import HelperFunctions from 'helpers/HelperFunctions';

import ScrollToTop from 'components/ScrollToTop';

import PageContainer from 'containers/PageContainer';
import AccountPage from 'containers/Account/Loadable';
import AdminPage from 'containers/Admin';
import AdminBlogs from 'containers/AdminBlogs/Loadable';
import AdminNotifications from 'containers/AdminNotifications/Loadable';
import AdminNotificationEdit from 'containers/AdminNotificationEdit/Loadable';
import GrammarML from 'containers/GrammarML/Loadable';
import AdminBlogEdit from 'containers/AdminBlogEdit/Loadable';
import AdminAnalyticsPage from 'containers/AdminAnalytics/Loadable';
import AdminUsersPage from 'containers/AdminUsers/Loadable';
import AdminUsersEdit from 'containers/AdminUserEdit/Loadable';
import Authenticator from 'containers/Authenticator';
import Analytics from 'containers/Analytics';
import BlogViewer from 'containers/BlogViewer/Loadable';
import BlogsPage from 'containers/Blogs/Loadable';
import ContactPage from 'containers/ContactGG/Loadable';
import StatusPage from 'containers/Status/Loadable';
import DebugPage from 'containers/Debug/Loadable';
import EmailVerificationPage from 'containers/EmailVerification/Loadable';
import { Footer } from 'gg-components/Footer';
import GtsPage from 'containers/GeorgeTrackingSystem/Loadable';
import SupportPage from 'containers/Support/Loadable';
import HomePage from 'containers/HomePageGG/Loadable';
import LoginPage from 'containers/Login/Loadable';
import MagicLoginPage from 'containers/MagicLogin/Loadable';
import NavigationBarWrapper from 'containers/NavigationBarWrapperGG';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NotificationCenter from 'containers/NotificationCenter';
import PaymentsPage from 'containers/Payments/Loadable';
import MakePaymentPage from 'containers/MakePayment/Loadable';
import Photography from 'containers/Photography';
import RequestStatusWrapper from 'containers/RequestStatusWrapper';
import SignUpPage from 'containers/SignUpGG/Loadable';
import SiteMap from 'containers/SiteMap/Loadable';
import Work from 'containers/Work/Loadable';
import WorkDegreePage from 'containers/WorkDegree/Loadable';
import BpkDemoPage from 'containers/BpkDemoPage/Loadable';
import Konami from 'containers/Konami';
import MonzoPots from 'containers/MonzoPots/Loadable';
import { GGRedirect } from 'gg-components/Redirect';
import PasswordCharacterExtractor from 'containers/PasswordCharacterExtractor/Loadable';
import { SITE_URL } from 'helpers/constants';
import redirects from 'helpers/redirects';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const cleanWindowLocation = location => {
  let result = location;
  result = location.split('http://localhost:3000')[1];
  result = location.split(SITE_URL)[1];
  return result;
};

const getFullRedirect = destination => {
  if (
    window &&
    window.location &&
    HelperFunctions.includes(window.location.toString(), '?')
  ) {
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
  <div className={getClassName('app-wrapper')} id="app-wrapper">
    <div className={getClassName('app-wrapper--inner')}>
      <Helmet
        titleTemplate={`%s - ${appConfig.app.title}`}
        defaultTitle={appConfig.app.title}
      >
        <meta name="description" content={appConfig.app.description} />
      </Helmet>
      <ScrollToTop />
      <RequestStatusWrapper />
      <NavigationBarWrapper />
      <PageContainer id="mainScrollView">
        <Analytics />
        <Authenticator />
        <NotificationCenter />
        <Konami />
        <Switch>
          {redirects.map(red => (
            <Route
              exact
              key={red.from}
              path={red.from}
              render={() => <GGRedirect to={getFullRedirect(red.to)} />}
              status={301}
            />
          ))}

          <Route exact path="/" component={HomePage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/photography" component={Photography} />
          <Route exact path="/work" component={Work} />
          <Route path="/account" component={AccountPage} />
          <Route path="/support" component={SupportPage} />
          <Route path="/monzoPots" component={MonzoPots} />
          <Route path="/admin/users/:id" component={AdminUsersEdit} />
          <Route path="/admin/analytics" component={AdminAnalyticsPage} />
          <Route path="/admin/users" component={AdminUsersPage} />
          <Route path="/admin/blog/create" component={AdminBlogEdit} />
          <Route path="/admin/blog/edit/:id" component={AdminBlogEdit} />
          <Route path="/admin/blog" component={AdminBlogs} />
          <Route
            path="/admin/notifications/:id"
            component={AdminNotificationEdit}
          />
          <Route path="/admin/notifications" component={AdminNotifications} />
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
          <Route path="/status" component={StatusPage} />
          <Route path="/debug" component={DebugPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/email-verification" component={EmailVerificationPage} />
          <Route path="/gts" component={GtsPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/magic-login" component={MagicLoginPage} />
          <Route exact path="/payments" component={PaymentsPage} />
          <Route
            path="/payments/make-payment/:id"
            component={MakePaymentPage}
          />
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
          <Route path="/ml/grammar" component={GrammarML} />
          <Route path="/work/degree" component={WorkDegreePage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </PageContainer>
    </div>
    <Footer aws={process.env.AWS} />
  </div>
);

export default App;
