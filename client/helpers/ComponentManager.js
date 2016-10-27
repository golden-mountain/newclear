
import { repeat } from 'lodash';
import TreeModel  from  'tree-model';
import BallKicker from 'helpers/BallKicker';
import {
  SHOW_COMPONENT, HIDE_COMPONENT
} from 'configs/messages';
// import { renderComponent } from 'helpers/dom';

class ComponentListener {
  standBalls = {
    [SHOW_COMPONENT](from, to, params) { // eslint-disable-line
      // console.log(from, to, params , 'show Me executed');
      return this.dispatch(window.appActions.setComponentVisible(to, true));
    },
    [HIDE_COMPONENT](from, to, params) { // eslint-disable-line
      // console.log(from, to, params, 'hideMe');
      return this.dispatch(window.appActions.setComponentVisible(to, false));
    }
  }

  constructor(dispatch, ballKicker) {
    this.dispatch = dispatch;
    this.ballKicker = ballKicker;
  }

  registerStandardBalls(from, to=[]) { //eslint-disable-line
    // console.log(this, instancePath);
    for (let event in this.standBalls) {
      const eventAction = this.standBalls[event];
      this.ballKicker.accept([], event, eventAction.bind(this) );
    }
  }
}

export default class ComponentManager {

  componentTreeModel = new TreeModel()

  constructor(props) {
    this.dispatch = props.dispatch;
    this.ballKicker = new BallKicker();
    this.listener = new ComponentListener(this.dispatch, this.ballKicker);
    this.componentTree = this.componentTreeModel.parse({
      id:'root',
      instancePath: [ 'root', 'default' ],
      children: []
    });
  }

  getInstanceId(instancePath) {
    return instancePath.join(':');
  }

  registerComponent(instancePath, parentInstancePath=[ 'root' ]) {
    let node = null;
    if (typeof instancePath[0] !== 'string') {
      // list
      instancePath.forEach((instance) => {
        let n1 = this.componentTreeModel.parse({
          id: this.getInstanceId(instance),
          instance
        });
        if (node) {
          node.addChild(n1);
        } else {
          node = n1;
        }
      });
    } else {
      node = this.componentTreeModel.parse({
        id: this.getInstanceId(instancePath),
        instancePath
      });
    }
    // console.log(node, '>>>>>>>>>>>>>>>>node');

    const parentId = this.getInstanceId(parentInstancePath);
    let mountNode = this.componentTree.first((node) => {
      return node.model.id === parentId;
    });

    // let mountNodes = this.componentTree.all((node) => {
    //   return node.model.id === parentId;
    // });

    if (!mountNode) {
      mountNode = this.componentTree;
    }

    // console.log(instancePath, mountNodes);
    mountNode.addChild(node);
  }

  printComponentTree() {
    console.log('--------------------------- Start Print Tree -------------------------------');
    this.printComponentTree2(this.componentTree);
    console.log('--------------------------- End Print Tree -------------------------------');
  }

  printComponentTree2(node, pad2=0) {
    let pad = pad2;
    let padder = repeat('*', pad);
    if (!node.model.instancePath[2]) {
      console.log(padder, node.model.instancePath[1]);
    } else {
      console.log(padder, node.model.instancePath[3]);
    }
    if (node.children.length) {
      pad += 2;
      for (var index in node.children) {
        this.printComponentTree2(node.children[index], pad);
      }
    }
    return pad;
  }

  // find exactly itself
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

  // find by display Name
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

  findParent(instancePath, displayName='') {
    const targetId = this.getInstanceId(instancePath);
    const thisNode = this.componentTree.first((node) => {
      return node.model.id === targetId;
    });
    let path = thisNode.getPath();
    // console.log( targetId, path);
    if (displayName) {
      const className = `Widget${displayName}`;
      let nextNode = null;
      path.forEach((node) => {
        if (node.model.instancePath[2] == className) {
          nextNode = node;
          return;
        }
      });
      nextNode && (path = nextNode.getPath());
    }

    let result = path.slice(-3, -2)[0];
    // console.log(displayName, 'new result:',result);
    return result.model ? result.model.instancePath : [];
  }

}
