import App from 'containers/App';
import demoRoutes from './demo';
import apiRoutes from './api';

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export default {
  component: App,
  childRoutes: apiRoutes.push(...demoRoutes)
};
