class Auth  {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (sessionStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    this.pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        sessionStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  }

  getToken() {
    return sessionStorage.token
  }

  logout (cb) {
    delete sessionStorage.token
    if (cb) cb()
    this.onChange(false)
  }

  loggedIn() {
    return !!sessionStorage.token
  }

  onChange() {}

  pretendRequest(email, pass, cb) {
    setTimeout(() => {
      if (email === 'joe@example.com' && pass === 'password1') {
        cb({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        })
      } else {
        cb({ authenticated: false })
      }
    }, 0)
  }
}

export default new Auth();