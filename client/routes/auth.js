import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import Match from 'react-router/Match';

const Login = asyncComponent(() =>
  System.import('pages/Auth/login').then(module => module.default)
);

const Logout = asyncComponent(() =>
  System.import('pages/Auth/logout').then(module => module.default)
);

export default [
  <Match key="login" pattern="/login" component={Login} />,
  <Match key="logout" pattern="/logout" component={Logout} />
];
