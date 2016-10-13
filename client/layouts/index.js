var appConfigs = require('configs/app');
function requireLayout(moduleName) {
  var req = require.context(appConfigs.LAYOUT, true, /^\.\/.*\.js$/);
  var AppLayout = req(moduleName);
}
module.exports = requireLayout;
