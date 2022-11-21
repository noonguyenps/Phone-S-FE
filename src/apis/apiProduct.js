
//import { axiosClient, axiosInstance } from "./axiosClient";
import axios from 'axios';
import { axiosClientWithToken } from "./axiosClient";
import queryString from 'query-string';
const baseURL = 'https://phone-s.herokuapp.com/api/'
export const axiosClient = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params)
});

const apiProduct = {

    getProductsById: async (id) => {
        const res = await axiosClient.get(`/product/${id} `)
        return res.data;
    },
    getProductsBySlug: async (slug) => {
        const res = await axiosClient.get('/products', { params: { slug } })
        return res.data;
    },
    getProducts: async (params) => {
        const res = await axiosClient.get('/product/all', { params })
        return res.data;
    },
    getCategoryFilterById: async (params) => {
        const res = await axiosClient.get('/categories', { params })
        return res.data;
    },

    getProductsBySearch: async (params) => {
        const res = await axiosClient.get('/products' + params)
        return res.data
    },
    uploadListImageProduct : async (params) => {
        const res = await axiosClientWithToken.post('admin/product/upload', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    uploadImgProduct : async (params) => {
        const res = await axiosClientWithToken.post('admin/product/uploadImg', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    addNewProduct : async (params) =>{
        const res = await axiosClientWithToken.post('admin/product/insert/v1', params)
        return res.data;
    },
    getCountProducts : async () =>{
        const res = await axiosClient.get('product/count')
        return res.data;
    },
    deleteProductById : async (id) =>{
        const res = await axiosClientWithToken.delete(`admin/product/delete/${id}`);
        return res.data;
    },
    getCategoryFilterById: async (id) => {
        const res = await axiosClient.get(`/category/${id}`)
        return res.data;
    },

    getProductsBySearch: async (params) => {
        const res = await axiosClient.get('/products' + params)
        return res.data
    },
    getProductByCategory: async (params) => {
        const res = await axiosClient.get('/product/byCategory', {params})
        return res.data
    },
    getCategoryChild: async (params) => {
        const res = await axiosClient.get('/category/child', {params})
        return res.data
    }

}
export default apiProduct;