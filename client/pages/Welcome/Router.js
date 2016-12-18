import RouterBase from 'helpers/RouterBase';
import asyncComponent from 'helpers/asyncComponent';

const WelcomePage = asyncComponent(() =>
  System.import('./welcome').then(module => module.default),
  null
);

class Router extends RouterBase {
  path = 'welcome'

  pages = {
    welcome: {
      component: WelcomePage,
      menuPath: [ 'welcome' ]
    }
  }

  routers = [ WelcomePage ]

}

export default Router;
