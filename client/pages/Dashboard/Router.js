// import React from 'react';
import RouterBase from 'helpers/RouterBase';
import asyncComponent from 'helpers/asyncComponent';

const SLBDashboard = asyncComponent(() =>
  System.import('./slb').then(module => module.default)
);


class Router extends RouterBase {
  path = 'dashboard'

  pages = {
    slb: SLBDashboard
  }

  routers = [ SLBDashboard ]

}

export default Router;
