import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from '../../assets/img/img_default.jpg'

import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import ForgetPassword from "../../components/ForgetPassword";

import {
  Rating,
  Button,
  Grid,
  Box,
  Tabs,
  Tab,
  Stack,
  Typography,
  Modal,
  IconButton,
  Tooltip,
  Skeleton,
  TextField,
} from "@mui/material";

import "./DetailProduct.scss";
import CheckIcon from "@mui/icons-material/Check";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { addItem } from "../../slices/cartSlice";
import { Toaster } from "react-hot-toast";
import { numWithCommas} from "../../constraints/Util";

import { toast } from "react-hot-toast";

import SliderImage from "./SliderImage";

import apiAccount from "../../apis/apiAccount";
import apiCart from "../../apis/apiCart";
import apiRating from "../../apis/apiRating";
import { addCompare } from "../../slices/compareProduct";

function DetailProduct() {
  const user = useSelector((state) => state.auth.user);
  const [modalLogin, setModalLogin] = useState(false);
  const [modalDetail, setModalDetail] = useState(false);
  const openModalDetail = () => setModalDetail(true);
  const closeModalDetail = () => setModalDetail(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);

  const [pageRating, setPageRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [sortRating,setSortRating] = useState('id');
  const [comment, setComment] = useState('');
  const [ratingid, setRatingid] = useState(0);
  const navigate= useNavigate();

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  };

  const closeModalForgetPWD = () => {
    setIsForgetPwd(false);
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  }, []);

  const handleOpenForgetPwd = useCallback(() => {
    setIsForgetPwd(true);
    setIsRegister(false);
    setIsLoginForm(false);
  }, []);

  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const size = 10;

  const [price, setPrice] = useState(0);
  const [listOptionValue,setListOptionValue] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      await apiProduct.getProductsById(id).then((res)=>{
        setProduct(res.data.product);
        let newChoose = {...choose};
        let listOption = []
        let listOptionValueTemp = [];
        let priceTemp = res.data.product.price;
        for(let a in res.data.product.listAttributeOption){
          newChoose[res.data.product.listAttributeOption[a].name] = res.data.product.listAttributeOption[a].values[0].id;
          priceTemp += res.data.product.listAttributeOption[a].values[0].compare;
          listOption.push(res.data.product.listAttributeOption[a].values[0].id);
          listOptionValueTemp.push(res.data.product.listAttributeOption[a].name + ":" +res.data.product.listAttributeOption[a].values[0].value);
        }
        setPrice(priceTemp);
        setChoose(newChoose);
        setListOptionId(listOption);
        setListOptionValue(listOptionValueTemp);
      }).catch((error)=>{
        toast.error('Không tìm thấy sản phẩm')
        navigate('/')
      });
      
    };
    getProduct();
  }, [id]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      let param = {
        productId: id,
      };
      await apiAccount.checkWishItem(param).then((res) => {
        if (res.data.product.length > 0) {
          setIsFavorite(true);
        }
      }).catch(err => console.log(err));
    };

    checkFavorite();
  }, []);

  const handleClickFavorite = async () => {
    if (user === null) {
      toast.error("Vui lòng đăng nhập để thực hiện chức năng này");
    } else {
      let param = {
        userId: user.id,
        productId: product.id,
        productImg: product.image,
        productName: product.name,
        productPrice: product.price,
        productDiscount: product.discount,
        productRate: product.rate,
        productSold: product.sold,
        productSlug: product.slug,
      };
      setIsFavorite((prev) => !prev);

      if (isFavorite === false) {
        await apiAccount
          .postWishItem(param)
          .then(toast.success("Đã thêm vào danh sách yêu thích"))
          .catch((err) => toast.error(err));
      } else {
        await apiAccount
          .deleteWishItem(param)
          .then(toast.success("Đã xóa khỏi danh sách yêu thích"))
          .catch((err) => toast.error(err));
      }
    }
  };

  const [productSimilars, setProductSimilars] = useState([]);
  const [value, setValue] = React.useState("0");
  const [modalSlider, setModelSlider] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [choose, setChoose] = useState({});
  const [indexImg, setIndexImg] = useState(0);
  const [listOptionId, setListOptionId] = useState([]);
  const dispatch = useDispatch();
  const [ratings, setRatings] = useState([]);

  const openModalSlider = () => setModelSlider(true);

  const closeModalSlider = () => {
    setModelSlider(false);
  };

  useEffect(() => {
    const getData = async () => {
      let param = {
        page: 0,
        size: 6,
        sort:"product_id"
      };
      const response = await apiProduct.getProducts(param);
      if (response) {
        setProductSimilars((pre) => [...pre, ...response.data.listProduct]);
      }
    };
    getData();
  }, []);

  const handleChange = (event, newValue) => {
         setValueRating(newValue);
  };

  const handlePostComment = () => {
    let params ={
      id: ratingid,
      comment:comment
    }
    apiRating.postComment(params).then(res=>{
      toast.success("Thêm bình luận thành công")
    }).catch(err=>{
      console.log(err)
    })



  };

  useEffect(() => {
    const getData = async () => {
      let params = {
        page:pageRating,
        productId:id,
        size:size,
        sort:sortRating
      }
      apiRating.getAllRatingByProductClient(params)
      .then(res=>{
      setRatings(res.data.listRating);      
      })
      .catch(setRatings([]))
    };
    getData();
  }, [pageRating, sortRating]);

  useEffect(() => {
    const filterData = () => {
      switch (valueRating) {
        case 1: {
          setSortRating("date_up");
          setPageRating(0);
          break;
        }
        case 2: {
          setSortRating("date_down");
          setPageRating(0);
          break;
        }
        case 3: {
          setSortRating("rating_point_up");
          setPageRating(0);
          break;
        }
        case 4: {
          setSortRating("rating_point_down");
          setPageRating(0);
          break;
        }  
        default: {
          setSortRating("id");
          setPageRating(0);
          break;
        }
      }
    };

    filterData();
  }, [valueRating]);

  

  const handleClickBuy = () => {
    if(user === null){
      dispatch(
        addItem({
          choose: false,
          option:listOptionValue,
          optionId:listOptionId,
          id: product.id,
          name: product.name,
          image: product.image,
          price: Math.round(price * (1 - product.discount / 100)),
          quantity:1,
        })
      );
      toast.success("Đã thêm vào giỏ hàng");
    }else{
      let params = {
        listAttribute:listOptionId,
        productId:product.id,
        quantity:1
      };
      apiCart.addProductToCart(params)
      .then((res)=>{
        console.log(res);
        toast.success("Đã thêm vào giỏ hàng");
      }).catch((err)=>{
        console.log(err);
        toast.error("Có lỗi sảy ra " + err);
      })
    }
  };


  const handleClickCompare = () => {
    dispatch(
      addCompare({
        id: product.id,
        option:product.attributeDetailEntityList,
        root: product.categoryRoot,
        name: product.name,
        image: product.image,
        price: Math.round(price * (1 - product.discount / 100))
      })
    );
  };

  const onChangeOption = (optionId, itemId) => {
    let optionSelect = product.listAttributeOption.find(
      (item) => item.id === optionId
    );
    choose[optionSelect.name] = itemId;
    let newChoose = { ...choose };
    newChoose[optionSelect.name] = itemId;
    setChoose(newChoose);
    let priceTemp = product.price;
    let listOption = [];
    let listOptionValueTemp = [];
    for(var a in product.listAttributeOption){
      let id = choose[product.listAttributeOption[a].name];
      for(var b in product.listAttributeOption[a].values){
        if(product.listAttributeOption[a].values[b].id === id){
          priceTemp += product.listAttributeOption[a].values[b].compare;
          listOption.push(id);
          listOptionValueTemp.push(product.listAttributeOption[a].name + ":" +product.listAttributeOption[a].values[b].value)
        }
      }
    }
    setListOptionId(listOption);
    setListOptionValue(listOptionValueTemp);
    setPrice(priceTemp);
  };

  const onChangeimg = (index) => {
    setIndexImg(index);
  };
  return (
    <>
    <div><Toaster/></div>
      <Box className="container">
        <Box className="panelProduct">
        <Stack direction="row">
        <Typography className="panelProduct__title">
              {product?.name ? (
                <h2>{product.name}</h2>
              ) : (
                <>
                  <Skeleton animation="wave" height={40} width="100%"/>
                </>
              )}
        </Typography>
        <Box className="panelProduct__rating">
              {product?(
                <>
                  <Rating
                    name="simple-controlled"
                    value={product.rate || 0}
                    readOnly
                    sx={{ fontSize: "18px" }}
                  />
                  <span>{product.rate} đánh giá | Đã bán {product?.sold} </span>
                </>
              ) : (
                <Skeleton animation="wave" height={40} width="100%" />
              )}
        </Box>
        </Stack>
        <Box className="detailProduct">
          <Box className="detailProduct__img">
            <Box
              className="detailProduct__primary-img"
              onClick={openModalSlider}
            >
              {loading && (
                <Skeleton variant="rectangular" width="100%" height="100%" />
              )}
              <img
                width="280" 
                height="520"
                onLoad={() => setLoading(false)}
                src={product?.img[indexImg]}
                alt=""
                onError={err=>err.target.src=imgDefault}
              />
            </Box>{" "}
            <Stack
              direction="row"
              justifyContent="flex-start"
              mt={3}
              spacing={1}
            >
              {product?.img ? (
                <>
                  {product.img.slice(0, 6).map((imgs, index) => (
                    <>
                      {index < 5 ? (
                        <Box
                          onClick={() => onChangeimg(index)}
                          className={`detailProduct__item-img ${
                            indexImg === index ? "selected" : ""
                          }`}
                        >
                          <img src={imgs} alt="" onError={err=>err.target.src= imgDefault} />
                        </Box>
                      ) : (
                        <Box
                          className={`detailProduct__item-img ${
                            indexImg === index ? "selected" : ""
                          }`}
                        >
                          {product.img.length > 6 && (
                            <Box
                              onClick={openModalSlider}
                              className="lastimage"
                            >
                              +{product.img.length - 6}
                            </Box>
                          )}

                          <img src={imgs} alt="" />
                        </Box>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  <Skeleton animation="wave" width="100%" />
                </>
              )}{" "}
            </Stack>
          </Box>

          <Box sx={{width:400}}>
            <Box className="detailProduct__price">
              {product?.price ? (
                <>
                  <span>
                  {numWithCommas(Math.round(price * (1 - product.discount / 100)))}₫
                  </span>
                  <span>{numWithCommas(price || 0)} ₫</span>
                </>
              ) : (
                <Skeleton animation="wave" height={40} width="100%" />
              )}
            </Box>
            {product?.listAttributeOption.map((itemOpt) => {
              return (
                <Box className="product-option">
                   <Box className="product-option__title">
                    {itemOpt.name}
                  </Box>
                  <Box className="product-option__list">
                    {itemOpt.values.map((item) => {
                      let selected = choose[itemOpt.name] === item.id;
                      return (
                        <Box
                          key={item.id}
                          onClick={() => onChangeOption(itemOpt.id, item.id)}
                          className={`product-option__item product-option__item--size ${selected ? "selected" : ""}`}
                        >

                          {item.value}
                          <span>
                            <CheckIcon
                              sx={{ fontSize: "12px", color: "#fff" }}
                            />
                          </span>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              );
              })}
              <Box className="descriptionProduct"
                    p={2}
                    borderRadius="4px"
                  >
              <Box className="productSpecification__title">Mô Tả Sản phẩm</Box>
              <Typography px={3}>{product?.description}</Typography>
              </Box> 
            <Stack
              sx={{ marginTop: "2rem" }}
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={handleClickBuy}
                  sx={{
                    width: "200px",
                    height: "48px",
                    backgroundColor: "#00CC99",
                  }}
                >
                  <AddShoppingCartIcon/>Thêm vào giỏ hàng
                </Button>
              </Box>
              {user?(<>
                <IconButton
                sx={{ border: "1px solid silver" }}
                color="error"
                size="large"
                onClick={handleClickFavorite}
              >
                {isFavorite ? (
                  <Tooltip title="Xóa khỏi danh sách yêu thích">
                    <FavoriteIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Thêm vào danh sách yêu thích">
                    <FavoriteBorderIcon />
                  </Tooltip>
                )}
              </IconButton>
              </>):(<>
                <IconButton
                sx={{ border: "1px solid silver" }}
                color="error"
                size="large"
                onClick={openModalLogin}
              >
                {isFavorite ? (
                  <Tooltip title="Xóa khỏi danh sách yêu thích">
                    <FavoriteIcon />
                  </Tooltip>
                ) : (
                  <Tooltip title="Thêm vào danh sách yêu thích">
                    <FavoriteBorderIcon />
                  </Tooltip>
                )}
              </IconButton></>)}
            </Stack>
          </Box>
          <Box sx={{backgroundColor:'#ffffff',width:300, height:'fit-content',padding:1}}>
            <Stack alignItems='center' justifyItems='center'>
              <Typography>Thông số kỹ thuật</Typography>
              <Box 
              sx={{
                mb: 2,
                padding:1, margin:0.5,
                display: "flex",
                flexDirection: "column",
                height: 300,
                overflow: "hidden",
                overflowY: "scroll",
              }}>
                { 
                product?.attributeDetailEntityList.map((item) => (
                <Box sx={{backgroundColor:'#ffffff',width:255, maxHeight:350, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}spacing='1'>
                  <Stack direction='row' justifyContent="space-between"
                  alignItems="center"
                  spacing={2}>
                      <Typography sx={{fontSize:14}}>{item.name}</Typography>
                      <Typography sx={{fontSize:14}}>{item.value}</Typography>  
                  </Stack>
                  </Box>
                ))}
                { 
                product?.attributeDetailEntityList.length===0?(
                <Box sx={{backgroundColor:'#ffffff',width:255, maxHeight:350, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}spacing='1'>
                  <Stack direction='row' justifyContent="center"
                  alignItems="center"
                  spacing={2}>
                      <Typography sx={{fontSize:14}}>Sản phẩm chưa có thông số</Typography> 
                  </Stack>
                  </Box>
                ):(<></>)}
              </Box>
                {
                  product?.attributeDetailEntityList.length<=9?(
                  <Box sx={{backgroundColor:'#dcdcdc',width:280, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}>
                  <Button disabled='disabled' sx={{
                    width: "100%",
                    height: "20px",
                  }}>Xem thông số chi tiết</Button></Box>):(
                    <Box sx={{backgroundColor:'#dcdcdc',width:280, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}>
                  <Button sx={{
                    width: "100%",
                    height: "20px",
                  }}
                  onClick={openModalDetail}>Xem thông số chi tiết</Button>
                  </Box>)
                }

                {
                  product?.attributeDetailEntityList.length===0?(
                  <Box sx={{backgroundColor:'#dcdcdc',width:280, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}>
                  <Button disabled='disabled' sx={{
                    width: "100%",
                    height: "20px",
                  }}>So sánh</Button></Box>):(
                    <Box sx={{backgroundColor:'#dcdcdc',width:280, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}>
                  <Button sx={{
                    width: "100%",
                    height: "20px",
                  }}
                  onClick={openModalDetail}>So sánh</Button>
                  </Box>)
                }
                <Box sx={{backgroundColor:'#dcdcdc',width:280, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:0.5}}>
                  <Button href='/compare' sx={{
                    width: "100%",
                    height: "20px",
                  }}>Trang so sánh sản phẩm</Button>
                </Box>
              
              
            </Stack>
          </Box>
        </Box>
      </Box>

        <Box className="productSimilar">
          <Box className="productSimilar__title">Sản Phẩm Tương Tự</Box>
          <Grid mb={1} container>
            {productSimilars.slice(0, 6).map((item) => (
              <Grid item key={item.id} xs={2}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box className="panelProduct">
      <Tabs
                     value={valueRating}
                     width={500}
                     onChange={handleChange}
                     sx={{
                     width:'900px'
                     }}
                     padding = {1}
                     textColor="primary"
                     indicatorColor="primary"
                     aria-label="basic tabs example"
                 >
                     <Tab
                         key='1'
                         label='Tất cả'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='2'
                         label='Mới nhất'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='3'
                         label='Cũ nhất'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='4'
                         label='Nhiều sao'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='5'
                         label='Ít sao'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                 </Tabs>
                 <Stack pading={1} margin={1}>
                  <Box>
                    <Stack justifyContent='center' alignItems='center'>
                      <Typography sx={{ fontSize: "30px", color: "red" }}>{product?.rate}/5</Typography>
                      <Rating name="read-only" value={product?.rate || 0} sx={{ fontSize: "1.2rem" }} readOnly />
                      <Typography sx={{ fontSize: "20px"}}>{ratings?.length} Đánh giá và nhận xét</Typography>
                      
                    </Stack>
                    {
                        ratings?.map(item=>(
                          <Stack margin={1} borderRadius={1} border={1} padding={1} borderColor={'grey.600'}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' margin={1}>
                              <Typography sx={{ fontSize: "20px"}}>{item.comment}</Typography>
                              <Rating name="read-only" value={product?.rate || 0} sx={{ fontSize: "1.2rem" }} readOnly />
                            </Stack>
                            <Stack margin ={1} spacing={1} direction='row'>
                                {
                                  item?.urls?.map(item=>(
                                    <img width='100px' height='100px' src={item}></img>
                                  ))
                                }
                            </Stack>
                            <Stack margin ={1} spacing={1} direction='row'>
                              <Typography sx={{fontSize:13}}>Đăng tải bởi : {item.nickname}</Typography>
                            </Stack>
                            <Stack margin ={1} spacing={1}>
                              <Typography>Danh sách bình luận</Typography>
                                {
                                  item?.comments?.map(item=>(
                                    <Stack direction='row' spacing={2} paddingLeft={2}>
                                      <Typography sx={{ fontSize: "13px"}}>{item.userNickName}</Typography>
                                      <Typography sx={{ fontSize: "13px"}}>-</Typography>
                                      <Typography sx={{ fontSize: "13px"}}>{item.comment}</Typography>
                                    </Stack> 
                                  ))
                                }
                              <Stack direction='row' spacing={2} paddingLeft={2}>
                              <TextField
                              sx={{ fontSize: "13px", width:400}}
                              size="small"
                              label="Hãy để lại bình luận của bạn"
                              value={comment}
                              onChange={event=>{
                                setComment(event.target.value)
                                setRatingid(item.id)}}
                              ></TextField>
                              {user?(<>
                                <Button
                              onClick={handlePostComment}>
                                Thêm
                              </Button>
                              </>):(<>
                                <Button
                              onClick={openModalLogin}>
                                Thêm bình luận
                              </Button></>)}
                              </Stack> 
                            </Stack>
                          </Stack>
                        ))
                      }
                  </Box>
                 </Stack>
      </Box>
      </Box>
      <Modal open={modalSlider} onClose={closeModalSlider}>
        <Box className="modal-images" sx={{ width: "100%" }}>
          <SliderImage
            images={product?.img}
            onClose={closeModalSlider}
          ></SliderImage>
        </Box>
      </Modal>
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "360px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignup={handleOpenSignup}
              closeModalLogin={closeModalLogin}
              handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {isForgetPwd && (
            <ForgetPassword
              closeModalForgetPWD={closeModalForgetPWD}
              handleReturnLogin={handleReturnLogin}
            />
          )}
        </Box>
      </Modal>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalDetail}
        onClose={closeModalDetail}
      >
        <Box alignItems='center' justifyContent='center' sx={{width:'300', height:'100'}} position= 'absolute' left='35%' margin-top='50px' padding= '80px'>
          <Stack alignItems='center' justifyContent='center'>
            <Box sx={{ width: 400, height:600, backgroundColor:'#ffffff',maxHeight:'fit-content', borderRadius:3,}} alignContent='center' alignSelf='center'>
              <Box sx={{width:400, height:60, backgroundColor:'#ff0000', borderTopLeftRadius:12, borderTopRightRadius:12}}>
                <Stack direction='row' justifyContent="space-between" alignItems='center' padding={2}>
                  <Typography color='#ffffff'>Thông số chi tiết</Typography>
                  <Button onClick={closeModalDetail}><Typography color='#ffffff'>X</Typography></Button>
                </Stack>
              </Box>
              <Box sx={{overflowY: "scroll", height:'470px'}} justifyContent='center' alignItems='center'>
              { 
                product?.attributeDetailEntityList.map((item) => (
                <Box sx={{backgroundColor:'#ffffff',width:365, maxHeight:450, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:1}}spacing='1'>
                  <Stack direction='row' justifyContent="space-between"
                  alignItems="center"
                  spacing={2}>
                      <Typography sx={{fontSize:14}}>{item.name}</Typography>
                      <Typography sx={{fontSize:14}}>{item.value}</Typography>  
                  </Stack>
                  </Box>
                ))}
              </Box>
              {
                  product?.attributeDetailEntityList.length===0?(
                  <Box sx={{backgroundColor:'#dcdcdc',width:365, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:1}}>
                  <Button disabled='disabled' sx={{
                    width: "100%",
                    height: "20px",
                  }}
                  onClick={handleClickCompare}>So sánh</Button></Box>):(
                    <Box sx={{backgroundColor:'#dcdcdc',width:365, border:'1px solid', borderRadius:3, borderColor:'#dcdcdc',padding:1, margin:1}}>
                  <Button sx={{
                    width: "100%",
                    height: "20px",
                  }}
                  onClick={handleClickCompare}>So sánh</Button>
                  </Box>)
                }
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
export default DetailProduct;
