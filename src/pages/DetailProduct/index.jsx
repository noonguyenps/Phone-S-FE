import React, { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import imgDefault from '../../assets/img/img_default.jpg'
import ReviewProduct from "./ReviewProduct";

import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import ForgetPassword from "../../components/ForgetPassword";

import {
  Rating,
  Button,
  Grid,
  Box,
  Stack,
  Typography,
  Modal,
  IconButton,
  Tooltip,
  Skeleton,
} from "@mui/material";

import "./DetailProduct.scss";
import CheckIcon from "@mui/icons-material/Check";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { addItem } from "../../slices/cartSlice";

import { numWithCommas} from "../../constraints/Util";

import { toast } from "react-toastify";

import SliderImage from "./SliderImage";

import apiAccount from "../../apis/apiAccount";
import apiCart from "../../apis/apiCart";

function DetailProduct() {
  const user = useSelector((state) => state.auth.user);
  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);

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

  const [price, setPrice] = useState(0);
  const [listOptionValue,setListOptionValue] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      apiProduct.getProductsById(id).then((res)=>{
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
      toast.warning("Vui lòng đăng nhập để thực hiện chức năng này");
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
          .then(toast.info("Đã xóa khỏi danh sách yêu thích"))
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
        toast.warning("Có lỗi sảy ra " + err);
      })
    }
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

          <Box flex={1}>
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
                          className={`product-option__item ${
                                              itemOpt.name === "Màu sắc"
                                                ? "product-option__item--color"
                                                : "product-option__item--size"
                                            } ${selected ? "selected" : ""}`}
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
                    bgcolor="white"
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
              justify="center"
              spacing={3}
            >
              <Box>
                <Button
                  variant="contained"
                  onClick={handleClickBuy}
                  sx={{
                    width: "200px",
                    height: "48px",
                    backgroundColor: "#00CC99",
                    "&:hover": { opacity: 0.8, backgroundColor: "#006699" },
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

      <ReviewProduct product={product}/>
    </>
  );
}
export default DetailProduct;
