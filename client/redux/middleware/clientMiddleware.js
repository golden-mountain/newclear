// import { AXAPI_REQUEST_FAIL } from 'redux/modules/actionTypes';

// class ActionContainer {
//   actionTypes = [ { type: AXAPI_REQUEST_FAIL, statusCode: 401 } ]
//   actions = []  
//   dispatch = null

//   constructor(dispatch) {
//     this.dispatch = dispatch;
//   }

//   setAction(action, resp) {    
//     this.actionTypes.forEach((action) => {
//       const { type, ...rest } =  action;
//       if (this.actionTypes.indexOf(type) ) {
//         let result = true;
//         for (var respKey in rest) {
//           if (resp[respKey] !== rest[respKey]) {
//             result = false;
//           }
//         }
//         if (result) {
//           this.actions.push(action);
//         }
//       }
//     });

//     console.log('set action:', action, 'resp:', resp, 'actions:', this.actions);
//   }

//   dispatchActions() {
//     console.log('actions:', this.actions);
//     this.actions.forEach((action) => {
//       this.dispatch(action);
//     });
//   }
// }

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promises, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promises) {
        return next(action);
      }
      const [ REQUEST, SUCCESS, FAILURE ] = types;
      next({ ...rest, type: REQUEST });
      // console.log('callback', callback);
      const p = Promise.all(promises(client));

      p.then(
        (resp) => {
          return next({ ...rest, resp, type: SUCCESS });
        },
        (resp) => {
          return next({ ...rest, resp, type: FAILURE });
        }
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: FAILURE });
      });

      return p;
    };
  };
}
