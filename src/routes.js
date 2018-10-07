import App from './components/App';
import Home from './components/Home';
import SignupContainer from './containers/SignupContainer';
import LoginContainer from './containers/LoginContainer';
import DashboardContainer from './containers/DashboardContainer';
import NotFound from './components/NotFound';

export function requireAuth(store) {
  return (nextState, replace) => {

    const state = store.getState();

    if(!state.auth.isLoggedIn) {
      replace({
        pathname: '/login',
        query: {
          next: nextState.location.pathname
        }
      });
    }

  };
}

const createRoutes = (store) => {

  const routes = [
    {
      path: '/',
      component: App,
      indexRoute: {
        component: Home
      },
      childRoutes: [
        {
          path: 'dashboard',
          component: DashboardContainer,
          onEnter: requireAuth(store)
        },
        {
          path: 'signup',
          component: SignupContainer
        },
        {
          path: 'login',
          component: LoginContainer
        },
        {
          path: '*',
          component: NotFound
        }
      ]
    }
  ];

  return routes;
}

export default createRoutes;
