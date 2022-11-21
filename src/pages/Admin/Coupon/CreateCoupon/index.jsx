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
    Select
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
    const [publicCoupon, setPublicCoupon] = useState(true)
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState(0)
    const [category, setCategory] = useState(0)
    const [nameCoupon, setNameCoupon] = useState({ error: false, value: "" })
    const [codeCoupon, setCodeCoupon] = useState({ error: false, value: "" })
    const [product, setProduct] = useState("0")
    const [typeCoupon, setTypeCoupon] = useState("0")
    const [typeCouponValue, setTypeCouponValue] = useState({ error: false, value: "" })
    const [valueMin, setValueMin] = useState({ error: false, value: "" })
    const [quantityCoupon, setQuantityCoupon] = useState({ error: false, value: "" })
    const [couponPerCustomer, setCouponPerCustomer] = useState({ error: false, value: "" })
    const [valueMinSelected, setValueMinSelected] = useState("0")
    const [limitUseCoupon, setLimitUseCoupon] = useState("0")
    const [dateStart, setDateStart] = useState(new Date())
    const [dateExpired, setDateExpired] = useState(new Date())
    const [edit, setEdit] = useState(props.edit)

    const idCoupon = useParams().id
    const navigate = useNavigate()

    const onChangeNameCoupon = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setNameCoupon({ error, value: e.target.value })
    }
    const onChangeCodeCoupon = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setCodeCoupon({ error, value: e.target.value })
    }
    const onChangeTypeCouponValue = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setTypeCouponValue({ error, value: e.target.value })
    }
    const onChangeValueMin = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setValueMin({ error, value: e.target.value })
    }
    const onChangeQuantityCoupon = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setQuantityCoupon({ error, value: e.target.value })
    }
    const onChangeCouponPerCustomer = (e) => {
        let error = false
        if (e.target.value === "")
            error = true
        setCouponPerCustomer({ error, value: e.target.value })
    }

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    const onChangeCategory = (e) => {
        setCategory(e.target.value)
    }
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const onChangeDateStart = (e) => {
        // setDateStart();
        let start = new Date(e.target.value)
        setDateStart(start)
        // console.log(e.target.value)
    };

    const onChangeDateExpired = (e) => {
        let expired = new Date(e.target.value)
        setDateExpired(expired)
    }

    const handleCreate = () => {
        const params = {
            "type": nameCoupon.value,
            "status": publicCoupon,
            "value": String(typeCouponValue.value),
            "amount": Number(quantityCoupon.value),
            "createAt": dateStart.getTime(),
            "fromDate": dateStart.getTime(),
            "expiredDate": dateExpired.getTime(),
            "toDate": dateExpired.getTime()
        }
        apiCoupon.postCoupon(params)
            .then(res => {
                toast.success("Đã thêm thành công")
            })
            .catch(error => {
                toast.error("Thêm không thành công")
            })
    };

    useEffect(() => {
        const loadData = () => {
            if (edit === true) {
                apiCoupon.findCouponById({ id: idCoupon })
                    .then(res => {
                        const coupon = res[0]
                        console.log(res)
                        if (coupon) {
                            setNameCoupon({error:false, value:coupon.name})
                            setCodeCoupon({error:false, value:coupon.slug})
                            setPublicCoupon(coupon.public)
                            // setTypeCoupon({value:coupon.unit})
                            if (coupon.unit === '%')
                            setTypeCoupon('1')
                            setTypeCouponValue({error:false, value:coupon.value})
                            setQuantityCoupon({error:false, value:coupon.quantity})
                            // setValueMinSelected({value:coupon.})
                            setValueMin({value:coupon.limit})
                            if(coupon.limit>0)
                            setValueMinSelected('1')
                            setDateStart(new Date(coupon.start))
                            setDateExpired(new Date(coupon.expired))
                        }
                        else {
                            navigate("/admin/coupon")
                            toast.error("Sản phẩm này không tồn tại!")
                        }
                    }
                    )
            }
        }
        loadData()
    }, [edit])

    const handleUpdate = () => {
        const params = {
            "name": nameCoupon.value,
            "slug": codeCoupon.value,
            "public": publicCoupon,
            "product": [],
            "unit": typeCoupon === "0" ? 'đ' : "%",
            "value": Number(typeCouponValue.value),
            "limit": valueMinSelected.value === "0" ? 0 : Number(valueMin.value),
            "quantity": Number(quantityCoupon.value),
            "used": 0,
            "start": dateStart.getTime(),
            "expired": dateExpired.getTime(),
            "img": "https://salt.tikicdn.com/cache/128x128/ts/upload/92/ad/57/0d9a096885400b7b4752b67afdc72898.png"
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
        <Box>
            <Box px={3} py={2}>
                <Stack direction="row"><DiscountIcon /> Tạo mã giảm giá mới</Stack>
            </Box>
            <Stack direction="row" spacing={2.5} mx={3} mt={2} mb={11.5} justifyContent="space-between">
                <Stack sx={{ flex: 1 }}>
                    <Box className="createCoupon__form">
                        <Box className="createCoupon__title">THÔNG TIN</Box>
                        <Stack p={1.5} spacing={4}>
                            <Stack direction="row" alignItems={"flex-start"} sx={{ width: "100%" }}>
                                <LabelCustom>Tên mã giảm giá <InfoOutlinedIcon /></LabelCustom>
                                <Stack sx={{ flex: 1 }}>
                                    <InputCustom placeholder="Tên mã giảm giá" value={nameCoupon.value} onChange={onChangeNameCoupon} className={`${nameCoupon.error && "errorInput"}`} />
                                    {nameCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui lòng nhập thông tin này</Typography>}
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems={"flex-start"} sx={{ width: "100%" }}>
                                <LabelCustom>Mã giảm giá <InfoOutlinedIcon /></LabelCustom>
                                <Stack sx={{ flex: 1 }}>
                                    <Stack direction={"row"} alignItems="center" justifyContent="space-between">
                                        <Typography sx={{ fontSize: "12px", fontWeight: 300 }}>Chỉ bao gồm từ 5 - 10 ký tự thường và chữ số.</Typography>
                                        <LabelCustom sx={{ fontWeight: 300, width: "fit-content" }}>Mã giảm giá <InfoOutlinedIcon /></LabelCustom>
                                    </Stack>
                                    <InputCustom placeholder="Nhập mã giảm giá" value={codeCoupon.value} onChange={onChangeCodeCoupon} className={`${codeCoupon.error && "errorInput"}`} />
                                    {codeCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui lòng nhập thông tin này</Typography>}
                                </Stack>
                            </Stack>
                            <Stack direction="row" alignItems={"flex-start"}>
                                <LabelCustom>Mã giảm giá <InfoOutlinedIcon /></LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <div onClick={() => { setPublicCoupon(!publicCoupon) }} className={`createCoupon__switch ${publicCoupon ? "active" : ""}`}>
                                        <div className="createCoupon__switch__handle"></div>
                                        <span className="createCoupon__switch__text">{publicCoupon ? "Công khai" : "Ẩn"}</span>
                                    </div>
                                    {
                                        publicCoupon ? <Typography sx={{ fontSize: "14px", color: "#ff0000" }}>Lưu ý: Mã giảm giá được công khai trong trang chi tiết sản phẩm, cho tất cả các khách hàng!</Typography> : ""
                                    }
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box className="createCoupon__form" mt={3}>
                        <Box className="createCoupon__title">ĐIỀU KIỆN</Box>
                        <Stack p={1.5} spacing={4}>
                            <Stack className="createCoupon__form__item" direction="row">
                                <LabelCustom>Loại giảm giá</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <RadioGroupCustom
                                        defaultValue={0}
                                        value={typeCoupon}
                                        onChange={(e) => setTypeCoupon(e.target.value)}
                                        name="coupon"
                                    >
                                        <FormControlLabelCustom value={0} control={<RadioCustom />}
                                            label={<>Theo số tiền<InfoOutlinedIcon sx={{ fontSize: "16px", verticalAlign: "text-top", marginLeft: "4px" }} /> </>}
                                        />
                                        <FormControlLabelCustom value={1} control={<RadioCustom />}
                                            label={<>Theo phần trăm<InfoOutlinedIcon sx={{ fontSize: "16px", verticalAlign: "text-top", marginLeft: "4px" }} /> </>}
                                        />
                                    </RadioGroupCustom>
                                    <Box mt={1.5} sx={{ width: "100%" }}>
                                        <InputCustom placeholder="Nhập" value={typeCouponValue.value} onChange={onChangeTypeCouponValue} className={`${typeCouponValue.error && "errorInput"}`} />
                                        {codeCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui lòng nhập thông tin này</Typography>}
                                    </Box>
                                </Box>
                            </Stack>

                            <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>Giá trị đơn hàng tối thiểu</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <RadioGroupCustom
                                        value={valueMinSelected}
                                        defaultValue={0}
                                        name="valueMin"
                                        onChange={(e) => setValueMinSelected(e.target.value)}
                                    >
                                        <FormControlLabelCustom value={0} control={<RadioCustom />}
                                            label="Không ràng buộc" />
                                        <FormControlLabelCustom value={1} control={<RadioCustom />}
                                            label="Giá trị đơn hàng tối thiểu" />
                                    </RadioGroupCustom>
                                    {
                                        valueMinSelected === "1" &&
                                        <Box mt={1.5} sx={{ width: "100%" }}>
                                            <InputCustom placeholder="Nhập số tiền" value={valueMin.value} onChange={onChangeValueMin} className={`${valueMin.error && "errorInput"}`} />
                                            {valueMin.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui lòng nhập thông tin này</Typography>}
                                        </Box>
                                    }
                                </Box>
                            </Stack>

                            <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>Số lượng mã giảm giá</LabelCustom>
                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ width: "100%" }}>
                                        <InputCustom placeholder="Số lượng mã giảm giá" value={quantityCoupon.value} onChange={onChangeQuantityCoupon} className={`${quantityCoupon.error && "errorInput"}`} />
                                        {quantityCoupon.error && <Typography sx={{ fontSize: "14px", color: "#ff4d4f" }}>Vui lòng nhập thông tin này</Typography>}
                                    </Box>
                                </Box>
                            </Stack>

                            <Stack direction="row" className="createCoupon__form__item">
                                <LabelCustom>Thời gian hiệu lực</LabelCustom>
                                <Stack sx={{ flex: 1 }} spacing={2} >
                                    <Stack direction="row" sx={{ flex: 1 }}>
                                        <label style={{ width: "90px" }} for="birthdaytime">Ngày bắt đầu:</label>
                                        <input type="datetime-local" id="birthdaytime" name="birthdaytime"
                                            value={dateStart.toISOString().substring(0, 16)}
                                            onChange={onChangeDateStart} style={{}} />
                                    </Stack>
                                    <Stack direction="row" sx={{ flex: 1 }}>
                                        <label style={{ width: "90px" }} for="birthdaytime">Ngày kết thúc:</label>
                                        <input type="datetime-local" id="birthdaytime" name="birthdaytime"
                                            value={dateExpired.toISOString().substring(0, 16)}
                                            onChange={onChangeDateExpired} />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>

            <Stack direction="row" className="createCoupon__footer">
                <Link to="/admin/coupon">
                    <Button variant="text" sx={{ border: "1px solid #bfbfbf", color: "#333", height: "32px" }}>Quay lại</Button>
                </Link>
                <Button variant="contained" sx={{ height: "32px" }} onClick={edit ? handleUpdate : handleCreate}>{edit ? "Cập nhật":"Thêm"}</Button>
            </Stack>
        </Box>
    )
}

