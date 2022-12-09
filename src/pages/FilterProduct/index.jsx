import { useState, useEffect, useCallback } from "react";
import React, {useRef} from "react";
import { Link } from "react-router-dom";
import CardFlashsale from "../../components/CardFlashsale";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import {
  Stack,
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Grid,
  Rating,
  Tab,
  RadioGroup,
  Tabs,
  Radio,
} from "@mui/material";
import "./FilterProduct.scss";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import Loading from "../../components/Loading";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {RemoveRedEye} from "@mui/icons-material";

function FilterProduct(props) {
  const idCategory = useParams().id;
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [categoryChild, setCategoryChild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const [filter, setFilter] = useState({});
  const [filterPrice, setFilterPrice] = useState({
    minPrice: "",
    maxPrice: "",
    option: -1,
    apply: false,
    value: "",
  });

  const [sort, setSort] = useState("product_id")
  const navigate = useNavigate();
  const size = 16;

  useEffect(() => {
    const getData = async () => {
      apiProduct
        .getCategoryFilterById(idCategory)
        .then((res) => {
          setCategory(res[0]);
        })
        .catch((error) => {
          setCategory(null);
          toast.warning("Không tồn tại danh mục trong hệ thống");
          navigate("/");
        });
    };
    getData();
  }, [idCategory]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };
  
  useEffect(() => {
    const getData = async () => {
      let params = {
        parentId: idCategory,
      };
      apiProduct.getCategoryChild(params)
        .then(res => {
          setCategories(res)
        })
        .catch(error => {
          setCategories([])
        })
    }
    getData()
  }, [])

  useEffect(() => {
    const getData = async () => {
      let params = {
        page: page,
        size: size,
        idCategory: idCategory,
        sort: sort,
      };
      if (category) {
        await apiProduct.getProductByCategory(params)
        .then((res)=>{
          if(page==0){
            setProducts(res.data.listProduct);
          }else{
            setProducts((prev)=>([...prev,...res.data.listProduct]))
          }
        }
        );
      }
    };
    getData();
  }, [page, category, sort]);

  useEffect(() => {
    const getData = async () => {
      let params = {
        parentId: idCategory,
      };
      if (category) {
        const response = await apiProduct.getCategoryChild(params);
        if (response) {
          setCategoryChild(response.data);
        }
      }
    };
    getData();
  }, [page, category, sort]);

  useEffect(() => {
    const filterData = () => {
      if (!category) return;
      switch (value) {
        case 1: {
          setSort("product_sell_amount");
          setPage(0);
          break;
        }
        case 2: {
          setSort("create_at");
          setPage(0);
          break;
        }
        case 3: {
          setSort("product_price_down");
          setPage(0);
          break;
        }
        case 4: {
          setSort("product_price_up");
          setPage(0);
          break;
        }
        default: {
          setSort("product_id");
          setPage(0);
          break;
        }
      }
    };

    filterData();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack className="filterProduct container" py={1} px={2} spacing={1}>
      <Stack direction="row" py ={2} alignItems="center" height='10px'>
        <HomeIcon/><br/>
        <a href="/" ><h3>Trang chủ </h3></a>
        <Typography>/ {category?.name}</Typography>
      </Stack>
    <Stack className="filterProduct__sidebar" direction="row">
      <Box className='filterProduct__form'>
      <Stack direction="row" alignItems="center">
      <Typography className='filterProduct__title' width='190px'>Danh mục liên quan : </Typography>
        {
          categories.map((item) =>(
            <Box key={item.id} sx={{
              width: '100px',
            }}>
            <a href={`/filter/${item.id}`}>
              <Box fontSize="14px">
                {item.name}
              </Box>
            </a>
          </Box>))                
        }
      </Stack> 
      </Box>
      </Stack>
      <SectionFlashsale/><br/><br/><br/>
      <Stack className="filterProduct__sidebar" direction="row">
      <Stack className='filterProduct__form' direction="row">
          <Typography className='filterProduct__title' width='180px'>Sắp xếp theo tiêu chí : </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            width={290}
            onChange={handleChange}
            sx={{
              width:'490px'
            }}
            padding = {1}
            textColor="primary"
            indicatorColor="inherit"
            aria-label="basic tabs example"
          >
              <Tab
                key='1'
                icon={<RemoveRedEye/>}
                label='Xem nhiều'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='2'
                icon={<SellIcon/>}
                label='Mua nhiều'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='3'
                icon={<FiberNewIcon/>}
                label='Hàng mới'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='4'
                icon={<KeyboardDoubleArrowUpIcon/>}
                label='Giá Thấp-Cao'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='5'
                icon={<KeyboardDoubleArrowDownIcon/>}
                label='Giá Cao-Thấp'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
          </Tabs>
        </Box>
      </Stack>
      </Stack>
        <Box>
          <Grid container spacing={1}>
            {products.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
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
    </Stack>
  );
}
function SectionFlashsale() {
  const idCategory = useParams().id;
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
      const response = await apiProduct.getProductByCategory({page:0,size:16,idCategory: idCategory,sort:"product_discount"});
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
        height="330px"
        bgcolor="#fff"
        borderRadius="4px"
      >
        <Box id="section2__heading">
          <Box id="section2__title">
            <img alt="" src="https://res.cloudinary.com/duk2lo18t/image/upload/v1670316903/frontend/R-removebg-preview_gzgdem.png" height='80px'/>
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
export default FilterProduct;
