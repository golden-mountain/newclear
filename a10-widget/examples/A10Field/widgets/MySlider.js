import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';

import { widgetWrapper } from 'widgetWrapper';
import 'rc-slider/assets/index.css';

class MySlider extends Component {

  static displayName = 'Slider'

  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    defaultValue: PropTypes.number
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={ { position: 'relative' } }>
        {this.props.children}
        <Slider {...this.props} />      
      </div>
    );
  }

}

export default widgetWrapper([ 'app' ])(MySlider, {
  meta: {
    widget: {
      iconClassName: 'fa fa-rocket',
      type: 'Field',
      name: 'Slider',
      component: 'MySlider',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, MySlider.defaultProps, {
      min: 0,
      max: 100
    }),
    propTypes: MySlider.propTypes,
    propGroups: {
      active: 'basic',
      disabled: 'advanced',
      block: 'basic',
      onClick: 'event',
      type: 'basic',
      bsStyle: 'advanced',
      bsSize: 'advanced',
      bsClass: 'advanced',
      children: 'basic'
    }
  }
});
