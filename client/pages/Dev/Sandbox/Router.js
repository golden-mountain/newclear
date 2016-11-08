// import React from 'react';
import RouterBase from 'helpers/RouterBase';

import asyncComponent from 'helpers/asyncComponent';

const SandboxRouter = asyncComponent(() =>
  System.import('./index').then(module => module.default)
);

class Router extends RouterBase {
  path = 'dev'

  pages = {
    sandbox: {
      component: SandboxRouter,
      menuPath: [ 'Dev Tools', 'Sandbox' ]
    }
  }

}

export default Router;
