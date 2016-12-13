// import React from 'react';
import RouterBase from 'helpers/RouterBase';

import asyncComponent from 'helpers/asyncComponent';

const WizardPage = asyncComponent(() =>
  System.import('./Wizard').then(module => module.default)
);

const ServiceListPage = asyncComponent(() =>
  System.import('./List').then(module => module.default)
);

const ReportSolutionPage = asyncComponent(() =>
  System.import('./Solutions/ReportSolution').then(module => module.default)
);

const SummarySolutionPage = asyncComponent(() =>
  System.import('./Solutions/SummarySolution').then(module => module.default)
);

class Router extends RouterBase {
  path = 'ssli'

  pages = {
    wizard: {
      component: WizardPage,
      menuPath: [ 'Security', 'SSLi', 'Wizard' ]
    },
    list: {
      component: ServiceListPage,
      menuPath: [ 'Security', 'SSLi', 'List' ]
    },
    report: {
      component: ReportSolutionPage,
      menuPath: [ 'Security', 'SSLi', 'Solutions - Report' ]
    },
    summary: {
      component: SummarySolutionPage,
      menuPath: [ 'Security', 'SSLi', 'Solutions - Summary' ]
    }
  }
}

export default Router;
