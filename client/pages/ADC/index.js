// import React, { Component } from 'react';
import ModuleBase from 'helpers/ModuleBase';

import VirtualServerRouter from './VirtualServer/Router';
import VirtualPortRouter from './VirtualPort/Router';
import TemplateVirtualServerRouter from './Templates/VirtualServer/Router';
// import ViewManager from 'helpers/ViewManager';
// import LicenseManager from 'helpers/ViewManagerPlugins/LicenseManager';
// import { A10Field } from 'A10Widget';

class ADCModule extends ModuleBase {
  path = 'adc'

  license = {
    'source2-module':'SLB',
    'source2-expiry':'None',
    'source2-notes':''
  }

  routers = [
    VirtualServerRouter,
    VirtualPortRouter,
    TemplateVirtualServerRouter
  ]

}

export default ADCModule;
