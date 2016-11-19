import React from 'react';
import { shallow } from 'enzyme';
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
  it('should render Fixture components', () => {
    const wrapper = shallow(<Fixture />);
    expect(wrapper.contains(<input id='checked' defaultChecked />)).to.equal(true);
  });
});
