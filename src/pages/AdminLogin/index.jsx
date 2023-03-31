import { Box, Stack, Link, Button, Typography, TextField } from "@mui/material";
import React, { useState } from "react";
import apiAuth from "../../apis/apiAuth";
import { loginSuccess} from "../../slices/authSlice";
import {useNavigate} from 'react-router-dom';
import { useDispatch , useSelector} from "react-redux";


import "./AdminLogin.scss";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [phone, setPhone] = useState("");
  const [passsword, setPassWord] = useState("");

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  function handleSubmit(){
    let params = {
      password: passsword,
      phone: phone,
    };

    apiAuth
      .postAdminLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        navigate("/admin")
      })
      .catch((error) => {
        setErrorMessages({ name: "pass", message: errors.pass });
      });
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <Box className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </Box>
  );

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
          <div className="title">Page Admin</div>
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
              <Button onClick={() =>(handleSubmit())} variant="contained">Login</Button>
            </Stack>
          </Box>
        </Stack>
        
      </Box>
    </Box>
  );
}

export default AdminLogin;