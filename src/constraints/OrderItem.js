import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CancelIcon from '@mui/icons-material/Cancel';



export const orderTabs = [
    {
        id: 0,
        type: "Tất cả",
        icon:""
    },
    {
        id: 1,
        type: "Đang xử lý",
        icon: AutoModeIcon
    },
    {
        id: 2,
        type: "Đang vận chuyển",
        icon: RocketLaunchIcon
    },
    {
        id: 3,
        type: "Đã giao",
        icon: LocalShippingIcon
    },
    {
        id: 4,
        type: "Đã huỷ",
        icon: CancelIcon
    },
]