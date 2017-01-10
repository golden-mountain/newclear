import React from 'react';
import VirtualServerTable from './components/Table';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;
//
// import PageBase from 'helpers/PageBase';
// import pageWrapper from 'helpers/pageWrapper';
import { widgetWrapper } from 'a10-widget';

class VirtualServerListPage extends React.Component {

  render() {

    return (
      <StandardPageLayout title="Virtual Servers" description="Virtual Servers List Page">
        <VirtualServerTable />
      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(VirtualServerListPage);
