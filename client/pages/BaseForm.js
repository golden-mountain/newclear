import { Component, PropTypes } from 'react';
// import invariant from 'invariant';
// import { isEqual } from 'lodash';

export default class BaseForm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  // componentWillMount() {
  //   // console.log('form env', this.props.env);
  //   this.context.props.registerCurrentPage(Object.assign(this.props.env, this.context.props.env));
  // }

  getChildContext() {
    // console.log('context props:', this.context.props, 'props:', this.props);
    return {  props: Object.assign({} , this.props, this.context.props ) };
  }

}

BaseForm.childContextTypes = {
  props: PropTypes.object.isRequired
};

BaseForm.contextTypes = {
  props: PropTypes.object.isRequired
};
