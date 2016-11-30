import superagent from 'superagent';

const methods = [ 'get', 'post', 'put', 'patch', 'del' ];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) =>      
      /* eslint-disable */
      this[method] = (path, { params, data, headers } = {}) => new Promise((resolve, reject) => {
      /* eslint-enable */
        const request = superagent[method](formatUrl(path));
        if (params) {
          request.query(params);
        }

        if (headers) {
          for (const [ k, v ] of Object.entries(headers.toJS())) {
            request.set(k, v);
          }
        }

        if (data) {
          request.send(data.toJS());
        }

        request.end((err, resp) => {
          // console.log('error:', err, 'response:', resp);
          return  err ? reject(resp) : resolve(resp);
        });
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
