// import React, { Component } from 'react';
import ModuleBase from 'helpers/ModuleBase';

import SSLiRouter from './SSLi/Router';

class SSLiModule extends ModuleBase {
  path = 'security'

  license = {
    'source2-module':'SLB',
    'source2-expiry':'None',
    'source2-notes':''
  }

  routers = [
    SSLiRouter
  ]

}

export default SSLiModule;
