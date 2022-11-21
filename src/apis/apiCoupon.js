import axios from 'axios';
import queryString from 'query-string';
import { axiosClientWithToken } from './axiosClient';
const baseURL='https://phone-s.herokuapp.com/api'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});


const apiCoupon = {
    getCoupons: async () => {
        const res = await axiosClientWithToken.get('/admin/voucher/all')
        return res.data;
    },

    postCoupon: async (params ) => {
        const res = await axiosClientWithToken.post('/admin/add/voucher/insert', params)
        return res.data;
    },

    deleteCouponById: async (params) => {
        const res = await axiosClient.delete(`/coupons/${params.id}`)
        return res.data;
    },

    updateCoupon: async (params,id) => {
        const res = await axiosClient.patch(`/coupons/${id}`,params)
        return res.data;
    },

    findCouponById: async (params) => {
        const res = await axiosClient.get(`/coupons`,{params})
        return res.data;
    },
     
}
export default apiCoupon;