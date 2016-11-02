import React, { Component } from 'react';
import ViewManager from 'helpers/ViewManager';
import LicenseManager from 'helpers/ViewManagerPlugins/LicenseManager';
import MenuManager from 'components/Menu';

class ModuleBase extends Component {
  path = ''
  routers = []
  menuManager = new MenuManager()

  get view() {
    return new ViewManager(
      {
        component: LicenseManager,
        params: this.license || {
          'source2-module':'WEBROOT',
          'source2-expiry':'N/A',
          'source2-notes':'Requires an additional Webroot license.'
        }
      }
    );
  }

  renderRouters() {
    return this.routers.map((RouterComponent, index) => {
      return <RouterComponent key={index} view={this.view} path={this.path} mm={this.menuManager} /> ;
    });
  }

  render() {

    return (
      this.view.visible() ?
        <div className="module">
          { this.renderRouters() }
        </div> : null
    );
  }
}

export default ModuleBase;
