// import React, { Component } from 'react';
import ModuleBase from 'helpers/ModuleBase';
import ApiTesterRouter from './ApiTester/Router';


class DevModule extends ModuleBase {
  path = 'dev'

  license = {
    'source2-module':'WEBROOT',
    'source2-expiry':'None',
    'source2-notes':''
  }
  
  routers = [
    ApiTesterRouter
  ]
}

export default DevModule;
