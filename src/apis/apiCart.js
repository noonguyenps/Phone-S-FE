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
    saveOrder: async (params) => {
        const res = await axiosClient.post('/myorders',params)
        return res.data;
    },
    changeTypeOrder: async (params, id) => {
        const res = await axiosClient.patch(`/myorders/${id}`,params)
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
    getOrdersByUser: async(params)=>{
        const res = await axiosClientWithToken.get(`/user/order`,params);
        return res.data;
    }
    
}
export default apiCart;