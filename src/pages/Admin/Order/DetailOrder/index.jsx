import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import { Box, Stack, Typography, Button, Modal } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiCart from "../../../../apis/apiCart";
import { toast } from "react-toastify";
import { numWithCommas } from "../../../../constraints/Util";
import AddressVN from "../../../../components/AddressVN";
import { useNavigate } from "react-router-dom"

function DetailOrder() {
  const id = useParams().id;
  const [order, setOrder] = useState(null);
  const [modalDelete, setModalDelete] = React.useState(false);


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
        });
    };
    getData();
  }, [id]);

  const handleConfirm = () => {
    apiCart
      .changeTypeOrder(id, 1)
      .then((res) => {
        toast.success("Xác nhận thành công");
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
  const handleDate = (timestamp) => {
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
    return date ;
  }

  return (
    <Box>
      <Stack bgcolor="white" p={2}>
        <Typography mt={2.5} mx={2} fontSize="22px" fontWeight={300}>
          Chi tiết đơn hàng # {order?.name} {"    -    "}
          <span style={{ fontWeight: 500 }}>{order?.orderStatus===0?"Đang xử lý":(
                                order?.orderStatus===1?"Đang vận chuyển":(
                                order?.orderStatus===2?"Đã giao hàng":"Đã hủy"
                                ))}</span>
        </Typography>
        <Typography sx={{ fontSize: "13px", textAlign: "end" }}>
          Ngày đặt hàng: {handleDate(order?.createdDate)}
        </Typography>
      </Stack>
      <Stack
        direction="row"
        mt={1.25}
        mb={2.5}
        className="detailOrder"
        jutifyContent="space-between"
        mx={2}
      >
        <Stack className="detailOrder__boxInfo">
          <Typography>ĐỊA CHỈ NHẬN HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography style={{ color: "#000", fontWeight: 500 }}>
              Người nhận : {order?.addressOrder?.fullName}
            </Typography>
            <Typography>
              Địa chỉ:{" "}
              {order?.addressOrder?.addressDetail}<AddressVN province={Number(order?.addressOrder?.province)} district={order?.addressOrder?.district} commune={order?.addressOrder?.commune}></AddressVN>
            </Typography>
            <Typography>Điện thoại: {order?.addressOrder?.phoneNumber}</Typography>
          </Box>
        </Stack>

        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC GIAO HÀNG</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>
              {order?.shipOrder?.shipType}
            </Typography>
            <Typography>Phí vận chuyển: {order?.shipOrder.shipPrice}đ</Typography>
          </Box>
        </Stack>
        <Stack className="detailOrder__boxInfo">
          <Typography>HÌNH THỨC THANH TOÁN</Typography>
          <Box p={1.25} className="detailOrder__content">
            <Typography>{order?.paymentOrder.paymentName}</Typography>
            <Typography style={{ color: "#fda223" }}>
            {order?.paymentStatus?"Đã thanh toán":"Chưa thanh toán"}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      <Stack bgcolor="#fff" mx={2}>
        <Stack direction="row" className="detailOrder-Table__heading">
          <Box>Sản phẩm</Box>
          <Box>Giá</Box>
          <Box>Số lượng</Box>
          <Box>Tạm tính</Box>
        </Stack>
        {order?.cartResponseFEs?.map((item) => (
          <Stack key={item} direction="row" className="detailOrder-Table__row">
            <Stack direction="row" className="orderDetail__item">
              <Box mr={1.875}>
                <img height="60px" width="60px" src={item.image} alt="" />
              </Box>
              <Stack spacing={1.5}>
                <Link to={`../../../product/${item.productId}`}>
                  <Typography fontSize="14px">{item.productId}</Typography>
                </Link>
                <Typography fontSize="14px">{item.name}</Typography>
                <Typography fontSize="14px">{item.option}</Typography>
                <Typography fontSize="13px">{order?.orderStatus===0}</Typography>
              </Stack>
            </Stack>
            <Box>{numWithCommas(item.price || 0)} ₫</Box>
            <Box>{numWithCommas(item.quantity || 0)}</Box>
            <Box>
              {numWithCommas(item.price * item.quantity|| 0)} ₫
            </Box>
          </Stack>
        ))}
      </Stack>
      {order && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-end"
          mt={3.5}
        >
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Tạm tính
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(order?.total || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Giảm giá
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(order?.voucherOrder?.value || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí vận chuyển
            </Typography>
            <Typography className="detailOrder__summary-value">
              {numWithCommas(order?.shipOrder.shipPrice || 0)} ₫
            </Typography>
          </Stack>
          <Stack py={0.625} direction="row">
            <Typography className="detailOrder__summary-label">
              Phí tổng cộng
            </Typography>
            <Typography className="detailOrder__summary-value detailOrder__summary-value--final">
              {numWithCommas(
                Number(order.total||0) + Number(order.shipOrder.shipPrice||0) - Number(order?.voucherOrder?.value||0)
              )}{" "}
              ₫
            </Typography>
          </Stack>
          <Stack direction="row" spacing={6}>
                {order?.orderStatus===0?(
                  <Button
                  variant="outlined"
                  sx={{
                    fontSize: "12px",
                    width: "102px",
                    height: "30px",
                    padding: 0,
                  }}
                  onClick={handleConfirm}
                >
                  Vận chuyển
                </Button>
                ):(
                  <></>
                )}
                  <Button
                    variant="outlined"
                    sx={{
                      fontSize: "12px",
                      width: "71px",
                      height: "30px",
                      padding: 0,
                    }}
                    onClick={() => openModalDelete()}
                  >
                    Hủy đơn
                  </Button>
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
        </Stack>
      )}
    </Box>
  );
}

export default DetailOrder;
