import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
// import { Row, Col, Panel, Button, FormControl as Input, DropdownButton, MenuItem } from 'react-bootstrap';
// import { Row, Col, Panel, Button, FormControl as Input } from 'react-bootstrap';

class FormGeneral extends React.Component {

  render() {
    const { title, description, children } = this.props;

    return (
      <ContentWrapper>
        <h3>
          {title}
           <small>{description}</small>
        </h3>
        { children }
      </ContentWrapper>
      );
  }

}

export default FormGeneral;
