import App from 'containers/App';
import demoRoutes from './demo';
import apiRoutes from './api';
import adcRoutes from './adc';
import {loadRoute, errorLoading, redirectToDashboard, redirectToLogin} from './routeUtil';
import auth from 'helpers/auth';

const appRoutes = [
  { path: '/logout',
    getComponent: (nextState, cb) => {
     System.import('pages/Auth/logout')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
  },

  { onEnter: redirectToDashboard,
    childRoutes: [
      // Unauthenticated routes
      // Redirect to dashboard if user is already logged in
      { path: '/login',
        getComponent: (nextState, cb) => {
					System.import('pages/Auth/login')
						.then(loadRoute(cb))
						.catch(errorLoading);
        }
      }
    ]
  },

  { path: '/',
  	onEnter: redirectToLogin,
    getComponent: (nextState, cb) => {
      // Share the path
      // Dynamically load the correct component
      // if (auth.loggedIn()) {
			System.import('pages/Dashboard')
			  .then(loadRoute(cb))
			  .catch(errorLoading);
      // }
      // System.import('pages/Landing')
      //   .then(loadRoute(cb))
      //   .catch(errorLoading);
    },
    indexRoute: {
      getComponent: (nextState, cb) => {
        // Only load if we're logged in
        if (auth.loggedIn()) {
		       System.import('pages/Dashboard')
		          .then(loadRoute(cb))
		          .catch(errorLoading);
        }
        return cb()
      }
    },
    childRoutes: demoRoutes
  },

  ...apiRoutes,
  ...adcRoutes,
  
  { path: '*',
    getComponent: (nextState, cb) => {
     System.import('pages/StatusPage')
        .then(loadRoute(cb))
        .catch(errorLoading);
    }
  }  
];

export default {
  component: App,
  childRoutes: appRoutes
};
