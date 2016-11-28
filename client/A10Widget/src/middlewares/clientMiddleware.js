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
