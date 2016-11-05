import React from 'react';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import VirtualServerForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class VirtualServerEdit extends PageBase {

  render() {

    return (
      <StandardPageLayout title="Virtual Server Edit" description="Virtual Server Is A Main Object For SLB">
        <VirtualServerForm />
      </StandardPageLayout>
    );
  }
}

export default pageWrapper(VirtualServerEdit);
