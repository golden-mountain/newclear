import React from 'react';
import VirtualServerTable from './components/Table';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class VirtualServerListPage extends PageBase {

  render() {

    return (
      <StandardPageLayout title="Virtual Servers" description="Virtual Servers List Page">
        <VirtualServerTable />
      </StandardPageLayout>
    );
  }
}

export default pageWrapper(VirtualServerListPage);
