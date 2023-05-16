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
import "./CreateProduct.scss"
import Loading from "../../../../components/Loading";
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImageUploading from "react-images-uploading";
import apiCategory from '../../../../apis/apiCategory';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-hot-toast";
import apiBrand from '../../../../apis/apiBrand';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import apiProduct from '../../../../apis/apiProduct';
import apiAttribute from '../../../../apis/apiAttribute';
import { useNavigate } from 'react-router-dom'
import { func } from 'prop-types';

export default function CreateProduct() {
  const buttonRef = useRef(null);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const buttonRef1 = useRef(null);
  const [listType, setListType] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
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
  const navigate = useNavigate()
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
      apiProduct.uploadImgProduct(listImage[index]).then((res)=>{
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
  async function saveProduct(){
    setLoadingShowmore(true)
    for(var index in listImage){
      await uploadListImageBE(index);
    }
    let params = {
      name:name,
      attribute:listAttributeInsert,
      brand : brand,
      category: category,
      description : description,
      discount: discount,
      imgUrl:listUrl,
      inventory:inventory,
      price:price,
      values:listValue
    }
    apiProduct.addNewProduct(params)
    .then((res)=>{
      toast.info("Thêm sản phẩm thành công");
      setLoadingShowmore(false)
      navigate('/admin/product')
    })
    .catch((err)=>{
      toast.warning("Đã xảy ra lỗi")
    })
  }


  useEffect(() => {
    const getData = async () => {
        apiCategory.showAllCategory()
            .then(res => {
                setListType(res.data.listCategory);
            })
    };
    getData();
  }, []);


  useEffect(() => {
    const getData = async () => {
        apiAttribute.getAllAttribute()
            .then(res => {
              setListAttribute(res.data.listAttribute)
            })
    };
    getData();
  }, []);


  useEffect(() => {
    const getData = async () => {
        apiBrand.getListBrand()
            .then(res => {
                setListBrand(res.data.listBrand);
            })
    };
    getData();
  }, []);



  return (
    <Stack sx={{backgroundColor:"#FFFFFF"}}>
      <Stack margin='1rem' spacing={2}>
        <Typography>Tạo sản phẩm mới</Typography>
        <Stack sx={{maxWidth:"1100px", width:"100%"}}>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Tên sản phẩm</Typography>
            <TextField sx={{width:'80%'}} label= "Tên sản phẩm" value={name} onChange={(event) => {
                          setName(event.target.value)
                        }}></TextField>
          </Stack>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Danh mục</Typography>
            <FormControl sx={{width:'80%'}}>
                        <Select size="small" labelId="demo-simple-select-helper-label" 
                            id="demo-simple-select-helper" value={category}
                            onChange={handleChangeType} input={<InputCustom placeholder="Chọn Loại" />}>
                            {
                                listType.map(item => item.name !== name && <MenuItem value={item.id} >{item.name}</MenuItem>)
                            }
                        </Select>
            </FormControl>
          </Stack>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Thương hiệu</Typography>
            <FormControl sx={{width:'80%'}}>
                        <Select size="small" labelId="demo-simple-select-helper-label" 
                            id="demo-simple-select-helper" value={brand}
                            
                            onChange={handleChangeBrand} input={<InputCustom placeholder="Chọn Thương hiệu" />}>
                            {
                                listBrand.map(item => item.name !== name && <MenuItem value={item.id} >{item.name}</MenuItem>)
                            }
                        </Select>
            </FormControl>
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
            <Typography sx={{width:'20%'}}>Mô tả</Typography>
            <TextField size="small" sx={{ width: "80%" }} 
            label= "Mô tả"
            multiline = "true" value={description} 
            onChange={(event) => {
              setDescription(event.target.value)
            }}></TextField>
          </Stack>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Typography sx={{width:'20%'}}>Giá cả</Typography>
            <TextField type={"number"} sx={{ width: "80%" }} 
            label= "Giá cả"
            value={price} onChange={(event) => {
                        if(event.target.value>=0){
                          setPrice(event.target.value)
                        }
                    }}/>
          </Stack>
          <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Stack direction='row' sx={{width:'100%'}} spacing ={1}>
              <Stack direction='row' sx={{width:'50%'}}>
                <Typography sx={{width:'40%'}}>Giảm giá (%)</Typography>
                <TextField sx={{width:'60%'}} type={"number"}
                label= "Giảm giá (%)"
                value={discount} onChange={(event) => {
                        if(event.target.value>=0 && event.target.value<=100){
                          setDiscount(event.target.value)
                        }
                }}/>
              </Stack>
              <Stack direction='row' sx={{width:'50%'}}>
                <Typography sx={{width:'40%'}}>Số lượng</Typography>
                <TextField sx={{width:'60%'}} 
                label= "Số lượng"
                type={"number"} value={inventory} onChange={(event) => {
                        if(event.target.value>0){
                          setInventory(event.target.value)
                        }
                }}/>
              </Stack>
            </Stack>
          </Stack>
          <Typography>Thuộc tính</Typography>
          {
          listAddNewAttribute.map((item)=>(
            <Stack sx={{ backgroundColor: "#FFF", height: "46px"}} px={2} py={3} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <FormControl sx={{ width:'25%'}} className="create-address__input">
                        <Select size="small" labelId="demo-simple-select-helper-label" 
                            id="demo-simple-select-helper" value={listAddNewAttribute[item.index].attribute}
                            onChange={(event) => {
                              listAddNewAttribute[item.index].attribute = event.target.value;
                              setListAddNewAttribute(prev =>[...prev]);
                              listAttributeOption[item.index]=event.target.value.values;
                              setListAttributeOption(prev =>[...prev,[]]);
                            }} input={<InputCustom placeholder="Chọn Thuộc tính" />}>
                            {
                                listAttribute.map(item => item.name !== name && <MenuItem value={item} >{item.name}</MenuItem>)
                            }
                        </Select>
              </FormControl>
              <FormControl sx={{ width:'25%'}} className="create-address__input">
                        <Select size="small" labelId="demo-simple-select-helper-label" 
                            id="demo-simple-select-helper" value={listAttributeInsert[item.index]}
                            onChange={(event) => {
                              listAttributeInsert[item.index] = event.target.value;
                              setListAttributeInsert(prev=>[...prev]);
                            }} input={<InputCustom placeholder="Chọn Loại" />}>
                            {
                                listAttributeOption[item.index].map(item => <MenuItem value={item.id} >{item.value}</MenuItem>)
                            }
                        </Select>
              </FormControl>
              <TextField label= "Chênh lệch giá" sx={{ width:'50%'}} inputProps={{style: {height: "10px",},}} type={"number"} value={listValue[item.index]} onChange={(event) => {
                      if(event.target.value>=0){
                        listValue[item.index]=Number(event.target.value);
                        setListValue(prev=> [...prev]);
                      }
                    }}/>
            </Stack>
          ))
        }
        <Stack sx={{width:"100%"}}>
          <Button ref={buttonRef1} onClick={() => (handleChangeAddNewAttribute(indexAttr))}>
            <AddIcon sx={{color:"#1890ff"}} />
            <Typography sx={{color:"#1890ff", width:"100%"}}>Thêm lựa chọn hàng để giúp khách hàng tìm kiếm sản phẩm và dễ dàng thêm mới lựa chọn</Typography>
          </Button>
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
              <Button className="btn__addProduct" variant="contained" component="label" onClick={() =>(saveProduct())}>
                <AddIcon sx={{color:"#ffffff"}} />
                <Typography sx={{color:"#ffffff"}}>Thêm sản phẩm</Typography>
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
