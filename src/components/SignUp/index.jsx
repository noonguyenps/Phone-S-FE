import React from "react";
import { useForm } from "react-hook-form";

import apiAuth from "../../apis/apiAuth";

import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";

import {
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  Input,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {toast} from 'react-hot-toast'

function SignUp(props) {
  const [showPass, setShowPass] = React.useState(false);
  const [showPassConf, setShowPassConf] = React.useState(false);
  const [invalidPhone, setInvalidPhone] = React.useState(false);
  const [isDiffPass, setIsDiffPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCheckPass = () => {
    if (watch("pass") !== watch("passConf")) {
      setIsDiffPass(true);
    } else {
      setIsDiffPass(false);
      return true;
    }
  };

  async function checkPhone() {
    let param = {
      phone: watch("phoneNumber"),
    };
    const request = await apiAuth.postCheckPhone(param)  
    return request;
  }

  const onSubmit = async () => {
    const regex =
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    
    if(loading){
      toast.error("Thao tác đang thực hiện. Vui lòng không thao tác quá nhanh")
      return
    }
    setLoading(true)
    if (regex.test(watch("phoneNumber"))) {
      checkPhone().then((res)=>{
        if(res.status===302){
          setInvalidPhone(true);
          setLoading(false);
        }
        if(res.status===200){
          setInvalidPhone(false);
          let param = {
            password: watch("pass"),
            phone: watch("phoneNumber"),
          };
          
          apiAuth.postRegister(param).then(setIsSuccess(true)).finally(()=>setLoading(false));
        }
      })
    }else{
      toast.error('Số điện thoại không hợp lệ')
      setLoading(false);
    } 
  };

  return (
    <Stack direction="row">
      <Stack direction="column" sx={{ flex: 5 }} spacing={3}>
        <Typography variant="h5">Mời bạn đăng ký tài khoản</Typography>
        <form>
          <Stack spacing={1}>
            <Stack width="100%">
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
                label="Số điện thoại"
                variant="standard"
                sx={{ flex: 1 }}
              />
              {errors.phoneNumber && (
                <ErrorInput message={errors.phoneNumber.message} />
              )}
            </Stack>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập mật khẩu
              </InputLabel>
              <Input
                {...register("pass", {
                  required: "Hãy nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                variant="standard"
                type={showPass ? "text" : "password"}
              />

              {errors.pass && <ErrorInput message={errors.pass.message} />}
            </FormControl>

            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="outlined-adornment-password">
                Nhập lại mật khẩu
              </InputLabel>
              <Input
                {...register("passConf", {
                  required: "Hãy nhập lại mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
                id="password-config"
                type={showPassConf ? "text" : "password"}
              />

              {errors.passConf && (
                <ErrorInput message={errors.passConf.message} />
              )}
            </FormControl>

            <Stack sx={{ marginTop: "5rem" }}>
              {invalidPhone && (
                <ErrorAfterSubmit message="Số điện thoại đã được đăng ký" />
              )}
              {invalidPhone && (
                <ErrorAfterSubmit message="Số điện thoại đã được đăng ký" />
              )}
              {isDiffPass ? (
                <ErrorAfterSubmit message="Nhập lại mật khẩu không trùng với mật khẩu" />
              ) : null}
            </Stack>

            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="error"
            >
              Hoàn Tất
            </Button>

            {isSuccess && <SuccessRegister handleOpenLogin={props.handleOpenLogin} />}
          </Stack>
        </form>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Hoặc tiếp tục bằng
        </Typography>
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
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalLogin}>
          <CloseIcon />
        </IconButton>
      </span>
    </Stack>
  );
}

export default SignUp;

function SuccessRegister(props) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <CheckCircleOutlineIcon color="success" />
      <Typography sx={{ textAlign: "center" }}>Đăng ký thành công</Typography>
      <Button variant="text" onClick={props.handleOpenLogin}>
        Đăng nhập
      </Button>
    </Stack>
  );
}
