import { Component, PropTypes } from 'react';
import invariant from 'invariant';

export default class BaseForm extends Component {

  getChildContext() {
    return {  props: this.props  };
  }

  // this is important to stop dead loop by updateing page information
  // shouldComponentUpdate(nextProps) {
  //   console.log(nextProps, '.................next props.................');
  //   const shouldUpdate = (propsToNotUpdateFor, nextProps, currentProps) => {
  //     // if you update some page vars not need update the page, then you must
  //     // specific propsToNotUpdateFor
  //     // 
  //     return Object.keys(nextProps).some(prop => {    
  //       const compare = !~propsToNotUpdateFor.indexOf(prop) && !isEqual(currentProps[ prop ], nextProps[ prop ]);
  //       return compare;
  //     });
  //   };

  //   let result = true;
  //   if (nextProps.page) {
  //     const propsToNotUpdateForPage = [ 'form' ];
  //     result = shouldUpdate(propsToNotUpdateForPage, nextProps.page.toJS(), this.props.page && this.props.page.toJS());
  //   }

  //   console.log('should update, ', result);
  //   return result;
  // }

  // if place here, will update form first
  // componentWillReceiveProps(nextProps) {
  //   // const fieldName = this.props.schema['src-name'];
  //   if (this.props.pageForm) {
  //     const currentFormValues = this.props.pageForm.getIn([ this.props.env.form, 'values' ] );
  //     const nextFormValues = nextProps.pageForm.getIn([ this.props.env.form, 'values' ]);
  //     // console.log(currentFormValues, nextFormValues);
  //     if (!currentFormValues || !isEqual(currentFormValues, nextFormValues)) {
  //       // console.log('form value');
  //       this.props.updateReduxFormSyncErrors(this.props.env.form, 
  //         {
  //           'virtual-server': {
  //             'name': 'Error Name provided'
  //           }
  //         }, 
  //         {}
  //       );
  //     }
  //   }
  // }
  componentWillMount() {
    invariant(this.props.registerCurrentPage, 'BaseForm not a single page component, depends on child page component');
    this.props.registerCurrentPage(this.props.env);
    if (this.props.visible === undefined || this.props.visible) {
      this.props.setPageVisible(this.props.env.page, true);
    } else {
      this.props.setPageVisible(this.props.env.page, false);
    }
    // get connected url keys
    if (this.props.urlKeysConnect) {
      console.log('url keys connect:', this.props.urlKeysConnect);
    }
  }

  componentWillUnmount() {
    // console.log('will unmount this'); 
    this.props.destroyPage();
  }
}

BaseForm.childContextTypes = {
  props: PropTypes.object.isRequired
};
