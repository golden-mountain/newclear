import React, { PropTypes } from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

export default class ComponentPath extends React.Component {
  static propTypes = {
    path: PropTypes.array
  };

  static defaultProps = {
    path: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      path
    } = this.props;
    return path && path.length && (
      <Breadcrumb>
        {
          path.map((item) => {
            return (
              <Breadcrumb.Item href="#" key={item._componentId}>
                { item.component }
              </Breadcrumb.Item>
            );
            
          })
        }
       </Breadcrumb>
    );
  }
}
