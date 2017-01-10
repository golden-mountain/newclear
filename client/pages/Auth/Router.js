// import React from 'react';
import RouterBase from 'helpers/RouterBase';
import asyncComponent from 'helpers/asyncComponent';
// import { widgetWrapper } from 'a10-widget';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const LoginPageLayout = require('oem/' + OEM + '/LoginLayout').default;

const Login = asyncComponent(() =>
  System.import('./login').then(module => module.default),
  LoginPageLayout
);

const Logout = asyncComponent(() =>
  System.import('./logout').then(module => module.default),
  false
);

class Router extends RouterBase {
  path = 'auth'

  pages = {
    login: Login,
    logout: Logout
  }

}

export default Router;
