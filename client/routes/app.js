import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import { Match, Miss } from 'react-router';

const PageNotFound = asyncComponent(() =>
  System.import('pages/StatusPage/index').then(module => module.default)
);

const Dashboard = asyncComponent(() =>
  System.import('pages/Dashboard/slb').then(module => module.default)
);

const ComponentBuilder = asyncComponent(() =>
  System.import('pages/ComponentBuilder/Edit').then(module => module.default)
);

export default [
  <Miss component={PageNotFound} key="page-not-found" />,
  <Match pattern="/" exactly key="default-page" component={Dashboard} />,
  <Match pattern="/component-builder" exactly key="component-builder-page" component={ComponentBuilder} />
];
