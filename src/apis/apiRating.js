
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

const apiRating = {

    getAllRating: async (params) =>{
        const res = await axiosClientWithToken.get(`/admin/rating/all`,{params});
        return res.data;
    },
    getAllRatingByStar: async (params) =>{
        const res = await axiosClientWithToken.get(`/admin/rating/all/star`,{params});
        return res.data;
    },
    getAllRatingByUser: async (params) =>{
        const res = await axiosClientWithToken.get(`/admin/rating/all/user`,{params});
        return res.data;
    },
    getAllRatingByProduct: async (params) =>{
        const res = await axiosClientWithToken.get(`/admin/rating/all/product`,{params});
        return res.data;
    },
    getAllRatingByProductClient: async (params) =>{
        const res = await axiosClient.get(`/rating/all/product`,{params});
        return res.data;
    },
    postComment: async (params) =>{
        const res = await axiosClientWithToken.post(`/user/rating/addComment/${params.id}`,params);
        return res.data;
    }

}
export default apiRating;