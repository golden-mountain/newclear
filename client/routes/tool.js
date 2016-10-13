import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import Match from 'react-router/Match';

const ApiTesterPage = asyncComponent(() =>
  System.import('pages/Dev/ApiTester/index').then(module => module.default)
);

export default [
  <Match key="tool_api_tester" pattern="/dev/apitester" component={ApiTesterPage} />
];
