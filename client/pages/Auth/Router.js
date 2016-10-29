// import React from 'react';
import RouterBase from 'helpers/RouterBase';
import asyncComponent from 'helpers/asyncComponent';

const Login = asyncComponent(() =>
  System.import('./login').then(module => module.default), 
  false
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
