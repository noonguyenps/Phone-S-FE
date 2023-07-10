import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

import { Grid, Stack, Button, Box, Typography } from "@mui/material";
import CardProduct from "../../components/CardProduct";
import CardFlashsale from "../../components/CardFlashsale";

import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiHome from "../../apis/apiHome";
import Loading from "../../components/Loading";
import apiProduct from "../../apis/apiProduct";

function Home() {
  const [products, setProducts] = useState([]);
  const [productsFavorite, setProductsFavorite] = useState([]);
  const [productsRating, setProductsRating] = useState([]);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const [page, setPage] = useState(0);
  const size = 12;

  useEffect(() => {
    const getData = async () => {
      setLoadingShowmore(true)
      let param = {
        page: page,
        size: size,
      };
      apiHome.getProducts(param)
        .then(res => {
          setProducts((prev)=>([...prev , ...res.data.listProduct]));
        })
        .finally(() => setLoadingShowmore(false))
    };
    getData();
  }, [page]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const getData = async () => {
      let param = {
        page: 0,
        size: 12,
      };
      apiHome.getProductsFavorite(param)
        .then(res => {
          setProductsFavorite(res.data.listProduct);
        })
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      let param = {
        page: 0,
        size: 12,
      };
      apiHome.getProductsRating(param)
        .then(res => {
          setProductsRating(res.data.listProduct);
        })
    };
    getData();
  }, []);

  return (
    <>
      <Stack spacing={2} className="container home">
        <Box id="section1">
          <SlideKhuyenMai />
        </Box>
        <Box id="section3">
          
          <Box width="24%">
            <Link to='/product/08fb28f5-bde2-4836-9f74-58d9d6192b50'>
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/08/11/chuyen-trang-samssung-11.png"
              alt=""
            /></Link>
          </Box>
          
          
            <Box width="24%">
              <Link to='/product/37e26481-69e9-48b4-9433-d50e1dae6d24'>
              <img
                style={{ maxHeight: "160px" }}
                src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/10/14/sanphamhot.jpg"
                alt=""
              />
              </Link>
            </Box>
          
          
          <Box  width="24%">
            <Link to='/product/3c2e0a21-4bb7-4019-adce-eddbdc4da762'>
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/20/note-111.jpg"
              alt=""
            />
              </Link>
          </Box>
          <Box width="24%">
            <Link to='/product/b1671fc4-55ae-47f0-95a2-edf53ee92808'>
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/10/04/huawei-d14-banner-nho-01.jpg"
              alt=""
            />
            </Link>
          </Box>
        </Box>
        <Box id="section3">
          <Box width="20%">
            <Link to='/product/08fb28f5-bde2-4836-9f74-58d9d6192b50'>
            <img
              style={{ maxHeight: "200px" }}
              src="https://cdn.tgdd.vn/2022/11/banner/380-x-200--1--380x200.png"
              alt=""
            /></Link>
          </Box>
          <Box width="59%">
            <Link to='/product/37e26481-69e9-48b4-9433-d50e1dae6d24'>
            <img
              style={{ maxHeight: "200px" }}
              src="https://cdn.tgdd.vn/2022/10/banner/720-220-720x220-250.png"
              alt=""
            /></Link>
          </Box>
          <Box width="20%">
            <Link to='/product/87255541-d641-4c5b-b43b-87d8b334a4e3'>
            <img
              style={{ maxHeight: "200px" }}
              src="https://cdn.tgdd.vn/2022/11/banner/VNPay-Apple-Watch-380x200-1.png"
              alt=""
            />
            </Link>
          </Box>
        </Box>
        <Box id="section9">
          <Box margin='0.5rem'>
            <Box bgcolor='#ffffff' padding={2}>
              <Typography>Danh sách sản phẩm được đánh giá cao</Typography>
            </Box>
          </Box>
          <Grid container>
            {productsRating.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box id="section9">
          <Box margin='0.5rem'>
            <Box bgcolor='#ffffff' padding={2}>
              <Typography>Danh sách sản phẩm được yêu thích</Typography>
            </Box>
          </Box>
          <Grid container>
            {productsFavorite.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box id="section9">
          <Box margin='0.5rem'>
            <Box bgcolor='#ffffff' padding={2}>
              <Typography>Danh sách sản phẩm</Typography>
            </Box>
          </Box>
          <Grid container>
            {products.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
          {products&&products.length===(page+1)*size?(
          <Stack direction='row' justifyContent="center" mt={2}>
            <Button
              width="15rem"
              height="2rem"
              color="primary"
              variant="outlined"
              onClick={handleLoadMore}
            >{loadingShowmore && <Loading />}
              Xem thêm
            </Button>
          </Stack>):<></>}
        </Box>
      </Stack>
    </>
  );
}

function SlideKhuyenMai() {
  const [SlideKhuyenMai, setSlideKhuyenMai] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let param = {};
      const response = await apiHome.getSlideKhuyenMai(param);
      if (response) {
        setSlideKhuyenMai(response);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Swiper
          navigation={true}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          className="mySwiper"
          id="slider-khuyenmai"
        >
          {SlideKhuyenMai.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={item.link}>
                <Box width="100%">
                  <img src={item.image} alt="" />
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
    </>
  );
}
export default Home;
