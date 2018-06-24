import React from 'react';
import {
  Route,
  BrowserRouter,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';

import Work from '../Pages/Work/Work';
import AboutDegree from '../Pages/AboutDegree';

// eslint-disable-next-line import/no-webpack-loader-syntax
const Routes = props => {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Switch>
          <Route exact path="/" component={Work} />
          <Route exact path="/work" component={Work} />
          <Route exact path="/degree" component={AboutDegree} />
        </Switch>
      </DefaultLayout>
    </BrowserRouter>
  );
};

export default Routes;
