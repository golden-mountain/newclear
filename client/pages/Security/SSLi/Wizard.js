import React from 'react';

import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardPageLayout = require('oem/' + OEM + '/PageLayout').default;

import WizardForm from './components/WizardForm';
// import PageBase from 'helpers/PageBase';
// import pageWrapper from 'helpers/pageWrapper';

import { widgetWrapper } from 'a10-widget';

class SSLiWizard extends React.Component {

  render() {

    return (
      <StandardPageLayout title="SSLi Wizard" description="SSLi Wizard Makes Create Virtual Service Easy">
        <WizardForm />
      </StandardPageLayout>
    );
  }
}

export default widgetWrapper()(SSLiWizard);
