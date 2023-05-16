import { Box, Stack, Link, Button, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import apiAuth from "../../apis/apiAuth";
import { loginSuccess} from "../../slices/authSlice";
import {useNavigate} from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";


import "./ManagerLogin.scss";

function ManagerLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [phone, setPhone] = useState("");
  const [passsword, setPassWord] = useState("");
  const [message,setMessage] = useState("");


  function handleSubmit(){
    if(phone===''||passsword===''){
      setMessage('Số điện thoại hoặc mật khẩu không được bỏ trống');
      return;
    }
    let params = {
      password: passsword,
      phone: phone,
    };

    apiAuth
      .postManagerLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        navigate("/manager/order")
      })
      .catch((error) => {
        setMessage('Số điện thoại hoặc mật khẩu không chính xác');
      });
  };

  return (
    <Box className="app">
      <Box className="login-form" spacing={2}>
        <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} justifyContent="center" alignItems="center">
        <Link to={"/"}>
          <Stack spacing={1} pt={1}>
            <img
              alt=""
              style={{ width: "110px", height: "70px" }}
              src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
            />
          </Stack>
        </Link>
          <div className="title">Page Manager</div>
        </Stack>
        <Stack>
          <Box className="form">
            <Stack justifyContent="center" alignItems="center" spacing={2} paddingTop={4}>
              <TextField
                required
                label="Số điện thoại"
                id="outlined-required"
                value={phone}
                size="small"
                onChange={(event) => {
                  setPhone(event.target.value)}}
              />
              <TextField
                id="outlined-size-small"
                required
                label="Mật khẩu"
                type="password"
                value={passsword}
                autoComplete="current-password"
                size="small"
                onChange={(event) => {
                  setPassWord(event.target.value)}}
              />
              <Typography sx={{fontSize:14,color:'#d03737', width:200, textAlign:'center'}}>{message}</Typography>
              <Button onClick={() =>(handleSubmit())} variant="contained">Đăng nhập</Button>
            </Stack>
          </Box>
        </Stack>
        
      </Box>
    </Box>
  );
}

export default ManagerLogin;