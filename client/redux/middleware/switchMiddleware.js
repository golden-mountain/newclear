export default ({dispatch, getState}) => {
  return next => action => {
    // console.log(getState, 'state',  action, 'action');
    return next(action);
  };
};

