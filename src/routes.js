import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { isLoaded as isAuthLoaded, load as loadAuth } from "redux/modules/auth";
import {
  App,
  Chat,
  LoginMagic,
  VerifyEmail,
  Home,
  Widgets,
  About,
  Account,
  PaymentViewer,
  SignUp,
  Blogs,
  TravelBlogs,
  BpkDemoPage,
  PasswordCharacterExtractor,
  AboutDegree,
  Admin,
  Contact,
  Photography,
  Payments,
  Work,
  LoginSuccess,
  Survey,
  AdminBlogs,
  DesignColours,
  DesignComponents,
  DesignTypography,
  DesignPrivacyPolicy,
  SiteMap,
  NotFound,
  CommentEditor,
  AdminBlogEditor,
  BlogViewer,
  Pagination
} from "containers";
import redirects from "./redirects";
import HelperFunctions from "./helpers/HelperFunctions";

export default store => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {
        auth: { user }
      } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace("/");
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const redirect = (to, nextState, replace, cb) => {
    const exactRequestedPath = `${nextState.location.pathname}${
      nextState.location.search
    }`;
    let destination = to;
    if (HelperFunctions.includes(exactRequestedPath, "?")) {
      redirects.forEach(red => {
        if (red.from === exactRequestedPath) {
          destination = red.to;
        }
      });
    }
    replace(destination);
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route component={App}>
      {/* Home (main) route */}
      <Route exact path="/" component={Home} />

      {redirects.map(red => (
        <Route
          exact
          path={red.from}
          onEnter={(nextState, replace, cb) =>
            redirect(red.to, nextState, replace, cb)
          }
          status={301}
        />
      ))}

      {/* Routes requiring login */}
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat} />
        <Route path="loginSuccess" component={LoginSuccess} />
      </Route>

      {/* Routes */}
      <Route path="about" component={About} />
      <Route path="comment-editor/:id" component={CommentEditor} />
      <Route path="magic-login/:key" component={LoginMagic} />
      <Route path="email-verification/:key" component={VerifyEmail} />
      <Route exact path="blog" component={Blogs} />
      <Route path="blog/:id" component={BlogViewer} />
      <Route path="travel/:id" component={BlogViewer} />
      <Route path="admin" component={Admin} />
      <Route path="admin/blog" component={AdminBlogs} />
      <Route path="admin/blog/:id" component={AdminBlogEditor} />
      <Route path="contact" component={Contact} />
      <Route path="design/privacy-policy" component={DesignPrivacyPolicy} />
      <Route path="design/colours" component={DesignColours} />
      <Route path="design/components" component={DesignComponents} />
      <Route path="design/typography" component={DesignTypography} />
      <Route path="account" component={Account} />
      <Route path="pagination" component={Pagination} />
      <Route path="photography" component={Photography} />
      <Route path="sign-up" component={SignUp} />
      <Route path="site-map" component={SiteMap} />
      <Route path="sitemap" component={SiteMap} />
      <Route path="survey" component={Survey} />
      <Route path="travel" component={TravelBlogs} />
      <Route path="widgets" component={Widgets} />
      <Route path="payments" component={Payments} />
      <Route path="payments/:id" component={PaymentViewer} />
      <Route path="work" component={Work} />
      <Route path="work/degree" component={AboutDegree} />
      <Route
        path="apps/password-character-extractor"
        component={PasswordCharacterExtractor}
      />
      <Route path="work/bpk-component-demo" component={BpkDemoPage} />

      {/* Catch all route */}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
