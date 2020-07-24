import Axios from "axios";

var urlAPI = "https://c0re.ba-ka.org/";

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    var retu = {
      message: "something wrong",
      error: true
    };
    Axios.get(urlAPI+"user", {})
      .then(response => {
        if (response.data.error == false) {
          retu["message"] = "load success";
          retu["error"] = false;
          retu["data"] = response.data;
        } else {
          retu["message"] = response.data.message;
        }
        resolve(retu);
        reject("fail");
      })
      .catch(function(error) {
        console.error(error.response);
      });
  });
}

export function getOneUser(username) {
  return new Promise((resolve, reject) => {
    var retu = {
      message: "something wrong",
      error: true
    };
    Axios.get(urlAPI+"user?username=" + username)
      .then(response => {
        if (response.data.error == false) {
          retu["message"] = "load success";
          retu["error"] = false;
          retu["data"] = response.data.data;
        } else {
          retu["message"] = response.data.message;
        }
        resolve(retu);
        reject("fail");
      })
      .catch(function(error) {
        console.error(error.response);
      });
  });
}
