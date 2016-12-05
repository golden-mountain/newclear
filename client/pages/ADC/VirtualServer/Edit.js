import React from 'react';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import VirtualServerForm from './components/Form';

import { widgetWrapper } from 'a10-widget';

class VirtualServerEdit extends React.Component {

  render() {

    return (
      <StandardPageLayout title="Virtual Server Edit" description="Virtual Server Is A Main Object For SLB">
        <VirtualServerForm />
      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(VirtualServerEdit);
