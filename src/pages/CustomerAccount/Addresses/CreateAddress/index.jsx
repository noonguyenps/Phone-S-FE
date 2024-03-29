 /* eslint-disable */
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  InputBase
} from "@mui/material";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import "./CreateAddress.scss";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import apiAddress from "../../../../apis/apiAddress";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function CreateAddress(props) {

  const [fullName, setFullName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [phone, setPhone] = useState("")
  const [addressDetail, setAddressDetail] = useState("")
  const [addressType, setAddressType] = useState("")
  const [addressid, setAddressid] = useState("")
  const [edit, setEdit] = useState(props.edit)
  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [commune, setCommune] = React.useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loaddata = () => {
      if (edit === true) {
        apiAddress.getUserAddress()
          .then(res => {
            const addresses = res.data.addressList
            if (addresses) {
              const address = addresses.find((item) => item.id === params.id)

              if (address) {
                setFullName(address.fullName)
                setCompanyName(address.companyName)
                setPhone(address.phoneNumber)
                setAddressDetail(address.addressDetail)
                setAddressType(address.addressType.id)
                setCommune(address.commune)
                setDistrict(address.district)
                setProvince(address.province)
              }
              else {
                navigate("/customer/address/create")
                toast.error("Địa chỉ này không tồn tại!")
              }
            }
            else {
              navigate("/customer/address/create")
              toast.error("Địa chỉ này không tồn tại!")
            }

          })
      }
      setAddressid(params.id)
    }
    loaddata()
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit])


  const handleChangeProvince = (value) => {

    setProvince(value);
  };

  const handleChangeDistrict = (value) => {

    setDistrict(value);
  };


  const handleChangeCommune = (value) => {
    setCommune(value);
  };
  const handleSave = () => {
    const params = {
      "addressDetail": addressDetail,
      "addressType": Number(addressType),
      "commune": String(commune),
      "companyName": companyName,
      "district": String(district),
      "fullName": fullName,
      "phone": phone,
      "province": String(province)

    }
    if(!(addressDetail&& addressType && commune && companyName && district && fullName && phone && province)) {
      toast.error("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
    apiAddress.saveAddress(params)
      .then(res => {
        toast.success("Thêm địa chỉ thành công")
        setFullName("")
        setCompanyName("")
        setPhone("")
        setAddressDetail("")
        setAddressType(1)
        setCommune("")
        setDistrict("")
        setProvince("")
      })
      .catch(error => {
        toast.error("Thêm địa chỉ thất bại!")
      })
    }
  }

  const handleUpdate = () => {
    const params = {
      "addressDetail": addressDetail,
      "addressType": Number(addressType),
      "commune": commune,
      "companyName": companyName,
      "district": district,
      "fullName": fullName,
      "phone": phone,
      "province": province
    }
    if(!(addressDetail&& addressType && commune && companyName && district && fullName && phone && province)) {
      toast.error("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    apiAddress.updateUserAddressById(params, addressid)
      .then(res => {
        toast.success("Cập nhật thành công")
      })
      .catch(error => {
        toast.error("Cập nhật thất bại!")
      })
  }

  return (
    
    <Box className="create-address" p={2} m={2}>
      <Typography variant="h6">Thêm địa chỉ</Typography>
      <Stack p='2rem' spacing={1.875}>
        <Stack direction="row">
          <Typography className="create-address__label">
            Họ và tên:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom sx={{width:'153%'}} value={fullName} onChange={(event) => {
              setFullName(event.target.value)
            }}
              placeholder="Họ và tên người nhận hàng"
              size="small"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Công ty:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom sx={{width:'153%'}} value={companyName} onChange={(event) => {
              setCompanyName(event.target.value)
            }}
              size="small"
              placeholder="Tên công ty (nếu có)"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Số điện thoại:
          </Typography>
          <Stack className="create-address__input">
            <InputCustom sx={{width:'153%'}} value={phone} onChange={(event) => {
              setPhone(event.target.value)
            }}
              size="small"
              placeholder="SĐT người nhận hàng"
            ></InputCustom>
          </Stack>
        </Stack>

        <SelectBoxAddress province={province} district={district} commune={commune}
          onChangeProvince={handleChangeProvince}
          onChangeDistrict={handleChangeDistrict}
          onChangeCommune={handleChangeCommune}
        />
        <Stack direction="row">
          <Typography className="create-address__label">
            Địa chỉ
          </Typography>
          <Stack className="create-address__input">
            <InputCustom sx={{width:'153%'}} value={addressDetail} onChange={(event) => {
              setAddressDetail(event.target.value)
            }}
              multiline
              rows={4}
              size='small'
              placeholder="Địa chỉ cụ thể"
            ></InputCustom>
          </Stack>
        </Stack>

        <Stack direction="row">
          <Typography className="create-address__label">
            Loại địa chỉ:
          </Typography>
          <RadioGroup value={addressType} onChange={(event) => { setAddressType(event.target.value) }} row>
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Nhà riêng"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Công ty"
            />
          </RadioGroup>
        </Stack>
        <Stack direction="row" alignItems='center' justifyContent='center'>
          <Button
            onClick={handleSave} className="btn__Update" variant="contained">
            Thêm địa chỉ
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

const InputCustom = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    boxSizing: "border-box",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    display: "flex",
    height: "40px !important",
    padding: '0px 26px 0px 12px',
    alignItems: "center",
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#1890ff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default CreateAddress;
