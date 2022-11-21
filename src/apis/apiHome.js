import axios from 'axios';
import queryString from 'query-string';
const baseURL='https://phone-s.herokuapp.com/api/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
const apiHome = {

    getSlideKhuyenMai: async (params) => {
        const res = await axiosClient.get('home/event', {params})
        return res.data;
    },

    getSlideThuongHieu: async (params) => {
        const res = await axiosClient.get('/sliderthuonghieu', {params})
        return res.data;
    },

    getQuickLink: async (params) => {
        const res = await axiosClient.get('/quicklink', {params})
        return res.data;
    },

    getCategorySpecify: async (params) => {
        const res = await axiosClient.get('/categoryspecify', {params})
        return res.data;
    },

    getSuggestions: async (params) => {
        const res = await axiosClient.get('/suggestions', {params})
        return res.data;
    },
    getProducts: async (params) => {
        const res = await axiosClient.get('/product/all', {params})
        return res.data;
    }, 
    getCategories: async (params) => {
        const res = await axiosClient.get('/category/root', {params})
        return res.data;
    }, 
}
export default apiHome;