import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

import { Grid, Stack, Button, Box } from "@mui/material";
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

  return (
    <>
      <Stack spacing={2} className="container home">
        <Box id="section1">
          <SlideKhuyenMai />
        </Box>
        <Box id="section3">
          <Box width="24%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/08/11/chuyen-trang-samssung-11.png"
              alt=""
            />
          </Box>
          <Box width="24%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/10/14/sanphamhot.jpg"
              alt=""
            />
          </Box>
          <Box width="24%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/09/20/note-111.jpg"
              alt=""
            />
          </Box>
          <Box width="24%">
            <img
              style={{ maxHeight: "160px" }}
              src="https://cdn.hoanghamobile.com/i/home/Uploads/2022/10/04/huawei-d14-banner-nho-01.jpg"
              alt=""
            />
          </Box>
        </Box>
        <Box id="section3">
          <Box width="20%">
            <img
              style={{ maxHeight: "200px" }}
              src="https://cdn.tgdd.vn/2022/11/banner/380-x-200--1--380x200.png"
              alt=""
            />
          </Box>
          <Box width="59%">
            <img
              style={{ maxHeight: "200px" }}
              src="https://cdn.tgdd.vn/2022/10/banner/720-220-720x220-250.png"
              alt=""
            />
          </Box>
          <Box width="20%">
            <img
              style={{ maxHeight: "200px" }}
              src="https://cdn.tgdd.vn/2022/11/banner/VNPay-Apple-Watch-380x200-1.png"
              alt=""
            />
          </Box>
        </Box>
        <Box id="section9">
          <Box>
            <Box className="section__heading">
              <Box>Danh sách sản phẩm</Box>
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
