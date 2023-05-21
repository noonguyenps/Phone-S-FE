import * as React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import apiProfile from "../../../../apis/apiProfile";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; 

function Password() {
  const [showPass, setShowPass] = React.useState(false);
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [newPassword, setnewPassword] = React.useState("");
  const [oldPassword, setoldPassword] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [newMessage, setNewMessage] = React.useState("")
  const [fontSizeMessage, setFontSizeMessage] = React.useState("")
  const navigate = useNavigate();
  const Rcolor = "#2196f3"
  const Fcolor = "#ee0033"
  const [color, setColor] = React.useState("");
  const [newcolor, setNColor] = React.useState("");
  
  const onChangeoldPassword = (event) => {
      setoldPassword(event.target.value)
  }
  
  const onChangenewPassword = (event) => {
    setnewPassword(event.target.value)
  }
  
  const onChangeconfirmPassword = (event) => {
    setconfirmPassword(event.target.value)
    if (newPassword.localeCompare(event.target.value) === 0) {
      setFontSizeMessage("13px")
      setNColor(Rcolor)
      setMessage("*Trùng khớp")
    }
    else {
      setFontSizeMessage("14px")
      setNColor(Fcolor)
      setMessage("*Mật khẩu không trùng khớp!")
    }
  }
  const handleChangePassword = () => {
      const params = {
        "confirmPassword": confirmPassword,
        "newPassword": newPassword,
        "oldPassword": oldPassword
      }
      apiProfile.putChangePassword(params)
        .then(response => {
          toast.success("Thay đổi mật khẩu thành công")
          navigate('/customer/account/edit');
        })
        .catch(error => {
          setFontSizeMessage("16px")
          setNColor(Fcolor)
        toast.error("Thay đổi không thành công!")
      })  
  }

  const passwordInput = (placeHolder, value, onChange) => {
    return (
      <TextField
     
        value={value}
        onChange = {onChange}
        size="small"
        label={placeHolder }
        type="password" autoComplete="new-password"
        name="pass"
      />
    );
  };

  return (
    <Stack sx={{ mt: "1rem" }} spacing={1}>
      <Typography variant="h6">Đổi mật khẩu</Typography>

      <Stack
        className="input-container__size"
        alignItems="center"
        justifyContent="center"
         sx={{position: 'relative'}}
      >
                <input name="phone" id='phone' type="text" style={{ position:'absolute', top:0, left:0,width:'0',height:'0',opacity:'0'}}/>

        <Stack className="customer-info__input-container" spacing={3}>
          {passwordInput("Nhập mật khẩu hiện tại", oldPassword, onChangeoldPassword)}

          <Stack>
            {passwordInput("Nhập mật khẩu mới", newPassword, onChangenewPassword)}
            <Box height="40px"><Typography fontSize="13px" color={color}>
              {newMessage}
            </Typography></Box>
            
          </Stack>

          {passwordInput("Nhập lại mật khẩu mới", confirmPassword, onChangeconfirmPassword)}
          <Box height="25px">
            <Typography fontSize={fontSizeMessage} color={newcolor}>
              {message}
            </Typography>
          </Box>
          
          <Button onClick={handleChangePassword} variant="contained">Lưu thay đổi</Button>
          
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Password;
