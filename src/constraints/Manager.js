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
        id: 2,
        text: 'Công cụ khuyến mãi',
        icon: LoyaltyOutlinedIcon,
        link: '/manager/coupon'
    },
    {
        id: 3,
        text: 'Sản phẩm',
        icon: LaptopChromebookOutlinedIcon,
        link: '/manager/product'
    },
    {
        id: 4,
        text: 'Đơn hàng',
        icon: ShoppingCartOutlinedIcon,
        link: '/manager/order'
    },
    {
        id: 5,
        text: 'Quản lý đánh giá',
        icon: RateReviewOutlinedIcon,
        link: '/manager/rating'
    },
]