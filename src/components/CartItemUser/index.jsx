import React, { useEffect, useState } from "react";
import "./CartItem.scss";
import PropTypes from 'prop-types';
import { Checkbox, Typography, Dialog, Button, Box, Stack } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { numWithCommas } from "../../constraints/Util";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "../../slices/cartSlice";
import {Link} from "react-router-dom";
import apiCart from "../../apis/apiCart";

function CartItemUser(props) {
  const [data, setData] = useState(props.data);
  const [quantity, setQuantity] = useState(props.data.quantity);
  const [choose, setChoose] = useState(props.data.choose);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickRemove = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveItem = () => {
    apiCart.deleteCartById(data.id)
    .then((res)=>{
      if(res.status === 200){
        props.handleDeleteCart(data.id)
      }
    });
    setOpen(false);
  };

  useEffect(() => {
    setData(props.data);
    console.log(data);
    setQuantity(props.data.quantity);
  }, [props.data]);
  const updateQuantity = (otp) => {
    if (otp === "-") {
      if (quantity <= 1) {
        handleClickRemove();
      } else {
        setQuantity(quantity-1);
        props.handleChangeCartData(data.id, quantity-1, choose)
      }
    } else if (otp === "+") {
      setQuantity(quantity+1);
      props.handleChangeCartData(data.id, quantity+1, choose)
    }
  };
  const onChangeQuantity = (e) => {
    setQuantity(e.target.value);
    if (e.target.value === "") {
      return;
    }

    if (Number.isInteger(Number(e.target.value))) {
      let num = Number(e.target.value);
      if (num <= 0) {
        handleClickRemove();
      } else {
        setQuantity(num);
        props.handleChangeCartData(data.id, num, choose);
      }
    }
  };

  const handleChangeChoose = () => {
    if(choose){
      setChoose(false)
      props.handleChangeCartData(data.id, quantity, false);
    }else{
      setChoose(true)
      props.handleChangeCartData(data.id, quantity, true);
    }
  };

  return (
    <>
      <Box className="cart-item cart">
        <Stack direction="row" alignItems="center" className="cart-item__cell cart-item__description">
          <Checkbox checked={choose} onChange={handleChangeChoose} className="cart__checkbox" />
          <img src={data?.image} alt="" />
          <Stack className="cart-item__content">
            <Link to={data?.productId?`/product/${data.productId}`:''}>
              <Typography fontSize="16px" className="text-overflow-2-lines" variant="h5">
                {data?.name}
              </Typography>
            </Link>
            <Typography fontSize={14}>{data.option}</Typography>
          </Stack>
        </Stack>
        <Box className="cart-item__cell cart-item__price">
          {numWithCommas(Math.round(data?.price) || 0)} ₫
        </Box>
        <Box className="cart-item__cell">
          <Box className="cart-item__quantity">
            <button
              onClick={() => {
                updateQuantity("-");
              }}
            >
              -
            </button>
            <input onChange={onChangeQuantity} type="text" value={quantity} />
            <button
              onClick={() => {
                updateQuantity("+");
              }}
            >
              +
            </button>
          </Box>
        </Box>
        <Box className="cart-item__cell cart-item__total">
          {numWithCommas(data?.price * quantity)} ₫
        </Box>
        <Box className="cart-item__cell">
          <span style={{ cursor: "pointer" }} onClick={handleClickRemove}>
            <DeleteOutlinedIcon />
          </span>
        </Box>
      </Box>

      <Dialog onClose={handleClose} open={open}>
        <Box className="dialog-removecart">
          <Box className="dialog-removecart__title">
            <h4>Xoá sản phẩm</h4>
          </Box>
          <Box className="dialog-removecart__content">
            Bạn có muốn xóa sản phẩm đang chọn?
          </Box>
          <Box className="dialog-removecart__choose">
            <Button
              variant="outlined"
              onClick={handleRemoveItem}
              sx={{ width: "94px", height: "36px" }}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{ width: "57px", height: "36px" }}
            >
              Huỷ
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}


CartItemUser.propsTypes = {
  data: PropTypes.const,
  handleChangeCartData: PropTypes.func,
  handleDeleteCart: PropTypes.func,
}

export default CartItemUser;
