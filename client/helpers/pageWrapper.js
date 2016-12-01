import React, { PropTypes } from 'react';

const pageWrapper = (Page) => {

  class PageWrapper extends React.Component {
    //
    static contextTypes = {
      props: PropTypes.object,
      // context: PropTypes.object,
      wm: PropTypes.object
    }

    // componentWillUnmount() {
    //   this.context.wm.ballKicker.removeEvent(this.basePath);
    //   this.context.props.unmountComponent(this.context.props.pagePath);
    // }

    // get basePath() {
    //   const paths = this.props.pathname.split('/').filter(path => path);
    //   return paths;
    // }

    render() {
      return (<Page {...this.props} />);
    }

  }

  return PageWrapper;
};

export default pageWrapper;
