import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';

export default class WizardContainer extends Component {
  static displayName = 'WizardContainer'

  componentDidMount() {
    // var form = $("#wizard-form");
    // form.validate({
    //     errorPlacement: function errorPlacement(error, element) { element.before(error); },
    //     rules: {
    //         confirm: {
    //             equalTo: "#password"
    //         }
    //     }
    // });
    // form.children("div").steps({
    //     headerTag: "h4",
    //     bodyTag: "fieldset",
    //     transitionEffect: "slideLeft",
    //     onStepChanging: function (event, currentIndex, newIndex)
    //     {
    //         form.validate().settings.ignore = ":disabled,:hidden";
    //         return form.valid();
    //     },
    //     onFinishing: function (event, currentIndex)
    //     {
    //         form.validate().settings.ignore = ":disabled";
    //         return form.valid();
    //     },
    //     onFinished: function (event, currentIndex)
    //     {
    //         alert("Submitted!");

    //         // Submit form
    //         $(this).submit();
    //     }
    // });
  }

  render() {
    return (
      <Panel>
          <form id="wizard-form" action="#">
            {this.props.children}
          </form>
      </Panel>
    );
  }
}
