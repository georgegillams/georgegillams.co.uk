import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';

import HomePage from '../Pages/HomePageV2';
import Admin from '../Pages/Admin/Admin';
import BlogEditorPage from '../Pages/Admin/BlogEditorPage';
import Work from '../Pages/Work/Work';
import PasswordCharacterExtractor from '../Pages/Work/PasswordCharacterExtractor';
import BpkComponentDemo from '../Pages/Work/BpkComponentDemoPage';
import Art from '../Pages/Art/Art';
import SiteMap from '../Pages/SiteMap';
import HttpResponseCodesInReact from '../Pages/Articles/HttpResponseCodesInReact';
import WeekOfRust from '../Pages/Articles/WeekOfRust';
import LightroomWorkflow from '../Pages/Articles/LightroomWorkflow';
import ToughMudder from '../Pages/Articles/ToughMudder';
import SwitchToVim from '../Pages/Articles/SwitchToVim';
import UkBankSecurity from '../Pages/Articles/UkBankSecurity';
import NetNeutrality from '../Pages/Articles/NetNeutrality';
import Disneyland from '../Pages/Travel/Disneyland';
import SerreChevalier from '../Pages/Travel/SerreChevalier';
import Longleat from '../Pages/Travel/Longleat';
import Travel from '../Pages/CategoryPages/Travel';
import Articles from '../Pages/CategoryPages/Articles';
import Munich from '../Pages/Travel/Munich';
import Iceland from '../Pages/Travel/Iceland';
import Contact from '../Pages/Contact';
import AboutMe from '../Pages/AboutMe';
import ForOhFour from '../Pages/ForOhFour';
import TeaPot from '../Pages/TeaPot';
import Payments from '../Pages/Payments';
import PaymentView from '../Pages/PaymentView';

const redirects = [
  { from: '/articles/tough-mudder', to: '/blog/tough-mudder' },
  { from: '/articles/net-neutrality', to: '/blog/net-neutrality' },
  { from: '/articles/vim', to: '/blog/vim' },
  { from: '/articles/uk-bank-security', to: '/blog/uk-bank-security' },
  {
    from: '/articles/react-http-response-codes',
    to: '/blog/react-http-response-codes',
  },
  { from: '/articles/week-of-rust', to: '/blog/week-of-rust' },
  { from: '/travel/list', to: '/travel' },
  { from: '/articles/list', to: '/blog' },
  { from: '/articles', to: '/blog' },
  { from: '/art', to: '/photography' },
  { from: '/photoshop', to: '/photography' },
  { from: '/net-neutrality', to: '/blog/net-neutrality' },
  { from: '/phot', to: '/photography' },
  { from: '/photo', to: '/photography' },
  { from: '/payment', to: '/payments' },
];

// eslint-disable-next-line import/no-webpack-loader-syntax
const Routes = (
  <BrowserRouter>
    <DefaultLayout>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blog" component={Articles} />
        <Route
          path="/blog/react-http-response-codes"
          component={HttpResponseCodesInReact}
        />
        {/* <Route path="/blog/week-of-rust" component={WeekOfRust} /> */}
        <Route path="/blog/lightroom-workflow" component={LightroomWorkflow} />
        <Route path="/blog/tough-mudder" component={ToughMudder} />
        <Route path="/blog/net-neutrality" component={NetNeutrality} />
        <Route path="/blog/vim" component={SwitchToVim} />
        <Route path="/blog/uk-bank-security" component={UkBankSecurity} />
        <Route exact path="/travel" component={Travel} />
        <Route path="/travel/longleat-2017" component={Longleat} />
        <Route path="/travel/munich-2017" component={Munich} />
        <Route path="/travel/iceland-2018" component={Iceland} />
        <Route path="/travel/disneyland-2017" component={Disneyland} />
        <Route path="/travel/serre-chevalier-2017" component={SerreChevalier} />
        <Route path="/photography" component={Art} />
        <Route exact path="/work" component={Work} />
        <Route
          path="/apps/password-character-extractor"
          component={PasswordCharacterExtractor}
        />
        {/* <Route path="/work/bpk-component-demo" component={BpkComponentDemo} /> */}
        <Route path="/site-map" component={SiteMap} />
        <Route path="/payments/view" component={PaymentView} />
        <Route path="/payments" component={Payments} />
        <Route path="/about" component={AboutMe} />
        <Route path="/contact" component={Contact} />

        {redirects.map(redirect => (
          <Route
            exact
            path={redirect.from}
            render={() => <Redirect to={redirect.to} />}
          />
        ))}

        <Route path="/example-418" component={TeaPot} />
        <Route path="/example-teapot" component={TeaPot} />
        <Route path="/example-404" component={ForOhFour} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/blog-editor" component={BlogEditorPage} />
        <Route component={ForOhFour} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;
