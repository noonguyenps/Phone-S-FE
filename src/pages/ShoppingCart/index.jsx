import { useCallback, useEffect, useState } from 'react'
import './ShoppingCart.scss'
import { Grid, Typography, Button, Stack, Box, Dialog } from '@mui/material'
import CartItem from '../../components/CartItem'
import CartItemUser from '../../components/CartItemUser'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { numWithCommas } from "../../constraints/Util"
import { useSelector, useDispatch } from 'react-redux'
import { unchooseAll, chooseAll, deleteAll } from '../../slices/cartSlice'
import { useNavigate } from "react-router-dom"
import ChooseAddress from '../../components/ChooseAddress';
import {toast} from 'react-toastify'
import { clearCoupon } from '../../slices/paymentSlice';
import apiCart from '../../apis/apiCart';
import el from 'date-fns/esm/locale/el/index.js'

function ShoppingCart() {
  const [open, setOpen] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [couponValue, setCouponValue] = useState(0)
  const CartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const [listCart, setListCart] = useState([]);
  const user = useSelector(state => state.auth.user)
  const coupon = useSelector(state => state.payment.coupon)
  const addressShip = useSelector(state => state.payment.address)

  useEffect(() => {
    if(user==null){
      const calcPrice = () => {
        const total = CartItems.reduce((t, num) => num.choose ? t + num.price * num.quantity : t, 0)
        setTotalPrice(total)
      }
      calcPrice()
    }else{
      async function fetchData() {
          await apiCart.getUserCart()
          .then((res)=>{
            setListCart(res.data.listCart);
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
      }
      fetchData();
    }
  }, [])

  useEffect(()=>{
    const loadTitle = ()=>{
      document.title =  "Giỏ hàng"
    }
    loadTitle()
  },[])
  useEffect(()=>{
    const handle = ()=>{
      if(coupon){
        let value = 0
        if(coupon.unit === 'đ'){
          value = coupon.value / 1000
        }
        else {
          if(totalPrice>0)
            value = (coupon.value * totalPrice / 100)/1000
        }
        setCouponValue(value)
      }
    }
    handle()
  },[coupon,totalPrice])

  const handleDeleteAll = () => {
    if(user){
      apiCart.deleteAll()
      .then((res)=>{
        if(res.status === 200){
          setListCart([]);
        }
      });
    }
    else{
      dispatch(deleteAll())
    }
    closeDialogDeleteAll()
  }
  const handleChangeCartData = (id, quantity, choose) =>{
    const a = listCart.findIndex((item)=>(item.id === id))
    listCart[a].quantity = quantity;
    listCart[a].choose = choose
    setListCart((prev)=>[...prev]);
    for(let a in listCart){
      if(listCart[a].choose){
        setTotalPrice(totalPrice+listCart[a].price*listCart[a].quantity)
      }
    }
  }
  const handleDeleteCart = async (id)=>{
    const a = listCart.findIndex((item)=>(item.id === id))
    listCart.splice(a,1);
    setListCart((prev)=>[...prev]);
  }
  const openDialogDeleteAll = () => {
    setDialogDelete(true)
  }
  const closeDialogDeleteAll = () => {
    setDialogDelete(false)
  }
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpenAddress = useCallback(() => {
    if(user){
      setOpenAddress(true)
    }
    else{
      toast.warning("Vui lòng đăng nhập để chọn địa chỉ")
    }
  }, [user]);
  const handleCloseAddress = useCallback(() => setOpenAddress(false), []);
  
  const unchooseCoupon = () => {
    dispatch(clearCoupon())
  }
  const navigate = useNavigate()
   const handleBuy = async ()=>{
    if(user){
      if(listCart.filter(item=>item.choose).length===0){
        toast.warning("Vui lòng chọn ít nhất một món hàng")
      }
      else{
        for(let a in listCart){
          let params = {
            id: listCart[a].id,
            quantity: listCart[a].quantity,
            status: listCart[a].choose
          }
          await apiCart.updateCart(params)
        }
      }
      navigate('/payment')
    }
    else{
      toast.warning("Bạn cần đăng nhập để thực hiện chức năng này")
    }
  }
  const finalPrice = () => {
    return totalPrice - (coupon?.value || 0)  > 0 ?
    Math.round(totalPrice - (coupon?.value || 0)) : 0
  }
  return (<>
    <Box className="container" >
      <Grid container spacing={2} style={{ marginTop: "5px" }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box>
            <Typography className="cart__title" gutterBottom variant="h5" component="div" >
              GIỎ HÀNG
            </Typography>

            <Box className="cart__heading cart">
              <Stack direction="row">
                {user?`Tất cả (${listCart.length} sản phẩm)`:`Tất cả (${CartItems.length} sản phẩm)`}
              </Stack>
              <Stack>Đơn giá</Stack>
              <Stack>Số lượng</Stack>
              <Stack>Thành tiền</Stack>
              <Stack>
                <span onClick={openDialogDeleteAll}><DeleteOutlinedIcon /></span>
              </Stack>
            </Box>
            <Stack className="cart__list">
              {
                user?(
                  listCart?.map(item => <CartItemUser key={item.id+' '+item.price} data={item} handleChangeCartData={(id,quantity,choose)=>{handleChangeCartData(id,quantity,choose)}} handleDeleteCart={(id)=>{handleDeleteCart(id)}}/>)
                ):(
                CartItems.map(item => <CartItem key={item.id+' '+item.price} data={item} />))
              }
            </Stack>
          </Box>
          <Box>
            <Box className="cart-summary">
              <Box className="cart-summary__price">
                <span>
                  Tạm tính
                </span>
                <span>{numWithCommas(totalPrice)} ₫</span>
              </Box>
              <Box className="cart-summary__price">
                <span>
                  Tổng tiền
                </span>
                <Box className="cart-summary__valueprice">
                  <span>{numWithCommas(finalPrice())} ₫</span>
                </Box>
              </Box>
            </Box>
              <Button variant="contained" onClick={handleBuy}
                sx={{ width: "100%", height: "42px", backgroundColor: "#ff424e", "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" } }}>
                Mua hàng
              </Button>
          </Box>
        </Grid>
        </Grid>
    </Box>
    {dialogDelete &&
      <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
        <Box className="dialog-removecart">
          <Box className="dialog-removecart__title">
            <h4>Xoá sản phẩm</h4>
          </Box>
          <Box className="dialog-removecart__content">
            Bạn có muốn xóa tất cả sản phẩm trong giỏ hàng
          </Box>
          <Box className="dialog-removecart__choose">
            <Button
              variant="outlined"
              onClick={handleDeleteAll}
              sx={{ width: "94px", height: "36px" }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={closeDialogDeleteAll}
              sx={{ width: "57px", height: "36px" }}
            >
              Huỷ
            </Button>
          </Box>
        </Box>
      </Dialog>}
  </>
  )
}


export default ShoppingCart