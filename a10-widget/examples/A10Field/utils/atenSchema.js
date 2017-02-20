const getSchema = (name) => {
  console.log(`get schmea of ${name}`);
  return new Promise((resolve, reject) => {
    System.import(`../../../../schemas/${name}.json`).then(module => {
      console.log(module);
      resolve({
        schema: module,
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
          },
          {
            name: 'ip-address', // for displaying 
            component: 'A10Field',
            defaultProps: {
              name: 'ip-address',
              lable: 'ip-address'
            }
          }
        ]
      });
    }).catch(err => {
      console.error('Chunk loading failed');
      console.error(err);
    });
  });
};

export default {
  getSchema
};
