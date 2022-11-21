import React from 'react'
import {
    Box,
    Stack,
    Button,
    Typography,
} from '@mui/material'
import {Link} from "react-router-dom"
import "./Error.scss"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import AccessibleForwardOutlinedIcon from '@mui/icons-material/AccessibleForwardOutlined';
import TableRestaurantOutlinedIcon from '@mui/icons-material/TableRestaurantOutlined';
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';

function Error() {
    return (
        <Box>
            <center>
                <img src="https://th.bing.com/th/id/R.b1c62a6bf5e51001d4d973e603b6fab9?rik=DIhrbTziOV1FCg&riu=http%3a%2f%2fwww.isbn-us.com%2fwp-content%2fthemes%2fisnbus%2fimages%2f404error.jpg&ehk=5vAZg0c25hpLXfEpOaUqfjygXQcnVfuOaV5t9EmZmJg%3d&risl=&pid=ImgRaw&r=0" alt="centered image" />
                <Typography fontSize={"30"}>Đường dẫn không tồn tại</Typography>
                <Typography fontSize={"30"}>Bạn có thể thử những liên kết sau</Typography>
            </center>
            <Stack sx={{ backgroundColor: "#FFFFF", height: "230px" }} px={2} justifyContent="space-between" alignItems="center" mb={0.2} spacing={4}>
                <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={1}>
                    {errorIcon.map(item =>
                    <Link to={item.link}>
                        <Box className="widthicon" key={item.id}>
                    <Stack className="erroricon" justifyContent="center" alignItems="center">
                        <item.icon sx={{ fontWeight: 550, color: "#FFF" ,width:"36px" ,height:"36px" }} />
                    </Stack>
                    <Typography textAlign="center" className="Text" sx={{fontSize:"11px",fontWeight:550}}>{item.text}</Typography>
                </Box>
                </Link>
                        
                    )}
                </Stack>
                <Stack direction="row" justifyContent="" alignItems="center" mb={4} spacing={4}>
                    <Button variant="outlined"><KeyboardArrowLeftIcon />Quay lại trang trước</Button>
                    <Button variant="outlined">Tiếp tục mua hàng</Button>
                    <Button variant="outlined">Xem thông tin tài khoản<KeyboardArrowRightIcon /></Button>
                </Stack>
            </Stack>
            <Stack px={2} sx={{ backgroundColor: "#f7f7f7", height: "100px" }} direction="row" justifyContent="center" alignItems="center" mb={0.2}>
                <Stack px={2}>
                    <Typography sx={{ fontSize: "16px", color: "#4e5052", fontWeight: 550 }}>Đăng ký nhận bản tin S-Phone</Typography>
                    <Typography sx={{ fontSize: "13px", color: "#4e5052", fontWeight: 550 }}>Đừng bỏ lỡ hàng ngàn sản phẩm và chương trình siêu hấp dẫn</Typography>
                </Stack>
                <Stack direction="row" spacing={2} >
                <Box component="form" noValidate autoComplete="off" justifyContent="space-between">
                    <FormControl sx={{width:"345px", height:"34px"}} px={2}>
                        <OutlinedInput size="small"  placeholder="Địa chỉ Email của bạn" />
                    </FormControl>
                </Box>
                <Button variant="contained">Đăng ký</Button>
                </Stack>
            </Stack>
        </Box>
    )
}
const errorIcon = [
    {
        id: 6,
        icon: HeadsetMicOutlinedIcon,
        text: 'Phụ kiện thiết bị số',
        link: '/filter/15addfab-b507-47d7-a59c-1eb8415b29bd'
    },
    {
        id: 7,
        icon: AddAPhotoOutlinedIcon,
        text: 'Đồ chơi công nghệ',
        link: '/filter/dbe0ba5e-769d-4603-8df2-34e5f6c5c1ee'
    },
    {
        id: 8,
        icon: PhoneAndroidOutlinedIcon,
        text: 'Điện thoại',
        link: '/filter/cfc30bb7-d806-4912-a4cf-cfc1ccfce29c'
    },
    {
        id: 9,
        icon: DesktopWindowsOutlinedIcon,
        text: 'Tivi',
        link: '/filter/aade8eeb-5672-4628-83d4-814d9d50bfab'
    },
]

export default Error