import axios from 'axios';
import queryString from 'query-string';
import {axiosClientWithToken} from "./axiosClient";
const baseURL='https://phone-s.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});
const apiAccount = {

    checkWishItem: async (params) => {
        const res = await axiosClientWithToken.get(`/user/wishlist/check?productId=${params.productId}`)
        return res.data
    },

    getWishListByUser: async () => {
        const res = await axiosClientWithToken.get(`/user/wishlist`)
        return res.data;
    },

    postWishItem: async (params) => {
        const res = await axiosClientWithToken.post(`/user/wishlist/add?productId=${params.productId}`)
        return res.data
    },

    deleteWishItem: async (params) => {
        const res = await axiosClientWithToken.delete(`/user/wishlist/remove?productId=${params.productId}`)
        return res.data
    }
}
export default apiAccount;