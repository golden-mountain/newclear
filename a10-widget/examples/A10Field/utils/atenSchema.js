const getSchema = (name) => {
  console.log(`get schmea of ${name}`);
  return {
    schema: {
      // full-raw-schema-json
    },
    layout: {
      iconClassName: 'fa fa-list-alt',
      type: 'basic',
      name: 'form',
      schema: {
        component: 'RootWidget',
        schemaChildren: [
          {
            component: 'Form',
            horizontal: true,
            schemaChildren: [
              {
                component: 'ButtonToolbar',
                bsStyle: 'primary',
                schemaChildren: [
                  {
                    component: 'Button',
                    bsStyle: 'primary',
                    schemaChildren: 'Save'
                  },
                  {
                    component: 'Button',
                    schemaChildren: 'Cancel'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    candidates: [
      {
        name: 'button',
        component: 'Button',
        defaultProps: {
          bsStyle: 'primary'
        }
      }
      // candidate components
      // {
      //   name: 'ip-address', // for displaying 
      //   component: 'A10Field',
      //   defaultProps: {
      //     name: 'ip-address',
      //     lable: 'ip-address',
      //     schema: 'slb.virtual-server.ip-address'
      //   }
      // }
    ]
  };

};

export default {
  getSchema
};
