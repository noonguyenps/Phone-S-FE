
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
    getAllRatingByUser: async (params) =>{
        const res = await axiosClientWithToken.get(`/manager/rating/all/user`,{params});
        return res.data;
    },
    getAllRatingByProduct: async (params) =>{
        const res = await axiosClientWithToken.get(`/manager/rating/all/product`,{params});
        return res.data;
    },
    getAllRatingByProductClient: async (params) =>{
        const res = await axiosClient.get(`/rating/all/product`,{params});
        return res.data;
    },
    postComment: async (params) =>{
        const res = await axiosClientWithToken.post(`/user/rating/addComment/${params.id}`,params);
        return res.data;
    },
    uploadImgProductRating : async (params) =>{
        const res = await axiosClientWithToken.post(`/user/product/ratting/uploadImg`,params,{headers: {
            'Content-Type': 'multipart/form-data'
          }});
        return res.data;
    },
    addNewRating : async (id,params) =>{
        const res = await axiosClientWithToken.post(`/user/product/rating/${id}`,params);
        return res.data;
    },

}
export default apiShipping;