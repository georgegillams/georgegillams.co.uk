/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
// import * as ROUTES from  './../constants/routes';
// import redirects from  './../constants/redirect-routes';
//
import DefaultLayout from '../components/DefaultLayout';
// import UsingLayout from  './../layouts/UsingLayout';
// import TokensLayout from  './../layouts/TokensLayout';
// import DocsLayout from  './../layouts/DocsLayout';

import HomePage from '../Pages/HomePage';
import Admin from '../Pages/Admin';
import Work from '../Pages/Work/Work';
import PasswordCharacterExtractor from '../Pages/Work/PasswordCharacterExtractor';
import BpkComponentDemo from '../Pages/Work/BpkComponentDemoPage';
import Art from '../Pages/Art/Art';
import SiteMap from '../Pages/SiteMap';
import HttpResponseCodesInReact from '../Pages/Articles/HttpResponseCodesInReact';
import WeekOfRust from '../Pages/Articles/WeekOfRust';
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
        <Route component={ForOhFour} />
      </Switch>
    </DefaultLayout>
  </BrowserRouter>
);

export default Routes;
