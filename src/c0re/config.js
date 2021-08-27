var urlAPI = "http://127.0.0.1:5000/";
var apiVer = "v1"

urlAPI = urlAPI+apiVer+'/';

export function getApiUrl() {
    return urlAPI
}