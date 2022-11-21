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

  const handleChangeAddNewImage = (index) => {
    setListAddNewImage(prev =>[...prev,index]);
    setIndex(index+1);
  };
    return (
        <Stack>
        <Grid container padding={4}>
          {listAddNewImage.map((index) =>(
            <Box padding={2}>
            <ImageUploading
              value={listImage[index]}
              onChange={onChange}
              dataURLKey="data_url"
              acceptType={["jpg"]}
            >
              {({
                imageList,
                onImageUpload,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <Box className="upload__image-wrapper">
                  {imageList.length === 0 ? (
                    <Stack
                      sx={{
                        width: "15rem",
                        height: "15rem",
                        border: "2px dashed grey",
                        borderRadius: "5px",
                      }}
                      style={isDragging ? { color: "red" } : null}
                      justifyContent="center"
                      alignItems="center"
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      <Typography align="center"
                        sx={{ ml: "auto", mr: "auto", color: "blue", alignItems:"center" }}
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
                        height: "20rem",
                        borderRadius: "5px",
                      }}
                      spacing={3}
                      className="image-item"
                    >
                      <img
                        style={{
                          width: "15rem",
                          height: "15rem",
                          alignSelf: "center",
                        }}
                        src={image.data_url}
                        alt=""
                      />
                      <Stack
                        direction="row"
                        className="image-item__btn-wrapper"
                        justifyContent="center"
                        spacing={5}>
                      </Stack>
                    </Stack>
                  ))}
                </Box>
              )}
            </ImageUploading>
          </Box>
          ))}
          <Box p={2} paddingLeft={2} 
          sx={{
          width: "15rem",
          height: "15rem",
            }}>
                <Stack key={0}
                sx={{
                    width: "15rem",
                    height: "15rem",
                    borderRadius: "5px",
                  }}
                  spacing={3}
                  className="image-item"
                   
                >
                  <img
                    style={{
                      width: "15rem",
                      height: "15rem",
                      alignSelf: "center",
                    }}
                    src={"https://th.bing.com/th/id/R.49f5920e471dbe4aadf67dbcba5ee404?rik=LX2UXU7UQpK8BA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fplus%2fplus_PNG15.png&ehk=DzbRuCqrTXMbMQm2rvj63rfKcTtr2VzXf%2ffsIL3UZG8%3d&risl=&pid=ImgRaw&r=0"}
                    alt=""
                    ref={buttonRef}
                    onClick={() => (handleChangeAddNewImage(index))}/>
                </Stack>
          </Box>
        </Grid>
        <Button padding={10} onClick={()=>uploadListImage()}>Đăng tải tệp</Button>
        </Stack>
    )
}
export default Test