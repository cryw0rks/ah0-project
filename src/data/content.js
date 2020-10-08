import Axios from "axios";

var urlAPI = "https://c0re.ba-ka.org/";

export function getAllContents(id) {
  return new Promise((resolve, reject) => {
    var retu = {
      message: "something wrong",
      error: true
    };

    var lmaoo = "";
    if (id) {
      lmaoo = "?userid="+id;
    }
    Axios.get(urlAPI+"content"+lmaoo, {})
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

export function getAllKamiManage() {
  return new Promise((resolve, reject) => {
    var retu = {
      message: "something wrong",
      error: true
    };
    var lmaoAuth = localStorage.getItem("auth");
    Axios.get(urlAPI+"content/kami?auth="+lmaoAuth, {})
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

export function getOneContent(username) {
  return new Promise((resolve, reject) => {
    var retu = {
      message: "something wrong",
      error: true
    };
    const loggedIn = localStorage.getItem("auth");
    Axios.get(urlAPI+"content?code=" + username+"&auth="+loggedIn)
      .then(response => {
        if (response.data.error == false) {
          retu["message"] = "load success";
          retu["error"] = false;
          retu["author"] = response.data.author;
          retu["content"] = response.data.content;
          retu["detail"] = response.data.detail;
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
