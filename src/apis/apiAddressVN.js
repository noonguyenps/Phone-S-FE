import {useEffect} from "react";
const apiAddressVN = {
    getAllProvince : async ()=>{
        const res = await fetch("https://provinces.open-api.vn/api/p/").
        then((response) => response.json()).
        then((data) => {
            return data})
        .catch ((error) => console.error(error));
        return res;
    },
    getDistrictInProvinceById: async (params)=>{
        const res = await fetch(`https://provinces.open-api.vn/api/p/${params.id}/?depth=2`).
        then((response) => response.json()).
        then((data) => {
            return data})
        .catch ((error) => console.error(error));
        return res.districts;
    },
    getCommuneInDistrictById: async (params) => {
        const res = await fetch(`https://provinces.open-api.vn/api/d/${params.id}/?depth=2`).
        then((response) => response.json()).
        then((data) => {
            return data})
        .catch ((error) => console.error(error));
        return res.wards;
    },
    getProvince: async (params)=>{
        const res = await fetch(`https://provinces.open-api.vn/api/p/${params.id}`).
        then((response) => response.json()).
        then((data) => {
            return data})
        .catch ((error) => console.error(error));
        return res.name;
    },
    getDistrict: async (params)=>{
        const res = await fetch(`https://provinces.open-api.vn/api/d/${params.id}`).
        then((response) => response.json()).
        then((data) => {
            return data})
        .catch ((error) => console.error(error));
        return res.name;
    },
    getCommune: async (params)=>{
        const res = await fetch(`https://provinces.open-api.vn/api/w/${params.id}`).
        then((response) => response.json()).
        then((data) => {
            return data})
        .catch ((error) => console.error(error));
        return res.name;
    }
}
export default apiAddressVN;