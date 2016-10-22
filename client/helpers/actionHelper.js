export function setInstanceData(state, instance, data) {
  return state.setIn(instance, data);
}

export function buildInstancePath(pageName, pageId, componentName, componentId) {
  if (!componentName) {
    return [ pageName, pageId ];
  } else {
    return [ pageName, pageId, componentName, componentId ];
  }
}
