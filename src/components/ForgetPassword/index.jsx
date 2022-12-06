/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorInput, ErrorAfterSubmit } from "../ErrorHelper";

import apiAuth from "../../apis/apiAuth";

import {
  Stack,
  IconButton,
  Button,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";

function ForgetPassword(props) {
  //const dispatch = useDispatch();
  const [isNoAccount, setIsNoAccount] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleCheckPhone = async () => {
    let param = {
      phone: watch("phoneNumber"),
    };
    await apiAuth
      .postCheckPhone(param)
      .then((res) => {
        if(res.status === 302){
          setIsNoAccount(false);
        }
        if(res.status === 200){
          setIsNoAccount(true);
        }
      })
      .catch((error) => {
        setIsNoAccount(false);
      });
  };


  return (
    <Stack direction="row">
      <Stack sx={{ flex: 5 }} spacing={2}>
        <Box>
          <IconButton onClick={props.handleReturnLogin}>
            <ArrowBackIosIcon />
          </IconButton>
        </Box>
        <h4 style={{ fontSize: "24px" }}>Quên mật khẩu ?</h4>
        <p style={{ fontSize: "15px" }}>
          Vui lòng nhập thông tin tài khoản để lấy lại mật khẩu
        </p>
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
                label="Số Điện Thoại/ Email"
                variant="standard"
              />
              {errors.phoneNumber && (
                <ErrorInput message={errors.phoneNumber.message} />
              )}
            </Stack>

            {isNoAccount && (
              <ErrorAfterSubmit message="Số điện thoại chưa được đăng ký" />
            )}

            <Button
              variant="contained"
              color="error"
              onClick={handleCheckPhone}
            >
              Lấy lại mật khẩu
            </Button>
          </Stack>
        </form>
      </Stack>
      <span style={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={props.closeModalForgetPWD}>
          <CloseIcon />
        </IconButton>
      </span>

    </Stack>
  );
}

export default ForgetPassword;
