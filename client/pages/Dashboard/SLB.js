import React, { Component, PropTypes } from 'react';
// import auth from 'helpers/auth';
// import Link from 'react-router/Link';

import { DDGridView, Widgets, GridView } from '../../components/Dashboard';

import './assets/sass/layout.scss';

class SLBDashboard extends Component {

  static displayName = 'SLBDashboard'

  static contextTypes = {
    appConfig: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      widgets: []
    };
  } 
  
  changeWidgetOrder = (widgetIndex, boxIndex) => {
    const { widgets } = this.state;
    const result = [];
    for (let i = 0; i < widgets.length; i++) {
      if (boxIndex < widgetIndex) {
        if (i === boxIndex) result.push(widgets[widgetIndex]);
        if (i !== widgetIndex) result.push(widgets[i]);
      } else {
        if (i !== widgetIndex) result.push(widgets[i]);
        if (i === boxIndex) result.push(widgets[widgetIndex]);
      }
    }
    this.setState({ widgets: result });
  }

  componentDidMount() {
    const widgets = [
      { widgetPath: 'System.Summary', width: 33 },
      { widgetPath: 'System.ApplicationStatus', width: 33 },
      { widgetPath: 'System.Logging', width: 33 },
      { widgetPath: 'Networks.Summary.Chart', width: 33 },
      { widgetPath: 'System.CPU.Chart', width: 33 },
      { widgetPath: 'System.CPU.Chart', width: 33 },
      { widgetPath: 'System.CPU.Chart', width: 75 },
      { widgetPath: 'System.Logging', width: 25 }
    ];
    this.setState({
      widgets: widgets
    });
  }

  render() {
    const { getWidget } = Widgets;
    const infoCardData = [
      {
        widgetPath: 'System.CPU.Card',
        width: 22
      },
      {
        widgetPath: 'System.MemoryInfo',
        width: 22
      },
      {
        widgetPath: 'System.DiskInfo',
        width: 22
      },
      {
        widgetPath: 'System.PortInfo',
        width: 33
      }
    ];

    return (
      <div className="container-fluid">
        {
          // <ul>
          //   <li><Link to="/adc/virtual-server/edit">Virtual Server Edit </Link></li>
          //   <li><Link to="/adc/virtual-port/edit">Virtual Port Edit </Link></li>
          //   <li><Link to="/adc/template-virtual-server/edit">Template Virtual Server Port Edit</Link></li>
          // </ul>
        }
        <div className="page-title">
          <h3>System Dashboard</h3>
          <div>Show System General Information</div>
        </div>
        <main className="content">
          <GridView className="system-info">
            {
              infoCardData.map((item, index) => {
                const Card = getWidget(Widgets, item.widgetPath);
                return <Card key={index} width={item.width} />;
              })
            }
          </GridView>
          <DDGridView changeWidgetOrder={this.changeWidgetOrder}>
            {
              this.state.widgets.map(item => {
                console.log(item);
                const Widget = getWidget(Widgets, item.widgetPath);
                return (
                  <Widget key={item.widgetPath} width={item.width} />
                );
              })
            }
          </DDGridView>
        </main>
      </div>
    );
  }

}

export default SLBDashboard;
