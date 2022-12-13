import { useCallback, useEffect, useState } from 'react'
import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DiscountIcon from '@mui/icons-material/Discount';
import { numWithCommas } from '../../../constraints/Util';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import apiCart from '../../../apis/apiCart';
import { toast } from 'react-toastify';
import apiAddressVN from '../../../apis/apiAddressVN';
import apiAddress from '../../../apis/apiAddress';
import ChooseCoupon from '../../../components/ChooseCoupon';

function PaymentVoucher() {
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [listCart, setListCart] = useState([])
  const addressShip = useSelector(state => state.payment.address)
  const voucher = useSelector(state => state.payment.coupon)
  const user = useSelector(state => state.auth.user);
  const ship = useSelector(state => state.payment.ship);
  const [commune, setCommune] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvine] = useState('')
  const navigate = useNavigate()
  
  useEffect(() => {
    if(user!=null){
      async function fetchData() {
        await apiCart.getUserCart()
          .then((res)=>{
            setListCart(res.data.listCart);
            if(!listCart){
              toast.info('Giỏ hàng của bạn đang trống. Hãy mua hàng bạn nhé')
              navigate('/')
            }
            let totalTemp = 0;
            for(let a in res.data.listCart){
              if(res.data.listCart[a].choose){
                totalTemp+=res.data.listCart[a].price*res.data.listCart[a].quantity;
              }
            }
            setTotalPrice(totalTemp)
          })
      }
      fetchData();
    }
  },[])
  useEffect(() => {
    if(!(addressShip&&ship))
      navigate('/payment/info')
  },[])
  useEffect(() => {
    const getAddresses = () => {
        apiAddress.getUserAddress()
          .then(res => {
            if(!res.data){
              toast.info('Hãy thêm địa chỉ để thực hiện thanh toán bạn nhé')
              navigate('/customer/address/create')
            }
          })
          .catch((err)=>{
            toast.info('Hãy thêm địa chỉ để thực hiện thanh toán bạn nhé')
            navigate('/customer/address/create')
          })
    }
    getAddresses()
  }, [])
  useEffect( ()=>{
    const getAddresses = () => {
      if(addressShip){
      apiAddressVN.getProvince({id:addressShip.province}).then((res)=>{
        setProvine(res)
      })
      apiAddressVN.getDistrict({id:addressShip.district}).then((res)=>{
        setDistrict(res)
      })
      apiAddressVN.getCommune({id:addressShip.commune}).then((res)=>{
        setCommune(res)
      })
    }
    }
    getAddresses()

  }, [addressShip])
  const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDay()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Thông tin đặt hàng"
    }
    loadTitle()
  }, [])
  const handleSubmitOrder = () => {
    navigate('/payment/pending')
  }
  return (
  <>
    <Box className="container" >
      <Stack justifyContent="center" alignItems="center">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx ={{width:'600px'}}>
          <Button href='/payment/info' sx={{color:'#FF3366', fontSize:'16px'}}>Trở về</Button>
          <Typography variant="h5" color="#FF3366"> THÔNG TIN ĐẶT HÀNG</Typography>
          <Typography></Typography>
          <Typography></Typography>
        </Stack>
        <Box sx={{background:'#FFFFFF', borderRadius:'0.5rem', width:'600px'}}>
          <Box sx={{background:'#F5F5DC', borderRadius:'0.5rem', width:'600px'}}>
            <Stack direction='row' justifyContent="center" alignItems="center" padding={2}>
              <Stack justifyContent="center" alignItems="center" margin={1}>
                  <ShoppingCartIcon sx={{color:'#FF0000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#FF0000', fontSize:'12px'}}>Chọn sản phẩm</Typography>
              </Stack>
              <Stack justifyContent="center" alignItems="center" margin={1}>
                  <AccountBoxIcon sx={{color:'#FF0000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#FF0000', fontSize:'12px'}}>Thông tin đặt hàng</Typography>
              </Stack>
              <Stack justifyContent="center" alignItems="center" margin={1}>
                  <DiscountIcon sx={{color:'#FF0000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#FF0000', fontSize:'12px'}}>Phiếu giảm giá</Typography>
              </Stack>
              <Stack justifyContent="center" alignItems="center" margin={1}>
                  <PaymentIcon sx={{color:'#000000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#000000', fontSize:'12px'}}>Thanh toán</Typography>
              </Stack>
              <Stack justifyContent="center" alignItems="center" margin={1}>
                  <Inventory2Icon sx={{color:'#000000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#000000', fontSize:'12px'}}>Hoàn tất đặt hàng</Typography>
              </Stack>
            </Stack>
          </Box>
          {user&&voucher?(
              <Box sx={{background:'#EEEEEE', borderRadius:'0.5rem', width:'585px', margin:'0.5rem'}} onClick={handleOpen}>
                <Stack direction='row' justifyContent="center" alignItems="center" spacing={3}>
                  <Stack justifyContent="center" alignItems="center" padding={2}>
                    <Typography>Loại giảm giá : {voucher.type}</Typography>
                    <Typography>Ngày sử dụng : {convertDate(voucher.fromDate)}</Typography>
                    <Typography>Ngày hết hạn : {convertDate(voucher.toDate)}</Typography>
                  </Stack>
                  <Typography>Giá trị : {numWithCommas(voucher.value)} đ</Typography>
                </Stack>
              </Box>
            ):(
              <Box sx={{background:'#CCCCCC', borderRadius:'0.5rem', width:'585px', margin:'0.5rem'}} onClick={handleOpen}>
                <Stack direction='row' justifyContent="center" alignItems="center" padding={2}>
                  <DiscountIcon sx={{color:'#000000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#000000', fontSize:'20px'}}>Chọn mã giảm giá</Typography>
                </Stack>
              </Box>
            )}
          <Box padding={1} sx={{background:'#FFFFFF', borderRadius:'0.5rem', width:'600px'}}>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
            <Typography>Thông tin nhận hàng</Typography>
            </Stack>  
            <Box padding={1} sx={{background:'#FFFFF0', borderRadius:'0.5rem', width:'580px'}}>
            {user?
              addressShip && <>
                <Typography>Loại địa chỉ nhận hàng: {addressShip.addressType.addressTypeName}</Typography>
                <Typography>Công ty: {addressShip.companyName}</Typography>
                <Typography>Tên người nhận: {addressShip.fullName}</Typography>
                <Typography>Số điện thoại nhận hàng: {addressShip.phoneNumber}</Typography>
                <Typography>Địa chỉ nhận hàng : {addressShip.addressDetail}, {commune}, {district}, {province}</Typography></>
            :<Typography></Typography>
            }
            </Box>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
            <Typography>Phương thức giao hàng</Typography>
            </Stack>  
            <Box padding={1} sx={{background:'#FFFFF0', borderRadius:'0.5rem', width:'580px'}}>
            {user?
              ship && <>
                <Typography>Loại giao hàng: {ship.shipType}</Typography>
                <Typography>Chi phí: {numWithCommas(ship.shipPrice)} đ</Typography>
                </>
            :<Typography></Typography>
            }
            </Box>
            <Box sx={{ width: "500px", height: "42px", backgroundColor: "#FFFFFF", margin:'0.5rem', padding:'10px', borderRadius:'2%'}}>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Tổng tiền tạm tính: </Typography>
              <Typography>{numWithCommas(totalPrice - Number(voucher?voucher.value:0)+ Number(ship?ship.shipPrice:0))} ₫</Typography>
            </Stack>
            </Box>
            <Button variant="contained" onClick={handleSubmitOrder}
                sx={{ width: "585px", height: "42px", backgroundColor: "#ff424e", "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" } }}>
                Tiếp tục
              </Button>
              <br/><br/>
              <Button variant="contained" href="/"
                sx={{ width: "585px", height: "42px", backgroundColor: "#FFFFFF",color:'inherit', "&:hover": { opacity: 0.8, backgroundColor: "#ff424e", color:'#FFFFFF' } }}>
                Chọn thêm sản phẩm
              </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
    <ChooseCoupon handleOpen={handleOpen} handleClose={handleClose} open={open} />
  </>
  )
}
export default PaymentVoucher