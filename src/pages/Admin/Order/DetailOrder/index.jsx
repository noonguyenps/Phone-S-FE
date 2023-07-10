import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button, Modal, TextField, Select, MenuItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-hot-toast";
import { numWithCommas } from "../../../../constraints/Util";
import AddressVN from "../../../../components/AddressVN";
import { useNavigate } from "react-router-dom"
import apiShipping from "../../../../apis/apiShipping";
import FormControl from '@mui/material/FormControl';

function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);
  const [listShipper,setListShipper] = useState([]);
  const [shipper,setShipper] = useState();

  const [shipperPhone,setShipperPhone] = useState('');
  const [shipperName, setShipperName] = useState('');
  const [shipperID, setShipperID] = useState('');
  const [refesh, setRefesh] = useState(true);

  const [visiable,setVisiable] = useState(false);


  const openModalDelete = () => {
    setModalDelete(true)
}
  const closeModalDelete = () => setModalDelete(false);
  const navigate = useNavigate()
  
  useEffect(() => {
    const getData = async () => {
      await apiCart.getOrderByID(id)
        .then((res) => {
          setOrder(res.data.Order);
        })
        .catch((error) => {
          setOrder(null);
          toast.warning("Không tìm thấy đơn hàng");
          navigate('/admin/order');
        });
        await apiShipping.getAllShipping()
        .then((res) => {
          setListShipper(res.data.listShipper);
        })
        .catch((error) => {
         console.log(error)
        });
    };
    getData();
  }, [id, refesh]);

  const handleConfirm = () => {
    apiCart
      .changeTypeOrder(id, 1)
      .then((res) => {
        apiCart.createShipping({order:id,shipperID:shipper}).then((res=>{
          toast.success("Xác nhận thành công");
          setRefesh(!refesh)
        })).catch((error)=>{
          toast.error("Xác nhận không thành công");
        })
      })
      .catch((error) => {
        toast.error("Xác nhận không thành công");
      });
  };


  const handleCancel = () => {
    apiCart
      .changeTypeOrder(id,3)
      .then((res) => {
        toast.success("Hủy đơn hàng thành công");
        navigate('/admin/order')
      })
      .catch((error) => {
        toast.error("Hủy không thành công");
      });
  };
  const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDate()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };

  const handleExport = () => {
    apiCart.exportOrder(id)
    .then((res)=>{
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `shipping_${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
    })
    .catch(error=>{
      toast.error("Xuất file không thành công")
    })
  }
  const getOrderTotal = (order) =>{
    let total = 0;
    for(let a in order.cartResponseFEs){
      total += order.cartResponseFEs[a].price*order.cartResponseFEs[a].quantity
    }
    return total;
  }

  return (
    <Box>
      <Stack bgcolor="white" p={2} margin={2} justifyContent='space-between'>
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
        <Stack justifyContent='center' alignItems="center">
          {
            order?.orderStatus===1?(<><Button sx={{background:'green', width:160}} variant="contained" onClick={handleExport}>Xuất đơn hàng</Button></>):(<></>)
          }
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
            <Typography>Đơn giá: {numWithCommas(item.price || 0)} ₫</Typography>
            <Typography>SL: {numWithCommas(item.quantity || 0)}</Typography>
            <Typography>Thành tiền: {numWithCommas(item.price * item.quantity|| 0)} ₫
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
      {order?.orderStatus===0?(
        <>
                    <Typography>Giao Hàng</Typography>
                    <FormControl size="small">
                    <Select
                      sx={{width:500, fontSize:14, color:'blue'}}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={shipper}
                      onChange={e=>setShipper(e.target.value)}
                      placeholder="Chọn người giao hàng"
                    >
                      {
                        listShipper.map((item)=>(<MenuItem value={item.id}>{item.id}-{item.fullName}</MenuItem>))
                      }
                      
                    </Select>
                    </FormControl>
                    <Button
                      variant="outlined"
                      sx={{
                        fontSize: "12px",
                        width: "102px",
                        height: "40px",
                        padding: 0,
                          }}
                      onClick={handleConfirm}
                >
                  Vận chuyển
                </Button>
                  
                </>
                ):(
                  <></>
      )}
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
            </Modal>
    </Box>
  );
}

export default DetailOrder;
