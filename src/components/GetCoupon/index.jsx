import { useEffect, useState } from 'react'
import './GetCoupon.scss'
import { Button, Modal, Box, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import apiCoupon from '../../apis/apiCoupon';
import PropTypes from 'prop-types';
import { numWithCommas } from '../../constraints/Util';

function GetCoupon(props) {
    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const getCoupons = async () => {
            let param = {
              page: 0,
              size: 20,
            };
            const response = await apiCoupon.getAllCouponsPublic(param);
            if (response) {
              setCoupons(response.data.listVoucher);
            }
          };
          getCoupons();
    }, [])
    const convertDate = (date)=>{
        var dateNew = new Date(date)
        return String(dateNew.getDate()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
      };
    const handleChooseCoupon = (item) => {
        apiCoupon.getCoupon(item.id).then((res)=>{
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
                    <span>Mã Khuyến mãi của bạn</span>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Box className="choose-coupon__content" sx={{overflowY: "scroll", height:'400px'}}>
                    <Stack direction='row' className="choose-coupon__content-heading">
                        <span>Mã giảm giá</span>
                        <span>Áp dụng tối đa: 1</span>
                    </Stack>
                    <Stack className="choose-coupon__list">
                        {
                            coupons.map(item =>
                                <Box key={item.id} className="coupon-item" >
                                    <Box className="coupon-item__img">
                                        <img src="https://res.cloudinary.com/duk2lo18t/image/upload/v1661389658/coupon_dc26by.png" alt="" />
                                    </Box>
                                    <Box className="coupon-item__content">
                                        <Box className="coupon-item__title">
                                            <Typography style={{ fontSize: "16px", margin: "0", color: '#000000'}}>
                                                Loại Giảm giá: {item.type}
                                            </Typography>
                                        </Box>
                                        <Box className="coupon-item__description">
                                            <Typography style={{fontSize: "18px",color: "#FF0000",}} className="text-overflow-2-lines">
                                               - {numWithCommas(item.value)} đ
                                            </Typography>
                                        </Box>
                                        <Stack className="coupon-item__apply" justifyContent="center" alignItems="center">
                                            <Stack direction='row' justifyContent="center" alignItems="center" spacing={5}>
                                            <Typography sx={{color: "#787878", fontSize: "15px", fontWeight: "400", marginBottom: "0px", marginTop: "auto",}}>
                                                NBD: {convertDate(item.fromDate)}
                                            </Typography>
                                            <Typography sx={{color: "#787878", fontSize: "15px", fontWeight: "400", marginBottom: "0px", marginTop: "auto",}}>
                                                NHH: {convertDate(item.toDate)}
                                            </Typography>
                                            </Stack>
                                            {(item.toDate>new Date().getTime()&&item.fromDate<new Date().getTime())?(
                                                <><Button onClick={() => handleChooseCoupon(item)} variant="contained" className="coupon-item__btn-apply">Nhận mã</Button></>
                                            ):(
                                                <><Button disabled='disabled' variant="contained" className="coupon-item__btn-apply">Nhận mã</Button></>
                                            )}
                                        </Stack>
                                    </Box>
                                </Box>
                            )
                        }
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}

GetCoupon.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseCoupon: PropTypes.func
}

export default GetCoupon