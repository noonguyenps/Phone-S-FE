import {useState, useCallback} from "react";

import {
  Avatar,
  Typography,
  Stack,
  Button,
  Box,
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useSelector } from "react-redux";
import { numWithCommas } from "../../../constraints/Util";
import Notifications from "../../../components/Notifications";

function HomePage() {
  const user = useSelector(state => state.auth.user);
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const [createDate, setCreateDate] = useState(user?.createAt) 
  const [notifications, setNotifications] = useState([{id:1,name:'a3'}, {id:2,name:'a3'}])
  const [image, setImage] = useState([]);
  const [fullname, setFullName] = useState(user.fullName)

   const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDay()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };

  return (
    <Stack className="customer-info" spacing={1}>
        <Box>
            <Stack alignItems="flex-end">
                <Button
                    color="primary"
                    size="large"
                    fontSize="14px"
                    onClick={handleOpen}
                >
                    Thông báo
                </Button>
            </Stack>
            <Stack justifyContent="center" alignItems="center" spacing={1}>
            
            <Avatar sx={{
                      width: 110,
                      height: 110,
                      border: "3px solid aquamarine",
                    }}
                    src={image.length === 0 ? user.img : image[0].data_url}
            />
            <Typography>Xin chào</Typography>
            <Typography>{fullname}</Typography>
            <Stack spacing={5} direction='row' justifyContent="center" alignItems="center">
                <Stack justifyContent="center" alignItems="center">
                    <EventNoteIcon sx={{ fontSize: "32px" }}/>
                    <Typography>Ngày tham gia</Typography>
                    <Typography>{convertDate(createDate)}</Typography>
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <AttachMoneyIcon sx={{ fontSize: "32px" }}/>
                    <Typography>Chi tiêu</Typography>
                    <Typography>{numWithCommas(Number(user?.countOrderTotal))} đ</Typography>
                </Stack>
            </Stack>
            </Stack>
        </Box>
        <Box sx={{fontFamily: 'Raleway'}}>
        <Stack spacing={10} direction='row' justifyContent="center" alignItems="center" margin={5}>
            <Stack spacing={2} justifyContent="center" alignItems="center" bgcolor="#FFCCCC" borderRadius={"10%"} width="200px">
            <Avatar sx={{margin:3,
                      width: 80,
                      height: 80,
                      border: "3px solid aquamarine",
                    }}
                    src="https://cellphones.com.vn/smember/_nuxt/img/gift-box(1)1.ad696df.png"
            />
            <Typography>Ưu đãi của bạn</Typography>
            <Typography>{user?.countVoucher} ưu đãi</Typography>
                <Stack justifyContent="center" alignItems="center" bgcolor="#EEEEEE" borderRadius={"10%"} width="100px" margin={50}>
                    <a href='/customer/voucher'>Xem chi tiết</a>
                </Stack>
            </Stack>
            <Stack spacing={2} justifyContent="center" alignItems="center" bgcolor="#99CCCC" borderRadius={"10%"} width="200px">
            <Avatar sx={{margin:3,
                      width: 80,
                      height: 80,
                      border: "3px solid aquamarine",
                    }}
                    src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS%203.1905116.png"
            />
            <Typography>Đơn hàng của bạn</Typography>
            <Typography>{user?.countOrder} đơn hàng</Typography>
                <Stack justifyContent="center" alignItems="center" bgcolor="#EEEEEE" borderRadius={"10%"} width="100px" margin={50}>
                    <a href='/customer/order/history'>Xem chi tiết</a>
                </Stack>
            </Stack>
            <Stack spacing={2} justifyContent="center" alignItems="center" bgcolor="#CC99FF" borderRadius={"10%"} width="200px">
            <Avatar sx={{margin:3,
                      width: 80,
                      height: 80,
                      border: "3px solid aquamarine",
                    }}
                    src="https://www.freeiconspng.com/thumbs/favorite-icon/favorite-icon-8.png"
            />
            <Typography>Sản phẩm yêu thích</Typography>
            <Typography>{user?.countProductFavorite} sản phẩm</Typography>
                <Stack justifyContent="center" alignItems="center" bgcolor="#EEEEEE" borderRadius={"10%"} width="100px" margin={50}>
                    <a href='/customer/wishlist'>Xem chi tiết</a>
                </Stack>
            </Stack>
        </Stack>
        </Box>
        <Notifications handleOpen={handleOpen} handleClose={handleClose} open={open} />
    </Stack>
  );
}
export default HomePage;
