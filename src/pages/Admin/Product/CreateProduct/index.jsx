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
import AddIcon from '@mui/icons-material/Add';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImageUploading from "react-images-uploading";
import apiCategory from '../../../../apis/apiCategory';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from "react-toastify";
import apiBrand from '../../../../apis/apiBrand';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ErrorIcon from '@mui/icons-material/Error';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import apiProduct from '../../../../apis/apiProduct';
import apiAttribute from '../../../../apis/apiAttribute';
import { func } from 'prop-types';

const choose = [
  { label: 'The Shawshank Redemption' },
  { label: 'The Godfather' },
  { label: 'The Godfather: Part II' },
  { label: 'The Dark Knight' },
  { label: '12 Angry Men' },
  { label: "Schindler's List" },
  { label: 'Pulp Fiction' }];
export default function CreateProduct() {
  const buttonRef = useRef(null);
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
      setListAttributeInsert([]);
      setBrand("");
      setCategory("");
      setDescription("");
      setDiscount(0);
      setPrice(0);
      setImgUrl([]);
      setInventory(0);
      setListValue([]);
      setListAttributeOption([[],]);
      setListImage([]);
      setName("");
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
        apiBrand.getAllBrand()
            .then(res => {
                setListBrand(res.data.listBrand);
            })
    };
    getData();
  }, []);
  return (
    <Box px={2} spacing={2}>
      <Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "80px" }} px={2} direction="row" justifyContent="flex-start" alignItems="center" mb={0.2}>
          <ArrowBackIcon />
          <Typography sx={{ fontWeight: "bold" }}>Tạo sản phẩm mới</Typography>
        </Stack>
        <Stack>
          <Stack sx={{ backgroundColor: "#FFF", height: "40px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: "bold" }}>1.Thông tin chung</Typography>
          </Stack>
          <Stack sx={{ backgroundColor: "#FFF", height: "360px" }} px={2} mt={0.2} alignItems="flex-start">
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: "bold" }} mt={2}>* Tên sản phẩm</Typography>
              <TextField size="small" sx={{ width: "100%" }} multiline = "true" value={name} onChange={(event) => {
                        setName(event.target.value)
                    }}></TextField>
              <Typography sx={{ fontWeight: "bold" }} mt={2}>* Danh mục</Typography>
              <FormControl className="create-address__input" sx={{ flex: 1 }}>
                        <Select size="small" labelId="demo-simple-select-helper-label" 
                            id="demo-simple-select-helper" value={category}
                            onChange={handleChangeType} input={<InputCustom placeholder="Chọn Loại" />}>
                            {
                                listType.map(item => item.name !== name && <MenuItem value={item.id} >{item.name}</MenuItem>)
                            }
                        </Select>
              </FormControl>
              <Stack direction="row" spacing={0.5} >
                      <Typography mb={1} sx={{ fontWeight: "bold", fontSize: "14px" }}>* Thương hiệu</Typography>
                    </Stack>
                    <FormControl className="create-address__input" sx={{ flex: 1 }}>
                        <Select size="small" labelId="demo-simple-select-helper-label" 
                            id="demo-simple-select-helper" value={brand}
                            onChange={handleChangeBrand} input={<InputCustom placeholder="Chọn Thương hiệu" />}>
                            {
                                listBrand.map(item => item.name !== name && <MenuItem value={item.id} >{item.name}</MenuItem>)
                            }
                        </Select>
              </FormControl>
              <Box sx={{ backgroundColor: "#e6fff8" }} height="70px" mt={2} borderColor="#e6f7ff" px={2} >
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} mt={2} >
                  <ErrorIcon sx={{ color: "#1890ff" }} />
                  <Typography>Bạn hãy điền thêm các thuộc tính được đánh dấu bằng KEY (Thông tin sản phẩm chính) để giúp tăng khả năng hiển thị tìm kiếm và chuyển đổi sản phẩm của bạn</Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#fff" }}>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: "bold" }}>2. Mô Tả Sản Phẩm</Typography>
        </Stack>
        <Stack p={2} spacing={2}>
          <Typography sx={{ fontWeight: "bold" }}>Hình ảnh sản phẩm</Typography>
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
          <Stack direction="row">
            <Typography sx={{ fontWeight: "bold" }}>Mô tả chi tiết sản phẩm (Không chèn link/địa chỉ/SĐT/website/logo nhà bán)</Typography>
            <InfoOutlinedIcon />
          </Stack>
          <TextField size="small" sx={{ width: "100%" }} multiline = "true" value={description} onChange={(event) => {
                        setDescription(event.target.value)
                    }}></TextField>
        </Stack>
      </Stack>
      <Stack sx={{ backgroundColor: "#fff" }} pt={2}>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontWeight: "bold" }}>3. Giá Bán Và Thuộc Tính</Typography>
        </Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: "bold" }}>* Giá Bán</Typography>
        </Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} direction="row" justifyContent="space-between" alignItems="center">
        <TextField type={"number"} sx={{ width: "100%" }} value={price} onChange={(event) => {
                        if(event.target.value>=0){
                          setPrice(event.target.value)
                        }
                    }}/>
        </Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} px={2} py={5} direction="row" justifyContent="space-between" alignItems="center">
        <Grid container spacing={2} columns={2} mt={1} >
              <Grid item xs={1}>
                    <Stack direction="row" spacing={0.5} >
                      <Typography mb={1} sx={{ fontWeight: "bold", fontSize: "14px" }}>* Giảm giá</Typography>
                    </Stack>
                    <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} direction="row" justifyContent="space-between" alignItems="center">
                    <TextField type={"number"}  value={discount} onChange={(event) => {
                        if(event.target.value>=0 && event.target.value<=100){
                          setDiscount(event.target.value)
                        }
                    }}/>
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography mb={1} sx={{ fontWeight: "bold", fontSize: "14px" }}>* Số lượng</Typography>
                    <Stack sx={{ backgroundColor: "#FFF", height: "46px" }} direction="row" justifyContent="space-between" alignItems="center">
                    <TextField type={"number"} value={inventory} onChange={(event) => {
                      if(event.target.value>0){
                        setInventory(event.target.value)
                      }
                    }}/>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
        <Stack sx={{ backgroundColor: "#FFF", height: "46px"}} px={2}  py={4} direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontWeight: "bold" }}>* Thuộc Tính</Typography> 


        </Stack>
        {
          listAddNewAttribute.map((item)=>(
            <Stack sx={{ backgroundColor: "#FFF", height: "46px"}} px={2} py={3} direction="row" justifyContent="space-between" alignItems="center">
            <FormControl className="create-address__input" sx={{ flex: 1 }}>
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
              <FormControl className="create-address__input" sx={{ flex: 1 }}>
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
              <TextField inputProps={{style: {height: "10px",},}} type={"number"} value={listValue[item.index]} onChange={(event) => {
                      if(event.target.value>0){
                        listValue[item.index]=Number(event.target.value);
                        setListValue(prev=> [...prev]);
                      }
                    }}/>
            </Stack>
          ))
        }
        <Stack px={2} sx={{width:"100%"}}>
          <Button ref={buttonRef1} onClick={() => (handleChangeAddNewAttribute(indexAttr))}>
            <AddIcon sx={{color:"#1890ff"}} />
            <Typography sx={{color:"#1890ff", width:"100%"}}>Thêm lựa chọn hàng để giúp khách hàng tìm kiếm sản phẩm và dễ dàng thêm mới lựa chọn</Typography>
          </Button>
        </Stack>
        <Stack px={2} py={2}>
          <Button className="btn__addProduct" variant="contained" component="label" onClick={() =>(saveProduct())}>
            <AddIcon sx={{color:"#ffffff"}} />
            <Typography sx={{color:"#ffffff"}}>Thêm sản phẩm</Typography>
          </Button>
        </Stack>
      </Stack>
    </Box>
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
