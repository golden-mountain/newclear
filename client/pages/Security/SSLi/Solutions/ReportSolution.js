import React, { Component } from 'react';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;
import { widgetWrapper } from 'a10-widget';

class ReportSolution extends Component {

  render() {
    return (
      <StandardPageLayout title="Reporting">{'Report Page'}
      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(ReportSolution);
