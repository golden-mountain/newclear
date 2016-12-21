import React, { PropTypes } from 'react';
// import { Glyphicon } from 'react-bootstrap';
import Footer from './jsx/Layout/Footer';
import logoLarger from './img/logo-larger.png';
import OEMConfig from './Config';

import Bezel from '../../components/Dashboard/Bezel';
import BaseInfo from '../../components/Dashboard/BaseInfo';
import Licensed from '../../components/Dashboard/Licensed';

import './sass/bootstrap.scss';
import './sass/layouts/login/footer.scss';
import './sass/layouts/login/login.scss';

// import { Grid, Row, Col, Panel, Button } from 'react-bootstrap';

class Login extends React.Component {

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

  componentDidMount() {
    // FIXME
    fetch('/axapi/v3/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{"credentials":{"username":"admin","password":"a10"}}'
    }).then(res => {
      return res.json();
    }).then(data => {
      this.setState({ auth: `A10 ${data.authresponse.signature}` });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { appConfig: { MODULE_NAME } } = this.context;
    // FIXME, should use anthor way
    const bezelUrl = require(`./img/bezel_templates/${MODULE_NAME}.svg`);

    return (
      <div id="login-layout">
        <div className="row">
          <div className="col-md-5 left">
            <div className="block-center mt-xl wd-xl">
              <div className="panel panel-dark panel-flat">
                <div className="panel-heading text-center">
                  <a href="#">
                    <img src={logoLarger} alt="Image" style={{ height: '52px' }} className="block-center img-rounded" />
                  </a>
                </div>
                <div className="panel-body">
                  <p className="text-center pv">SIGN IN TO CONTINUE.</p>
                  { this.props.children }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 right">
            <div className="front-bezel-container">
              <label>
                {
                  // <Glyphicon glyph='bookmark' />
                }
                <span className="glyphicon glyphicon-bookmark"/>
                Thunder 3030s
              </label>
              <Bezel
                auth={this.state.auth}
                url={bezelUrl}
                logo={OEMConfig.logo}
                logoPos={OEMConfig.logoPosMapping[MODULE_NAME]}
                portPos={OEMConfig.portPosMapping[MODULE_NAME]}
              />
            </div>
            <div className="baseinfo-container">
              <label>Basic Info</label>
              <BaseInfo />
            </div>
            <div className="licensed-container">
              <label>Licensed</label>
              <Licensed />
            </div>
          </div>
        </div>
        <div className="p-lg text-right footer">
          <hr/>
          <Footer />
        </div>
      </div>
    );
  }

}

export default Login;
