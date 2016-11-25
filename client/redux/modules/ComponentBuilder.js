import _ from 'lodash';

const ADD_COMPONENT = 'componentBuilder/ADD_COMPONENT';
const DELETE_COMPONENT = 'componentBuilder/DELETE_COMPONENT';
const UPDATE_COMPONENT = 'componentBuilder/UPDATE_COMPONENT';
const MOVE_COMPONENT = 'componentBuilder/MOVE_COMPONENT';
const START_TO_EDIT_COMPONENT = 'componentBuilder/START_TO_EDIT_COMPONENT';
const STOP_EDITING_COMPONENT = 'componentBuilder/STOP_EDITING_COMPONENT';

const initialState = {
  sandboxValue: {
    componentId: 'root',
    component: 'Form',
    className: 'form-horizontal',
    style: {
      minHeight: 100
    },
    componentChildren: [
      {
        componentId: 'exampleA',
        component: 'Button',
        bsStyle: 'primary',
        componentChildren: 'OK'
      },
      {
        componentId: 'exampleB',
        component: 'Button',
        bsStyle: 'danger',
        componentChildren: 'Cancel'
      }
    ]
  },
  isEditingProps: false,
  editingComponentId: null,
  editingComponentPropTypes: {},
  editingComponentProps: {}
};

function _deleteComponent(schema, componentId) {
  return {
    ...schema,
    componentChildren: !schema.componentChildren || typeof schema.componentChildren === 'string' ? schema.componentChildren :
      schema.componentChildren.filter(item => item.componentId !== componentId)
      .map(item => {
        return _deleteComponent(item, componentId);
      })
  };
}

function _updateComponent(schema, componentId, component) {
  return {
    ...schema,
    componentChildren: !schema.componentChildren || typeof schema.componentChildren === 'string' ? schema.componentChildren :
      schema.componentChildren
      .map(item => {
        if ( item.componentId === componentId) {
          Object.assign(item, component);
        }
        return _updateComponent(item, componentId, component);
      })
  };
}

function _moveComponent(schema, dragComponent, dropComponentId, isNew, newPosition) {
  if (isNew && !dragComponent.componentId) {
    dragComponent.componentId = _.uniqueId();
  }
  const modifiedChildren = !schema.componentChildren || typeof schema.componentChildren === 'string' ? schema.componentChildren :
    schema.componentChildren.filter(item => item.componentId !== dragComponent.componentId)
    .map(item => _moveComponent(item, dragComponent, dropComponentId, isNew, newPosition))
    .reduce((prev, current) => {
      if (current.componentId === dropComponentId) {
        if (newPosition === 'inside') {
          current.componentChildren = current.componentChildren || [];
          current.componentChildren = [ ...current.componentChildren, dragComponent ];
        } else {
          return newPosition === 'before' ? [ ...prev, dragComponent, current ] : [ ...prev, current, dragComponent ];
        }
      } else if (current.componentId === dragComponent.id) {
        return prev;
      }
      return [ ...prev, current ];
    }, []);
  return {
    ...schema,
    componentChildren: modifiedChildren
  };
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_COMPONENT: {
      const {
        component
      } = action;
      const newComponent = {
        componentId: _.uniqueId(),
        ...component
      };
      return {
        ...state,
        sandboxValue: {
          ...state.sandboxValue,
          componentChildren: [ ...state.sandboxValue.componentChildren, newComponent ]
        }
      };
    }
    case DELETE_COMPONENT: {
      return {
        ...state,
        sandboxValue: _deleteComponent(state.sandboxValue, action.componentId)
      };
    }
    case UPDATE_COMPONENT: {
      return {
        ...state,
        sandboxValue: _updateComponent(state.sandboxValue, action.componentId, action.component)
      };
    }
    case MOVE_COMPONENT: {
      return {
        ...state,
        sandboxValue: _moveComponent(state.sandboxValue, action.dragComponent, action.dropComponentId, action.isNew, action.newPosition)
      };
    }
    case START_TO_EDIT_COMPONENT: {
      return {
        ...state,
        isEditingProps: true,
        editingComponentId: action.componentProps.componentId,
        editingComponentProps: action.componentProps,
        editingComponentPropTypes: action.componentPropTypes
      };
    }
    case STOP_EDITING_COMPONENT: {
      return {
        ...state,
        isEditingProps: false,
        editingComponentId: null
      };
    }
    default: {
      return state;
    }
  }
}

export function addComponent(component) {
  return {
    type: ADD_COMPONENT,
    component
  };
}

export function updateComponent(componentId, component) {
  return {
    type: UPDATE_COMPONENT,
    componentId,
    component
  };
}

export function deleteComponent(componentId) {
  console.log(`deleteComponent ${componentId}`);
  return {
    type: DELETE_COMPONENT,
    componentId
  };
}

export function moveComponent(dragComponent, dropComponentId, isNew, newPosition) {
  return {
    type: MOVE_COMPONENT,
    dragComponent,
    dropComponentId,
    isNew,
    newPosition
  };
}


export function startToEditComponent({ componentProps, componentPropTypes }) {
  return {
    type: START_TO_EDIT_COMPONENT,
    componentProps,
    componentPropTypes
  };
}

export function stopEditingComponent() {
  return {
    type: STOP_EDITING_COMPONENT
  };
}
