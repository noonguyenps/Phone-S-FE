import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import apiCart from '../../apis/apiCart';

function SuccessPayment() {
    let {id} = useParams();
    const location = useLocation()
    const navigate = useNavigate()
    const [success, setSuccess] = useState();
    const [count, setCount] = useState(10) //xử lý đếm ngược

    useEffect(()=>{
        const getData = async () => {
            apiCart.getPaymentStatus(id).then(res=>{
                setSuccess(res.success)
            })
          };
          getData();
    },[])

    useEffect(() => {
        const countDown = () => {//hàm xử lý đếm ngược 5s sau khi kích hoạt xong
            setTimeout(() => {
                if (count > 0) {
                    setCount(pre => pre - 1)
                }
                else {
                    navigate(`/customer/order/detail/${id}`)
                }
            }, 1000)
        }
        countDown();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count])


    return (
        <Stack height="400px" justifyContent={'center'} alignItems='center'>
            <Stack alignItems='center' spacing={2}>
                {
                    success===true?(<><Typography>Thanh toán thành công</Typography>
                    <img src="https://res.cloudinary.com/duk2lo18t/image/upload/v1672657257/OIP__1_-removebg-preview_bqamdw.png" width='200px' height='200px'></img></>)
                    :(<>
                    <Typography>Thanh toán không thành công</Typography>
                    <img src="https://res.cloudinary.com/duk2lo18t/image/upload/v1672657456/OIP__2_-removebg-preview_zvbzt2.png" width='200px' height='200px'></img></>)
                }
                <Link to={`/customer/order/detail/${id}`}>Chuyển đến thông tin đơn hàng trong {count} giây</Link>
            </Stack>
        </Stack>
    )
}


export default SuccessPayment