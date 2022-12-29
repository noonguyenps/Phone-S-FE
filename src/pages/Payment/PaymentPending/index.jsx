import { useCallback, useEffect, useState } from 'react'
import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField } from '@mui/material';
import './PaymentPending.scss'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import EditIcon from '@mui/icons-material/Edit';
import DiscountIcon from '@mui/icons-material/Discount';
import { numWithCommas } from '../../../constraints/Util';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import apiCart from '../../../apis/apiCart';
import { toast } from 'react-toastify';
import apiHome from '../../../apis/apiHome';
import apiAddressVN from '../../../apis/apiAddressVN';
import apiAddress from '../../../apis/apiAddress';
import ChooseCoupon from '../../../components/ChooseCoupon';

function PaymentPending() {
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
  const [province, setProvine] = useState('');
  const [listPayment, setListPayment] = useState([]);
  const [payment, setPayment] = useState('1');
  const dispatch = useDispatch()
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
    if(user!=null){
      async function fetchData() {
        await apiHome.getListPayments()
          .then((res)=>{
            setListPayment(res.data.listPayment);
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

  const handleChangeTypePayment = (event) => {
    setPayment(event.target.value);
  }
  const handleSubmitOrder = () => {
    if(payment == '1'){
        if(voucher){
            const listCartId = []
            for(const a in listCart){
                if(listCart[a].choose)
                    listCartId.push(listCart[a].id)
            }
            const params = {
                nullVoucher: false,
                voucher: voucher.id,
                payment: 1,
                ship: ship.shipId,
                address: addressShip.id,
                listCart: listCartId
            }
            apiCart.insertOrder(params)
            .then((res)=>{
                toast.info(res.message)
            })
        }
        else{
    
        }
    }
  }
  console.log(voucher)
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
                  <PaymentIcon sx={{color:'#FF0000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#FF0000', fontSize:'12px'}}>Thanh toán</Typography>
              </Stack>
              <Stack justifyContent="center" alignItems="center" margin={1}>
                  <Inventory2Icon sx={{color:'#000000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#000000', fontSize:'12px'}}>Hoàn tất đặt hàng</Typography>
              </Stack>
            </Stack>
          </Box>
          <Box padding={1} sx={{background:'#FFFFFF', borderRadius:'0.5rem', width:'600px'}}>
          <Stack direction='row' justifyContent="space-between" alignItems="center">
            <Typography>Thông tin sản phẩm</Typography>
            <Button href='/cart' sx={{color:'#FF3366', fontSize:'16px'}}><EditIcon/></Button>
            </Stack>
            <Box padding={1} sx={{background:'#FFFFF0', borderRadius:'0.5rem', width:'580px'}}>
            {
            listCart.map((item)=>{
                return item.choose?(
                    <Stack direction='row' justifyContent="center" alignItems="center" spacing={1}>
                        <img style={{width:'120px',height:'160px' }} src={item.image}></img>
                        <Stack sx={{width:'700px'}} spacing={1}>
                            <Typography>{item.name}</Typography>
                            <Typography style={{fontSize:'15px'}}>{item.option}</Typography>
                            <Typography style={{fontSize:'15px'}}>Số lượng: {item.quantity}</Typography>
                            <Typography style={{fontSize:'15px'}}>Đơn giá: {numWithCommas(item.price)}đ</Typography>
                        </Stack>
                        <Typography style={{color:'#CC0000'}}>{numWithCommas(item.price*item.quantity)}đ</Typography>
                    </Stack>
                ):
                (<></>)}
            )}
            </Box>
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
            <Typography>Cách thức giao hàng</Typography>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={payment}
                onChange={handleChangeTypePayment}
              >
                <Stack direction='row' alignItems="center" justifyContent="center" spacing={2}>
                {
                  listPayment?.map(item =>
                    <Stack key={item.id} direction="row" height="48px" >
                      <Radio name='shipping' value={item.paymentId} id={item.paymentId} sx={{ padding: 0, marginRight: "8px" }}/>
                      <Typography sx={{ margin: "auto 0" }} component='label' htmlFor={item.id}>{item.paymentName}</Typography>
                    </Stack>)
                }
                </Stack>
              </RadioGroup>
            {
                payment=='2'?(
                    <>
                    <Typography>Thanh toán bằng PayPal</Typography>
                    </>
                ):(<></>)
            }
            <Box sx={{ width: "500px", backgroundColor: "#FFFFFF", margin:'0.5rem', padding:'10px', borderRadius:'2%'}}>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Tổng tiền sản phẩm: </Typography>
              <Typography>{numWithCommas(totalPrice)} ₫</Typography>
            </Stack>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Giảm giá: </Typography>
              <Typography>{numWithCommas(Number(voucher?voucher.value:0))} ₫</Typography>
            </Stack>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Phí giao hàng: </Typography>
              <Typography>{numWithCommas(Number(ship?ship.shipPrice:0))} ₫</Typography>
            </Stack>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Tổng tiền: </Typography>
              <Typography style={{color:'#CC0000'}}  >{numWithCommas(totalPrice - Number(voucher?voucher.value:0)+ Number(ship?ship.shipPrice:0))} ₫</Typography>
            </Stack>
            </Box>
            <Button variant="contained" onClick={handleSubmitOrder}
                sx={{ width: "585px", height: "42px", backgroundColor: "#ff424e", "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" } }}>
                Đặt hàng
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
export default PaymentPending