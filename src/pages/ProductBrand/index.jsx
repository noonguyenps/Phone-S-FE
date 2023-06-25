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
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import Loading from "../../components/Loading";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {RemoveRedEye} from "@mui/icons-material";
import AddressVN from "../../components/AddressVN"

function ProductBrand(props) {
  const id = useParams().id;
  const [brand, setBrand] = useState(null);
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingShowmore, setLoadingShowmore] = useState(false)
  const [sort, setSort] = useState("product_id")
  const navigate = useNavigate();
  const size = 16;

  useEffect(() => {
    const getData = async () => {
      apiProduct
        .getBrandById(id)
        .then((res) => {
          setBrand(res.data.Brand);
        })
        .catch((error) => {
          setBrand(null);
          toast.error("Không tồn tại thương hiệu");
          navigate("/");
        });
    };
    getData();
  }, [id]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };
  

  useEffect(() => {
    const getData = async () => {
      let params = {
        page: page,
        size: size,
        id: id,
        sort: sort,
      };
      if(brand){
        await apiProduct.getProductByBrand(params)
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
  }, [page, brand, sort]);


  useEffect(() => {
    const filterData = () => {
      if (!brand) return;
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
      <Stack>
        {
          brand?(<><Box border={1} margin={1} padding={1} borderRadius={2} borderColor='#dcdcdc'>
            <Stack direction='row' spacing={2}>
              <Stack justifyContent="center" alignItems="center" spacing={2}>
                <img src={brand.img} width={120} height={120}/>
                <Typography sx={{fontSize:14}}>Năm tham gia : {brand.yearCreate} </Typography>
              </Stack>
              <Stack justifyContent="flex-start" alignItems="flex-start" spacing={1}>
                <Typography sx={{fontSize:20}}>{brand.name} </Typography>
                <Typography sx={{fontSize:14}}>Mô tả : {brand.description} </Typography>
                <Typography sx={{fontSize:14}}>Địa chỉ : {brand.addressDetails} , <AddressVN province={brand.brandProvince} district={brand.brandDistrict} commune={brand.brandCommune}/></Typography>
                <Typography sx={{fontSize:14}}>Liên hệ :  {brand.phone} </Typography>
              </Stack>

            </Stack>
          </Box></>):(<></>)
        }
      </Stack>
      <SectionFlashsale/><br/><br/><br/>
      {products.length>0?(
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
      </Stack>):(<>
        <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
              <img
              alt=""
              style={{ width: "280px", height: "180px" }}
              src="https://res.cloudinary.com/duk2lo18t/image/upload/v1684156973/frontend/Can_tfind_dx1zk3.png"
            />
              <Typography>Không tìm thấy sản phẩm ! Xin lỗi vì sự bất tiện này</Typography>
              <a href="/"><Typography>Quay lại trang chủ</Typography></a>
            </Stack>
            </>)}

        <Box>
          <Grid container>
            {products.map((item) => (
              <Grid key={item.id} item lg={2} md={4} sm={6} xs={6}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {products.length===(page+1)*size?(
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
          </Stack>):(<></>)
          }
    </Stack>
  );
}
function SectionFlashsale() {
  const id = useParams().id;
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
      const response = await apiProduct.getProductByBrand({page:0,size:16,id: id,sort:"product_discount"});
      if (response) {
        setSales(response.data.listProduct);
      }
    };
    getData();
  }, []);
  return (
    
    <>
    {
      sales.length!=0?(
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
    ):(
      <></>
    )
    }
    </>
  );
}
export default ProductBrand;
