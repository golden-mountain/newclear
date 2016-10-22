// var context = require.context('.', false, /\.js$/), reducers = {};
// context.keys().forEach(function (key) {
//   var invalidKeys = [ 'index' ];
//   var k = key.replace(/^\.\/(.*)\.js?$/, '$1');
//   if (!~invalidKeys.indexOf(k)) {
//     let module = context(key);
//     delete module.default;
//     reducers = Object.assign({}, reducers, module);
//   }
// });

// module.exports = reducers;

import * as axapiActions from './axapi';
import * as componentActions from './component';
import * as featureActions from './feature';
import * as formActions from './form';
import * as pageActions from './page';
import * as themeActions from './theme';


delete axapiActions.default;
delete pageActions.default;
delete themeActions.default;
delete featureActions.default;
delete formActions.default;
delete componentActions.default;
const appActions = {
  ...axapiActions,
  ...componentActions,
  ...featureActions,
  ...formActions,
  ...pageActions,
  ...themeActions
};

export default appActions;
