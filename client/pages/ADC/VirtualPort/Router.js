// import React from 'react';
import RouterBase from 'helpers/RouterBase';
import asyncComponent from 'helpers/asyncComponent';

const VirtualPortEditPage = asyncComponent(() =>
  System.import('./Edit').then(module => module.default)
);

class Router extends RouterBase {
  path = 'virtual-port'

  pages = {
    edit: VirtualPortEditPage
    // list: VirtualServerListPage
  }

  routers = [ VirtualPortEditPage ]

}

export default Router;
