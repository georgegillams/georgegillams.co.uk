import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';

import HomePage from '../Pages/HomePageV2';
import Admin from '../Pages/Admin/Admin';
import BlogEditorPage from '../Pages/Admin/BlogEditorPage';
import BlogViewerPage from '../Pages/BlogViewerPage';
import Work from '../Pages/Work/Work';
import PasswordCharacterExtractor from '../Pages/Work/PasswordCharacterExtractor';
import BpkComponentDemo from '../Pages/Work/BpkComponentDemoPage';
import Art from '../Pages/Art/Art';
import SiteMap from '../Pages/SiteMap';
import TravelPage from '../Pages/CategoryPages/TravelPage';
import BlogsPage from '../Pages/CategoryPages/BlogsPage';
import Contact from '../Pages/Contact';
import AboutMe from '../Pages/AboutMe';
import AboutDegree from '../Pages/AboutDegree';
import ForOhFour from '../Pages/ForOhFour';
import TeaPot from '../Pages/TeaPot';
import Payments from '../Pages/Payments';
import PaymentView from '../Pages/PaymentView';
import Design from '../Pages/Design/Design';
import AdminPingTest from '../Pages/Admin/AdminPingTest';

const redirects = [
  { from: '/design', to: '/design/privacy-policy' },
  { from: '/admin', to: '/admin/login' },
  { from: '/about/degree', to: '/work/degree' },
  { from: '/articles/tough-mudder', to: '/blog/tough-mudder' },
  { from: '/articles/net-neutrality', to: '/blog/net-neutrality' },
  { from: '/articles/vim', to: '/blog/vim' },
  { from: '/articles/uk-bank-security', to: '/blog/uk-bank-security' },
  { from: '/articles/week-of-rust', to: '/blog/week-of-rust' },
  {
    from: '/articles/react-http-response-codes',
    to: '/blog/react-http-response-codes',
  },
  { from: '/articles/list', to: '/blog' },
  { from: '/articles', to: '/blog' },
  { from: '/net-neutrality', to: '/blog/net-neutrality' },
  { from: '/blog/tough-mudder', to: '/blog/view?id=tg5x7po9' },
  { from: '/blog/lightroom-workflow', to: '/blog/view?id=lqngy' },
  { from: '/blog/net-neutrality', to: '/blog/view?id=w85aht' },
  { from: '/blog/vim', to: '/blog/view?id=azcpjh' },
  { from: '/blog/uk-bank-security', to: '/blog/view?id=y77dnh' },
  { from: '/travel/list', to: '/travel' },
  { from: '/travel/serre-chevalier-2017', to: '/travel/view?id=kzm87' },
  { from: '/travel/disneyland-2017', to: '/travel/view?id=m4noe' },
  { from: '/travel/munich-2017', to: '/travel/view?id=e0muz1' },
  { from: '/travel/longleat-2017', to: '/travel/view?id=evrd8w' },
  { from: '/travel/iceland-2018', to: '/travel/view?id=q03ms' },
  { from: '/art', to: '/photography' },
  { from: '/photoshop', to: '/photography' },
  { from: '/phot', to: '/photography' },
  { from: '/photo', to: '/photography' },
  { from: '/payment', to: '/payments' },
];

const RoutedDesignPage = withRouter(Design);
const RoutedAdminPage = withRouter(Admin);

// eslint-disable-next-line import/no-webpack-loader-syntax
const Routes = (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blog" component={BlogsPage} />
        <Route path="/blog/view" component={BlogViewerPage} />
        <Route path="/travel/view" component={BlogViewerPage} />
        <Route exact path="/travel" component={TravelPage} />
        <Route path="/photography" component={Art} />
        <Route path="/work/degree" component={AboutDegree} />
        <Route exact path="/work" component={Work} />
        <Route
          exact
          path="/design/privacy-policy"
          component={RoutedDesignPage}
        />
        <Route path="/design/colours" component={RoutedDesignPage} />
        <Route path="/design/components" component={RoutedDesignPage} />
        <Route path="/design/typography" component={RoutedDesignPage} />
        <Route path="/admin/login" component={Admin} />
        <Route path="/admin/blogs" component={Admin} />
        <Route path="/admin/sessions" component={Admin} />
        <Route path="/admin/blog-comments" component={Admin} />
        <Route path="/admin/notifications" component={Admin} />
        <Route path="/admin/payments" component={Admin} />
        <Route path="/admin/ping-pen-testing" component={Admin} />
        <Route path="/admin/blog-editor" component={BlogEditorPage} />
        <Route
          path="/apps/password-character-extractor"
          component={PasswordCharacterExtractor}
        />
        <Route path="/work/bpk-component-demo" component={BpkComponentDemo} />
        <Route path="/site-map" component={SiteMap} />
        <Route path="/santander-ping" component={AdminPingTest} />
        <Route path="/payments/view" component={PaymentView} />
        <Route path="/payments" component={Payments} />
        <Route exact path="/about" component={AboutMe} />
        <Route path="/contact" component={Contact} />

        {redirects.map(redirect => (
          <Route
            exact
            path={redirect.from}
            render={() => <Redirect to={redirect.to} />}
          />
        ))}

        <Route path="/teapot" component={TeaPot} />
        <Route path="/example-418" component={TeaPot} />
        <Route path="/example-teapot" component={TeaPot} />
        <Route path="/example-404" component={ForOhFour} />
        <Route component={ForOhFour} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;
