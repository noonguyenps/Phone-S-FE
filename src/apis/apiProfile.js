import {  axiosClientWithToken} from "./axiosClient";

const apiProfile = {

    ///authentication
    putChangeEmail: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changeEmail', params)
        return res.data;
    },
    putChangePassword: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changePassword', params)
        return res.data;
    },
    putUploadAvatar: async (params) => {
        const res = await axiosClientWithToken.post('/user/profile/uploadAvatar', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    putChangeInfo: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changeInfo', params)
        return res.data;
    },
    getUserbyID: async (params) => {
        const res = await axiosClientWithToken.get(`/user/${params}`)
        return res.data;
    },
    getUserProfile: async () => {
        const res = await axiosClientWithToken.get(`/user/profile`)
        return res.data;
    },
    putChangePhone: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changePhone', params)
        return res.data;
    },
    putChangePhonePassword: async (params) => {
        const res = await axiosClientWithToken.put('/user/profile/changePhonePassword', params)
        return res.data;
    },
    getAllUser: async (params) => {
        const res = await axiosClientWithToken.get(`admin/user/all?page=${params.page}&size=${params.size}`)
        return res.data;
    },
    getUserByIDWithAdmin: async (params) => {
        const res = await axiosClientWithToken.get(`admin/user/${params.id}`)
        return res.data;
    },
    checkPassword: async () =>{
        const res = await axiosClientWithToken.get(`user/phone/check`);
        return res.data;
    }

    

}
    
export default apiProfile;