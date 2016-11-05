import React from 'react';
// import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Login extends React.Component {

  render() {
    return (
      <div className="block-center mt-xl wd-xl">
        { /* START panel */ }
        <div className="panel panel-dark panel-flat">
          <div className="panel-heading text-center">
            <a href="#">
              <img src="img/logo.png" alt="Image" className="block-center img-rounded" />
            </a>
          </div>
          <div className="panel-body">
            <p className="text-center pv">SIGN IN TO CONTINUE.</p>
            { this.props.children }

          </div>
        </div>
        { /* END panel */ }
      </div>
      );
  }

}

export default Login;
