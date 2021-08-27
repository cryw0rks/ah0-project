import Axios from "axios";
import * as config from "./config";
var urlAPI = config.getApiUrl();

export function getAllUser(limit, page) {
	return new Promise((resolve, reject) => {
		Axios.get(`${urlAPI}user`, { params: { limit: limit, page: page } })
			.then(response => {
				resolve(response.data);
				reject("fail");
			})
			.catch(function (error) {
				console.error(error.response);
			});
	});
}

export function getOneUserByUsername(username) {
	return new Promise((resolve, reject) => {
		Axios.get(`${urlAPI}user`, { params: { username: username } })
			.then(response => {
				resolve(response.data);
				reject("fail");
			})
			.catch(function (error) {
				console.error(error.response);
			});
	});
}