// import React, { Component } from 'react';
import AuthRouter from './Router';
// import ViewManager from 'helpers/ViewManager';
// import LicenseManager from 'helpers/ViewManagerPlugins/LicenseManager';

import ModuleBase from 'helpers/ModuleBase';

class AuthModule extends ModuleBase {
  path = 'auth'

  license = {
    'source2-module':'WEBROOT',
    'source2-expiry':'N/A',
    'source2-notes':'Requires an additional Webroot license.'
  }

  routers = [ AuthRouter ]

}

export default AuthModule;
