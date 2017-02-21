import React, { Component, PropTypes } from 'react';
import { A10Table, A10TableColumn } from '../../../src/widgets/A10Table';

import StandardPageLayout from '../../../../client/oem/thunder/PageLayout';
import { widgetWrapper } from 'widgetWrapper';

class MyA10Table extends Component {

  defaultProps = {
    fieldName: [],
    fieldTitle: [],
    primaryField: ''
  };

  renderFields() {
    const { fieldName, fieldTitle, primaryField } = this.props;
    if (fieldName.length === 0) return [];

    let result = [];
    if (primaryField) {
      result.push((
        <A10TableColumn key={0} dataField={primaryField} checkbox style={{ width:'20px' }}  />
      ));
    }
    result = result.concat(fieldName.map((value, index) => {
      return (
        <A10TableColumn key={index+1} dataField={value}>{(fieldTitle && fieldTitle[index]) || value}</A10TableColumn>
      );
    }));
    return result;
  }

  render() {
    const { fields, primaryField, isComponentEditor, title, description } = this.props;
    return (
      <StandardPageLayout title={title} description={description}>
        <A10Table pageMode responsive striped hover newLast loadOnInitial isComponentEditor={isComponentEditor}>
          {this.renderFields()}
        </A10Table>
      </StandardPageLayout>
    );
  }

}

export default widgetWrapper()(MyA10Table, {
  meta: {
    widget: {
      iconClassName: 'fa fa-wpforms',
      type: 'Field',
      name: 'A10Table',
      component: 'A10Table',
      display: 'block',
      isContainer: true,
      description: ''
    },
    defaultProps: {
      // need fill these
      actions: {},
      schema: 'slb-virtual-server',
      title: '',
      description: '',
      fieldName: [],
      fieldTitle: [],
      primaryField: ''
    },
    propTypes: Object.assign({}, A10Table.propTypes, {
      schema: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      fieldName: PropTypes.array,
      fieldTitle: PropTypes.array,
      primaryField: PropTypes.string
    }),
    propGroups: {
      schema: 'basic',
      title: 'basic',
      description: 'basic',
      fieldName: 'basic',
      fieldTitle: 'basic',
      primaryField: 'basic',
      store: 'ignore'
    }
  }
});
