
import React, { Component } from 'react';

import Helmet from 'react-helmet';

// import { SectionHeader } from '../Components/Layout';

class PageLayout extends Component {
  // export default InitializeFromStateForm;
  render() {

    const { children } = this.props;
    return (
      <div className="container-fluid">
        <Helmet title="Edit Virtual Port" />
        {children}
      </div>
    );
  }
}

export default PageLayout;
