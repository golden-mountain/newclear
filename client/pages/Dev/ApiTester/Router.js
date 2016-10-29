// import React from 'react';
import RouterBase from 'helpers/RouterBase';

import asyncComponent from 'helpers/asyncComponent';

const ApiTesterRouter = asyncComponent(() =>
  System.import('./index').then(module => module.default)
);

class Router extends RouterBase {
  path = 'dev'

  pages = {
    apitester: ApiTesterRouter
  }
  
}

export default Router;
