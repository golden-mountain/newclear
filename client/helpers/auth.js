class Auth  {
  login(values, request) {
    return () => {
      const fullAuthData = {
        path: '/axapi/v3/auth',
        method: 'POST', 
        body: values
      };
      return request(fullAuthData);
    };
  }

  getToken() {
    return sessionStorage.token;
  }

  logout(cb) {
    delete sessionStorage.token;
    if (cb) cb();
    // this.onChange(false);
  }

  loggedIn() {
    return !!sessionStorage.token;
  }

}

export default new Auth();
