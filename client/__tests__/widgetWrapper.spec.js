import React from 'react';
// import sinon from 'sinon';

import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

import { createWidgetRunningEnv } from './setup';
// const EmptyLayout = require('oem/thunder/EmptyLayout').default;

class Foo extends React.Component {
  render() {
    console.log('rendering');
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    );
  }
}

describe('Global Provider', () => {
  it('should create provider with store', () => {
    const TestPage = createWidgetRunningEnv(Foo, {});
    // sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<TestPage />);
    // expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'foo' });
    expect(wrapper.props().bar).to.equal('foo');
    // expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
    // Foo.prototype.componentDidMount.restore();
    // wrapper.find().render();

  });
});
