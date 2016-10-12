import { loadRoute, errorLoading } from './routeUtil';

export default
  [
    {
      path: 'adc',
      // getComponent: (nextState, cb) => {
      //   System.import('pages/ADC')
      //   .then(loadRoute(cb))
      //   .catch(errorLoading);
      // },
      indexRoute:
      {
        getComponent: (nextState, cb) => {
          System.import('pages/ADC')
          .then(loadRoute(cb))
          .catch(errorLoading);
        }
      },
      childRoutes:
      [
        {
          path: 'virtual-server',
        // getComponent: (nextState, cb) => {
        //   System.import('pages/ADC/VirtualServer/Form')
        //     .then(loadRoute(cb))
        //     .catch(errorLoading);
        // },
        // indexRoute: {
        //   getComponent: (nextState, cb) => {
        //     System.import('pages/ADC/VirtualServer/Form')
        //       .then(loadRoute(cb))
        //       .catch(errorLoading);
        //   }
        // },
          childRoutes: [
            {
              path: 'edit',
              getComponent: (nextState, cb) => {
                System.import('pages/ADC/VirtualServer/Edit')
                .then(loadRoute(cb))
                .catch(errorLoading);
              }
            },
            {
              path: 'port/edit',
              getComponent: (nextState, cb) => {
                System.import('pages/ADC/VirtualPort/Edit')
                .then(loadRoute(cb))
                .catch(errorLoading);
              }
            }
          ]
        },
        {
          path: 'templates',
          childRoutes: [
            {
              path: 'virtual-server/edit',
              getComponent: (nextState, cb) => {
                System.import('pages/ADC/Templates/VirtualServer/Edit')
                          .then(loadRoute(cb))
                          .catch(errorLoading);
              }
            }
            // {
            //   path: 'port/edit',
            //   getComponent: (nextState, cb) => {
            //     System.import('pages/ADC/VirtualPort/Form')
            //     .then(loadRoute(cb))
            //     .catch(errorLoading);
            //   }
            // }
          ]
        }
      ]
    }

  ];
