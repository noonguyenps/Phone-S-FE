
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

const apiShipping = {

    getAllShippingByUser: async (params) =>{
        const res = await axiosClientWithToken.get(`/shipper/shipping/list?page=${params.page}&size=${params.size}`);
        return res.data;
    },
    getShippingById: async (id)=>{
        const res = await axiosClientWithToken.get(`/shipper/shipping/${id}`);
        return res.data;
    },
    getAllShipping: async (params) =>{
        const res = await axiosClientWithToken.get(`/manager/shipper/all`,);
        return res.data;
    },
    updateShipping: async (id,img1,img2,img3) =>{
        const res = await axiosClientWithToken.put(`/shipper/update/${id}?img1=${img1}&img2=${img2}&img3=${img3}`);
        return res.data;
    },
    uploadImg : async (id,params) =>{
        const res = await axiosClientWithToken.post(`/shipper/uploadImg/${id}`,params,{headers: {
            'Content-Type': 'multipart/form-data'
          }});
        return res.data;
    },

}
export default apiShipping;