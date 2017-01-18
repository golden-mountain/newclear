import React from 'react';
import { widgetWrapper } from 'widgetWrapper';

function RootWidget({ children }) {
  return (
    <div style={{position: 'relative', minHeight: 300, paddingBottom: 50}}>
      {children}
    </div>
  );
}

export default widgetWrapper()(RootWidget, {
  meta: {
    widget: {
      name: 'RootWidget',
      component: 'RootWidget',
      isContainer: true,
      hideFromCandidates: true,
      description: '',
    }
  }
});
