import { useEffect, useState } from 'react'
import './Notifications.scss'
import { Button, Modal, Box, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import apiNotify from '../../apis/apiNotify';
import PropTypes from 'prop-types';

function Notifications(props) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getNotifications = async () => {
            const response = await apiNotify.getNotification();
            if (response) {
                setNotifications(response.data.listNotification);
            }
          };
          getNotifications();
    }, [])
    const convertDate = (date)=>{
        var dateNew = new Date(date)
        return String(dateNew.getDay()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
      };
    const handleChooseCoupon = (item) => {
        apiNotify.deleteNotification(item.id).then((res)=>{
            props.handleClose()
        }).catch((err)=>{
            console.log(err)
            props.handleClose()
        })
    }
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className='choose-coupon'>
                <Stack direction='row' className="choose-coupon__heading">
                    <span>Thông báo của bạn</span>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Box className="choose-coupon__content" sx={{overflowY: "scroll", height:'400px'}}>
                    <Stack className="choose-coupon__list">
                        {
                            notifications.map(item =>
                                <Box key={item.id}>
                                    <Stack direction='row' justifyContent="space-between" alignItems="center">
                                        <Stack>
                                        <Typography>{item.message}</Typography>
                                        <Typography sx={{color: "#787878", fontSize: "15px", fontWeight: "400", marginBottom: "0px", marginTop: "auto",}}>
                                                    NTB: {convertDate(item.dateCreate)}
                                        </Typography>
                                        </Stack>
                                        <Button onClick={() => handleChooseCoupon(item)} variant="contained">Xóa</Button>
                                    </Stack>
                                </Box>
                            )
                        }
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

Notifications.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseCoupon: PropTypes.func
}

export default Notifications