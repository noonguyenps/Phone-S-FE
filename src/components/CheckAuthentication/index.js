import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutSuccess } from '../../slices/authSlice'
import { toast } from 'react-hot-toast'
import jwt_decode from 'jwt-decode'
import { deleteAll } from '../../slices/cartSlice'
import { clearAll } from '../../slices/paymentSlice'

const privatePath = [
    '/customer/', '/admin/', '/payment',
]

function CheckAuthentication() {
    const user = useSelector(state => state.auth.user)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    useEffect(() => {
        const check = () => {
            const isPrivate = privatePath.findIndex(e => location.pathname.includes(e)) >= 0 ? true : false

            if (user) {
                if (user.refreshToken) {
                    const tokenDecode = jwt_decode(user.refreshToken)
                    let date = new Date();
                    if (tokenDecode.exp < date.getTime() / 1000) {
                        toast.error("Đăng nhập để tiếp tục")
                        dispatch(logoutSuccess())
                        dispatch(deleteAll())
                        dispatch(clearAll())
                        if (isPrivate)
                            navigate('/')

                    }
                }
                else {
                    dispatch(logoutSuccess())
                    dispatch(deleteAll())
                    dispatch(clearAll())
                    toast.error("Đăng nhập để tiếp tục")
                    if (isPrivate)
                        navigate('/')
                }
            }
            else {
                if (isPrivate)
                    navigate('/')
            }
        }
        check()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return
}

export default CheckAuthentication