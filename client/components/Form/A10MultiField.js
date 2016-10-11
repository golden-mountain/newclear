import React, { Component } from 'react';
import { FieldArray } from 'redux-form/immutable'; // imported Field
import { FormControl, Button, Table } from 'react-bootstrap';

import { widgetWrapper } from 'helpers/widgetWrapper';
import A10Button from 'components/Form/A10Button';
import { A10SchemaField } from 'components/Form/A10Field';

class TableFields extends Component {

  render() {
    const { fields, meta: { touched, error }, popupInfo } = this.props;

    return (
      <Table responsive>
        <thead>
          <tr>
            <td cols="3">
              <div className="pull-right">
                <Button onClick={() => fields.push(
                  { 
                    'port-number': 81,
                    'range': '80-100',
                    'protocol': 'HTTP'
                  }
                )} bsStyle="primary">Add Member</Button>
                <A10Button bsStyle="default" popup={ popupInfo }>Create...</A10Button>

                {touched && error && <span>{error}</span>}
              </div>
            </td>
          </tr>
          <tr>
            <td>Number</td>
            <td>Range</td>
            <td>Protocol</td>
          </tr>
        </thead>  
        <tbody>
        {fields.map((port, index) =>
          <tr key={index}>
            <td>
              <A10SchemaField layout={false} name={`${port}.port-number`} />
            </td>

            <td>
              <A10SchemaField layout={false} name={`${port}.range`}  conditional={{ [ `${port}.port-number` ]: 91 }}/>
            </td>

            <td>     
              <A10SchemaField layout={false} name={`${port}.protocol`} >  
                <FormControl componentClass="select">
                  <option value="tcp">tcp</option>
                  <option value="udp">udp</option>
                </FormControl>
              </A10SchemaField>
            </td>
          </tr>
        )}
        </tbody>
      </Table>
    );
  }
}

class A10MultiField extends Component {
  constructor(props, context) {
    super(props, context);    
  }

  render() {
    return (
      <FieldArray name="virtual-server.port-list" component={TableFields}/>      
    );
  }
}

export default widgetWrapper(A10MultiField);
