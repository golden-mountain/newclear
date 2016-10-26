import EventEmitter from 'wolfy87-eventemitter';


export default class BallKicker  extends EventEmitter {

  getEventName(instancePath, event) {
    // console.log('instance event:',  `${event}.${instancePath.join('.')}`);
    return `${event}.${instancePath.join('.')}`;
  }

  kick(from, event, params=null, to=[]) {
    // console.log('kick', event,  to);
    this.emitEvent(event, [ from, to, params ]);
  }

  accept(from, event, listener, to=[]) { // eslint-disable-line
    // console.log('register from', event, to);
    this.addListener(event, listener);
  }
}
