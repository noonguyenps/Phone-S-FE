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
    getAllRoles: async (id) => {
        const res = await axiosClientWithToken.get(`admin/role/all`)
        return res.data;
    },
    putRole: async (params) => {
        const res = await axiosClientWithToken.put(`admin/user/edit/role/${params.id}?roleId=${params.roleId}`)
        return res.data;
    }
}
    
export default apiAdmin;