import ApiTesterRouter from './ApiTester/Router';
// import SandboxRouter from './Sandbox/Router';

export default {
  path: 'dev',
  license: {
    'source2-module':'WEBROOT',
    'source2-expiry':'None',
    'source2-notes':''
  },
  routers: [
    ApiTesterRouter
    // SandboxRouter
  ]
};
