import axios from "axios";
import * as config from "./config";
var urlAPI = config.getApiUrl();

export function login(username, password) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        axios({
            url: `${urlAPI}auth/login`,
            method: 'POST',
            data: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            if (response.data.success == true) {
                localStorage.setItem("auth", response.data.result.auth);
            }
            resolve(response.data);
            reject("fail");
        })
        .catch(function (error) {
            console.error(error.response);
        });
    });
}

export function register(username, email, password, password_retype) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_retype', password_retype);

        axios({
            url: `${urlAPI}auth/register`,
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

export function isLogin(with_data = false) {
    return new Promise((resolve, reject) => {
        var auth_code = localStorage.getItem("auth");

        if (auth_code != null) {
            const formData = new FormData();
            formData.append('auth', auth_code);

            axios({
                url: `${urlAPI}auth/check`,
                method: 'POST',
                data: formData,
                headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            }).then(response => {
                var result = false
                
                if (response.data.success == true) {
                    result = true
                    if (with_data) {
                        result = response.data
                    }
                }

                resolve(result);
                reject("fail");
            })
            .catch(function (error) {
                console.error(error.response);
            });
        } else {
            resolve(false);
            reject("fail");
        }
    });
}