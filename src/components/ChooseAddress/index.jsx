import { useEffect, useState } from 'react'
import './ChooseAddress.scss'
import { Button, Modal, Box, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import apiAddress from '../../apis/apiAddress'
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setAddress } from '../../slices/paymentSlice';
import { useNavigate } from 'react-router-dom';
import AddressVN from '../AddressVN';

function ChooseAddress(props) {
    const [addresses, setAddresses] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    useEffect(() => {
        const getAddresses = () => {
            apiAddress.getUserAddress()
                .then(res => {
                    setAddresses(res.data?.addressList)
                })
        }
        getAddresses()
    }, [])

    const chooseAddressShip = (address)=>{
        props.handleClose()
        dispatch(setAddress(address))
    }
    const updateAddres = (id)=>{
        props.handleClose()
        navigate(`/customer/address/edit/${id}`)
    }

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <Box className='choose-address'>
                <Stack direction='row' className="choose-coupon__heading">
                    <span>Chọn địa chỉ</span>
                    <CloseIcon onClick={props.handleClose} height="24px" />
                </Stack>
                <Stack spacing={5}>{
                    addresses?.map((item) => {
                        return (
                            <Stack
                                direction="row"
                                width="100%"
                                className="items"
                                key={item.id}
                            >
                                <Stack className="info">
                                    <Typography className="name">{item.fullName}</Typography>
                                    <Typography className="address">Địa chỉ cụ thể : {item.addressDetail}, <AddressVN province={item.province} district={item.district} commune={item.commune}></AddressVN></Typography>
                                    <Typography className="number">Điện thoại: {item.phoneNumber}</Typography>
                                </Stack>
                                <Stack direction="row" className="action">
                                    <Button onClick={()=>updateAddres(item.id)} className="Modify" variant="text">
                                        Chỉnh sửa
                                    </Button>
                                    <Button onClick={()=>chooseAddressShip(item)} className="Delete" variant="text">
                                        Chọn
                                    </Button>
                                </Stack>
                            </Stack>
                        );
                    })
                }</Stack>

            </Box>
        </Modal>
    )
}

ChooseAddress.propsTypes = {
    open: PropTypes.bool,
    handleOpen: PropTypes.func,
    handleClose: PropTypes.func,
    chooseAddressShip: PropTypes.func
}
export default ChooseAddress