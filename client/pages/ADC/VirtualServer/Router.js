// import React from 'react';
import RouterBase from 'helpers/RouterBase';

import asyncComponent from 'helpers/asyncComponent';

const VirtualServerEditPage = asyncComponent(() =>
  System.import('./Edit').then(module => module.default)
);

const VirtualServerListPage = asyncComponent(() =>
  System.import('./List').then(module => module.default)
);

class Router extends RouterBase {
  path = 'virtual-server'

  pages = {
    edit: {
      component: VirtualServerEditPage,
      menuPath: [ 'ADC', 'SLB', 'Virtual Server', 'Edit' ]
    },
    list: {
      component: VirtualServerListPage,
      menuPath: [ 'ADC', 'SLB', 'Virtual Server', 'List' ]
    }
  }

}

export default Router;
