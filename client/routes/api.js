import {loadRoute, errorLoading} from './routeUtil';

export default [
	{
	  path: 'at',
	  getComponent: (location, cb) => {
	    System.import('pages/ApiTester/online')
	      .then(loadRoute(cb))
	      .catch(errorLoading);
	  }
	}
];