import React, { Component, PropTypes } from 'react';
// import auth from 'helpers/auth';
// import Link from 'react-router/Link';
import { Responsive, WidthProvider } from 'react-grid-layout';
import * as DashboardComponent from '../../components/Dashboard';

import './layout.scss';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class SLBDashboard extends Component {

  static contextTypes = {
    appConfig: PropTypes.shape({
      OEM: PropTypes.string.isRequired,
      MODULE_NAME: PropTypes.string.isRequired
    }),
    oemConfig: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      layouts: { lg: [] },
      layout: []
    };
  } 

  layoutChange = layout => {
    console.log(layout);
  }

  componentDidMount() {
    const { 
      appConfig: { OEM: oem, MODULE_NAME: moduleName },
      oemConfig: { logo, logoPosMapping, portPosMapping }
    } = this.context;

    const layout = [
      { 
        i: 'Bezel', x: 0, y: 0, w: 7, h: 2,
        options: {
          auth: '', logo, oem, moduleName,
          logoPos: logoPosMapping[moduleName],
          portPos: portPosMapping[moduleName]
        }
      },
      { i: 'BaseInfo', x: 0, y: 1, w: 6, h: 2 },
      { i: 'Licensed', x: 7, y: 0, w: 3, h: 4, minW: 2, maxW: 4 }
    ];
    this.setState({
      layouts: { lg: layout, md: layout, sm: layout },
      layout: layout
    });
  }

  render() {
    // const token = auth.getToken();

    return (
      <div className="container-fluid">
        {
          // <ul>
          //   <li><Link to="/adc/virtual-server/edit">Virtual Server Edit </Link></li>
          //   <li><Link to="/adc/virtual-port/edit">Virtual Port Edit </Link></li>
          //   <li><Link to="/adc/template-virtual-server/edit">Template Virtual Server Port Edit</Link></li>
          // </ul>
        }
        <ResponsiveReactGridLayout className="layout" 
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          layouts={this.state.layouts}
          measureBeforeMount={false}
          useCSSTransforms={true} 
          isResizable={true}
          onLayoutChange={this.layoutChange}>
          {
            this.state.layout.map(item => {
              const Component = DashboardComponent[item.i];
              return (
                <div key={item.i} className="dashboard-item react-grid-item">
                  <Component {...item.options} />
                </div>
              );
            })
          }
        </ResponsiveReactGridLayout>
      </div>
    );
  }

}

export default SLBDashboard;
