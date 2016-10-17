import React from 'react';

import asyncComponent from 'helpers/asyncComponent';
import Match from 'react-router/Match';

const VirtualServerEditPage = asyncComponent(() =>
  System.import('pages/ADC/VirtualServer/Edit').then(module => module.default)
);

const VirtualServerListPage = asyncComponent(() =>
  System.import('pages/ADC/VirtualServer/List').then(module => module.default)
);

const VirtualPortEditPage = asyncComponent(() =>
  System.import('pages/ADC/VirtualPort/Edit').then(module => module.default)
);

const TemplatesVirtualServerPage = asyncComponent(() =>
  System.import('pages/ADC/Templates/VirtualServer/Edit').then(module => module.default)
);

export default [
  <Match key="slb_virtual-server_edit" pattern="/adc/virtual-server/edit" component={VirtualServerEditPage} />,
  <Match key="slb_virtual-server_list" pattern="/adc/virtual-server/list" component={VirtualServerListPage} />,
  <Match key="slb_virtual-server_port_edit" pattern="/adc/virtual-server/port/edit" component={VirtualPortEditPage} />,
  <Match key="slb_template-virtual-server_edit" pattern="/adc/template/virtual-server/edit" component={TemplatesVirtualServerPage} />
];
