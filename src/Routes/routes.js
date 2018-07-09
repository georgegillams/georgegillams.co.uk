import HomePage from '../Pages/HomePageV2';
import Admin from '../Pages/Admin/Admin';
import ForOhFour from '../Pages/ForOhFour';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/admin',
    exact: true,
    component: Admin
  },
  {
    path: '**',
    component: ForOhFour
  }
]

export default routes;
