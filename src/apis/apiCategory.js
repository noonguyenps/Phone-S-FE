import { axiosClient, axiosClientWithToken } from "./axiosClient";

const apiCategory = {
    showAllCategory: async (params) => {
        const res = await axiosClientWithToken.get('/admin/category/all', params)
        return res.data;
    },
    deleteCategory: async (params) => {
        const res = await axiosClientWithToken.delete(`/admin/category/${params.id}`)
        return res.data;
    },
    findCategoryById: async (params) => {
        const res = await axiosClient.get(`/category/${params.id}`)
        return res.data;
    },
    insertCategoryChild: async (params) => {
        const res = await axiosClientWithToken.post(`/admin/category/insert?parentId=${params.parentId}`,params)
        return res.data;
    },
    insertCategoryRoot: async (params) => {
        const res = await axiosClientWithToken.post(`/admin/category/insert`,params)
        return res.data;
    },
    updateCategory: async (params) => {
        const res = await axiosClientWithToken.put(`/admin/category/update/${params.id}?parentId=${params.parentId}`,params);
        return res.data;
    }
}
export default apiCategory;