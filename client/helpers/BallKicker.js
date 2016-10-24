import EventEmitter from 'wolfy87-eventemitter';
import TreeModel  from  'tree-model';

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
    this.componentTreeModel = new TreeModel();
    this.componentTree = this.componentTreeModel.parse({
      id:'root',
      instancePath: [],
      children: []
    });
  }

  getInstanceId(instancePath) {
    return instancePath.join(':');
  }

  registerComponent(instancePath, parentInstancePath=[ 'root' ]) {
    const parentId = this.getInstanceId(parentInstancePath);
    let mountNode = this.componentTree.first((node) => {
      return node.model.id === parentId;
    });

    if (!mountNode) {
      mountNode = this.componentTree;
    }
    const node = this.componentTreeModel.parse({
      id: this.getInstanceId(instancePath),
      instancePath
    });
    mountNode.addChild(node);
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

  findTargetReceiver(fromPath, targetPath=[]) {
    const path = targetPath || fromPath;
    // console.log('tree:', this.componentTree);
    // console.log('find path:', path);
    const targetId = this.getInstanceId(path);
    const targetNode = this.componentTree.first((node) => {
      return node.model.id === targetId;
    });

    return targetNode ? targetNode.model.instancePath : [];
  }

  findTargetByComponentName(name, first=true) {
    const method = first ? 'first' : 'all';
    const targetNode = this.componentTree[method]((node) => {
      return node.model.instancePath[2] == name;
    });

    if (!first) {
      return targetNode.map((node) => {
        return node.model.instancePath;
      });
    } else {
      return targetNode ? targetNode.model.instancePath : [];
    }
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
