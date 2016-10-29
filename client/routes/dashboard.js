import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import Match from 'react-router/Match';

const DashboardPage = asyncComponent(() =>
  System.import('pages/Dashboard').then(module => module.default)
);

export default  <Match key="default_dashboard" pattern="/"  exactly component={DashboardPage} />;
