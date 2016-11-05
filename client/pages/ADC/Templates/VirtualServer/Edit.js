import React from 'react';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import TemplateVirtualServerForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class TemplateVirtualServerEdit extends PageBase {

  render() {

    return (
      <StandardPageLayout title="Template Virtual Server Edit" description="Template Virtual Server Has Advanced Virtual Server Options">
        <TemplateVirtualServerForm />
      </StandardPageLayout>
    );
  }
}

export default pageWrapper(TemplateVirtualServerEdit);
