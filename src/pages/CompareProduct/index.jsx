// eslint-disable-next-line
import { useEffect, useState } from 'react'
import { Typography, Button, Stack, Box, Dialog, Link } from '@mui/material'
import { numWithCommas } from "../../constraints/Util"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import {toast} from 'react-hot-toast'
import apiCart from '../../apis/apiCart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { removeCompare } from '../../slices/compareProduct'

function CompareProduct() {
  const [dialogDelete, setDialogDelete] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const CartItems = useSelector(state => state.cart.items)
  const CompareItems = useSelector(state => state.compare.items)
  const dispatch = useDispatch()
  const [listCart, setListCart] = useState([]);
  const user = useSelector(state => state.auth.user);
  const [item1, setItem1] = useState(CompareItems[0]?CompareItems[0]:null);
  const [item2, setItem2] = useState(CompareItems[1]?CompareItems[1]:null);
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [array3, setArray3] = useState([]);

  useEffect(()=>{
    const loadTitle = ()=>{
      document.title="So sánh"
    }
    loadTitle()
    const initArr = async ()=>{
      let arr1 =[],arr2=[],arr3=[];
      for(let a in item1.option){
        let itemTemp = item2.option.filter((item)=>item.idType===item1.option[a].idType);
        if(itemTemp.length!=0){
          arr1.push(itemTemp)
        }else{
          arr2.push([item1.option[a]])
        }
      }
      for(let a in item2.option){
        let itemTemp = item1.option.filter((item)=>item.idType===item2.option[a].idType);
        if(itemTemp.length==0){
          arr3.push([item2.option[a]])
        }
      }
      setArray1(arr1)
      setArray2(arr2)
      setArray3(arr3)
    }
    initArr()
  },[])

  const handleDeleteCompare = async (item)=>{
    if(item==null){
      navigate('/')
    }
    else{
      dispatch(
        removeCompare(item)
      );
      navigate('/')
    }
    
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
      <Stack spacing={2}>
          <Box>
            <Stack justifyContent="center" direction="row">
              <Typography className="cart__title" gutterBottom variant="h5" component="div" >
                So sánh sản phẩm
              </Typography>
            </Stack>
            <Stack alignItems='center' justifyContent='center' spacing={1}>
              <Box sx={{width:720, height:'fit-content', backgroundColor:'#dcdcdc', borderRadius:3}}>
                  <Stack direction='row' justifyContent="center" alignItems="center">
                  <Table sx={{ minWidth: 600 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Thuộc tính</TableCell>
                          <TableCell align="center">
                            {
                              item1?(
                              <Box>
                              <img src={item1.image} width='140' height='180'/>
                              <Typography sx={{fontSize:14}}>{item1.name}</Typography>
                              <Typography sx={{color:'#ff0000'}}>{numWithCommas(item1.price)} đ</Typography>
                              </Box>
                              ):(<></>)
                            }
                            
                          </TableCell>
                          <TableCell align="center">
                            {
                              item2?(
                            <Box>
                              <img src={item2.image} width='140' height='180'/>
                              <Typography sx={{fontSize:14}}>{item2.name}</Typography>
                              <Typography sx={{color:'#ff0000'}}>{numWithCommas(item2.price)} đ</Typography>
                            </Box>):(<></>)}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {array1.map((row) => (
                          <TableRow
                            key={row[0].name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">{row[0].name}</TableCell>
                            <TableCell align="center">{(item1.option.filter((index)=>(index.idType===row[0].idType)))[0].value}</TableCell>
                            <TableCell align="center">{(item2.option.filter((index)=>(index.idType===row[0].idType)))[0].value}</TableCell>
                          </TableRow>
                        ))}
                        {array2.map((row) => (
                          <TableRow
                            key={row[0].name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">{row[0].name}</TableCell>
                            <TableCell align="center">{(item1.option.filter((index)=>(index.idType===row[0].idType)))[0].value}</TableCell>
                            <TableCell align="center">---</TableCell>
                          </TableRow>
                        ))}
                        {array3.map((row) => (
                          <TableRow
                            key={row[0].name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">{row[0].name}</TableCell>
                            <TableCell align="center">---</TableCell>
                            <TableCell align="center">{(item2.option.filter((index)=>(index.idType===row[0].idType)))[0].value}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow
                            key={1}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row"></TableCell>
                            <TableCell align="center"><Button onClick={()=>(handleDeleteCompare(item1))}>Chọn sản phẩm khác</Button></TableCell>
                            <TableCell align="center"><Button onClick={()=>(handleDeleteCompare(item2?item2:null))}>Chọn sản phẩm khác</Button></TableCell>
                          </TableRow>
                      </TableBody>
                    </Table>
                  </Stack>
              </Box>
            </Stack>
          </Box>
          <Stack justifyContent="center" alignItems="center">
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


export default CompareProduct;