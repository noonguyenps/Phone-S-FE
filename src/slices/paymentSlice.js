import { createSlice } from "@reduxjs/toolkit";

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        coupon: null,
        address:null,
        ship:null,
    },
    reducers: {
        setCoupon: (state, action) => {
            state.coupon = action.payload
        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setShipType: (state,action) => {
            state.ship = action.payload
        },
        clearCoupon: (state) => {
            state.coupon = null
        },
        clearAddress: (state) => {
            state.address = null
        },
        clearShipType:(state) =>{
            state.ship = null
        },
        clearAll : (state) =>{
            state.address = null
            state.coupon = null
            state.ship = null
        }
    }
})

export const {
    setCoupon,
    setAddress,
    setShipType,
    clearCoupon,
    clearAddress,
    clearShipType,
    clearAll,
} = paymentSlice.actions


export default paymentSlice.reducer