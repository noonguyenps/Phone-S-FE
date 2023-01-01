import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from '@mui/icons-material/ListAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiscountIcon from '@mui/icons-material/Discount';
import HomeIcon from '@mui/icons-material/Home';

export const sidebarTab = [
    {
        id:0,
        icon: HomeIcon,
        text: 'Trang chủ',
        link: '/customer/homepage'
    },
    {
        id: 1,
        icon: ListAltIcon,
        text: 'Lịch sử mua hàng',
        link: '/customer/order/history'
    },
    {
        id: 2,
        icon: FavoriteIcon,
        text: 'Sản phẩm yêu thích',
        link: '/customer/wishlist'
    },
    {
        id: 3,
        icon: DiscountIcon,
        text: 'Ưu đãi của bạn',
        link: '/customer/coupons'
    },
    {
        id: 4,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: '/customer/account/edit',
    },
]
