// import React, { Component } from 'react';
import ModuleBase from 'helpers/ModuleBase';
import ApiTesterRouter from './ApiTester/Router';
import SandboxRouter from './Sandbox/Router';


class DevModule extends ModuleBase {
  path = 'dev'

  license = {
    'source2-module':'WEBROOT',
    'source2-expiry':'None',
    'source2-notes':''
  }

  routers = [
    ApiTesterRouter,
    SandboxRouter
  ]
}

export default DevModule;
