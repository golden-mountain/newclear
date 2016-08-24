import {loadRoute, errorLoading} from './routeUtil';

export default 
[
  { 
    path: 'adc',
    getComponent: (nextState, cb) => {
      System.import('pages/ADC/VirtualServer/Form')
        .then(loadRoute(cb))
        .catch(errorLoading);
    },
    indexRoute: 
    {
      getComponent: (nextState, cb) => {
        System.import('pages/ADC/VirtualServer/Form')
          .then(loadRoute(cb))
          .catch(errorLoading);
      }
    },
    childRoutes: 
    [
      {
        path: 'virtual-server',
        getComponent: (nextState, cb) => {
          System.import('pages/ADC/VirtualServer/Form')
            .then(loadRoute(cb))
            .catch(errorLoading);
        },
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
              System.import('pages/ADC/VirtualServer/Form')
                .then(loadRoute(cb))
                .catch(errorLoading);
            },
            // indexRoute: {
            //   getComponent: (nextState, cb) => {
            //     System.import('pages/ADC/VirtualServer/Form')
            //       .then(loadRoute(cb))
            //       .catch(errorLoading);
            //   }
            // }       
          }
        ]
      }
    ]
  }
  
];