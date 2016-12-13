import React, { Component } from 'react';
import Router from 'react-router/BrowserRouter';

import ModuleManager from 'helpers/ModuleManager';
import AppRoutes from './app';
import * as AppModules from 'pages';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="page-router">
          { AppRoutes }
          {
            Object.entries(AppModules).map(([ moduleName, moduleOpt ]) =>
              <ModuleManager key={moduleName} {...moduleOpt} />
            )
          }
        </div>
      </Router>
    );
  }
}

// const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
//   <Match {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location }
//       }}/>
//     )
//   )}/>
// );
