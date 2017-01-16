export default {
  iconClassName: "fa fa-th",
  type: "basic",
  name: "newLayout",
  schema: {
    _componentId: "root",
    component: "RootWidget",
    _isRoot: true,
    schemaChildren: [
      {
        _componentId: "form",
        component: "Form",
        horizontal: true,
        schemaChildren: [
          {
            component: "FieldGroup",
            _isNew: true,
            _isContainer: false,
            label: "Name",
            required: true,
            type: "text",
            pattern: null,
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            _componentId: "3",
            style: {},
            editingComponentId: null,
            isDragging: false
          },
          {
            component: "FieldCheckbox",
            _isNew: true,
            _isContainer: false,
            label: "Wildcard",
            required: false,
            type: "checkbox",
            pattern: null,
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            _componentId: "6",
            style: {},
            editingComponentId: "3",
            isDragging: false
          },
          {
            component: "FieldIp",
            _isNew: true,
            _isContainer: false,
            label: "IP v4 Address",
            required: true,
            type: "text",
            pattern: "((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$",
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            _componentId: "9",
            style: {},
            editingComponentId: "6",
            isDragging: false
          },
          {
            component: "FieldGroup",
            _isNew: true,
            _isContainer: false,
            label: "Netmask",
            required: false,
            type: "text",
            pattern: null,
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            _componentId: "12",
            style: {},
            editingComponentId: "9",
            isDragging: false
          }
        ]
      }
    ]
  }
}
