import React, {Component, PropTypes} from 'react';
// import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {reduxForm} from 'redux-form';
import {bindActionCreators} from 'redux';
import * as apiTesterActions from 'redux/modules/apiTester';
import { FormGroup, FormControl, ControlLabel, Button, Col, Row, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

@reduxForm(
  {
    form: 'apiTester',
    fields: ['path', 'body', 'method'],
    initialValues: {
      path: '/axapi/v3/auth',
      method: 'POST',
      body: JSON.stringify({credentials: {username: 'admin', password: 'a10'}}, '\n', '   ')
    }
  },
  (state) => ({response: state.apiTester.response}),
  dispatch => bindActionCreators(apiTesterActions, dispatch)
)
export default class ApiTester extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    request: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired
  }

  render() {
    const {
      fields: {path, body, method},
      handleSubmit,
      resetForm,
      submitting,
      response,
      request
      } = this.props;

    // const func = (data) => request(data)
    //   .then(result => {
    //     if (result && typeof result.error === 'object') {
    //       return Promise.reject(result.error);
    //     }
    //   });

    return (
      <div className="container-fluid">
        <Helmet title="API TESTER"/>
          <Row>
            <Col xs={6}>
              <form className="form-horizontal" onSubmit={handleSubmit(request)}>
                <div className="form-group">
                  <label className="control-label">Path</label>
                  <input type="text" className="form-control" {...path}/>
                </div>
                <FormGroup>
                  <ControlLabel>Method</ControlLabel>
                  <FormControl componentClass="select" {...method} placeholder="select">
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                    <option value="DELETE">DELETE</option>
                    <option value="PUT">PUT</option>
                  </FormControl>
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Body</ControlLabel>
                  <FormControl
                    componentClass="textarea"
                    rows={10}
                    placeholder=""
                    {...body}
                  />
                  <FormControl.Feedback />
                </FormGroup>

                <FormGroup>
                  <ButtonToolbar>
                    <ButtonGroup bsSize="large">
                      <Button type="submit" disabled={submitting} bsStyle="primary">
                        {submitting ? <i/> : <i/>} Request
                      </Button>
                      <Button type="button" disabled={submitting} onClick={resetForm}>
                        Reset
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                </FormGroup>
              </form>
            </Col>
            <Col xs={6}>
              <pre>{JSON.stringify(response, '\n', '  ')}</pre>
            </Col>
          </Row>
      </div>
    );
  }
}
