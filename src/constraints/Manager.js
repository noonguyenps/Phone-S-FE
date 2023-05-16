import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';


export const sidebarManager = [
    {
        id: 1,
        text: 'Trang chủ',
        icon: LeaderboardOutlinedIcon,
        link: '/manager'
    },
    {
        id: 4,
        text: 'Công cụ khuyến mãi',
        icon: LoyaltyOutlinedIcon,
        link: '/manager/coupon'
    },
    {
        id: 5,
        text: 'Sản phẩm',
        icon: LaptopChromebookOutlinedIcon,
        link: '/manager/product'
    },
    {
        id: 7,
        text: 'Đơn hàng',
        icon: ShoppingCartOutlinedIcon,
        link: '/manager/order'
    },
    {
        id: 8,
        text: 'Quản lý đánh giá',
        icon: RateReviewOutlinedIcon,
        link: '/manager/rating'
    },
]