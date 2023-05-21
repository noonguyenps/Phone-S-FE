import { Box, Stack, InputBase, Typography, Button, TextField } from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import * as React from "react";
import apiProfile from "../../../../apis/apiProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loginSuccess} from '../../../../slices/authSlice'
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PhoneNumber() {
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [message, setMessage] = React.useState("");
  const [fcolor, setColor] = React.useState("#ee0033");
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user);
  const [noPassword,setNoPassword]= React.useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    const loaddata = () => {
       apiProfile.checkPassword()
       .then(res => {setNoPassword(true)}
       )
    }
    loaddata()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },{})
  

  const onChangePhone = (event) => {
    setPhone(event.target.value);
    const regex =
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (regex.test(event.target.value)) {
      setMessage("");
    } else {
      setMessage("*Số điện thoại không hợp lệ");
    }
  };
  const onChangePassword = (event) =>{
    setPassword(event.target.value);
  }
  const onChangeRetypePassword = (event) =>{
    setRetypePassword(event.target.value);
  }

  const handleChange = () => {
    const params = {
      phone: phone
    };
    apiProfile
      .putChangePhone(params)
      .then((response) => {
        setColor("#2196f3")
        toast.success("Thay đổi thành công")
        getUserProfile();
        navigate('/customer/account/edit')
      })
      .catch((error) => {
        setColor("#ee0033")
        setMessage("Thay đổi không thành công!");
      });
  };

  const handleChangePassword = () => {
    const params = {
      phone: phone,
      password: password,
      retypePassword
    };
    apiProfile
      .putChangePhonePassword(params)
      .then((response) => {
        setColor("#2196f3")
        toast.success("Thay đổi thành công")
        getUserProfile();
        navigate('/customer/account/edit')
      })
      .catch((error) => {
        setColor("#ee0033")
        setMessage("Thay đổi không thành công!");
      });
  };
  

  const getUserProfile = () => {
    apiProfile.getUserProfile()
      .then((res) => {
        let newUser = res.data.user
        dispatch(loginSuccess({ ...user, ...newUser }))
      })
  }
  return (
    <Box sx={{ mt: "1rem" }}>
      <Typography variant="h6" >Cập nhật số điện thoại</Typography>

      <Stack
        className="input-container__size"
        alignItems="center"
        justifyContent="center"
      >
        {
          noPassword?(
          <>
            <Stack className="customer-info__input-container">
            <Typography>Số điện thoại</Typography>

            <Stack spacing={2}>
                <TextField 
                  placeholder="Nhập số điện thoại"
                  size='small'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneOutlinedIcon sx={{ ml: "6px" }} color="disabled" />
                      </InputAdornment>
                    ),
                  }}
                  value={phone}
                  onChange={onChangePhone} />
              <Box height="20px">
                <Typography color={fcolor} fontSize="14px" >{message}</Typography>
              </Box>
              <Typography>Mật khẩu</Typography>
              <TextField 
                  placeholder="Mật khẩu"
                  size='small'
                  type="password"
                  value={password}
                  onChange={onChangePassword} />
              <Typography>Nhập lại mật khẩu</Typography>
              <TextField 
                  placeholder="Nhập lại mật khẩu"
                  size='small'
                  type='password'
                  value={retypePassword}
                  onChange={onChangeRetypePassword} />
              <Button variant="contained"
                onClick={(event) => {
                  handleChangePassword(event);
                }}>Lưu thay đổi</Button>
            </Stack>
          </Stack>
          </>):
          (<>
            <Stack className="customer-info__input-container">
            <Typography>Số điện thoại</Typography>

            <Stack spacing={2}>
                <TextField 
                  placeholder="Nhập số điện thoại"
                  size='small'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneOutlinedIcon sx={{ ml: "6px" }} color="disabled" />
                      </InputAdornment>
                    ),
                  }}
                  value={phone}
                  onChange={onChangePhone} />
              <Box height="20px">
                <Typography color={fcolor} fontSize="14px" >{message}</Typography>
              </Box>
              <Button variant="contained"
                onClick={(event) => {
                  handleChange(event);
                }}>Lưu thay đổi</Button>
            </Stack>
          </Stack>
          </>)
        }
      </Stack>
    </Box>
  );
}

export default PhoneNumber;
