import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());

class Fixture extends React.Component {
  render() {
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    );
  }
}

describe('<Foo />', () => {

  it('calls componentDidMount', () => {
    mount(<Fixture />);
    expect(Fixture.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
