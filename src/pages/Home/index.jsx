import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

import { Grid, Stack, Button, Box } from "@mui/material";
import CardProduct from "../../components/CardProduct";
import CardFlashsale from "../../components/CardFlashsale";

import {
  SlideThuongHieu1,
  SlideThuongHieu2,
} from "../../constraints/Home";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import apiMain from "../../apis/apiMain";
import apiHome from "../../apis/apiHome";
import Loading from "../../components/Loading";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import apiProduct from "../../apis/apiProduct";

function Home() {
  const [products, setProducts] = useState([]);
  const [Quicklink, setQuicklink] = useState([]);
  const [CategorySpecify, setCategorySpecify] = useState([]);
  const [Suggestions, setSuggestions] = useState([]);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const [chooseSuggestion, setChooseSuggestion] = useState(0)

  const [page, setPage] = useState(0);
  const size = 30;

  useEffect(() => {
    const getData = async () => {
      setLoadingShowmore(true)
      let param = {
        page: page,
        size: size,
      };
      apiHome.getProducts(param)
        .then(res => {
          setProducts(res.data.listProduct);
        })
        .finally(() => setLoadingShowmore(false))
    };
    getData();
  }, [page]);


  useEffect(() => {
    const getDataQuickLink = async () => {
      let param = {};
      const response = await apiHome.getQuickLink(param);
      if (response) {
        setQuicklink(response);
      }
    };
    getDataQuickLink();

    const getDataCategorySpecify = async () => {
      let param = {};
      const response = await apiHome.getCategorySpecify(param);
      if (response) {
        setCategorySpecify(response);
      }
    };
    getDataCategorySpecify();

    const getDataSuggestion = async () => {
      let param = {};
      const response = await apiHome.getSuggestions(param);
      if (response) {
        setSuggestions(response);
      }
    };
    getDataSuggestion();
  }, []);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <>
      <Box className="category">
        <Box className="container">
          <Category />
        </Box>
      </Box>

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
        <Box id="section2">
          <SectionFlashsale />
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
          <Box className="suggestion">
            <Box className="section__heading">
              <Box className="section__title">Gợi Ý Hôm Nay</Box>
            </Box>
          </Box>
          <Grid container>
            {products.map((item) => (
              <Grid key={`product-${item.id}`} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
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
          </Stack>
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
        console.log(response)
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

function SlideThuongHieu() {
  return (
    <>
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        slidesPerGroup={2}
        
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup:1
          },
          "@0.75": {
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup:1
          },
          "@1.00": {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup:2
          },
          "@1.50": {
            slidesPerView: 2,
            spaceBetween: 40,
            slidesPerGroup:2
          },
        }}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
        id="slider-thuonghieu1"
      >
        {SlideThuongHieu1.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={item.link}>
              <Box style={{ width: "100%" }}>
                <img
                  style={{ width: "100%", borderRadius: "8px" }}
                  alt={item.alt}
                  src={item.image}
                />
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={6}
        slidesPerGroup={6}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper slider-thuonghieu2"
      >
        {SlideThuongHieu2.map((item) => (
          <SwiperSlide key={item.id} style={{ padding: "0 8px" }}>
            <Link to={item.link}>
              <Box className="img__thuonghieu2" style={{ width: "100%" }}>
                <img
                  style={{ width: "100%", borderRadius: "8px" }}
                  alt={item.alt}
                  src={item.image}
                />
                <p>{item.alt}</p>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

function SectionFlashsale() {
  const [sales, setSales] = useState([]);
  const [countDown, setCountDown] = useState({ hour: 0, minute: 0, second: 0 });

  useEffect(() => {
    const countDownFlashsale = () => {
      let initTime = new Date()
      let hourFlashsale = Math.ceil((initTime.getHours() + initTime.getMinutes() / 60) / 3) * 3

      initTime.setHours(hourFlashsale)
      initTime.setMinutes(0)
      initTime.setSeconds(0)
      var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = initTime - now;

        // Time calculations for days, hours, minutes and seconds
        setCountDown({
          hour: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minute: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          second: Math.floor((distance % (1000 * 60)) / 1000)
        })
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    }
    countDownFlashsale()
  }, [])

  useEffect(() => {
    const getData = async () => {
      const response = await apiProduct.getProducts({page:0,size:20,sort:"product_discount"});
      if (response) {
        setSales(response.data.listProduct);
      }
    };
    getData();
  }, []);
  return (
    <>
      <Box
        width="100%"
        height="274px"
        bgcolor="#fff"
        borderRadius="4px"
      >
        <Box id="section2__heading">
          <Box id="section2__title">
            <img alt="" src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg" />
            <img alt="" src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg" alt="" />
            <span className="flashsale__time">{("0" + countDown.hour).slice(-2)}</span>
            <span>:</span>
            <span className="flashsale__time">{("0" + countDown.minute).slice(-2)}</span>
            <span>:</span>
            <span className="flashsale__time">{("0" + countDown.second).slice(-2)}</span>
          </Box>
        </Box>
        <Swiper
          slidesPerView={6}
          slidesPerGroup={6}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper slider-sale"
        >
          {sales.map((item) => (
            <SwiperSlide key={`sale-${item.id}`} style={{ minWidth: "150px" }}>
              <CardFlashsale data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}

function Category() {
  const categoryRef = useRef();

  const [translate,setTranslate] = useState(0)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getData = async () => {
      apiHome.getCategories({})
        .then(res => {
          setCategories(res)
        })
        .catch(error => {
          setCategories([])
        })
    }
    getData()
  }, [])

  const onClickPrev = () => {
    if (categoryRef) {
      let offset = categoryRef.current.offsetWidth - 50
      if ( translate + offset >= 0){
        setTranslate(0)
        categoryRef.current.children[0].style.display = "none";
      }
      else{
        setTranslate(translate + offset)
        categoryRef.current.children[0].style.removeProperty("display");
        categoryRef.current.children[2].style.removeProperty("display");
      }
    }
  };

  const onClickNext = () => {
    if (categoryRef) {
      let offset = categoryRef.current.offsetWidth -50
      if(translate - 2*offset <= -categoryRef.current.children[1].offsetWidth){
        categoryRef.current.children[2].style.display = "none";
        setTranslate(-categoryRef.current.children[1].offsetWidth + offset)
      }
      else{
        setTranslate(translate - offset)
        categoryRef.current.children[0].style.removeProperty("display");
        categoryRef.current.children[2].style.removeProperty("display");
      }
    }
  };

  return (
    <Stack className='catogory'
      ref={categoryRef}
      direction='row'
      justifyContent="space-between"
      alignItems={'center'}
    >
      <Box className='catogory__prev' onClick = {onClickPrev} style={{display:'none'}}>
        <ArrowBackIosIcon />
      </Box>
      <Stack sx={{transform:`translateX(${translate}px)`}}
      className='catogory__content' direction="row" justifyContent="space-between" spacing="16px"
      >
        {categories.map((item) => (
          <Box key={item.id} >
            <Link to={`filter/${item.id}`}>
              <Box
                style={{
                  fontSize: "16px",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >{item.name}
              </Box>
            </Link>
          </Box>
        ))}
      </Stack>
      <Box className='catogory__next' onClick={onClickNext}>
        <ArrowForwardIosIcon />
      </Box>
    </Stack>

  );
}
export default Home;
