// import React from 'react';

// import asyncComponent from 'helpers/asyncComponent';
// import Match from 'react-router/Match';

// import ADCRouter from 'pages/ADC';

// const VirtualServerEditPage = asyncComponent(() =>
//   System.import('pages/ADC/VirtualServer/Edit').then(module => module.default)
// );

// const VirtualServerListPage = asyncComponent(() =>
//   System.import('pages/ADC/VirtualServer/List').then(module => module.default)
// );


// export default [
//   <ADCRouter key="adc" />,
//   <Match key="slb_virtual-server_port_edit" pattern="/adc/virtual-server/port/edit" component={VirtualPortEditPage} />,
//   <Match key="slb_template-virtual-server_edit" pattern="/adc/template/virtual-server/edit" component={TemplatesVirtualServerPage} />
// ];
