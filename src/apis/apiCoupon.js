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
        const res = await axiosClientWithToken.get('/manager/voucher/all')
        return res.data;
    },

    postCoupon: async (params ) => {
        const res = await axiosClientWithToken.post('/manager/add/voucher/insert', params)
        return res.data;
    },

    deleteCouponById: async (params) => {
        const res = await axiosClientWithToken.delete(`/manager/voucher/${params.id}?message=${params.message}`)
        return res.data;
    },

    updateCoupon: async (params,id) => {
        const res = await axiosClientWithToken.put(`/manager/voucher/update/${id}`,params)
        return res.data;
    },

    findCouponById: async (params) => {
        const res = await axiosClient.get(`/voucher/${params.id}`)
        return res.data;
    },
    getCouponByUser: async (params)=>{
        const res = await axiosClientWithToken.get('/user/voucher/all',params)
        return res.data;
    },
    getAllCouponsPublic: async () => {
        const res = await axiosClient.get('/voucher/all')
        return res.data;
    },
    getCoupon: async (id) => {
        const res = await axiosClientWithToken.post(`/user/get/voucher/${id}`)
        return res.data;
    },
     
}
export default apiCoupon;