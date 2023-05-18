import React, { useEffect, useState } from "react";
import { Checkbox, Typography, Dialog, Button, Box, Stack } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { numWithCommas } from "../../constraints/Util";
import { useDispatch } from "react-redux";
import { removeItem, updateItem } from "../../slices/cartSlice";
import ClearIcon from '@mui/icons-material/Clear';
import {Link} from "react-router-dom";

function CompareItem(props) {
  console.log(props.data1)
  console.log(props.data2)  
  // const [data, setData] = useState(props.data);
//   const [quantity, setQuantity] = useState(props.data.quantity);

//   const dispatch = useDispatch();

//   const [open, setOpen] = React.useState(false);

//   const handleClickRemove = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleRemoveItem = () => {
//     dispatch(removeItem(data));
//     setOpen(false);
//   };

//   useEffect(() => {
//     setData(props.data);
//     setQuantity(props.data.quantity);
//   }, [props.data]);
//   const updateQuantity = (otp) => {
//     if (otp === "-") {
//       if (data.quantity <= 1) {
//         handleClickRemove();
//       } else {
//         dispatch(
//           updateItem({
//             ...data,
//             quantity: data.quantity - 1,
//           })
//         );
//       }
//     } else if (otp === "+") {
//       dispatch(
//         updateItem({
//           ...data,
//           quantity: data.quantity + 1,
//         })
//       );
//     }
//   };
//   const onChangeQuantity = (e) => {
//     setQuantity(e.target.value);
//     if (e.target.value === "") {
//       return;
//     }

//     if (Number.isInteger(Number(e.target.value))) {
//       let num = Number(e.target.value);
//       if (num <= 0) {
//         handleClickRemove();
//       } else {
//         dispatch(
//           updateItem({
//             ...data,
//             quantity: num,
//           })
//         );
//       }
//     }
//   };

//   const handleChangeChoose = () => {
//     dispatch(
//       updateItem({
//         ...data,
//         choose: !data.choose,
//       })
//     );
//     // props.handleChangeCartData(data.id, quantity, !data.choose);
//   };

//   return (
//     <>
//     <Box className="cart-item">
//         <Stack direction="row" alignItems="center" justifyContent="space-between" className="cart-item__cell cart-item__description">
//         <Checkbox checked={data?.choose} onChange={handleChangeChoose} className="cart__checkbox" />
//           <img src={data?.image} alt="" />
//           <Stack>
//             <Link to={data?.productId?`/product/${data.productId}`:''}>
//               <Typography fontSize="16px" className="text-overflow-2-lines" variant="h5">
//                 {data?.name}
//               </Typography>
//             </Link>
//             <Typography fontSize={14}>{data.option}</Typography>
//             <Typography fontSize="16px" className="text-overflow-2-lines" variant="h5">
//               {numWithCommas(Math.round(data?.price) || 0)} ₫
//             </Typography>
//             <Box className="cart-item__cell">
//           <Box className="cart-item__quantity">
//             <button
//               onClick={() => {
//                 updateQuantity("-");
//               }}
//             >
//               -
//             </button>
//             <input onChange={onChangeQuantity} type="text" value={quantity} />
//             <button
//               onClick={() => {
//                 updateQuantity("+");
//               }}
//             >
//               +
//             </button>
//           </Box>
//         </Box>
//         </Stack>
//           <Stack>
//             <Box>
//               <span onClick={handleClickRemove}>
//                 <ClearIcon />
//               </span>
//             </Box>
//           </Stack>
//         </Stack>
//       </Box>
//       <br/>
//       <Dialog onClose={handleClose} open={open}>
//         <Box className="dialog-removecart">
//           <Box className="dialog-removecart__title">
//             <h4>Xoá sản phẩm</h4>
//           </Box>
//           <Box className="dialog-removecart__content">
//             Bạn có muốn xóa sản phẩm đang chọn?
//           </Box>
//           <Box className="dialog-removecart__choose">
//             <Button
//               variant="outlined"
//               onClick={handleRemoveItem}
//               sx={{ width: "94px", height: "36px" }}
//             >
//               Xác nhận
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleClose}
//               sx={{ width: "57px", height: "36px" }}
//             >
//               Huỷ
//             </Button>
//           </Box>
//         </Box>
//       </Dialog>
//     </>
//   );
}

export default CompareItem;
