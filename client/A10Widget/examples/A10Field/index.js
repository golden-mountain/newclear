import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import {  Code, Markdown } from 'redux-form-website-template';
import { createWidgetStore } from 'WidgetExport';


const store = createWidgetStore('app');

const dest = document.getElementById('content');

let render = () => {
  const Sandbox = require('./Sandbox').default;
  const readme = require('./Readme.md');
  const raw = require('!!raw-loader!./Sandbox');

  ReactDOM.render(
    <Provider store={store}>
      <main>
        <Row>

          <Markdown content={readme}/>

          <Col xs={7}>  <Sandbox /></Col>

          <Col xs={5}>
            <h2>Code</h2>

            <h4>Sandbox.js</h4>

            <Code source={raw}/>
          </Col>

        </Row>
      </main>
    </Provider>,
    dest
  );
};

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(
      <RedBox error={error} className="redbox"/>,
      dest
    );
  };

  render = () => {
    try {
      renderApp();
    } catch (error) {
      renderError(error);
    }
  };

  const rerender = () => {
    setTimeout(render);
  };

  module.hot.accept(rerender);
  module.hot.accept('./Sandbox', rerender);
  module.hot.accept('./Readme.md', rerender);
  module.hot.accept('!!raw-loader!./Sandbox', rerender);
}

render();
