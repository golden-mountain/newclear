import React, { PropTypes } from 'react';
import ViewManager from 'helpers/ViewManager';
import LicenseManager from 'helpers/ViewManagerPlugins/LicenseManager';
import MenuManager from 'components/Menu';

function ModuleManager(props) {
  const path = props.path;
  const menuManager = props.menuManager || new MenuManager();
  const view = new ViewManager(
    {
      component: LicenseManager,
      params: props.license || {
        'source2-module':'WEBROOT',
        'source2-expiry':'N/A',
        'source2-notes':'Requires an additional Webroot license.'
      }
    }
  );

  if (!view.visible()) return null;
  return (
      <div className="module">
        {
          props.routers.map((RouterComponent, index) => {
            return <RouterComponent key={index} view={view} path={path} mm={menuManager} /> ;
          })
        }
      </div>
  );
}

ModuleManager.propTypes = {
  path: PropTypes.string.isRequired,
  license: PropTypes.object,
  routers: PropTypes.array.isRequired
};

export default ModuleManager;
