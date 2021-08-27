import Axios from "axios";
import * as config from "./config";
var urlAPI = config.getApiUrl();

export function getAllContent(limit, page) {
	return new Promise((resolve, reject) => {
		Axios.get(urlAPI + "content", { params: { limit: limit, page: page } })
			.then(response => {
				resolve(response.data);
				reject("fail");
			})
			.catch(function (error) {
				console.error(error.response);
			});
	});
}

export function getAllContentByUsername(username, limit, page) {
	return new Promise((resolve, reject) => {
		Axios.get(urlAPI + "content", { params: { username: username, limit: limit, page: page } })
			.then(response => {
				resolve(response.data);
				reject("fail");
			})
			.catch(function (error) {
				console.error(error.response);
			});
	});
}

export function getAllContentByUserID(userid, limit, page) {
	return new Promise((resolve, reject) => {
		Axios.get(urlAPI + "content", { params: { userid: userid, limit: limit, page: page } })
			.then(response => {
				resolve(response.data);
				reject("fail");
			})
			.catch(function (error) {
				console.error(error.response);
			});
	});
}

export function getOneContent(code) {
	return new Promise((resolve, reject) => {
		const auth = localStorage.getItem("auth");
		Axios.get(urlAPI + "content", { params: { code: code, auth: auth } })
			.then(response => {
				resolve(response.data);
				reject("fail");
			})
			.catch(function (error) {
				console.error(error.response);
			});
	});
}


