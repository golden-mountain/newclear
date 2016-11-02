import React from 'react';
import { set } from 'lodash';
import MenuLayout from 'layouts/a10/MenuLayout';

export default class MenuManager extends React.Component {
  static menuItems = {}

  constructor(props, context) {
    super(props, context);
    this.state = {
      ...MenuManager.menuItems
    };
  }

  registerMenuItem(menu, link) {
    set(MenuManager.menuItems, menu, { _path_: link });
  }

  get menu() {
    return this.menuItems;
  }

  render() {
    return <MenuLayout menu={this.state} />;
  }
}