const LabelCustom = styled(Typography)(() => ({
    fontSize: "14px",
    color: "#108EE9",
    width: "198px",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "& .MuiSvgIcon-root": {
        fontSize: "14px"
    }
}))

const RadioGroupCustom = styled(RadioGroup)(() => ({
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    "&>*": {
        flex: 1
    }
}))

const RadioCustom = styled(Radio)(() => ({
    "padding": "0",
    "& .MuiSvgIcon-root": {
        fontSize: "18px"
    }
}))

const FormControlLabelCustom = styled(FormControlLabel)(() => ({
    margin: 0,
    "& .MuiTypography-root": {
        fontSize: "14px",
        marginLeft: "4px"
    },
}))

const InputCustom = styled(InputBase)(({ theme }) => ({
    flex: 1,
    width: "100%",
    '&.errorInput .MuiInputBase-input:focus ': {
        borderColor: '#ff0000',
        boxShadow: '0 0 0 0.2rem rgba(255,0,0,.25)',
    }
    ,
    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 2,
        position: 'relative',
        border: '1px solid #bfbfbf',
        fontSize: 14,
        height: '32px',
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: '4px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': {
            borderRadius: 2,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));


const listCategory = ["Tất cả", "Quần áo", "Giày dép", "Thiết bị điện tử", "Đồ gia dụng"]
const listStatus = ["Tất cả", "Bật", "Tắt", "Ẩn"]
export default CreateCoupon