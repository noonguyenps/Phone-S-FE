import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
export const compareProduct = createSlice({
    name: "compare",
    initialState: {
        items: []
    },
    reducers: {
        addCompare:(state,action)=>{
            let newItem = action.payload
            if(state.items.length==0)
            {
                toast.success("Đã thêm vào so sánh")
                let items = [...state.items]
                items.unshift(newItem)
                state.items = [...items]
            }
            else if(state.items.length==1)
            {
                if(!findIndexItem(state.items,newItem)){
                    toast.error("Sản phẩm đã được so sánh")
                }else if(rootEcept(state.items,newItem)){
                    toast.error("Hai sản phẩm khác loại với nhau")
                }
                else{
                    toast.success("Đã thêm vào so sánh")
                    let items = [...state.items]
                    items.unshift(newItem)
                    state.items = [...items]
                }
            }
            else{
                toast.error('Đã đủ 2 sản phẩm để so sánh')
            }
        },
        removeCompare:(state,action)=>{
            const itemUpdate = action.payload
            state.items = delItems(state.items,itemUpdate)
        },
    }
})

const findIndexItem = (arr,item)=>arr.findIndex(e=>(e.id===item.id))
const rootEcept = (arr,item)=>arr.findIndex(e=>(e.root===item.root)) 
const delItems = (arr,item)=>arr.filter(e=>e.id!==item.id)
export const {
    removeCompare,
    addCompare,
}=compareProduct.actions

export default compareProduct.reducer