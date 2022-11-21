import React from "react";
import { useEffect, useState } from "react";
import apiBrand from "../../../../apis/apiBrand";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploading from "react-images-uploading";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import "./UpdateBrand.scss";
import {
  Stack,
  Button,
  Typography,
  TextField,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  InputBase,
  Avatar,
  ListItemText,
  RadioGroup,
  Radio,
  FormControlLabel,
  hexToRgb,
  Modal,
  IconButton,
  Paper,
  CircularProgress,
  Divider,
  Badge,
  ClickAwayListener,
} from "@mui/material";
import { toast } from "react-toastify";
import { styled } from '@mui/material/styles';
import rev from "../../../../assets/img/test.png";
import SelectBoxAddress from "../../../../components/SelectBoxAddress";
import { useParams,useNavigate } from "react-router-dom";
function Loading(props) {

  return (
    <CircularProgress 
        sx={{
            color:props.color||"#1890ff",
            mr:"4px"
        }}
        size={props.size || 20}
        thickness={3}
        />

  )
}
function UpdateBrand(props) {
  const [review, setReview] = React.useState(rev)
  const [edit, setEdit] = useState(props.edit)
  const [brandImg,setBrandImg] = useState("")
  const [brand, setBrand] = useState([])
  const [country, setCountry] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [commune, setCommune] = useState("")
  const [name, setName] = useState("")
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState([]);
  const [url, setUrl] = useState("");
  const [openAvatar, setOpenAvatar] = useState(false);
  const [modalDeleteAvatar, setModalDeleteAvatar] = useState(false);
  const [modalViewAvatar, setModalViewAvatar] = useState(false);
  const [modalNational, setModalNational] = useState(false);
  const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
  const [description, setDescription] = useState("")
  const [phone, setPhone] = useState("")
  const [addressDetails, setAddressDetails] = useState("")
  const navigate = useNavigate();
  
  const idBrand=useParams().id
  useEffect(() => {
    const getData = async () => {
      let params = {"id":idBrand}
      apiBrand.getBrandByID(params)
        .then(res => {
          setBrand(res.data.brand);
          setName(res.data.brand.name);
          setDescription(res.data.brand.description);
          setCountry(res.data.brand.brandCountry);
          setCommune(res.data.brand.brandCommune);
          setDistrict(res.data.brand.brandDistrict);
          setProvince(res.data.brand.brandProvince);
          setAddressDetails(res.data.brand.addressDetails);
          setBrandImg(res.data.brand.img);
          setPhone(res.data.brand.phone);
        })
    };
    getData();
  }, []);

  const openModalNational = () => setModalNational(true);
  const closeModalNational = () => setModalNational(false);

  const openModalViewAvatar = () => setModalViewAvatar(true);
  const closeModalViewAvatar = () => setModalViewAvatar(false);

  const openModalUploadAvatar = () => setModalUploadAvatar(true);
  const closeModalUploadAvatar = () => setModalUploadAvatar(false);

  const openModalDeleteAvatar = () => setModalDeleteAvatar(true);
  const closeModalDeleteAvatar = () => setModalDeleteAvatar(false);
  const onChangeImg = (e) => {
    if (e.target.files.length > 0) {
      setReview(URL.createObjectURL(e.target.files[0]))
    }
  };
  const handleClickAvatar = () => {
    setOpenAvatar((prev) => !prev);
  };
  const handleClickAwayAvatar = () => {
    setOpenAvatar(false);
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };
  const handleUploadLogo = ()=>{
    if (image.length === 0) {
      toast.warning("Vui lòng chọn ảnh")
      return
    }
    if(uploading){
      toast.warning("Hình ảnh đang được cập nhật, vui lòng không thao tác quá nhiều lần")
      return
    }
    setUploading(true)
    let param = { file: image[0].file, id:brand.id }
    apiBrand.uploadLogoByID(param)
      .then(res => {
        toast.success("Tải logo thành công")
        setBrandImg(res.data.url);
        setUrl(res.data.url);
      })
      .catch(error => {
        toast.error("Tải logo thất bại")
      })
      .finally(() => {
        setUploading(false)
      })
  }

  const handleChangeProvince = (value) => {

    setProvince(value);
  };

  const handleChangeDistrict = (value) => {

    setDistrict(value);
  };


  const handleChangeCommune = (value) => {
    setCommune(value);
  };
  const handleUpdate = () => {
    const params = {
      addressDetails : addressDetails,
      country: country,
      commune: commune,
      description: description,
      district: district,
      name: name,
      phone: phone,
      province: province,
      img:brandImg
    }
    if(!(addressDetails&& country && commune && description && district && name && phone && province)) {
      toast.warning("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    else{
    apiBrand.updateBrand(params,idBrand)
      .then(res => {
        toast.success("Sửa thương hiệu thành công")
      })
      .catch(error => {
        toast.error("Sửa thương hiệu thất bại!")
      })
    }
  }
  return (
    <Box width={'100%'} bgcolor='#fff'>
      <Stack className="cruBrand" p={3} justifyContent="center" width="700px" spacing={2} bgcolor='#fff'>
        <Stack direction="row">
          <Typography className="cruBrand__label">Nhập tên thương hiệu</Typography>
          <TextField placeholder={brand.name} value={name} onChange={(event) => { setName(event.target.value) }}
              size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>

        <Stack direction="row" >
          <Typography className="cruBrand__label">Mô Tả</Typography>
          <TextField placeholder={brand.description} value={description} onChange={(event) => { setDescription(event.target.value) }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <Stack direction="row" >
          <Typography className="cruBrand__label">Địa chỉ</Typography>
          <TextField placeholder={brand.addressDetails} value={addressDetails} onChange={(event) => { setAddressDetails(event.target.value) }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: "1" }} />
        </Stack>

        <Stack direction="row">
          <Typography  className="cruBrand__label">
            Quốc gia:
          </Typography>
          <FormControl className="create-address__input" sx={{flex:"1"}}>
            <InputLabel id="demo-simple-select-helper-label"></InputLabel>
            <Select
              sx={{ flex: 0.65 }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value="1"
              label="Age"
              onChange={e=>setCountry(e.target.value)}
              input={<InputCustom placeholder="Chọn Quận/Huyện" />}
            >
                 <MenuItem value={"1"}>Việt Nam</MenuItem>
              
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row">
          <Typography className="cruBrand__label">Liên hệ: </Typography>
          <TextField placeholder={brand.phone} value={phone} onChange={(event) => { setPhone(event.target.value) }} size="small" id="outlined-multiline-flexible"
            multiline
            maxRows={4} variant="outlined" sx={{ flex: "1" }} />
        </Stack>
        <SelectBoxAddress province={province} district={district} commune={commune}
          onChangeProvince={handleChangeProvince}
          onChangeDistrict={handleChangeDistrict}
          onChangeCommune={handleChangeCommune}
          classLabel="cruBrand__label"
        />
        <Modal
        sx={{ overflowY: "scroll" }}
        open={modalUploadAvatar}
        onClose={closeModalUploadAvatar}
      >
        <Stack sx={{ padding: "2rem" }} className="modal-info" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Cập nhật ảnh đại diện
            </Typography>

            <IconButton onClick={closeModalUploadAvatar}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Box>
            <ImageUploading
              value={image}
              onChange={onChange}
              dataURLKey="data_url"
              acceptType={["jpg"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <Box className="upload__image-wrapper">
                  {imageList.length === 0 ? (
                    <Stack
                      sx={{
                        width: "100%",
                        height: "30rem",
                        border: "2px dashed grey",
                        borderRadius: "5px",
                      }}
                      style={isDragging ? { color: "red" } : null}
                      justifyContent="center"
                      alignItems="center"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Typography
                        sx={{ ml: "auto", mr: "auto", color: "blue" }}
                      >
                        Nhấn để chọn hoặc kéo thả hình ảnh vào khung này.
                      </Typography>
                    </Stack>
                  ) : null}

                  {imageList.map((image,i) => (
                    <Stack
                      key={i}
                      sx={{
                        width: "100%",
                        height: "30rem",
                        borderRadius: "5px",
                      }}
                      spacing={3}
                      className="image-item"
                    >
                      <img
                        style={{
                          width: "25rem",
                          height: "25rem",
                          alignSelf: "center",
                        }}
                        src={image.data_url}
                        alt=""
                      />
                      <Stack
                        direction="row"
                        className="image-item__btn-wrapper"
                        justifyContent="center"
                        spacing={5}
                      >
                        <Button
                          sx={{ width: "50%" }}
                          variant="outlined"
                          onClick={() => onImageRemove(0)}
                        >
                          Hủy bỏ
                        </Button>
                        <Button
                          sx={{ width: "50%" }}
                          variant="contained"
                          onClick={handleUploadLogo}
                        >
                         {uploading&&<Loading color="#fff"/>} Lưu thay đổi
                        </Button>
                      </Stack>
                    </Stack>
                  ))}
                </Box>
              )}
            </ImageUploading>
          </Box>
        </Stack>
      </Modal>
        <Stack direction="row" p={2} paddingLeft={50}>
        <ClickAwayListener onClickAway={handleClickAwayAvatar}>
              <Box sx={{ position: "relative" }} onClick={handleClickAvatar}>
                <Badge
                  badgeContent={<EditRoundedIcon fontSize="30" color="white" />}
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  color="primary"
                >
                  <Avatar
                    sx={{
                      width: 110,
                      height: 110,
                      border: "3px solid aquamarine",
                    }}
                    src={image.length === 0 ? brandImg : "https://res.cloudinary.com/duk2lo18t/image/upload/v1661483634/brand_hjhaph.png"}
                  />
                </Badge>
                {openAvatar ? (
                  <Stack className="avatar-control">
                    <Stack autofocusitem={openAvatar.toString()}>
                      <MenuItem onClick={openModalUploadAvatar}>
                        <VisibilityOutlinedIcon
                          sx={{ mr: 2 }}
                          color="disabled"
                        />
                        Tải ảnh lên
                      </MenuItem>
                    </Stack>
                  </Stack>
                ) : null}
              </Box>
            </ClickAwayListener>
        </Stack>

        <Stack justifyContent="center">
            <Button width="450px" variant="contained" onClick={handleUpdate}>Cập nhật</Button>
        </Stack>
      </Stack>
    </Box>
  )
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

export default UpdateBrand;
