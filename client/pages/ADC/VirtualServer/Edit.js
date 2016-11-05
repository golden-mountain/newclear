import React from 'react';

// import { Col, Row } from 'react-bootstrap';

// const requireLayout = (name) => {
//   const configApp = require('configs/app');
//   const OEM = configApp.OEM;
//   return require('oem/' + OEM + '/jsx/Forms/' + name).default;
// };
import configApp from 'configs/app';
const OEM = configApp.OEM;
const StandardFormPageLayout = require('oem/' + OEM + '/jsx/Forms/FormGeneral').default;

import VirtualServerForm from './components/Form';
import PageBase from 'helpers/PageBase';
import pageWrapper from 'helpers/pageWrapper';

class VirtualServerEdit extends PageBase {

  render() {

    return (
      <StandardFormPageLayout title="Virtual Server Edit" description="Virtual Server Is A Main Object For SLB">
        <VirtualServerForm />
      </StandardFormPageLayout>
    );
  }
}

export default pageWrapper(VirtualServerEdit);
