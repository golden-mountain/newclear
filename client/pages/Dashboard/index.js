import React from 'react';
// import auth from 'helpers/auth';

const Dashboard = React.createClass({
  render() {
    // const token = auth.getToken();

    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    );
  }
});

export default Dashboard;
