import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import logoLarger from './img/logo2.png';

import LangDropdown from '../../components/Dropdown/lang';
import * as DashboardWidgets from '../../components/Dashboard';

import './sass/app.scss';
import './sass/layouts/login/login.scss';

// import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Login extends React.Component {

  static displayName = 'loginLayout'

  static contextTypes = {
    appConfig: PropTypes.shape({
      OEM: PropTypes.string.isRequired,
      MODULE_NAME: PropTypes.string.isRequired
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      auth: null
    };
  }

  render() {
    const { 
      appConfig: { MODULE_NAME }
    } = this.context;
    // const { comSetComponentState, getData } = this.props;

    const { BaseInfo, Licensed } = DashboardWidgets;
    const bezelImgUrl = require(`./img/bezel/${MODULE_NAME}.svg`);

    return (
      <div id="login-layout">
        <header className="row text-right">
          <div className="col-md-12">
            <LangDropdown />
          </div>
        </header>
        <main className="row">
          <div className="col-md-6 left">
            <div className="block-center">
              <div className="panel panel-dark login-form-container">
                <div className="login-title-container">
                  <div className="image-container">
                    <a href="#">
                      <img src={logoLarger} alt="Image" style={{ height: '52px' }} className="block-center img-rounded" />
                    </a>
                  </div>
                  <div className="text-container">
                    <div>
                      <Glyphicon glyph="bookmark" />
                      <span>Thunder {MODULE_NAME}</span>
                    </div>
                    <div>
                      SIGN IN Thunder series
                    </div>
                  </div>
                </div>
                { this.props.children }
              </div>
            </div>
          </div>
          <div className="col-md-6 right">
            <div>
              <img src={bezelImgUrl} />
            </div>
            <BaseInfo />
            <Licensed />
          </div>
        </main>
        <footer className="p-lg text-right footer">
          <span>&copy; 2016 - A10Networks</span>
        </footer>
      </div>
    );
  }

}

export default Login;
