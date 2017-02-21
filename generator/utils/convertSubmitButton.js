
class ConvertSubmitButton {

  constructor(sa) {
    this.sa = sa;

    this.initMapping();
  }

  initMapping() {
    this.mapping = {
      component: 'A10SubmitButtons'
    };
  }

  getMapping() {
    return this.mapping;
  }

  render() {
    return `<${this.mapping.component} {...this.props} />`;
  }
}

export default ConvertSubmitButton;
