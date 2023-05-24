import {axiosClientWithToken} from "./axiosClient";

const apiAdmin = {
    getAllUser: async (params) => {
        const res = await axiosClientWithToken.get('admin/user/all', params)
        return res.data;
    },
    getUserByIDWithAdmin: async (params) => {
        const res = await axiosClientWithToken.get(`admin/user/${params.id}`)
        return res.data;
    },
    getStatistic: async() =>{
        const res = await axiosClientWithToken.get(`admin/statistic`)
        return res.data;
    },
    getUserAddressByID: async (id) => {
        const res = await axiosClientWithToken.get(`admin/user/address/${id}`)
        return res.data;
    },
    getUserOrdersByID: async (id) => {
        const res = await axiosClientWithToken.get(`admin/user/order/${id}`)
        return res.data;
    },
}
    
export default apiAdmin;