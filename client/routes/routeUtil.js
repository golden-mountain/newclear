import auth from '../helpers/auth';

export function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

export function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export function redirectToLogin(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

export function redirectToDashboard(nextState, replace) {
  if (auth.loggedIn()) {
    replace('/')
  }
}
