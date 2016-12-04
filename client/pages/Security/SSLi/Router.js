// import React from 'react';
import RouterBase from 'helpers/RouterBase';

import asyncComponent from 'helpers/asyncComponent';

const WizardPage = asyncComponent(() =>
  System.import('./Wizard').then(module => module.default)
);

const ServiceListPage = asyncComponent(() =>
  System.import('./List').then(module => module.default)
);

class Router extends RouterBase {
  path = 'ssli'

  pages = {
    wizard: {
      component: WizardPage,
      menuPath: [ 'Security', 'Virtual Service', 'Wizard' ]
    },
    list: {
      component: ServiceListPage,
      menuPath: [ 'Security', 'Virtual Service', 'List' ]
    }
  }

}

export default Router;
