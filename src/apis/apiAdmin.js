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
    }
}
    
export default apiAdmin;