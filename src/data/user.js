import Axios from 'axios'

export function getAllUsers() {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.get('http://localhost:2000/user', {
                        //username: username,
                        //password: password
                    }).then(response => {
                        if (response.data.error == false) {
                         retu['message'] = "load success"
                          retu['error'] = false
                          retu['data'] = response.data
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

export function getOneUser(username) {
  return new Promise((resolve, reject) => { 
  var retu = {
    "message": "something wrong",
    "error": true
  }
                    Axios.get('http://localhost:2000/user?username='+username).then(response => {
                        if (response.data.error == false) {
                         retu['message'] = "load success"
                          retu['error'] = false
                          retu['data'] = response.data.data
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