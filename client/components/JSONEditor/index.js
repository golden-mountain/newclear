import React, { Component, PropTypes } from 'react';
import OrgJsonEditor from 'jsoneditor/dist/jsoneditor';
//https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
import 'jsoneditor/dist/jsoneditor.css';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import _ from 'lodash';

class JSONEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { value: {} };
  }

  componentDidMount() {
    let self = this;
    let options = {
      mode: 'code',
      modes: ['code', 'tree']
    };
    let { model, dispatch } = this.props;
    // console.log(this.props);
    options.onChange = () => dispatch(actions.change(model, self.editor.get()));    
    this.editor = new OrgJsonEditor(this.refs.jsonEditor, options, _.get(this.props, this.props.model, {}));
    // this.editor.set(values);
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, 'debug good');
    this.editor.set(_.get(nextProps, nextProps.model));
  }

  render() {
    return (
      <div ref="jsonEditor"></div>
    );
  }
}

export default connect(s => s)(JSONEditor);

// export default JSONEditor;
