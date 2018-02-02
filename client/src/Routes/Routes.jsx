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
import { Route, IndexRoute, IndexRedirect, Redirect, withRouter, NotFoundRoute } from 'react-router';

// import * as ROUTES from './../constants/routes';
// import redirects from './../constants/redirect-routes';
//
import DefaultLayout from '../components/DefaultLayout';
// import UsingLayout from './../layouts/UsingLayout';
// import TokensLayout from './../layouts/TokensLayout';
// import DocsLayout from './../layouts/DocsLayout';

import HomePage from '../Pages/HomePage';
import Admin from '../Pages/Admin';
import Work from '../Pages/Work/Work';
import PasswordCharacterExtractor from '../Pages/Work/PasswordCharacterExtractor';
import Art from '../Pages/Art/Art';
import SiteMap from '../Pages/SiteMap';
import SwitchToVim from '../Pages/Articles/SwitchToVim';
import UkBankSecurity from '../Pages/Articles/UkBankSecurity';
import NetNeutrality from '../Pages/Articles/NetNeutrality';
import MarkAustinOnAnorexiaNervosa from '../Pages/Articles/MarkAustinOnAnorexiaNervosa';
import Disneyland from '../Pages/Travel/Disneyland';
import SerreChevalier from '../Pages/Travel/SerreChevalier';
import Longleat from '../Pages/Travel/Longleat';
import Travel from '../Pages/CategoryPages/Travel';
import Articles from '../Pages/CategoryPages/Articles';
import Munich from '../Pages/Travel/Munich';
import Iceland from '../Pages/Travel/Iceland';
import Photobombing from '../Pages/Services/Photobombing';
import Contact from '../Pages/Contact';
import AboutMe from '../Pages/AboutMe';
import Engagement from '../Pages/Engagement';
import ForOhFour from '../Pages/ForOhFour';
import Degree from '../Pages/Documents/Degree';

// eslint-disable-next-line import/no-webpack-loader-syntax
const Routes = (
  <Route path="/" component={DefaultLayout}>
    <IndexRoute component={withRouter(HomePage)} />

    <Route path="/articles" component={null}>
      <IndexRedirect to="/articles/list" />
      <Route path="/articles/list" component={Articles} />
      <Route path="/articles/net-neutrality" component={NetNeutrality} />
      <Route path="/articles/vim" component={SwitchToVim} />
      <Route path="/articles/uk-bank-security" component={UkBankSecurity} />
    </Route>

    <Route path="/travel" component={null}>
      <IndexRedirect to="/travel/list" />
      <Route path="/travel/list" component={Travel} />
      <Route path="/travel/iceland-2018" component={Iceland} />
      <Route path="/travel/longleat-2017" component={Longleat} />
      <Route path="/travel/munich-2017" component={Munich} />
      <Route path="/travel/disney-2017" component={Disneyland} />
      <Route path="/travel/serre-chevalier-2017" component={SerreChevalier} />
    </Route>

    <Route path="/art" component={Art}>
      {/* <IndexRedirect to={ROUTES.GETTING_STARTED} /> */}
    </Route>

    <Route path="/site-map" component={SiteMap}>
      {/* <IndexRedirect to={ROUTES.GETTING_STARTED} /> */}
    </Route>

    <Route path="/work" component={null}>
      <IndexRedirect to="/work/portfolio" />
      <Route path="/work/portfolio" component={Work} />
    </Route>

    <Route path="/apps" component={null}>
      <IndexRedirect to="/apps/list" />
      <Route path="/apps/password-character-extractor" component={PasswordCharacterExtractor} />
    </Route>

    <Route path="/about" component={AboutMe} />
    <Route path="/contact" component={Contact} />
    <Route path="/admin" component={Admin} />

    {/* <Route component={} /> */}

    {/* {Object.keys(redirects).map(from => <Redirect key={from} from={from} to={redirects[from]} />)} */}

    <Route path="*" component={ForOhFour} />
  </Route>
);

export default Routes;
