export default ({dispatch, getState}) => {
  return next => action => {
    // console.log(getState().toJS(), 'state',  action, 'action');
    return next(action);
  };
};

