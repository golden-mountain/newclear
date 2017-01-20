export default {
  iconClassName: "fa fa-th",
  type: "basic",
  name: "newLayout",
  schema: {
    component: "RootWidget",
    schemaChildren: [
      {
        component: "Form",
        horizontal: true,
        schemaChildren: [
          {
            component: "FieldGroup",
            label: "Name",
            required: true,
            type: "text",
            pattern: null,
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            style: {},
            editingComponentId: null,
            isDragging: false
          },
          {
            component: "FieldCheckbox",
            label: "Wildcard",
            required: false,
            type: "checkbox",
            pattern: null,
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            style: {},
            editingComponentId: "3",
            isDragging: false
          },
          {
            component: "FieldIp",
            label: "IP v4 Address",
            required: true,
            type: "text",
            pattern: "((^|\\.)((25[0-5])|(2[0-4]\\d)|(1\\d\\d)|([1-9]?\\d))){4}$",
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            style: {},
            editingComponentId: "6",
            isDragging: false
          },
          {
            component: "FieldGroup",
            label: "Netmask",
            required: false,
            type: "text",
            pattern: null,
            typeMismatchErrorMessage: "Validation failed!",
            requiredErrorMessage: "This field is required",
            style: {},
            editingComponentId: "9",
            isDragging: false
          }
        ]
      }
    ]
  }
}
