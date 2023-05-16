 /* eslint-disable */
 import "./EditCoupon.scss"
 import { useEffect, useState } from "react";
 import { useParams, useNavigate } from "react-router-dom";
 import { Link } from "react-router-dom"
 import {
     Stack,
     Box,
     Button,
     Typography,
     Radio,
     RadioGroup,
     TextField
 } from "@mui/material"
 import { toast } from "react-hot-toast";
 import apiCoupon from "../../../../apis/apiCoupon";
import { toDate } from "date-fns/esm";
 
 function EditCoupon(props) {
     const [name, setName] = useState('')
     const [quantity, setQuantity] = useState(1)
     const [value,setValue] = useState(0)
     const [dateStart, setDateStart] = useState(new Date())
     const [dateExpired, setDateExpired] = useState(new Date())
     const listStatus = [{id:0,name:'Không công khai'},{id:1,name:'Công khai'}]
     const [status, setStatus] = useState(0);
     const idCoupon = useParams().id
     const navigate = useNavigate()
 
     const onChangeStatus = (e) => {
         setStatus(e.target.value)
     }
     const onChangeDateStart = (e) => {
         let start = new Date(e.target.value)
         setDateStart(start)
     };
 
     const onChangeDateExpired = (e) => {
         let expired = new Date(e.target.value)
         setDateExpired(expired)
     }
 
     useEffect(() => {
         const loadData = () => {
            apiCoupon.findCouponById({ id: idCoupon })
            .then((res)=>{
                console.log(res)
                setName(res.data.voucher.type)
                setQuantity(res.data.voucher.amount)
                setValue(res.data.voucher.value)
                setStatus(res.data.voucher.status?1:0)
                setDateStart(new Date(res.data.voucher.fromDate))
                setDateExpired(new Date(res.data.voucher.expiredDate))
            })
            .catch((err)=>{
                navigate("/admin/coupon")
                toast.error("Mã giảm giá này không tồn tại!")
            })
         }
         loadData()
     },[])
 
     const handleUpdate = () => {
         const params = {
            amount:Number(quantity),
            expiredDate:dateExpired,
            fromDate:dateStart,
            status:status==0?false:true,
            toDate:dateExpired,
            type:name,
            value:value
         }
         apiCoupon.updateCoupon(params,idCoupon)
             .then(res => {
                 toast.success("Cập nhật thành công")
             })
             .catch(error => {
                 toast.error("Cập nhật thất bại!")
             })
     };
 
     return (
         <Stack bgcolor="#fff" p={3}>
             <Box padding={2}>
                 <Stack direction="row">
                     <Typography>Chỉnh sửa mã giảm giá</Typography>
                 </Stack>
             </Box>
             <Box sx={{width:'700px'}} padding={2}>
                 <Stack direction='row' alignItems='center' justifyContent="space-between" spacing={2} padding={1}>
                     <Typography sx={{width:'30%'}}>Tên mã giảm giá</Typography>
                     <TextField sx={{width:'70%'}}
                     label='Tên mã giảm giá'
                     value={name}
                     onChange={(event)=>{setName(event.target.value)}}
                     ></TextField>
                 </Stack>
                 <Stack direction='row' alignItems='center' justifyContent="space-between" spacing={2} padding={1}>
                     <Typography sx={{width:'30%'}}>Số lượng</Typography>
                     <TextField sx={{width:'70%'}}
                     label='Số lượng mã giảm giá'
                     value={quantity}
                     type='number'
                     onChange={(event)=>{setQuantity(event.target.value>0?event.target.value:quantity)}}></TextField>
                 </Stack>
 
                 <Stack direction='row' alignItems='center' justifyContent="space-between" spacing={2} padding={1}>
                     <Typography sx={{width:'30%'}}>Giá trị</Typography>
                     <TextField sx={{width:'70%'}}
                     label='Giá trị mã giảm giá'
                     value={value}
                     type='number'
                     onChange={(event)=>{setValue(event.target.value>=0?event.target.value:value)}}></TextField>
                 </Stack>
 
                 <RadioGroup
                 aria-labelledby="demo-controlled-radio-buttons-group"
                 name="controlled-radio-buttons-group"
                 value={status}
                 onChange={onChangeStatus}
               >
                 <Stack direction='row' alignItems="center" justifyContent="center" spacing={2}>
                 {
                   listStatus?.map(item =>
                     <Stack key={item.id} direction="row" height="48px" >
                       <Radio name='shipping' value={item.id} id={item.id} sx={{ padding: 0, marginRight: "8px" }}/>
                       <Typography sx={{ margin: "auto 0" }} component='label' htmlFor={item.id}>{item.name}</Typography>
                     </Stack>)
                 }
                 </Stack>
               </RadioGroup>
 
                 <Stack direction='row' alignItems='center' justifyContent="space-between" spacing={2} padding={1}>
                     <Typography sx={{width:'30%'}}>Thời gian hiệu lực</Typography>
                     <Stack sx={{width:'70%'}} spacing={1}>
                         <Stack direction='row' alignItems='center' spacing={2}>
                         <Typography sx={{fontSize:'12px'}}>Ngày bắt đầu: </Typography>
                         <input type="datetime-local"
                                             value={dateStart.toISOString().substring(0, 16)}
                                             onChange={onChangeDateStart} style={{}} />
                         </Stack>
 
                         <Stack direction='row' alignItems='center' spacing={2}>
                         <Typography sx={{fontSize:'12px'}}>Ngày kết thúc: </Typography>
                         <input type="datetime-local"
                                             value={dateExpired.toISOString().substring(0, 16)}
                                             onChange={onChangeDateExpired} />
                         </Stack>
                     </Stack>
                 </Stack>
 
                 <Stack direction='row'>
                 <Button variant="contained" sx={{ height: "32px", width:'100%' }} onClick={handleUpdate}>Chỉnh sửa</Button>
                 </Stack>
             </Box>
         </Stack>
     )
 }
 
 export default EditCoupon