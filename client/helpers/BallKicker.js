import EventEmitter from 'wolfy87-eventemitter';


export default class BallKicker  extends EventEmitter {

  getEventId(instancePath, event) {
    const eventId = instancePath.join('_');
    let str = `${event}-${eventId}`;
    str = str.replace(/[\s|\/]/g, '-');
    return instancePath.length ? str : event;
  }

  kick(from, event, params=null, to=[]) {
    const eventId = this.getEventId(to, event);
    console.log('kick', eventId);
    this.emitEvent(eventId, [ from, to, params ]);
  }

  accept(to, event, listener, from=[]) { // eslint-disable-line
    const eventId = this.getEventId(to, event);
    console.log('from to:', eventId);
    this.addListener(this.getEventId(to, event), listener);
  }
}
