import { useCallback, useEffect, useState } from 'react'
import './Payment.scss'
import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PaymentIcon from '@mui/icons-material/Payment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import EditIcon from '@mui/icons-material/Edit';
import DiscountIcon from '@mui/icons-material/Discount';
import { numWithCommas } from "../../constraints/Util"
import { useDispatch, useSelector } from 'react-redux'
import ChooseAddress from '../../components/ChooseAddress';
import { useNavigate } from 'react-router-dom'
import apiCart from '../../apis/apiCart';
import { toast } from 'react-hot-toast';
import {setAddress, setShipType} from '../../slices/paymentSlice';
import apiAddress from '../../apis/apiAddress'
import apiHome from '../../apis/apiHome';
import apiAddressVN from '../../apis/apiAddressVN';

function Payment() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [openAddress, setOpenAddress] = useState(false);
  const [ship, setShip] = useState(1);
  const [listCart, setListCart] = useState([])
  const [listShip, setListShip] = useState([])
  const addressShip = useSelector(state => state.payment.address)
  const user = useSelector(state => state.auth.user);
  const ship1 = useSelector(state => state.payment.ship);
  const [commune, setCommune] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvine] = useState('')
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
          }).catch((err)=>{
            toast.warning("Có lỗi xảy ra" + err);
          })
        await apiAddress.getUserAddress()
        .then(res => {
          if(!res.data){
            toast.info('Hãy thêm địa chỉ để thực hiện thanh toán bạn nhé')
            navigate('/customer/address/create')
          }
          else{
            if(!addressShip){
              dispatch(setAddress(res.data.addressList[0]))
            }
          }
        })
        .catch((err)=>{
          toast.info('Hãy thêm địa chỉ để thực hiện thanh toán bạn nhé')
          navigate('/customer/address/create')
        })
      }
      fetchData();
    }
  },[])

  useEffect(() => {
    if(user!=null){
      async function fetchData() {
        await apiHome.getListShips()
          .then((res)=>{
            setListShip(res.data.listShip);
          }).catch((err)=>{
            toast.warning("Có lỗi xảy ra" + err);
          })
          listShip.find(item => item.shipId === Number(ship))
      }
      fetchData();
    }
  },[])


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

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Thông tin đặt hàng"
    }
    loadTitle()
  }, [])

  const handleChangeTypeShip = (event) => {
    setShip(event.target.value);
    dispatch(setShipType(listShip.find(item => item.shipId === Number(event.target.value))))
  };
  const handleOpenAddress = useCallback(() => setOpenAddress(true), []);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);
  const handleSubmitOrder = () => {
    if (!addressShip) {
      toast.warning("Vui lòng chọn địa chỉ giao hàng")
      return;
    }
    if(!ship){
      toast.warning("Vui lòng chọn cách thức giao hàng")
      return;
    }
    dispatch(setAddress(addressShip))
    dispatch(setShipType(listShip.find(item => item.shipId === Number(ship))))
    navigate('/payment/voucher')
  }
  return (
  <>
    <Box className="container" >
      <Stack justifyContent="center" alignItems="center">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx ={{width:'600px'}}>
          <Button href='/cart' sx={{color:'#FF3366', fontSize:'16px'}}>Trở về</Button>
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
                  <DiscountIcon sx={{color:'#000000', fontSize:'24px'}}/>
                  <Typography sx={{color:'#000000', fontSize:'12px'}}>Phiếu giảm giá</Typography>
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

          <Box padding={1} sx={{background:'#FFFFFF', borderRadius:'0.5rem', width:'600px'}}>
            <Stack direction='row' width='600px' padding={1} justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography sx={{color:'#000000'}}>Thông tin khách hàng</Typography>
            <Button href='/customer/account/edit' sx={{color:'#FF3366', fontSize:'16px'}}><EditIcon/></Button>
            </Stack>
            <Stack direction='row' width='590px' padding={1} justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography>Tên khách hàng: </Typography>
              <TextField size='small' value={user?.fullName} sx={{width:'400px'}} disabled='disable'/>
            </Stack>
            <Stack direction='row' width='590px' padding={1} justifyContent="space-between" alignItems="center" spacing={2}>
              <Typography>Số điện thoại: </Typography>
              <TextField size='small' value={user?.phone} sx={{width:'400px', }} disabled='disable'/>
            </Stack>
            <Typography>Cách thức giao hàng</Typography>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={ship}
                onChange={handleChangeTypeShip}
              >
                <Stack direction='row' alignItems="center" justifyContent="center" spacing={2}>
                {
                  listShip.map(item =>
                    <Stack key={item.id} direction="row" height="48px" >
                      <Radio name='shipping' value={item.shipId} id={item.shipId} sx={{ padding: 0, marginRight: "8px" }}/>
                      <Typography sx={{ margin: "auto 0" }} component='label' htmlFor={item.id}>{item.shipType}</Typography>
                    </Stack>)
                }
                </Stack>
              </RadioGroup>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
            <Typography>Thông tin nhận hàng</Typography>
            <Typography onClick={handleOpenAddress} color="#1890ff" sx={{ cursor: "pointer" }}>Thay đổi</Typography>
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
            <Box sx={{ width: "500px", height: "79px", backgroundColor: "#FFFFFF", margin:'0.5rem', padding:'10px', borderRadius:'2%'}}>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Tổng tiền sản phẩm: </Typography>
              <Typography>{numWithCommas(totalPrice)} ₫</Typography>
            </Stack>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Chi phí vận chuyển: </Typography>
              <Typography>{numWithCommas(Number(ship1?ship1.shipPrice:0))} ₫</Typography>
            </Stack>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Tổng tiền tạm tính: </Typography>
              <Typography>{numWithCommas(totalPrice + Number(ship1?ship1.shipPrice:0))} ₫</Typography>
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
    <ChooseAddress handleOpen={handleOpenAddress} handleClose={handleCloseAddress} open={openAddress} />
  </>
  )
}
export default Payment