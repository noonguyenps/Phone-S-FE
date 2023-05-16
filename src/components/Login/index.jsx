import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";
import { loginSuccess} from "../../slices/authSlice";
import { useDispatch , useSelector} from "react-redux";
import apiAuth from "../../apis/apiAuth";


import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import {
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import Loading from "../Loading";
import { toast } from "react-hot-toast";
import apiCart from "../../apis/apiCart";
import { deleteAll } from "../../slices/cartSlice";

function Login(props) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPass, setIsShowPass] = React.useState(false);

  const [isNoAccount, setIsNoAccount] = useState(false);

  const [wrongPass, setWrongPass] = useState(false);

  const [loading, setLoading] = useState(false);
  const CartItems = useSelector(state => state.cart.items)

  const onSubmit = (data) => {
    if (loading) {
      toast.error(
        "Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh"
      );
      return;
    }
    setLoading(true);
    let params = {
      password: data.pass,
      phone: data.phoneNumber,
    };

    apiAuth
      .postLogin(params)
      .then((res) => {
        let { accessToken, refreshToken, user } = res.data;
        dispatch(loginSuccess({ accessToken, refreshToken, ...user }));
        props.closeModalLogin();
        for(let item in CartItems){
          apiCart.addProductToCart({listAttribute:CartItems[item].optionId, productId: CartItems[item].id, quantity:CartItems[item].quantity})
        }
        dispatch(deleteAll())
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === "No account found") {
          setIsNoAccount(true);
          setWrongPass(false);
        } else {
          setIsNoAccount(false);
          setWrongPass(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <Stack direction="row" height='480px' width='300px'>
      <Stack direction="column" sx={{ flex: 4 }} spacing={2}>
        <center>
        <h4 style={{ fontSize: "24px" }} text-align='center'>Đăng nhập</h4>
        </center>
        <form>
          <Stack spacing={2}>
            <Stack>
              <TextField
                {...register("phoneNumber", {
                  required: "Hãy nhập số điện thoại",
                  pattern: {
                    value: /\d+/,
                    message: "Số điện thoại không hợp lệ",
                  },
                  minLength: {
                    value: 10,
                    message: "Số điện thoại phải có ít nhất 10 chữ số",
                  },
                })}
                label="Số Điện Thoại"
                variant="standard"
              />
              {errors.phoneNumber && (
                <ErrorInput message={errors.phoneNumber.message} />
              )}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel>Mật khẩu</InputLabel>
              <Input
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                variant="standard"
                type={isShowPass ? "text" : "password"}
              />
              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            {isNoAccount && (
              <ErrorAfterSubmit message="Số điện thoại chưa được đăng ký" />
            )}

            {wrongPass && (
              <ErrorAfterSubmit message="Mật khẩu đăng nhập không chính xác" />
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleSubmit(onSubmit)}
            >
              {loading && <Loading color="#fff" />}
              Đăng nhập
            </Button>
          </Stack>
        </form>
        <Stack alignItems="center">
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenForgetPwd}
          >
            {" "}
            Quên mật khẩu
          </span>
        </Stack>
        <p style={{ textAlign: "center" }}>
          Nếu bạn chưa có tài khoản?
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={props.handleOpenSignup}
          >
            {" "}
            Đăng ký
          </span>
        </p>
        <p style={{ textAlign: "center"}}>Hoặc tiếp tục bằng</p>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <a href={`https://phone-s.herokuapp.com/oauth2/authorization/facebook?redirect_uri=https://phone-s-fe.vercel.app/oauth2/redirect`} className="hre">
            <Box sx={{ width:300, padding:1, borderRadius:400,borderColor:'#000000',border: '1px solid grey'}}>
              <Stack direction='row' justifyContent="center" alignItems="center" spacing={2}>
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"/>
                <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                <defs>
                <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                <stop stop-color="#18ACFE"/>
                <stop offset="1" stop-color="#0163E0"/>
                </linearGradient>
                </defs>
              </svg>
              <p style={{ textAlign: "center"}}>Đăng nhập bằng Facebook</p>
              </Stack >
            </Box>
          </a>
          <a href={`https://phone-s.herokuapp.com/oauth2/authorization/google?redirect_uri=https://phone-s-fe.vercel.app/oauth2/redirect`} className="hre">
          <Box sx={{ width:300, padding:1, borderRadius:400,border: '1px solid grey'}}>
              <Stack direction='row' justifyContent="center" alignItems="center" spacing={2}>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="30" height="30"
              viewBox="0 0 48 48"
              style={{fill:"#000000"}}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
              <p style={{ textAlign: "center"}}>Đăng nhập bằng Google</p>
              </Stack >
            </Box>
          </a>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Login;
