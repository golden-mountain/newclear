// import EventEmitter from 'wolfy87-eventemitter';
//  extends EventEmitter
import { isEqual, remove } from 'lodash';

export default class BallKicker {
  /**
   * Tree format:
   * { eventName: [{ from, to }, { from, to } , ...]  }
   */
  static eventTree = {}

  constructor() {
    this.eventTree = BallKicker.eventTree;
  }

  // getEventId(instancePath, event) {
  //   const eventId = instancePath.join('_');
  //   let str = `${event}-${eventId}`;
  //   str = str.replace(/[\s|\/]/g, '-');
  //   return instancePath.length ? str : event;
  // }
  // constructor(widgetTree) {
  //   this.widgetTree = widgetTree;
  // }

  // kick(from, event, params=null, to=[]) {
  //   const eventId = this.getEventId(to, event);
  //   console.log('kick', eventId);
  //   this.emitEvent(eventId, [ from, to, params ]);
  // }
  //
  // accept(from, event, listener, to=[]) { // eslint-disable-line
  //   const eventId = this.getEventId(to, event);
  //   console.log('from to:', eventId);
  //   this.addListener(this.getEventId(to, event), listener);
  // }

  dumpEventTree() {
    console.log('--------------------------- dump event tree -------------------------------');
    Object.entries(this.eventTree).forEach(([ event, objects ]) => {
      console.log('Event Name:', event);
      objects.forEach(({ from, to }) => {
        console.log('>>>>>>>>> registered from:', from, ' to: ', to);
      });
    });
    console.log('--------------------------- end dump -------------------------------');
  }

  _isSubsetComponent(to, storedTo) {
    // console.log('to:', to, ' stored event: ', storedTo);
    // system registered event
    if (to.length == 0) {
      return true;
    }

    if (storedTo.length < to.length) {
      return false;
    }

    const diff = storedTo.slice(0, to.length);
    // console.log('diff', diff);
    return isEqual(to, diff);
  }

  removeEvent(to) {
    // console.log('remove event to:', to);
    Object.entries(this.eventTree).forEach(([ event, storedEvents ]) => { //eslint-disable-line
      storedEvents.forEach((stored, index) => {
        if (this._isSubsetComponent(to, stored.to)) {
          remove(storedEvents, (obj, n) => {
            return n === index;
          });
          // console.log('removed event:', event, to);
          this.eventTree[event] = storedEvents;
        }
      });
    });
    // console.log('after remove:' ,this.eventTree);
    // this.dumpEventTree();
  }

  kick(from, event, params=null, to=[]) {
    // console.log('kicked event:', event, to);
    // find from event tree by match all to path
    const eventTree = this.eventTree[event];
    if (eventTree) {
      // to: [page, id, class, id] or [ page, id, class ] or []
      eventTree.forEach((componentAtEvent) => {
        if (this._isSubsetComponent(to, componentAtEvent.to)) {
          // console.log('triggled event:', event, componentAtEvent);
          componentAtEvent.listener.apply(null, [ from, to, params ]);
        }
      });
    } else {
      console.warn('Event ', event, ' not being registered');
    }
  }

  accept(from, event, listener, to=[]) { // eslint-disable-line
    if (!this.eventTree[event]) {
      this.eventTree[event] = [];
    }
    let eventTree = this.eventTree[event];
    let finded = false;
    eventTree.forEach((componentAtEvent) => {
      if (isEqual(to, componentAtEvent.to)) {
        finded = true;
        return false;
      }
    });

    if (!finded) {
      // console.log('registering from:', event, from, ' to:', to);
      this.eventTree[event].push({ from, to, listener });
      // this.dumpEventTree();
    }
  }
}
