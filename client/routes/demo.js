import {loadRoute, errorLoading} from './routeUtil';

export default [
    {
      path: '/',
      getComponent: (location, cb) => {
        System.import('pages/Home')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'blog',
      getComponent: (location, cb) => {
        // require.ensure([], function (require) {
        //   cb(null, require('pages/Blog'))
        // })
        System.import('pages/Blog')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    {
      path: 'about',
      getComponent: (location, cb) => {
        System.import('pages/About')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    }
];