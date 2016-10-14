import React, { Component } from 'react';
import Router from 'react-router/BrowserRouter';

// import AppLayout from '../layouts/a10/AppLayout';
import AuthRouters from './auth';
import ADCRouters from './adc';
import DashboardRouters from './dashboard';
import ApiTestToolRouters from './tool';


export default class App extends Component {
  render() {

    return (
      <Router>
        <div>
          { ApiTestToolRouters }
          { AuthRouters }
          { ADCRouters }
          { DashboardRouters }
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
