import React, { Component, PropTypes } from 'react';
import { Button, FormGroup, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
// import { setLastPageVisible } from '';

export class A10SubmitButtons extends Component {
  buttons = {
    create: ({ submitting }, index) => {
      return (
        <Button type="submit" disabled={submitting} bsStyle="success" key={index}>
          {submitting ? <i/> : <i/>} Create
       </Button>      
      );
    },
    cancel: ({ pristine, submitting }, index) => {
      return (
        <Button type="button" disabled={pristine || submitting} onClick={::this.close} key={index} >
          Cancel
        </Button>   
      );
    },
    reset: ({ pristine, submitting }, index) => {
      return (
        <Button type="button" disabled={pristine || submitting} onClick={::this.close} key={index} >
          Reset
        </Button>   
      );
    },
    login: ({ submitting }, index) => {
      return (
        <Button type="submit" disabled={submitting} bsStyle="success" key={index}>
          {submitting ? <i/> : <i/>} Login
       </Button>      
      );
    }
  };

  // context defined at page
  constructor(props, context) {
    super(props, context);
    this._parentProps = context.props;
  }

  close() {
    const { env, pageId } = this.props;
    // console.log('page form variables', env, pageId,  this.context.props, this.props);
    this.props.setPageVisible(env.page, false, pageId);
  }

  render() {
    const { buttons=[ 'create', 'cancel' ] } = this.props;
    const style = {
      marginRight: '15px'
    };
    return (
      
      <FormGroup>
          <ButtonToolbar>
            <ButtonGroup bsSize="large" className="pull-right" style={style}>
              {
                buttons.map((name, index) =>{
                  return this.buttons[name](this.props, index);
                })
              }
            </ButtonGroup>
          </ButtonToolbar>
      </FormGroup>
    
    );
  }
}

A10SubmitButtons.contextTypes = {
  props: PropTypes.object
};

export default A10SubmitButtons;
