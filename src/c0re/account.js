import axios from "axios";
import * as config from "./config";
var urlAPI = config.getApiUrl();

export function updateInfo(username, email, nickname, about) {
    return new Promise((resolve, reject) => {
        var auth_code = localStorage.getItem("auth");
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('nickname', nickname);
        formData.append('about', about);
        formData.append('auth', auth_code);

        axios({
            url: `${urlAPI}account/info/update`,
            method: 'POST',
            data: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            resolve(response.data);
            reject("fail");
        })
        .catch(function (error) {
            console.error(error.response);
        });
    });
}

export function updatePassword(password_old, password_new, password_new_retype) {
    return new Promise((resolve, reject) => {
        var auth_code = localStorage.getItem("auth");
        const formData = new FormData();
        formData.append('password_old', password_old);
        formData.append('password_new', password_new);
        formData.append('password_new_retype', password_new_retype);
        formData.append('auth', auth_code);

        axios({
            url: `${urlAPI}account/password/update`,
            method: 'POST',
            data: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            resolve(response.data);
            reject("fail");
        })
        .catch(function (error) {
            console.error(error.response);
        });
    });
}

export function updateAvatar(file) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        var auth_code = localStorage.getItem("auth");
        formData.append("image", file[0], file[0].name);
        formData.append('auth', auth_code);
        
        axios({
            url: `${urlAPI}account/avatar/update`,
            method: 'POST',
            data: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            resolve(response.data);
            reject("fail");
        })
        .catch(function (error) {
            console.error(error.response);
        });
    });
  }