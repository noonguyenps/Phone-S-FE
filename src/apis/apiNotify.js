import axios from 'axios';
import queryString from 'query-string';
import { axiosClientWithToken } from "./axiosClient";
const baseURL = 'https://phone-s.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
export const axiosProducts = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
const apiNotify = {

    postNotify: async (params) => {
        const res = await axiosClient.post("/notifications",params)
        return res.data
    },
    getNotification: async (params) => {
        const res = await axiosClientWithToken.get('/user/notification', {params})
        return res.data
    },
    updateNotification: async (params) => {
        const res = await axiosClientWithToken.put(`/user/notification?id=${params.id}`)
        return res.success
    },
    deleteNotification: async (params) => {
        const res = await axiosClientWithToken.delete(`/user/notification?id=${params.id}`)
        return res.success
    },
}
export default apiNotify;
