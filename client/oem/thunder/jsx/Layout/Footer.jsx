import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <footer>
        <select id="lang-select">
          <option value="0">English</option>
          <option value="1">中文</option>
        </select>
        <span>&copy; 2016 - A10Networks</span>
      </footer>
    );
  }

}

export default Footer;
