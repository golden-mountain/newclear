var context = require.context('.', false, /\.js$/), reducers = {};
context.keys().forEach(function (key) {
  var invalidKeys = [ 'index' ];  
  var k = key.replace(/^\.\/(.*)\.js?$/, '$1');
  if (!~invalidKeys.indexOf(k)) {
    let module = context(key);
    delete module.default;
    reducers = Object.assign({}, reducers, module);
  }
});

module.exports = reducers;

// import * as axapiActions from './axapi';
// import * as pageActions from './page';
// import * as themeActions from './theme';
// import * as featureActions from './feature';
// import * as formActions from './form';

// delete axapiActions.default;
// delete pageActions.default;
// delete themeActions.default;
// delete featureActions.default;
// delete formActions.default;
// const appActions = {
//   ...axapiActions,
//   ...pageActions,
//   ...themeActions,
//   ...featureActions,
//   ...formActions
// };

// export default appActions;
