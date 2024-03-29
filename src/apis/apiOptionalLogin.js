import axios from 'axios';
import queryString from 'query-string';
const baseURL = 'https://phone-s.herokuapp.com/oauth2/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiOptionalLogin = {

    getProfile: async () => {
        const res = await axiosClient.get('/authorization/google')
        return res.data;
    },


}
export default apiOptionalLogin;