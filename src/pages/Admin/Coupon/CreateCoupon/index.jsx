 /* eslint-disable */
import "./CreateCoupon.scss"
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import {
    Stack,
    Box,
    Button,
    Typography,
    MenuItem,
    InputBase,
    Radio,
    RadioGroup,
    FormControlLabel,
    Modal,
    Select,
    TextField
} from "@mui/material"
import DiscountIcon from '@mui/icons-material/Discount';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import apiCoupon from "../../../../apis/apiCoupon";

const style = {
    position: 'absolute',
    left: '50%',
    top: "50%",
    transform: 'translate(-50%,-50%)',
    width: "calc(100% - 64px)",
    maxHeight: "calc(100% - 32px)",
    bgcolor: 'background.paper',
    border: '1px solid #bfbfbf',
    outline: "none",
    borderRadius: "2px",
    boxShadow: 24,
    overflowY: "auto",
    "& p": {
        fontSize: "14px"
    }
};
function CreateCoupon(props) {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [value,setValue] = useState(0)
    const [dateStart, setDateStart] = useState(new Date())
    const [dateExpired, setDateExpired] = useState(new Date())
    const listStatus = [{id:0,name:'Không công khai'},{id:1,name:'Công khai'}]
    const [status, setStatus] = useState(0);
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

    const handleCreate = () => {
        const params = {
            "type": name,
            "status": status==0?false:true,
            "value": Number(value),
            "amount": Number(quantity),
            "createAt": dateStart.getTime(),
            "fromDate": dateStart.getTime(),
            "expiredDate": dateExpired.getTime(),
            "toDate": dateExpired.getTime()
        }
        apiCoupon.postCoupon(params)
            .then(res => {
                toast.success("Đã thêm thành công")
                setName('')
                setValue(0)
                setQuantity(1)
            })
            .catch(error => {
                toast.error("Thêm không thành công")
            })
    };

    // useEffect(() => {
    //     const loadData = () => {
    //         if (edit === true) {
    //             apiCoupon.findCouponById({ id: idCoupon })
    //                 .then(res => {
    //                     const coupon = res[0]
    //                     console.log(res)
    //                     if (coupon) {
    //                         setNameCoupon({error:false, value:coupon.name})
    //                         setCodeCoupon({error:false, value:coupon.slug})
    //                         setPublicCoupon(coupon.public)
    //                         // setTypeCoupon({value:coupon.unit})
    //                         if (coupon.unit === '%')
    //                         setTypeCoupon('1')
    //                         setTypeCouponValue({error:false, value:coupon.value})
    //                         setQuantityCoupon({error:false, value:coupon.quantity})
    //                         // setValueMinSelected({value:coupon.})
    //                         setValueMin({value:coupon.limit})
    //                         if(coupon.limit>0)
    //                         setValueMinSelected('1')
    //                         setDateStart(new Date(coupon.start))
    //                         setDateExpired(new Date(coupon.expired))
    //                     }
    //                     else {
    //                         navigate("/admin/coupon")
    //                         toast.error("Sản phẩm này không tồn tại!")
    //                     }
    //                 }
    //                 )
    //         }
    //     }
    //     loadData()
    // }, [edit])

    // const handleUpdate = () => {
    //     const params = {
    //         "name": nameCoupon.value,
    //         "slug": codeCoupon.value,
    //         "public": status==0?false:true,
    //         "product": [],
    //         "unit": typeCoupon === "0" ? 'đ' : "%",
    //         "value": Number(typeCouponValue.value),
    //         "limit": valueMinSelected.value === "0" ? 0 : Number(valueMin.value),
    //         "quantity": Number(quantityCoupon.value),
    //         "used": 0,
    //         "start": dateStart.getTime(),
    //         "expired": dateExpired.getTime(),
    //         "img": "https://salt.tikicdn.com/cache/128x128/ts/upload/92/ad/57/0d9a096885400b7b4752b67afdc72898.png"
    //     }
    //     apiCoupon.updateCoupon(params,idCoupon)
    //         .then(res => {
    //             toast.success("Cập nhật thành công")
    //         })
    //         .catch(error => {
    //             toast.error("Cập nhật thất bại!")
    //         })
    // };

    return (
        <Stack bgcolor="#fff" p={3}>
            <Box padding={2}>
                <Stack direction="row">
                    <Typography>Tạo mã giảm giá mới</Typography>
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
                <Button variant="contained" sx={{ height: "32px", width:'100%' }} onClick={handleCreate}>Thêm</Button>
                </Stack>
            </Box>
        </Stack>
    )
}

export default CreateCoupon