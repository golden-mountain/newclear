import React from 'react';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import VirtualPortForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class VirtualPortEdit extends PageBase {

  render() {

    return (
      <StandardPageLayout title="Virtual Port Edit" description="Virtual Port Is A Port Of Virtual Server">
        <VirtualPortForm />
      </StandardPageLayout>
    );
  }
}

export default pageWrapper(VirtualPortEdit);
