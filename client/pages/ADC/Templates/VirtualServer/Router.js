// import React from 'react';
import RouterBase from 'helpers/RouterBase';
import asyncComponent from 'helpers/asyncComponent';

const TemplatesVirtualServerPage = asyncComponent(() =>
  System.import('./Edit').then(module => module.default)
);

class Router extends RouterBase {
  path = 'template-virtual-server'

  pages = {
    edit: TemplatesVirtualServerPage
    // list: VirtualServerListPage
  }

  routers = [ TemplatesVirtualServerPage ]

}

export default Router;
