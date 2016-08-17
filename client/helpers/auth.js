module.exports = {
  login(email, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (sessionStorage.token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        sessionStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken: function () {
    return sessionStorage.token
  },

  logout: function (cb) {
    delete sessionStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn: function () {
    return !!sessionStorage.token
  },

  onChange: function () {}
}

function pretendRequest(email, pass, cb) {
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
