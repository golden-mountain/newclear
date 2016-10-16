import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import Miss from 'react-router/Miss';

const PageNotFound = asyncComponent(() =>
  System.import('pages/StatusPage/index').then(module => module.default)
);

export default [
  <Miss component={PageNotFound} key="page-not-found" />
];
