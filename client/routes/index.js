import React, { Component } from 'react';
import Router from 'react-router/BrowserRouter';

import AppRoutes from './app';
// import AuthRouter from './auth';
// import ADCRouters from './adc';
import ADCRouter from 'pages/ADC';
import AuthRouter from 'pages/Auth';
import DashboardRouter from 'pages/Dashboard';
import DevRouter from 'pages/Dev';

// import ApiTestToolRouters from './tool';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="page-router">
          { AppRoutes }
          <AuthRouter />
          <DashboardRouter />
          <ADCRouter />
          <DevRouter />
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
