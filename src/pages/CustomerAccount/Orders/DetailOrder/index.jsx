import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button, Modal,MenuItem,Select } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-hot-toast";
import { numWithCommas } from "../../../../constraints/Util";
import { orderTabs } from "../../../../constraints/OrderItem";
import apiNotify from "../../../../apis/apiNotify";
import AddressVN from "../../../../components/AddressVN";
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';

function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);
  const closeModalDelete = () => setModalDelete(false);
  const navigate = useNavigate()
  const [payment,setPayment] = useState(1);
  const listPayment = [{id:2,name:"Thanh toán bằng Paypal"},{id:3,name:"Thanh toán bằng Momo QR"},{id:4,name:"Thanh toán bằng Momo ATM"},]


  const openModalDelete = () => {
    setModalDelete(true)
  }
  
  useEffect(() => {
    const getData = async () => {
      await apiCart.getUserOrderByID(id)
        .then((res) => {
          setOrder(res.data.order);
        })
        .catch((error) => {
          setOrder(null);
          toast.warning("Không tìm thấy đơn hàng");
        });
    };
    getData();
  }, []);

  const getOrderTotal = (order) =>{
    let total = 0;
    for(let a in order.cartResponseFEs){
      total += order.cartResponseFEs[a].price*order.cartResponseFEs[a].quantity
    }
    return total;
  }


  const handleCancel = () => {
    apiCart
      .deleteOrder(id)
      .then((res) => {
        toast.success("Đơn hàng đã hủy thành công");
        navigate('/customer/order/history')
      })
      .catch((error) => {
        toast.error("Đơn hàng hủy không thành công");
      });
  };

  const handleConfirm = () => {
    let params = {
      id:id,
      paymentId:payment
    }
    apiCart
      .updatePaymentOrder(params)
      .then((res) => {
        window.location.replace(res.data.url)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDate()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };
  return (
    <>
    <Box>
      {
        order?(<><Stack bgcolor="white" p={2} margin={2} justifyContent='space-between'>
        <Stack justifyContent='center' alignItems='center'>
            <Typography mt={2.5} mx={2} fontSize="22px" fontWeight={300}>
              CHI TIẾT ĐƠN HÀNG
            </Typography>
            <Typography mt={2.5} mx={2} fontSize="18px" fontWeight={300}>
              Mã đơn vận : {order?.name}
            </Typography>
            {order?.orderStatus==0?(
            <Box bgcolor='#add8e6' padding={1} margin={1} borderRadius={0.5}>
              <Typography fontSize="16px" fontWeight={300}>
                Đang xử lý
              </Typography>
            </Box>):(
            order?.orderStatus==1?(
            <Box bgcolor='#ffa500' padding={1} margin={1} borderRadius={0.5}>
            <Typography fontSize="16px" fontWeight={300}>
              Đang vận chuyển
            </Typography>
            </Box>):(
            order?.orderStatus==2?(
            <Box bgcolor='#008000' padding={1} margin={1} borderRadius={0.5}>
            <Typography fontSize="16px" fontWeight={300}>
              Đã giao hàng
            </Typography>
            </Box>):(
            <Box bgcolor='#ff0000' padding={1} margin={1} borderRadius={0.5}>
              <Typography fontSize="16px" fontWeight={300}>
                Đã hủy
              </Typography>
            </Box>)
            ))}
            <Typography sx={{ fontSize: "13px", textAlign: "end" }}>
              Ngày đặt hàng: {convertDate(order?.createdDate)}
            </Typography>
        </Stack>
        </Stack>
        <Stack bgcolor="white" p={2} margin={2} justifyContent='space-between'>
          <Stack>
            <Typography>Thông tin nhận hàng</Typography>
            <Box p={1.25} className="detailOrder__content">
              <Typography style={{ color: "#000", fontWeight: 500 }}>
                Người nhận : {order?.addressOrder?.fullName}
              </Typography>
                {order?(<>
                <Typography>Địa chỉ: {order.addressOrder?.addressDetail}, <AddressVN province={Number(order.addressOrder?.province)} district={order.addressOrder?.district} commune={order.addressOrder?.commune}></AddressVN>
                </Typography>
                <Typography>Điện thoại: {order.addressOrder?.phoneNumber}</Typography>
                <Typography>
                {order.shipOrder?.shipType} : {numWithCommas(order.shipOrder.shipPrice)}đ
              </Typography>
              <Stack direction='row'>
                {order?.paymentStatus?(<Typography style={{ color: "#008000" }}>{order?.paymentOrder.paymentName} : Đã thanh toán
                </Typography>):(<Typography style={{ color: "#fda223" }}>{order?.paymentOrder.paymentName} : Chưa thanh toán
                </Typography>)}
              </Stack>
                </>):(<></>)}
            </Box>
          </Stack>
        </Stack>
  
        <Stack bgcolor="#fff" mx={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} margin={1}>
            <Typography>Danh sách sản phẩm</Typography>
          </Stack>
          {order?.cartResponseFEs?.map((item) => (
            <Stack key={item} direction="row" justifyContent="space-between" alignItems="center" spacing={2} margin={1}>
              <Stack direction="row">
                <Box mr={1.875}>
                  <img height="60px" width="60px" src={item.image} alt="" />
                </Box>
                <Stack spacing={1}>
                  <Link to={`../../../product/${item.productId}`}>
                    <Typography fontSize="14px">{item.productId}</Typography>
                  </Link>
                  <Typography fontSize="14px">{item.name}</Typography>
                  <Typography fontSize="14px">{item.option}</Typography>
                  <Typography fontSize="13px">{order?.orderStatus===0}</Typography>
                </Stack>
              </Stack>
              {
                    order.orderStatus===2?(<><Button variant="outlined"
                      href = {`/customer/order/ratting/${item.id}`}
                      sx={{
                        fontSize: "12px",
                        width: "71px",
                        height: "30px",
                        padding: 0,
                      }}
                    >
                      Đánh giá
                    </Button></>):(<></>)
                  }
              <Typography>ĐG: {numWithCommas(item.price || 0)} ₫</Typography>
              <Typography>SL: {numWithCommas(item.quantity || 0)}</Typography>
              <Typography>TT: {numWithCommas(item.price * item.quantity|| 0)} ₫
              </Typography>
            </Stack>
            
          ))}
        </Stack>
        <Stack bgcolor="white" p={2} margin={2} justifyContent='space-between'>
          <Stack>
            {
              order?(<>
              <Stack>
              <Stack py={0.625} direction="row" justifyContent="space-between">
              <Typography>
                Tổng giá trị sản phẩm
              </Typography>
              <Typography>
                {numWithCommas(getOrderTotal(order)|| 0)} ₫
              </Typography>
            </Stack>
            <Stack py={0.625} direction="row" justifyContent="space-between">
              <Typography>
                Giảm giá
              </Typography>
              <Typography>
                {numWithCommas(order?.voucherOrder?.value || 0)} ₫
              </Typography>
            </Stack>
            <Stack py={0.625} direction="row" justifyContent="space-between">
              <Typography>
                Phí vận chuyển
              </Typography>
              <Typography>
                {numWithCommas(order?.shipOrder.shipPrice || 0)} ₫
              </Typography>
            </Stack>
            <Stack py={0.625} direction="row" justifyContent="space-between">
              <Typography >
                Tổng cộng
              </Typography>
              <Typography sx={{color:'red'}}>
                {numWithCommas(
                  Number(order.total||0)
                )}{" "}
                ₫
              </Typography>
            </Stack>
              </Stack></>):(<></>)
            }
          </Stack>
        </Stack>
        <Stack bgcolor="white" p={2} margin={2} justifyContent='space-between'>
          <Stack>
            <Typography>Thao tác với đơn hàng</Typography>
            <Box p={1.25} className="detailOrder__content">
            <Stack alignItems="center" direction='row' spacing={2}>
            { !order?.paymentStatus&&order?.orderStatus<2?(
              <Stack alignItems="center" direction='row' spacing={2}>
                <Typography>Thanh toán</Typography>
              <FormControl>
              <Select
                sx={{ flex: 0.65 , width:250, fontSize:14, color:'blue'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                size='small'
                value={payment}
                onChange={e=>setPayment(e.target.value)}
              >
                {
                  listPayment.map((item)=>(<MenuItem value={item.id}>{item.name}</MenuItem>))
                }
                
              </Select>
              </FormControl>
              <Button
                variant="outlined"
                sx={{
                  fontSize: "12px",
                  width: "120px",
                  height: "40px",
                  padding: 0,
                    }}
                onClick={handleConfirm}
          >
            Thanh toán
          </Button>
            </Stack>):(<></>)
            }
        {order?.orderStatus<2?(
          <>
          <Button
                      variant="outlined"
                      sx={{
                        fontSize: "12px",
                        width: "71px",
                        height: "40px",
                        padding: 0,
                      }}
                      onClick={() => openModalDelete()}
                    >
                      Hủy đơn
                    </Button>
                    
                  </>
                  ):(
                    <></>
        )}</Stack>
            </Box> </Stack>
        </Stack>
        <Modal
                  sx={{ overflowY: "scroll" }}
                  open={modalDelete}
                  onClose={closeModalDelete}
              >
                  <Stack
                      className="modal-info"
                      direction="row"
                      spacing={2}
                      justifyContent="center"
                      width="26rem"
                  >
                      <Stack spacing={3}>
                          <Stack>
                              <Typography sx={{ fontWeight: "bold" }}>
                                  Bạn có chắc muốn hủy đơn hàng này ?
                              </Typography>
                          </Stack>
  
                          <Stack direction="row" justifyContent="flex-end" spacing={1}>
                              <Button onClick={closeModalDelete} variant="outlined">
                                  Hủy bỏ thao tác
                              </Button>
                              <Button variant="contained" color="error" onClick={handleCancel}>Hủy đơn</Button>
                          </Stack>
                      </Stack>
                  </Stack>
              </Modal></>):(<></>)
      }
    </Box>
    </>
  );
}

export default DetailOrder;
