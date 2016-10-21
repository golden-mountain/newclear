export function setInstanceData(state, instance, data) {
  return state.setIn(instance, data);
}

export function buildInstancePath(pageName, pageId, componentName, componentId) {
  return { pageName, pageId, componentName, componentId };
}
