import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import { cssModules } from 'gg-components/helpers/cssModules';
import { Footer } from 'gg-components/Footer';
import { Redirect } from 'gg-components/Redirect';

import appConfig from '../../../config/app-config';

import STYLES from './style.scss';

import HelperFunctions from 'helpers/HelperFunctions';
import ScrollToTop from 'components/ScrollToTop';
import PageContainer from 'containers/PageContainer';
import AccountPage from 'containers/Account/Loadable';
import AdminPage from 'containers/Admin/Loadable';
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
import SupportPage from 'containers/Support/Loadable';
import HomePage from 'containers/HomePageGG/Loadable';
import LoginPage from 'containers/Login/Loadable';
import MagicLoginPage from 'containers/MagicLogin/Loadable';
import NavigationBarWrapper from 'containers/NavigationBarWrapperGG';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NotificationCenter from 'containers/NotificationCenter';
import PaymentsPage from 'containers/Payments/Loadable';
import MakePaymentPage from 'containers/MakePayment/Loadable';
import Photography from 'containers/Photography/Loadable';
import RequestStatusWrapper from 'containers/RequestStatusWrapper';
import SignUpPage from 'containers/SignUpGG/Loadable';
import SiteMap from 'containers/SiteMap/Loadable';
import Work from 'containers/Work/Loadable';
import WorkBackpackPage from 'containers/WorkBackpack/Loadable';
import WorkDegreePage from 'containers/WorkDegree/Loadable';
import WorkEPICCPage from 'containers/WorkEPICC/Loadable';
import WorkSideProjectsPage from 'containers/WorkSideProjects/Loadable';
import Konami from 'containers/Konami';
import MonzoPots from 'containers/MonzoPots/Loadable';
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
        {appConfig.app.head.meta.map(m => (
          <meta name={m.property} content={m.content} />
        ))}
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
              render={() => <Redirect to={getFullRedirect(red.to)} />}
              status={301}
            />
          ))}

          <Route exact path="/" component={HomePage} />
          <Route exact path="/admin" component={AdminPage} />
          <Route exact path="/photography" component={Photography} />
          <Route exact path="/work" component={Work} />
          <Route path="/work/backpack" component={WorkBackpackPage} />
          <Route path="/work/degree" component={WorkDegreePage} />
          <Route path="/work/epicc" component={WorkEPICCPage} />
          <Route path="/work/side-projects" component={WorkSideProjectsPage} />
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
          <Route path="/ml/grammar" component={GrammarML} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </PageContainer>
    </div>
    <Footer />
  </div>
);

export default App;
