import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import Match from 'react-router/Match';
// import LoginLayout from '../layouts/a10/LoginLayout';
// import EmptyLayout from '../layouts/a10/EmptyLayout';

const Login = asyncComponent(() =>
  System.import('pages/Auth/login').then(module => module.default), 
  false
);

const Logout = asyncComponent(() =>
  System.import('pages/Auth/logout').then(module => module.default),
  false
);

export default [
  <Match key="login" pattern="/login" component={Login} />,
  <Match key="logout" pattern="/logout" component={Logout} />
];
