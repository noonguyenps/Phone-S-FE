import { useCallback, useEffect, useState } from 'react'
import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField } from '@mui/material';
import { numWithCommas } from '../../../constraints/Util';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import AddressVN from '../../../components/AddressVN';
import { Routes, Route } from 'react-router-dom';
import apiShipping from '../../../apis/apiShipping';
import {Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import Test from '../../Test'

function ShippingList() {
  const [page, setPage] = useState(0);
  const size = 10;
  const [openModalDelete, setOpenModelDelete] = useState(false);
  const [listShipping, setListShipping] = useState(); 
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate()

  useEffect(() => {
    if(user!=null){
      async function fetchData() {
        let params ={
            page:page,
            size:size
        }
        await apiShipping.getAllShippingByUser(params)
          .then((res)=>{
            setListShipping(res.data.listShipping);
          }).catch((err)=>{
            toast.error("Có lỗi xảy ra" + err);
          })
      }
      fetchData();
    }
  },[page])
  const handleView= (id) => {
    navigate(`detail/${id.id}`);
  }

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Thông tin giao hàng"
    }
    loadTitle()
  }, [])
  return (
  <>
    <Box className="container" >
      <Stack bgcolor={'white'} alignItems='center' justifyContent='center' padding={2} margin={1} spacing={2}>
        <Typography>DANH SÁCH ĐƠN HÀNG</Typography>
        <Stack>
        <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Mã đơn hàng</TableCell>
                                <TableCell>Tên người nhận</TableCell>
                                <TableCell>Số điện thoại</TableCell>
                                <TableCell>Địa chỉ cụ thể</TableCell>
                                <TableCell sx ={{width:'100px', minWidth:'100px'}}>Địa chỉ</TableCell>
                                <TableCell>Giá trị</TableCell>
                                <TableCell>Thanh toán</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listShipping?.map(row => (
                                <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Stack>
                                            <Typography sx={{ color: "#1890ff" }}>{row.orderName}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx ={{width:'100px'}} align='center'>
                                    <Typography sx={{ color: "#1890ff" }}>{row.customerName}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" justifyContent="center">
                                            <Typography sx={{ margin: "auto 0" }}>{row.customerPhone}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.addressDetail}</Typography>
                                    </TableCell>
                                    <TableCell align='center' sx ={{width:'100px', minWidth:'100px'}}>
                                        <Typography><AddressVN province={Number(row.province)} district={row.district} commune={row.commune}/></Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{numWithCommas(row.total)} VND</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.statusPayment?(
                                            <Typography>Đã thanh toán</Typography>
                                        ):(<Typography>Chưa thanh toán</Typography>)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Stack spacing={1} justifyContent="center" py={1}>
                                            <Button onClick={()=>handleView(row)} variant="contained">Xem</Button>
                                            {
                                                row.statusOrder!=1?(<>
                                                <Button 
                                                disabled='disabled'
                                            onClick={()=>openModalDelete(row)} 
                                            variant="outlined" color="error">
                                                Hủy
                                            </Button></>):(<><Button 
                                                    onClick={()=>openModalDelete(row)} 
                                                    variant="outlined" color="error">
                                                        Hủy
                                                    </Button></>)
                                            }
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        </Stack>
      </Stack>
      <Stack direction='row' spacing={2} justifyContent="center">
          {
            page==0?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'}} onClick={() => { setPage(page-1) }}>Trước</Button>)
          }
          <Button sx={{backgroundColor:'#EEEEEE'}}>Trang {page+1}</Button>
          {
            listShipping?.length<10?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'} } onClick={() => { setPage(page+1) }}>Sau</Button>)
          }
        </Stack>
    </Box>
  </>
  )
}
export default ShippingList