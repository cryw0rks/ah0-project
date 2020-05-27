import Axios from 'axios'

var urlAPI = "http://localhost:2000/"

export function login(username, password) {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.post(urlAPI+'user/auth/login', {
                        username: username,
                        password: password
                    }).then(response => {
                        if (response.data.error == false) {
                          localStorage.setItem('auth',response.data.auth)

                          if (localStorage.getItem('auth') != null){
                              retu['message'] = "login success"
                              retu['error'] = false
                          }

                        } else {
                          retu['message'] = response.data.message;
                        }
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                
                
                  
                });
}

export function register(username, email, password, password2) {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.post(urlAPI+'user/auth/register', {
                        username: username,
                        email: email,
                        password: password,
                        password2: password2
                    }).then(response => {
                        if (response.data.error == false) {
                              retu['message'] = "register success, you can login now!"
                              retu['error'] = false
                        } else {
                          retu['message'] = response.data.message;
                        }
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                
                
                  
                });
}

export function logout() {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
  //console.log('logout')
  Axios.post(urlAPI+'user/auth/logout', {
                        auth: this.getAuthText()
                    }).then(response => {
                        if (response.data.error == false) {
                              retu['message'] = "logout success"
                              retu['error'] = false
                        } else {
                          retu['message'] = response.data.message;
                        }
                        localStorage.removeItem('auth');
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                  
  });
  
}

export function updateInfo(username, nickname, email, about) {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.post(urlAPI+'user/info/update', {
                        username: username,
                        email: email,
                        nickname: nickname,
                        about: about,
                        auth: this.getAuthText()
                    }).then(response => {
                        if (response.data.error == false) {
                              retu['message'] = "update info success"
                              retu['error'] = false
                        } else {
                          retu['message'] = response.data.message;
                        }
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                
                
                  
                });
}

export function updatePassword(password_old, password_new, password_new_retype) {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.post(urlAPI+'user/password/update', {
                        password_old: password_old,
                        password_new: password_new,
                        password_new_retype: password_new_retype,
                        auth: this.getAuthText()
                    }).then(response => {
                        if (response.data.error == false) {
                              retu['message'] = "update password success"
                              retu['error'] = false
                        } else {
                          retu['message'] = response.data.message;
                        }
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                
                
                  
                });
}

export function updateImageProfile(fileYo) {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
  console.log(fileYo)
  console.log(this.getAuthText())
  const formDatax = new FormData()
        formDatax.append('image', fileYo[0], fileYo[0].name)
        const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'auth-token': this.getAuthText()
        }
    };
        
        Axios.post(urlAPI+'user/avatar/update', formDatax, config
,{
          onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded / progressEvent.total)
          }
        }).then(response => {
          if (response.data.error == false) {
                              retu['message'] = "update image profile success"
                              retu['error'] = false
                              retu['data_image'] = response.data.data_image
                        } else {
                          retu['message'] = response.data.message;
                        }
                        resolve(retu);
                        reject('fail');
        }).catch(function (error) {
                        console.error(error.response);
                    });
                    
                });
                
}

export function getInfoAuth(authXD) {
  
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.post(urlAPI+'user/auth/check', {
                        auth: authXD,
                    }).then(response => {
                        if (response.data.error == false) {
                          retu['message'] = response.data.message
                          retu['error'] = false
                          retu['data_auth'] = response.data.auth
                        } else {
                          retu['message'] = response.data.message;
                        }
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
                
                
                  
                });
}

export function getAuthText() {
  const loggedIn = localStorage.getItem('auth');

  if (!loggedIn) {
    //console.log('u are not in auth');
    return false;
  }
  //console.log('u are in auth');
  return loggedIn;
}

export function isLogin() {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true,
    "isLogin": false
  }
  const loggedIn = localStorage.getItem('auth');

  if (!loggedIn) {
    //console.log('u are not in authzz');
    resolve(retu);
    reject('fail');
  }
  //console.log('isLogin')
  Axios.post(urlAPI+'user/auth/check', {
                        auth: this.getAuthText()
                    }).then(response => {
                      //console.log('isLogin2')
                        if (response.data.error == false) {
                          retu['message'] = response.data.message
                          retu['error'] = false
                          retu['isLogin'] = true
                        } else {
                          retu['message'] = response.data.message;
                          if (loggedIn) {
                          this.logout();
                          }
                        }
                        //console.log(retu)
                        resolve(retu);
                        reject('fail');

                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
  });
}