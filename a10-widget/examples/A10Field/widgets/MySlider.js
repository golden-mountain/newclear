import React, { Component, PropTypes } from 'react';
import Slider from 'rc-slider';

import { widgetWrapper } from 'widgetWrapper';
import 'rc-slider/assets/index.css';

class MySlider extends Component {

  static displayName = 'Slider';

  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    defaultValue: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Slider {...this.props} style={{ margin: 0 }} />      
    );
  }

}

export default widgetWrapper([ 'app' ])(Slider, {
  meta: {
    widget: {
      iconClassName: 'fa fa-sliders',
      type: 'Field',
      name: 'Slider',
      component: 'MySlider',
      display: 'inline-block',
      isContainer: false,
      description: ''
    },
    defaultProps: Object.assign({}, MySlider.defaultProps, {
      min: 0,
      max: 50
    }),
    propTypes: MySlider.propTypes,
    propGroups: {
      min: 'basic',
      max: 'basic',
      defaultValue: 'basic'
    }
  }
});
