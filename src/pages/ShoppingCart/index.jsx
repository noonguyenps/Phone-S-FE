import { useEffect, useState } from 'react'
import './ShoppingCart.scss'
import { Typography, Button, Stack, Box, Dialog } from '@mui/material'
import CartItem from '../../components/CartItem'
import CartItemUser from '../../components/CartItemUser'
import { numWithCommas } from "../../constraints/Util"
import { useSelector, useDispatch } from 'react-redux'
import { deleteAll } from '../../slices/cartSlice'
import { useNavigate } from "react-router-dom"
import {toast} from 'react-hot-toast'
import apiCart from '../../apis/apiCart';

function ShoppingCart() {
  const [dialogDelete, setDialogDelete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const CartItems = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const [listCart, setListCart] = useState([]);
  const user = useSelector(state => state.auth.user)

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
  }, [CartItems])

  useEffect(()=>{
    const loadTitle = ()=>{
      document.title =  "Giỏ hàng"
    }
    loadTitle()
  },[])

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
    let totalPriceTemp = 0;
    for(let a in listCart){
      if(listCart[a].choose){
        totalPriceTemp+= totalPriceTemp + listCart[a].price*listCart[a].quantity
      }
    }
    setTotalPrice(totalPriceTemp)
  }
  const handleDeleteCart = async (id)=>{
    const a = listCart.findIndex((item)=>(item.id === id))
    listCart.splice(a,1);
    setListCart((prev)=>[...prev]);
    let totalPriceTemp = 0;
    for(let a in listCart){
      if(listCart[a].choose){
        totalPriceTemp+= totalPriceTemp + listCart[a].price*listCart[a].quantity
      }
    }
    setTotalPrice(totalPriceTemp)
  }
  const closeDialogDeleteAll = () => {
    setDialogDelete(false)
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
      navigate('/payment/info')
    }
    else{
      toast.warning("Bạn cần đăng nhập để thực hiện chức năng này")
    }
  }
  return (<>
    <Box className="container" ><br/>
      <Stack>
          <Box>
            <Stack justifyContent="center" direction="row">
              <Typography className="cart__title" gutterBottom variant="h5" component="div" >
                GIỎ HÀNG
              </Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              {
                user?(
                  listCart?.map(item => <CartItemUser key={item.id+' '+item.price} data={item} handleChangeCartData={(id,quantity,choose)=>{handleChangeCartData(id,quantity,choose)}} handleDeleteCart={(id)=>{handleDeleteCart(id)}}/>)
                ):(
                CartItems.map(item => <CartItem key={item.id+' '+item.price} data={item} handleChangeCartData={(id,quantity,choose)=>{handleChangeCartData(id,quantity,choose)}} handleDeleteCart={(id)=>{handleDeleteCart(id)}}/>))
              }
            </Stack>
          </Box>
          <Stack justifyContent="center" alignItems="center">
          <Box sx={{ width: "500px", height: "42px", backgroundColor: "#FFFFFF", margin:'0.5rem', padding:'10px', borderRadius:'2%'}}>
            <Stack direction='row' justifyContent="space-between" alignItems="center">
              <Typography>Tổng tiền tạm tính: </Typography>
              <Typography>{numWithCommas(totalPrice)} ₫</Typography>
            </Stack>
          </Box>
              <Button variant="contained" onClick={handleBuy}
                sx={{ width: "500px", height: "42px", backgroundColor: "#ff424e", "&:hover": { opacity: 0.8, backgroundColor: "#ff424e" } }}>
                Mua hàng
              </Button>
              <br/>
              <Button variant="contained" href="/"
                sx={{ width: "500px", height: "42px", backgroundColor: "#FFFFFF",color:'inherit', "&:hover": { opacity: 0.8, backgroundColor: "#ff424e", color:'#FFFFFF' } }}>
                Tiếp tục mua hàng
              </Button>
          </Stack>
        </Stack>
    </Box>
  </>
  )
}


export default ShoppingCart