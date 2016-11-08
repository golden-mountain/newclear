import React from 'react';
import { Link } from 'react-router';
import { Collapse } from 'react-bootstrap';
import { forEach, uniqueId } from 'lodash';
import pubsub from 'pubsub-js';
import SidebarRun from './jsx/Layout/Sidebar.run';

// import './scss/Menu.scss';
// const List = ({ children, className }) => {
//   return <li className={ className }> { children } </li>;
// };

export default class MenuLayout extends React.Component {
  icons = {
    'root-dev-tools': 'icon-wrench',
    'root-adc': 'icon-layers',
    'root-dashboard': 'icon-speedometer'
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      userBlockCollapse: false,
      collapse: {}
    };
    this.pubsub_token = pubsub.subscribe('toggleUserblock', () => {
      this.setState({
        userBlockCollapse: !this.state.userBlockCollapse
      });
    });
  }

  componentDidMount() {
    SidebarRun();
  }

  componentWillUnmount() {
      // React removed me from the DOM, I have to unsubscribe from the pubsub using my token
    pubsub.unsubscribe(this.pubsub_token);
  }

  componentWillMount() {
    let collapseState = {};
    // const id = key.replace(/\s+/, '-').toLowerCase();
    const genCollapse = (menus, prefix='root') => {
      forEach(menus, (menu, key) => {
        const id = prefix + '-' + key.replace(/\s+/, '-').toLowerCase();
        if (menu._path_) {
          collapseState[id] = this.routeActive(Object.keys(menu));
        } else {
          genCollapse(menu, id);
        }
      });
    };
    // console.log(collapseState);
    this.setState({
      Collapse: genCollapse(this.props.menu)
    });
  }

  routeActive(paths) { //eslint-disable-line
    paths = Array.isArray(paths) ? paths : [ paths ];
    for (let p in paths) {
      // TODO: use Router path name instead of Direct use it
      if (location.pathname.indexOf(paths[p]) > -1) {
        return true;
      }
    }
    return true;
  }

  toggleItemCollapse(stateName) {
    // var newCollapseState = {};
    for (let c in this.state.collapse) {
      if (this.state.collapse[c] === true && c !== stateName) {
        this.state.collapse[c] = false;
      }
    }

    this.setState({
      collapse: {
        [ stateName ]: !this.state.collapse[ stateName ]
      }
    });
  }

  generateMenu(menus, prefix='root') {
    // console.log(menu);
    let menuItems = [];
    forEach(menus, (menu, key) => {
      let menuItem = null;
      const id = prefix + '-' + key.replace(/\s+/, '-').toLowerCase();
      if (menu._path_) {
        menuItem = (<li key={uniqueId(key)}>
            <Link to={menu._path_} title={key}>
            <span>{key}</span>
            </Link>
        </li>);
      } else {
        menuItem = (
          <li key={uniqueId(id)} >
              <div className="nav-item" onClick={ this.toggleItemCollapse.bind(this, id) }>
                  {/* <div className="pull-right label label-info">3</div> */}
                  <em className={this.icons[id] || 'fa fa-caret-right'}></em>
                  <span data-localize={ 'sidebar.nav.' + id }>{key}</span>
              </div>
              <Collapse in={ this.state.collapse[id] } timeout={ 100 }>
                  <ul id={id} className="nav sidebar-subnav">
                      <li className="sidebar-subnav-header">{key}</li>
                      { this.generateMenu(menu, id) }
                  </ul>
              </Collapse>
          </li>

        );
      }
      menuItems.push(menuItem);
    });

    return menuItems;
  }

  render() {
    return (
      <aside className='aside'>
          { /* START Sidebar (left) */ }
          <div className="aside-inner">
              <nav data-sidebar-anyclick-close="" className="sidebar">
                  { /* START sidebar nav */ }
                  <ul className="nav">
                      { /* START user info */ }
                      <li className="has-user-block">
                          <Collapse id="user-block" in={ this.state.userBlockCollapse }>
                              <div className="item user-block">
                                  { /* User picture */ }
                                  <div className="user-block-picture">
                                      <div className="user-block-status">
                                          <img src="" alt="Avatar" width="60" height="60" className="img-thumbnail img-circle" />
                                          <div className="circle circle-success circle-lg"></div>
                                      </div>
                                  </div>
                                  { /* Name and Job */ }
                                  <div className="user-block-info">
                                      <span className="user-block-name">Hello, Mike</span>
                                      <span className="user-block-role">Designer</span>
                                  </div>
                              </div>
                          </Collapse>
                      </li>
                      { /* END user info */ }
                      { /* Iterates over all sidebar items */ }
                      <li className="nav-heading ">
                          <span data-localize="sidebar.heading.HEADER">Main Navigation</span>
                      </li>
                      {this.generateMenu(this.props.menu)}
                  </ul>
                  { /* END sidebar nav */ }
              </nav>
          </div>
          { /* END Sidebar (left) */ }
      </aside>
    );
  }

}
