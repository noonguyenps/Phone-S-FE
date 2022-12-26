import { axiosClientWithToken } from "./axiosClient";

const apiBrand = {
    getAllBrand : async (params) =>{
        const res = await axiosClientWithToken.get(`/admin/brand/all?page=${params.page}&size=${params.size}`,params) 
        return res.data;
    },
    getListBrand : async () =>{
        const res = await axiosClientWithToken.get(`/admin/brand/all`) 
        return res.data;
    },
    getBrandByID : async (params) =>{
        const res = await axiosClientWithToken.get(`/admin/brand/${params.id}`)
        return res.data;
    },
    deleteBrandById : async (params) =>{
        const res = await axiosClientWithToken.delete(`/admin/brand/delete/${params.id}`)
        return res.data;
    },
    insertBrand : async (params) =>{
        const res = await axiosClientWithToken.post('/admin/brand/insert', params) 
        return res.data;
    },
    updateBrand : async (params,id) =>{
        const res = await axiosClientWithToken.put(`/admin/brand/update/${id}`, params)
        return res.data;
    },
    uploadLogo : async (params) => {
        const res = await axiosClientWithToken.post('admin/brand/uploadLogo', params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    },
    uploadLogoByID: async (params) => {
        const res = await axiosClientWithToken.post(`/admin/brand/uploadLogo/${params.id}`, params,{headers: {
            'Content-Type': 'multipart/form-data'
          }})
        return res.data;
    }
}
export default apiBrand; 