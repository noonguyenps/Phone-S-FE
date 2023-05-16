import {useState} from "react";
import { Link } from "react-router-dom";
import ImageUploading from "react-images-uploading";
import { renderToString } from 'react-dom/server'
import { toast } from 'react-hot-toast';
import { loginSuccess } from '../../../slices/authSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import "./Info.scss";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import avatar from "../../../assets/img/avatar.png"

import {
  Avatar,
  Typography,
  Stack,
  Button,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  hexToRgb,
  Modal,
  Box,
  IconButton,
  Divider,
  Badge,
  ClickAwayListener,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useSelector } from "react-redux";
import AddressVN from "../../../components/AddressVN";

import apiProfile from "../../../apis/apiProfile";
import Loading from "../../../components/Loading";



function Info() {
  const Gender = [{ id: "0", name: "Male", display:"Nam" }, { id: "1", name: "Female", display:"Nữ" }, { id: "2", name: "Null", display:"Không xác định" }];
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const [commune, setCommune] = useState(user?.address[0]?.commune);
  const [district, setDistrict] = useState(user?.address[0]?.district);
  const [province, setProvince] = useState(user?.address[0]?.province);
  const [country, setCountry] = useState(user.country ? user.country : "1");
  const [gender, setGender] = useState(user.gender ? Gender.find(item => item.name === user.gender) : null);
  const [image, setImage] = useState([]);
  const [addressDetail, setAddressDetail] = useState(user?.address[0]?.addressDetail)
  const [email,setEmail] = useState(user.email);
  const [changeBirthday,setChangeBirthday] = useState(false); 
  const [phone,setPhone] = useState(user.phone)
  const [fullname, setFullName] = useState(user.fullName)
  const [nickname, setNickName] = useState(user.nickName)
  const [birthDate, setBirthDate] = useState(user.birthDate)
  const [modalDeleteAvatar, setModalDeleteAvatar] = useState(false);
  const [modalViewAvatar, setModalViewAvatar] = useState(false);
  const [modalNational, setModalNational] = useState(false);
  const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [createAt, setCreateAt] = useState(user.createAt);
  const navigate = useNavigate();

  const openModalNational = () => setModalNational(true);
  const closeModalNational = () => setModalNational(false);

  const openModalViewAvatar = () => setModalViewAvatar(true);
  const closeModalViewAvatar = () => setModalViewAvatar(false);

  const openModalUploadAvatar = () => setModalUploadAvatar(true);
  const closeModalUploadAvatar = () => setModalUploadAvatar(false);

  const openModalDeleteAvatar = () => setModalDeleteAvatar(true);
  const closeModalDeleteAvatar = () => setModalDeleteAvatar(false);

  const handleClickAvatar = () => {
    setOpenAvatar((prev) => !prev);
  };
  const handleClickAwayAvatar = () => {
    setOpenAvatar(false);
  };
  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };


  const handleUploadAvatar = ()=>{
    if (image.length === 0) {
      toast.error("Vui lòng chọn ảnh")
      return
    }
    if(uploading){
      toast.error("Hình ảnh đang được cập nhật, vui lòng không thao tác quá nhiều lần")
      return
    }
    setUploading(true)
    let param = { file: image[0].file }
    apiProfile.putUploadAvatar(param)
      .then(res => {
        toast.success("Cập nhật ảnh đại diện thành công")
        getUserProfile()
      })
      .catch(error => {
        toast.error("Cập nhật ảnh đại diện thất bại")
      })
      .finally(() => {
        setModalUploadAvatar(false);
        setUploading(false)
      })
  }

  const handleDeleteAvatar = ()=>{
    let imgDefault = {data_url:avatar,
      file:new File([avatar], "avatar", {
      type: 'image/png'})}

      let param = { file: imgDefault.file }
    apiProfile.putUploadAvatar(param)
      .then(res => {
        toast.success("Xoá ảnh đại diện thành công")
        getUserProfile()
      })
      .catch(error => {
        toast.error("Xoá ảnh đại diện thất bại")
      })
      setModalDeleteAvatar(false);
  }
  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  }
  const onChangeNickName = (event) => {
    setNickName(event.target.value);
  }
  const onChangeBirthdayStatus = (event) => {
    setChangeBirthday(true);
  }
  const onChangeBirthDate = (event) => {
    setBirthDate(event.target.value);
  }
  const onChangeGender = (event) => {
    setGender(Gender.find(item => item.id === event.target.value));
  }
  const onSaveChange = () => {
    if (!(birthDate && country && fullname && gender && nickname)) {
      toast.error("Vui lòng nhập đầy đủ thông tin !!");
      return
    }
    let genderStr = 'Male'
    if(gender.id === '1'){
      genderStr = "Female"
    }
    else if(gender.id === '2'){
      genderStr = "Null"
    }
    const params = {
      birthDate: birthDate,
      country: country,
      fullName: fullname,
      gender: genderStr,
      nickName: nickname
    };
    setUpdating(true)
    apiProfile
      .putChangeInfo(params)
      .then((response) => {
        toast.success("Thay đổi thành công");
        getUserProfile();
      })
      .catch((error) => {
        toast.error("Thay đổi không thành công");
        console.log(error)
      })
      .finally(()=>setUpdating(false))
  };
  const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDate()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };
  const getUserProfile = () => {
    apiProfile.getUserProfile()
      .then((res) => {
        let newUser = res.data.user
        dispatch(loginSuccess({ ...user, ...newUser }))
      })
  }
  return (
    <Stack className="customer-info" justifyContent="center" alignItems="center" spacing={3}  paddingTop={2}>
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
                    src={image.length === 0 ? user.img : image[0].data_url}
                  />
                </Badge>
                {openAvatar ? (
                  <Stack className="avatar-control">
                    <Stack autofocusitem={openAvatar.toString()}>
                      <MenuItem onClick={openModalViewAvatar}>
                        <WallpaperIcon sx={{ mr: 2 }} color="disabled" />
                        Xem ảnh đại diện
                      </MenuItem>

                      <MenuItem onClick={openModalUploadAvatar}>
                        <VisibilityOutlinedIcon
                          sx={{ mr: 2 }}
                          color="disabled"
                        />
                        Cập nhật ảnh đại diện
                      </MenuItem>
                      <MenuItem onClick={openModalDeleteAvatar}>
                        <DeleteIcon sx={{ mr: 2 }} color="disabled" />
                        Xóa ảnh đại diện hiện tại
                      </MenuItem>
                    </Stack>
                  </Stack>
                ) : null}
              </Box>
      </ClickAwayListener>
      <Typography>{fullname}</Typography>
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
        <label>Họ và tên</label>
        <input id="input-name" placeholder="Thêm họ tên" type="text"
          value={fullname}
          onChange={onChangeFullName}/>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
            <label>Giới tính</label>
            <Button variant="outlined"
              onClick={openModalNational}
              endIcon={<KeyboardArrowDownIcon />}
              color="inherit"
              sx={{ color: hexToRgb("#ACABAB"), width: "60%" }}
            >
              {gender?.id==='0' ? 'Nam' : (gender?.id==='1'?'Nữ':'Không xác định')}
            </Button>
          </Stack>
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
        <label>Nickname</label>
        <input
          id="input-nickname"
          placeholder="Thêm nickname"
          type="text"
          value={nickname}
          onChange={onChangeNickName}/>
      </Stack>
      <Stack direction='row' justifyContent="center" paddingLeft={8}>
        <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
          <label>Số điện thoại*</label>
          <input
            id="input-nickname"
            placeholder="Chỉnh sửa số điện thoại"
            type="text"
            value={phone}
            disabled="disabled"/>
            </Stack>
            <Button><a href="edit/phone"><EditRoundedIcon/></a></Button>
      </Stack>
      <Stack direction='row' justifyContent="center" paddingLeft={8}>
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
            <label>Email</label>
            <input
             id="input-nickname"
             disabled="disabled"
             type="text"
             value={email}/>
          </Stack>
          <Button><a href="edit/email"><EditRoundedIcon/></a></Button>
      </Stack>
      {
        changeBirthday?(
          <>
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
            <label>Sinh nhật</label>
            <input
             id="input-nickname"
             type="date"
             value={birthDate}
             onChange={onChangeBirthDate}/>
          </Stack>
          </>
        ):(
          <>
          <Stack direction='row' justifyContent="center" paddingLeft={8}>
          <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
            <label>Sinh nhật</label>
            <input
             id="input-nickname"
             disabled="disabled"
             type="text"
             value={convertDate(birthDate)}/>
          </Stack>
          <Button onClick={onChangeBirthdayStatus}><EditRoundedIcon/></Button>
          </Stack>
          </>
        )
      }
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="space-between" width={'400px'}>
        <label>Ngày tạo</label>
        <input
          id="input-phone"
          disabled="disabled"
          type="text"
          value={convertDate(createAt)}/>
      </Stack>
      <Stack direction='row' justifyContent="center" paddingLeft={8}>
          <Stack direction="row" spacing={7} alignItems="center" justifyContent="space-between" width={'400px'}>
            <label>Địa chỉ</label>
            <Stack>
            <span>{addressDetail}</span><AddressVN province={Number(province)} district={district} commune={commune}></AddressVN>
            </Stack>
          </Stack>
          <Button><a href="/customer/address"><EditRoundedIcon/></a></Button>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="center" width={'400px'}>
            <Link to="/customer/account/edit/pass">
              <Button variant="outlined" sx={{ width: '400px', padding: 1, margin: 1 }}>
                Đổi mật khẩu
              </Button>
            </Link>
      </Stack>
      <Stack direction="row" spacing={5} alignItems="center" justifyContent="center" width={'420px'}>
      <Button variant="contained" sx={{ width: '600px', padding: 1, margin: 1 }} onClick={onSaveChange}>{updating&&<Loading color="#fff"/>}Lưu thay đổi</Button>
      </Stack>

      {/* Modal nationality  */}
      <Modal open={modalNational} onClose={closeModalNational}>
        <Box sx={{ width: "30rem", top: "30%" }} className="modal-info">
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Chọn giới tính
            </Typography>
            <IconButton onClick={closeModalNational}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <RadioGroup
            value={gender ? gender.id : null}
            onChange={onChangeGender}
          >
            {Gender.map(item =>
              <FormControlLabel
                key={item.id}
                value={item.id}
                control={<Radio />}
                label={item.display}
              />
            )}

          </RadioGroup>

          <Button
            variant="contained"
            sx={{ alignSelf: "center", mr: "auto", ml: "auro", width: "100%" }}
            onClick={closeModalNational}
          >
            Lưu thay đổi
          </Button>
        </Box>
      </Modal>

      {/* Modal view avatar */}
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalViewAvatar}
        onClose={closeModalViewAvatar}
      >
        <Stack className="modal-info" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2">
              Xem ảnh đại diện
            </Typography>
            <IconButton onClick={closeModalViewAvatar}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Divider />
          <img
            style={{ width: "24rem", height: "24rem", alignSelf: "center" }}
            src={user.img}
            alt="ảnh đại diện"
          />
        </Stack>
      </Modal>

      {/* Modal upload avatar */}
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
                          onClick={handleUploadAvatar}
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

      {/* Modal delete avatar */}
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalDeleteAvatar}
        onClose={closeModalDeleteAvatar}
      >
        <Stack
          className="modal-info"
          direction="row"
          spacing={2}
          justifyContent="center"
          width="26rem"
        >
          <Stack>
            <InfoOutlinedIcon color="primary" />
          </Stack>

          <Stack spacing={3}>
            <Stack>
              <Typography sx={{ fontWeight: "bold" }}>
                Bạn có chắc muốn xoá ảnh đại diện ?
              </Typography>
              <Typography>
                Hình ảnh đại diện sẽ quay về mặc định của Phone-S
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={closeModalDeleteAvatar} variant="outlined">
                Hủy
              </Button>
              <Button onClick={handleDeleteAvatar} variant="contained">Xóa bỏ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}
export default Info;
