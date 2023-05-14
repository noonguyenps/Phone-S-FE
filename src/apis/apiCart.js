import axios from 'axios';
import queryString from 'query-string';
import { axiosClientWithToken } from "./axiosClient";
const baseURL='https://phone-s.herokuapp.com/api/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

export const axiosClientWithPayment = axios.create({
    baseURL: 'https://mypayment-momo.herokuapp.com/api',
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiCart = {
    getOrders: async (params) => {
        const res = await axiosClientWithToken.get('/admin/order', {params});
        return res.data;
    },
    getOrdersByStatus: async (params) => {
        const res = await axiosClientWithToken.get('/admin/order/status', {params});
        return res.data;
    },
    deleteOrder: async (id) =>{
        const res = await axiosClientWithToken.delete(`/user/order/delete/${id}`);
        return res.data;
    },
    changeTypeOrder: async (id, status) => {
        const res = await axiosClientWithToken.put(`/admin/order/change/${id}?status=${status}`)
        return res.data;
    },
    makePaymentMomo: async (params) => {
        const res = await axiosClientWithPayment.post('/create-payment',params)
        return res.data;
    },
    addProductToCart: async (params) =>{
        const res = await axiosClientWithToken.post('/user/cart/insert',params);
        return res.data;
    },
    getUserCart: async ()=>{
        const res = await axiosClientWithToken.get('/user/cart');
        return res.data;
    },
    deleteAll:async () =>{
        const res = await axiosClientWithToken.delete('/user/cart/delete/all');
        return res.data;
    },
    setAllStatus : async (status) =>{
        const res = await axiosClientWithToken.put(`/user/cart/choose/all?status=${status}`);
        return res.data;
    },
    deleteCartById : async (id) =>{
        const res = await axiosClientWithToken.delete(`/user/cart/delete/${id}`);
        return res.data;
    },
    updateCart : async(params) =>{
        const res = await axiosClientWithToken.put(`/user/cart/update/${params.id}`,params);
        return res.data;
    },
    getOrderByID: async(id) =>{
        const res = await axiosClientWithToken.get(`/admin/order/${id}`);
        return res.data;
    },
    getUserOrderByID: async(id) =>{
        const res = await axiosClientWithToken.get(`/user/order/${id}`);
        return res.data;
    },
    getOrdersByUser: async(params)=>{
        const res = await axiosClientWithToken.get(`/user/order`,{params});
        return res.data;
    },
    getOrdersByUserAndStatus: async(params)=>{
        const res = await axiosClientWithToken.get(`/user/order/status`,{params});
        return res.data;
    },
    insertOrder: async(params)=>{
        const res = await axiosClientWithToken.post(`/user/order/insert`,params);
        return res.data;
    },
    getPaymentStatus: async(id)=>{
        const res = await axiosClientWithToken.get(`/user/order/pay/status/${id}`);
        return res.data;
    },
    createShipping: async(params)=>{
        const res = await axiosClientWithToken.post(`admin/shipping/create`,params);
        return res.data;
    }
    
}
export default apiCart;