import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
import { A10Field, A10Form, widgetWrapper } from 'a10-widget';
// import A10SubmitButtons from 'components/Form/A10SubmitButtons';
// import A10Form from 'components/Form/A10Form';
import { required } from 'helpers/validations';
// import { widgetWrapper } from 'helpers/widgetWrapper';
// import auth from 'helpers/auth';
// import { getPayload } from 'helpers/axapiHelper';
// import { UPDATE_TARGET_DATA } from 'configs/messages';

class LoginForm extends React.Component {
  static contextTypes = {
    props: PropTypes.object.isRequired,
    wm: PropTypes.object.isRequired
  }

  static displayName = 'LoginForm'

  // onSubmit(values) {
  //   // console.log('handle submit');
  //   const fullAuthData = getPayload('/axapi/v3/auth', 'POST', values);
  //   const promise = this.props.comAxapiRequest(fullAuthData);
  //   return promise;
  // }

  // shouldComponentUpdate(nextProps) {
  //   const { data, modal } = nextProps;
  //   if (data && data.signature && modal) {
  //     // everything need update if logined
  //     this.props.kickBall(UPDATE_TARGET_DATA);
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    const { modal } = this.props;

    return (
      <A10Form action='/axapi/v3/auth' redirect="/" modal={modal} bsClass="mb-lg">
        <A10Field name="credentials.username" initial="admin" validation={{ required }} layout={false}>
          <FormControl id="username" type="text" placeholder="Enter Username" autoComplete="off" required="required" className="form-control" />
          <span className="fa fa-envelope form-control-feedback text-muted"></span>
        </A10Field>
        <A10Field name="credentials.password" initial="a10" validation={{ required }} layout={false} >
          <FormControl id="password" type="password" placeholder="Password" required="required" className="form-control" />
          <span className="fa fa-lock form-control-feedback text-muted"></span>
        </A10Field>

        <button type="submit" className="btn btn-block btn-primary mt-lg">Login</button>

      </A10Form>
    );
  }
}

export default widgetWrapper([ 'app' ])(LoginForm);
