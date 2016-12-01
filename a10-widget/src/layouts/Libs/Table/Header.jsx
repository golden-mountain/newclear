import React, { Component } from 'react';
// import { BootstrapTable } from 'react-bootstrap-table';  // in ECMAScript 6
import { Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';

import { A10Button } from '../../../widgets/A10Field/FieldWidgets/A10Button';

class TableHeader extends Component {
  render() {
    const { actions } = this.props;
    const popupInfo = actions.create;

    return (
      <div className="dataTables_wrapper form-inline dt-bootstrap no-footer">
        <Row>
          <Col md={6} >
            <InputGroup>
              <FormControl type="text" placeholder="Keywords" />
              <InputGroup.Button>
                <Button bsStyle="default">Search</Button>
              </InputGroup.Button>
            </InputGroup>
          </Col>
          <Col md={6} >
            <A10Button bsClass="btn btn-labeled btn-success pull-right" popup={ popupInfo }  >
              <span className="btn-label"><i className="fa fa-plus"></i></span> Create
            </A10Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TableHeader;
