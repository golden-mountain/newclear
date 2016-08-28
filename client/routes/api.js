import {loadRoute, errorLoading} from './routeUtil';

export default [
	{
	  path: 'at',
	  getComponent: (location, cb) => {
	    System.import('pages/ApiTester/')
	      .then(loadRoute(cb))
	      .catch(errorLoading);
	  }
	},
	{
	  path: 'apitester',
	  getComponent: (location, cb) => {
	    System.import('pages/ApiTester/online')
	      .then(loadRoute(cb))
	      .catch(errorLoading);
	  }
	}
];