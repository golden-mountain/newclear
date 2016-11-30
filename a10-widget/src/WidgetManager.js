
import { repeat } from 'lodash';
import TreeModel  from  'tree-model';

import BallKicker from './BallKicker';
// import {
//   SHOW_COMPONENT, HIDE_COMPONENT
// } from 'configs/messages';
// import { renderComponent } from 'helpers/dom';
//
// class WidgetListener {
//   standBalls = {
//     [SHOW_COMPONENT](from, to, params) { // eslint-disable-line
//       // console.log(from, to, params , 'show Me executed');
//       return this.dispatch(window.appActions.setComponentVisible(to, true));
//     },
//     [HIDE_COMPONENT](from, to, params) { // eslint-disable-line
//       // console.log(from, to, params, 'hideMe');
//       return this.dispatch(window.appActions.setComponentVisible(to, false));
//     }
//   }
//
//   constructor(dispatch, ballKicker) {
//     this.dispatch = dispatch;
//     this.ballKicker = ballKicker;
//   }
//
//   registerStandardBalls(from, to=[]) { //eslint-disable-line
//     // console.log(this, instancePath);
//     for (let event in this.standBalls) {
//       const eventAction = this.standBalls[event];
//       this.ballKicker.accept([], event, eventAction.bind(this) );
//     }
//   }
// }

export default class WidgetManager {
  static widgetTree = null

  widgetTreeModel = new TreeModel()

  constructor(dispatch) {
    this.dispatch = dispatch;
    this.ballKicker = new BallKicker();
    // this.listener = new WidgetListener(this.dispatch, this.ballKicker);
    if (!WidgetManager.widgetTree) {
      WidgetManager.widgetTree = this.widgetTreeModel.parse({
        id:'root',
        instancePath: [ 'root', 'default' ],
        children: []
      });
    }
    this.widgetTree = WidgetManager.widgetTree;
  }

  getInstanceId(instancePath) {
    return instancePath.join(':');
  }

  /**
   * values could be any object
   * but { meta, value } is welcome
   */
  registerComponent(instancePath, parentInstancePath=[ 'root' ], values={}) {
    let node = null;
    if (instancePath[0]) {
      node = this.widgetTreeModel.parse({
        id: this.getInstanceId(instancePath),
        instancePath,
        ...values
      });
    } else {
      return false;
    }
    // console.log(node, '>>>>>>>>>>>>>>>>node');

    // const parentId = this.getInstanceId(parentInstancePath);
    // let mountNode = this.widgetTree.first((node) => {
    //   return node.model.id === parentId;
    // });
    let mountNode = this.getNode(parentInstancePath);

    // let mountNodes = this.widgetTree.all((node) => {
    //   return node.model.id === parentId;
    // });

    if (!mountNode) {
      mountNode = this.widgetTree;
    }

    // console.log(instancePath, mountNodes);
    mountNode.addChild(node);
  }

  unregisterComponent(instancePath) {
    if (instancePath) {
      const thisNode = this.getNode(instancePath);
      // console.log(thisNode);
      thisNode && thisNode.drop();
    }
  }

  printwidgetTree(showMetaData=false) {
    console.log('--------------------------- Start Print Tree -------------------------------');
    this.printwidgetTree2(this.widgetTree, showMetaData);
    console.log('--------------------------- End Print Tree -------------------------------');
  }

  printwidgetTree2(node, pad2=0, showMetaData=false) {
    let pad = pad2;
    let padder = repeat('*', pad);
    if (!node.model.instancePath[2]) {
      console.log(padder, node.model.instancePath[1]);
    } else {
      console.log(padder, node.model.instancePath[3]);
    }
    // if (showMetaData) {
    console.log('::::meta', node.model.meta, ':::value::', node.model.value);
    // }

    if (node.children.length) {
      pad += 2;
      for (var index in node.children) {
        this.printwidgetTree2(node.children[index], pad, showMetaData);
      }
    }
    return pad;
  }

  // find exactly itself
  findTargetReceiver(fromPath, targetPath=[]) {
    const path = targetPath || fromPath;
    // console.log('tree:', this.widgetTree);
    // console.log('find path:', path);
    const targetId = this.getInstanceId(path);
    const targetNode = this.widgetTree.first((node) => {
      return node.model.id === targetId;
    });

    return targetNode ? targetNode.model.instancePath : [];
  }

  // find by display Name
  findTargetByComponentName(name, first=true) {
    const method = first ? 'first' : 'all';
    const targetNode = this.widgetTree[method]((node) => {
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
    const thisNode = this.widgetTree.first((node) => {
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

    let result = path.slice(-2, -1)[0];
    // console.log(displayName, 'new result:',result);
    return result.model ? result.model.instancePath : [];
  }

  getNode(instancePath) {
    const targetId = this.getInstanceId(instancePath);
    return this.widgetTree.first((node) => {
      return node.model.id === targetId;
    });
  }

}

let wm = null;
export const getWidgetManager = (dispatch) => {
  if (!wm) {
    return new WidgetManager(dispatch);
  } else {
    return wm;
  }

};
