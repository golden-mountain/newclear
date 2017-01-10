import { A10TagInput } from '../../../widgets/A10Field/FieldWidgets';

export default widgetWrapper([ 'app' ])(A10TagInput, {
  meta: {
    widget: {
      iconClassName: 'fa fa-square-o',
      type: 'basic',
      name: 'A10TagInput',
      component: 'A10TagInput',
      description: ''
    },
    defaultProps: Object.assign({
      values: [ 'Test1', 'Test2' ]
    }, A10TagInput.defaultProps),
    propTypes: Object.assign({
      label: React.PropTypes.string,
      help: React.PropTypes.string
    }, A10TagInput.propTypes),
    propGroups: {
      label: 'basic',
      help: 'basic',
      type: 'basic',
      bsClass: 'advanced'
    }
  }
});
