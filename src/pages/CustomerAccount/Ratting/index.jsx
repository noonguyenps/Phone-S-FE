import React from 'react'
import { useState, useEffect, useRef } from "react"
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Grid,
  Autocomplete,
  FormControl,
  Select,
  InputBase,
  MenuItem,
  styled,
  TextareaAutosize
} from '@mui/material';
import "./Ratting.scss"
import Loading from "../../../components/Loading";
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImageUploading from "react-images-uploading";
import apiRating from '../../../apis/apiRating';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { func } from 'prop-types';



export default function CreateProduct() {


  const buttonRef = useRef(null);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const buttonRef1 = useRef(null);
  const [listType, setListType] = useState([]);
  const [comment, setComment] = useState("");
  const [description, setDescription] = useState("");
  const [star, setStar] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [inventory, setInventory]= useState(0);
  const [listBrand, setListBrand] = useState([]);
  const [attribute,setAttribute] = useState([]);
  const [listAttribute,setListAttribute] = useState([]);
  const [listAttributeInsert, setListAttributeInsert] = useState([]);
  const [imgUrl, setImgUrl] = useState([]);
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [listAddNewImage, setListAddNewImage]= useState([]);
  const [listAddNewAttribute, setListAddNewAttribute] = useState([]);
  const [listAttributeOption, setListAttributeOption]= useState([[],]);
  const [listImage, setListImage] = useState([]);
  const [listValue, setListValue] = useState([]);
  const [index,setIndex] = useState(0);
  const [listUrl,setListUrl] = useState([]);
  const [indexAttr, setIndexAttr] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState([]);



  const onChange = (imageList,i) => {
    setListImage(prev=> [...prev,imageList]);
  };
  const handleChangeType = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeAttribute = (event,index)=>{
    setAttribute(event.target.value);
  }
  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };
  const handleChangeAddNewImage = (index) => {
    setListAddNewImage(prev =>[...prev,index]);
    setIndex(index+1);
  };
  const handleChangeAddNewAttribute = (index) => {
    setListAddNewAttribute(prev =>[...prev,{index:index,attribute:{id:"0",name:"",values:["1","2"],}}]);
    setIndexAttr(index+1);
  };
  function uploadListImageBE(index){
    return new Promise((resolve, reject)=>{
      apiRating.uploadImgProductRating(listImage[index]).then((res)=>{
      listUrl[index] = res.data.url;
      setListUrl(prev =>[...prev]);
      console.log(listUrl);
      })
      .catch((err)=>{
        console.log(err);
        reject(err);
      })
      .finally(()=>{
          resolve();
      })}
    )
  };


  async function saveRating(){
    setLoadingShowmore(true)
    for(var index in listImage){
      await uploadListImageBE(index);
    }
    let params = {
      id:1,
      message:comment,
      imgUrl:listUrl,
      ratingPoint:star,
    }
    apiRating.addNewRating(params)
    .then((res)=>{
      toast.info("Thêm đánh giá thành công");
      setLoadingShowmore(false)
      setImgUrl([]);
      setComment('');
      setStar(0);
    })
    .catch((err)=>{
      toast.warning("Đã xảy ra lỗi")
    })
  }



  return (
    <Stack sx={{backgroundColor:"#FFFFFF"}}>
      <Stack margin='1rem' spacing={2}>
        <Typography>Đánh giá sản phẩm</Typography>
        <Stack sx={{maxWidth:"1100px", width:"100%"}}>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Đánh giá</Typography>
            <TextField sx={{width:'80%'}} label= "Đánh giá" value={comment} multiline='true' onChange={(event) => {
                          setComment(event.target.value)
                        }}></TextField>
          </Stack>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Hình ảnh sản phẩm</Typography>
            <Box sx={{width:'80%'}}>
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
            </Box>
          </Stack>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Mức độ</Typography>
            <TextField type={"number"} sx={{ width: "20%" }} 
            label= "Số sao"
            value={star} onChange={(event) => {
                        if(event.target.value>=0||event.target.value<=5){
                          setStar(event.target.value)
                        }
                    }}/>
          </Stack>
        </Stack>
      </Stack>
        <Stack px={2}>
          {
            loadingShowmore?(<>
            <Button className="btn__addProduct" variant="contained" component="label">
                <Loading/>
              </Button>
              </>):(
              <Button className="btn__addProduct" variant="contained" component="label" 
              onClick={() =>(saveRating())}
              >
                <AddIcon sx={{color:"#ffffff"}} />
                <Typography sx={{color:"#ffffff"}}>Thêm đánh giá</Typography>
              </Button>)
          }
        </Stack>
    </Stack>
  )}
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
