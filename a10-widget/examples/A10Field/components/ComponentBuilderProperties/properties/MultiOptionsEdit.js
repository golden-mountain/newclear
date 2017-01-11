
import React, {Component, PropTypes} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class MultiOptionsEdit extends Component {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = { options: [] };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.options) {
      const thisOptions = this.state.options;
      thisOptions.length = 0;
      Array.prototype.push.apply(thisOptions, nextProps.options);
      console.log(thisOptions);
      this.setState({ options: thisOptions });
    }
  }

  changeInputValue(index, event) {
    const options = this.state.options;
    options[index] = event.target.value;
    this.setState({options: options});
    const { onChange } = this.props;
    onChange(this.state.options);
  }

  clickAddOption() {
    const options = this.state.options;
    options.push('');
    this.setState({options: options});
    const { onChange } = this.props;
    onChange(this.state.options);
  }

  clickRemoveOption(index) {
    const options = this.state.options;
    options.splice(index, 1);
    this.setState({options: options});
    const { onChange } = this.props;
    onChange(this.state.options);
  }

  render() {
    // const { options } = this.props;
    return (<div>
      <FormGroup key={0}>
        <Col sm={8}>
          <ControlLabel>Value</ControlLabel>
        </Col>
        <Col sm={4}>
          <Button bsStyle="success" onClick={this.clickAddOption.bind(this)}>+</Button>
        </Col>
      </FormGroup>
      { this.state.options.map( (option, index) => {
        return (
          <FormGroup key={index}>
            <Col sm={8}>
              <FormControl value={option} onChange={this.changeInputValue.bind(this, index)}/>
            </Col>
            <Col sm={4}>
              <Button bsStyle="danger" onClick={this.clickRemoveOption.bind(this, index)}>-</Button>
            </Col>
          </FormGroup>
        );
      }) }
    </div>);
  }
}

export default MultiOptionsEdit;
