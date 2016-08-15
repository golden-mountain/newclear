import App from 'containers/App';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export default {
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent: (location, cb) => {
        System.import('pages/Home')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    // {
    //   path: 'blog',
    //   getComponent: (location, cb) => {
    //     System.import('pages/Blog')
    //       .then(loadRoute(cb))
    //       .catch(errorLoading);
    //   }
    // },
    // {
    //   path: 'about',
    //   getComponent: (location, cb) => {
    //     System.import('pages/About')
    //       .then(loadRoute(cb))
    //       .catch(errorLoading);
    //   }
    // },
    {
      path: 'at',
      getComponent: (location, cb) => {
        System.import('pages/ApiTester/online')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
  ]
};
