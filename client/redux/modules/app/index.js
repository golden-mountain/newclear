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

import * as pageActions from './page';
import * as themeActions from './theme';


delete pageActions.default;
delete themeActions.default;

const appActions = {
  ...pageActions,
  ...themeActions
};

export default appActions;
