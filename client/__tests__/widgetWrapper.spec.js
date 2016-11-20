import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';

import { createWidget } from './setup';
import widgetWrapper from 'helpers/widgetWrapper';

class Foo extends React.Component {
  static displayName = 'Foo'

  state = {
    data: null
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, 'aaaaaaaaaaaaaaaa');
  }

  render() {
    console.log('render at Foo');
    return (
      <div>
        <input id='checked' defaultChecked />
        <input id='not' defaultChecked={false} />
      </div>
    );
  }
}

const WidgetFoo = widgetWrapper()(Foo);

describe('Component Adapter: widgetWrapper', () => {
  sinon.spy(Foo.prototype, 'componentWillReceiveProps');
  const dom = createWidget(WidgetFoo);

  describe('<ConnectWidgetFoo />', () => {
    it('should render all objects', () => {
      const props = dom.find(WidgetFoo).props();
      expect(props).to.eql({});
    });
  });
 
  describe('<WidgetFoo />', () => {

    it('WidgetFoo to include predict values', () => {
      // expect(props).to.have.property('visible', true);
      const props = dom.find(Foo).props();
      expect(props).to.contain.all.keys({
        visible: true,
        activeData: undefined,
        data: undefined,
        instanceData: {} 
      });

    });  

  
    it('WidgetFoo componentWillReceiveProps called', () => {
      expect(Foo.prototype.componentWillReceiveProps).to.have.property('callCount', 0);
      let foo = dom.find(Foo);
      let fooProps = foo.props();

      const anyValue = 'test any value';
      fooProps.modelSetValue(anyValue);

      // dom.update();
      // expect(Foo.prototype.componentWillReceiveProps).to.have.property('callCount', 0);
      // console.log(fooProps);
      expect(fooProps.modelGetValue()).to.equal(anyValue);

      Foo.prototype.componentWillReceiveProps.restore();

    });


  });


});
