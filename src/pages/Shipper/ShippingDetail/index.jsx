import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiShipping from '../../../apis/apiShipping';
import { toast } from 'react-hot-toast';
import {Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import AddressVN from '../../../components/AddressVN';
import { numWithCommas } from '../../../constraints/Util';

function ShippingDetail(){
    let id = useParams().id;
    const [shipping, setShipping] = useState();
    const [openModalDelete, setOpenModelDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
          async function fetchData() {
            await apiShipping.getShippingById(id)
              .then((res)=>{
                setShipping(res.data.shipping);
              }).catch((err)=>{
                toast.error("Có lỗi xảy ra" + err);
              })
          }
          fetchData();
      },[])

      console.log(shipping)

    return(
    <>
    <Box>
        <Box>
            <Stack direction='row'>
            <Typography>Đang giao hàng</Typography>
            <img></img>
            </Stack>
        </Box>
        <Box>
            <Stack direction='row'>
                <img></img>
                <Stack>
                    <Typography>Tên người nhận : {shipping?.customerName}</Typography>
                    <Typography>Số điện thoại : {shipping?.customerPhone}</Typography>
                    <Typography>Địa chỉ cụ thể : {shipping?.addressDetail}</Typography>
                    <Typography>Địa chỉ: <AddressVN province={Number(shipping?.province)} district={shipping?.district} commune={shipping?.commune}/></Typography> 
                </Stack>
            </Stack>
        </Box>
        <Box>
            <Typography>Danh sách sản phẩm</Typography>
            {shipping?.carts.map((row)=>(
                <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell sx ={{width:'100px'}}>Hình ảnh</TableCell>
                        <TableCell>Số lượng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                                <Stack>
                                    <Typography sx={{ color: "#1890ff" }}>{row.productName}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell sx ={{width:'100px'}} align='center'>
                                <img style={{width:'100px', height:'100px'}} src = {row.productImage?row.productImage:'https://res.cloudinary.com/duk2lo18t/image/upload/v1667887284/frontend/R_zzr2lm.png'}></img>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" justifyContent="center">
                                    <Typography sx={{ margin: "auto 0" }}>{row.quantity}</Typography>
                                </Stack>
                            </TableCell>
                        </TableRow>
                </TableBody>
            </Table>
            ))}
        </Box>
        <Box>
            {
                shipping?.total?(<Typography>Tổng giá trị : {numWithCommas(shipping?.total)} VND</Typography>):(<></>)
            }
        </Box>
        <Box>
            <Button>Tiến hành giao hàng</Button>
        </Box>
    </Box>
    </>)
}
export default ShippingDetail;