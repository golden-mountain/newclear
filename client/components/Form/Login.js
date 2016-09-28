import React from 'react';
import { Field } from 'redux-form/immutable';
import { FormGroup, Button, Col, ButtonToolbar, ButtonGroup, FormControl } from 'react-bootstrap';
import { A10Field } from 'components/Form/A10Field';

export default (props) => {
  const { submitting, pristine, reset, dialogMode } = props;

  return (
    <div>
      <Field name="credentials.username" component={A10Field} label="Username" validation={[ 'required' ]}>
        <FormControl type="text" className="form-control"/>
      </Field>

      <Field name="credentials.password" component={A10Field} label="Password" validation={[ 'required' ]}>
        <FormControl type="password" className="form-control"/>
      </Field>

      { !dialogMode && 
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <ButtonToolbar>
              <ButtonGroup bsSize="large">
                <Button type="submit" disabled={submitting} bsStyle="success">
                  {submitting ? <i/> : <i/>} Login
                </Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}>
                  Reset
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            </Col>
        </FormGroup>
      }
    </div>
  );

};
