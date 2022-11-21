
import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiAddress = {

    getUserAddress: async (params) => {
        const res = await axiosClientWithToken.get('user/address')
        return res.data;
    },
    deleteAddressById: async (params) => {
        const res = await axiosClientWithToken.delete(`user/address/delete/${params.id}`)
        return res.data;
    },
    saveAddress: async (params) => {
        const res = await axiosClientWithToken.post('user/address/insert', params)
        return res.data;
    },

    updateUserAddressById: async (params, id) => {
        const res = await axiosClientWithToken.put(`user/address/update/${id}`, params)
        return res.data;
    },
    getAddressById: async (params) => {
        const res = await axiosClientWithToken.get('user/address', { params })
        return res.data;
    }

}
export default apiAddress;