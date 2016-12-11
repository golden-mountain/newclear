import VirtualServerRouter from './VirtualServer/Router';
import VirtualPortRouter from './VirtualPort/Router';
import TemplateVirtualServerRouter from './Templates/VirtualServer/Router';
// import ViewManager from 'helpers/ViewManager';
// import LicenseManager from 'helpers/ViewManagerPlugins/LicenseManager';
// import { A10Field } from 'A10Widget';

export default {
  path: 'adc',
  license: {
    'source2-module':'SLB',
    'source2-expiry':'None',
    'source2-notes':''
  },
  routers: [
    VirtualServerRouter,
    VirtualPortRouter,
    TemplateVirtualServerRouter
  ]
};
