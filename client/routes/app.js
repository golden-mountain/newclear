import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import { Match, Miss } from 'react-router';

const PageNotFound = asyncComponent(() =>
  System.import('pages/StatusPage/index').then(module => module.default)
);

const Dashboard = asyncComponent(() =>
  System.import('pages/Dashboard/slb').then(module => module.default), 
  false
);

export default [
  <Match component={Dashboard} pattern="/" exactly key="default-page" />,
  <Miss component={PageNotFound} key="page-not-found" />
];
