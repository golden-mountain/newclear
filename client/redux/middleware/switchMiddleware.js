export default () => { // eslint-disable-line dispatch
  return next => action => {
    // console.log(getState().toJS(), 'state',  action, 'action');
    return next(action);
  };
};
