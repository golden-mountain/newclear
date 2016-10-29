export default class LicenseManager  {

  constructor(params) {
    this.license = params;
  }

  isVisible() {
    return true;
  }

  isReadOnly() {
    return true;
  }
}
