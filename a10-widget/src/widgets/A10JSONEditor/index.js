import React, { Component } from 'react';
import OrgJsonEditor from 'jsoneditor/dist/jsoneditor';
//https://github.com/josdejong/jsoneditor/blob/master/docs/api.md
import 'jsoneditor/dist/jsoneditor.css';


class JSONEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { value: {} };
  }

  componentDidMount() {
    let self = this;
    let options = {
      mode: 'code',
      modes: [ 'code', 'tree' ]
    };
    // see how to custom field http://redux-form.com/6.0.0-rc.3/docs/api/Field.md/
    const { input: { value, onChange } } = this.props;
    // this.setState({content: value});
    // console.log(value, this.state, 'new props');
    options.onChange = () => onChange(self.editor.get());
    this.editor = new OrgJsonEditor(this.refs.jsonEditor, options, value || {});    
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.editor.set(nextProps.input.value);
  }

  render() {
    return (
      <div ref="jsonEditor"></div>
    );
  }
}


export default JSONEditor;
