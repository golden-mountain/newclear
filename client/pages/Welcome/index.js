import WelcomeRouter from './Router';
import ModuleBase from 'helpers/ModuleBase';

class WelcomeModule extends ModuleBase {
  path = 'welcome'

  license = {
    'source2-module':'WEBROOT',
    'source2-expiry':'N/A',
    'source2-notes':'Requires an additional Webroot license.'
  }

  routers = [ WelcomeRouter ]
}

export default WelcomeModule;
