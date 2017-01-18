import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import { widgetWrapper } from 'a10-widget';
import './assets/sass/index.scss';

class LangDropdown extends Component {

  static displayName = 'LangDropdown'

  constructor(props) {
    super(props);
    this.langs = {
      en: { icon: 'um', langName: 'English' },
      cn: { icon: 'cn', langName: '简体中文' },
      tw: { icon: 'tw', langName: '繁體中文' },
      kr: { icon: 'kr', langName: '한국어' },
      jp: { icon: 'jp', langName: '日本语' }
    };
  }

  selectLang = key => {
    this.props.modelSetValue('test');
    this.props.comSetComponentState({ 
      data: { lang: key } 
    });
  }

  renderLangItem = key => {
    return (
      <div className="lang-dropdown-item">
        <span className={`flag-icon flag-icon-${this.langs[key].icon}`} />
        <span className="lang-name">{this.langs[key].langName}</span>
      </div>
    );
  }

  render() {
    const currentLang = this.props.getData('lang') || 'en';
    return (
      <DropdownButton title={this.renderLangItem(currentLang)} 
        className="lang-dropdown"
        id="lang-dropdown"
        onSelect={this.selectLang}
        pullRight>
        {
          Object.keys(this.langs).map((key, index) => (
            <MenuItem key={index} eventKey={key}>{this.renderLangItem(key)}</MenuItem>
          ))
        }
      </DropdownButton>
    );
  }

}

export default widgetWrapper([ 'app' ])(LangDropdown);
