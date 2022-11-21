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
const apiAttribute = {
    getAllAttribute: async () =>{
        const res = await axiosClient.get('attribute/all');
        return res.data;
    },
    getAllAttributeOptions: async () =>{
        const res = await axiosClient.get('attribute/option/all')
        return res.data;
    },
    addAttribute : async (params) =>{
        const res = await axiosClientWithToken.post('admin/attribute/insert',params);
        return res.data;
    },
    getAttributeById: async (id) =>{
        const res = await axiosClient.get(`/attribute/${id}`);
        return res.data;
    },
    getProductsById: async (id) => {
        const res = await axiosClient.get('/products', { params: { id } })
        return res.data;
    },
    getProductsBySlug: async (slug) => {
        const res = await axiosClient.get('/products', { params: { slug } })
        return res.data;
    },
    getProducts: async (params) => {
        const res = await axiosClient.get('/products', { params })
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
}
export default apiAttribute;