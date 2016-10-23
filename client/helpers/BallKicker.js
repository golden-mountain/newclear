import EventEmitter from 'wolfy87-eventemitter';
import { get } from 'lodash';

export default class BallKicker  extends EventEmitter {
  standBalls = {
    showMe: (from, to, params) => { // eslint-disable-line
      // console.log(from, to, params , 'show Me executed');
      return ::this.dispatch(window.appActions.setComponentVisible(to, true));
    },
    hideMe: (from, to, params) => { // eslint-disable-line
      // console.log(from, to, params, '::hideMe');
      return ::this.dispatch(window.appActions.setComponentVisible(to, false));
    }
  }

  constructor(dispatch) {
    super();
    this.dispatch = dispatch;
  }

  getEventName(instancePath, event) {
    // console.log(instancePath, event);
    return event;//`${event}.${instancePath.join('.')}`;
  }

  registerStandardsBall(instancePath) {
    // console.log(this, instancePath);
    for (let event in this.standBalls) {
      const eventAction = this.standBalls[event];
      this.addListener(this.getEventName(instancePath, event), eventAction );
    }
  }

  findTargetReceiver(target, componentName) {
    if (componentName.indexOf('Widget') ==  -1) {
      componentName = `Widget${componentName}`;
    }

    const find = (target) => {
      let instancePath = get(target, 'props.instancePath', false); // target context instance path
      if (!instancePath) return [];
      if(instancePath[2] != componentName && target.context != null) {
        instancePath = find(target.context);
      }
      return instancePath;
    };
    return find(target);
  }

  kick(from, to, event, params=null) {
    // const ball = { from, to, params };
    // this.balls.push(ball);
    // console.log(from, to, event, params);
    this.emitEvent(event, [ from, to, params ]);
  }

  accept(from, event, listener) {
    this.addListener(this.getEventName(from, event), listener);
  }
}
