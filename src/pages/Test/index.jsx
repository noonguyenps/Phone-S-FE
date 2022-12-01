import React from "react";
import { useEffect, useState, useRef } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploading from "react-images-uploading";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Stack,
  Grid,
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
import { useParams,useNavigate } from "react-router-dom";
import apiProduct from "../../apis/apiProduct";
import { func } from "prop-types";
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
function Test() {
  const [review, setReview] = React.useState(true)
  const buttonRef = useRef(null);
  const [listAddNewImage, setListAddNewImage]= useState([]);
  const [listImage, setListImage] = useState([]);
  const [index,setIndex] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploading1, setUploading1] = useState(false);
  const [image, setImage] = useState([]); 
  const [brand, setBrand] = useState([])
  const [country, setCountry] = useState("")
  const [province, setProvince] = useState("")
  const [district, setDistrict] = useState("")
  const [listUrlImg, setListUrlImg] = useState([]); 
  const [imageList, setImageList] = useState([]);
  const [addNewImage, setAddNewImage] = useState(false);
  const [name, setName] = useState("")
  const [url, setUrl] = useState("");
  const [openAvatar, setOpenAvatar] = useState(true);
  const [modalDeleteAvatar, setModalDeleteAvatar] = useState(false);
  const [modalViewAvatar, setModalViewAvatar] = useState(false);
  const [modalNational, setModalNational] = useState(false);
  const [modalUploadAvatar, setModalUploadAvatar] = useState(false);
  const [description, setDescription] = useState("")
  const [phone, setPhone] = useState("")
  const [addressDetails, setAddressDetails] = useState("")
  const navigate = useNavigate();

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
    setOpenAvatar(true);
  };
  const onChange = (imageList,i) => {
    setListImage(prev=> [...prev,imageList]);
  };
  const onChange1 = (i) => {
    setListImage[0] = i 
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
    setUploading(true);
  }
  const uploadListImage = () =>{
    if(listImage.length === 0){
        toast.warning("Vui lòng chọn ảnh")
        return
    }
    const a = [];
    for(var i in listImage){
        a[i]=listImage[i][0].file
    }
    console.log(a);
    let param = { multipleFiles: a[0], multipleFiles:a[1] }
    apiProduct.uploadListImageProduct(param).
    then(res=>{
        console.log(res)
    })
  }
  const myFunction = () => {
    // setUploading(true);
  }

  const handleChangeAddNewImage = (index) => {
    setListAddNewImage(prev =>[...prev,index]);
    setIndex(index+1);
  };
    return (
        <Stack>
        {
          uploading1?(
            <Button onClick={myFunction}></Button>
          ):
          (
            <img width='100px' src='https://gifimage.net/wp-content/uploads/2017/02/Loading-GIF-Image-31.gif' alt="loading..." />
          )
        }
        </Stack>
    )
}
export default Test