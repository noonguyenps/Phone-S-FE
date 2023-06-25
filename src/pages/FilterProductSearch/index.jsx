import { useState, useEffect } from "react";
import {
  Stack,
  Box,
  Button,
  Typography,
  FormGroup,
  Grid,
  Rating,
  Tab,
  Tabs,
} from "@mui/material";
import "./FilterProductSearch.scss";
import StarIcon from "@mui/icons-material/Star";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { useParams } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SellIcon from '@mui/icons-material/Sell';
import Loading from "../../components/Loading";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {RemoveRedEye} from "@mui/icons-material";
import apiBrand from "../../apis/apiBrand";

function FilterProductSearch(props) {

  const query = useParams().id;

  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sort, setSort] = useState('product_id');
  const [page, setPage] = useState(0);
  const size = 16;
  const [loadingShowmore, setLoadingShowmore] = useState(false)

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  useEffect(() => {
    const filterData = () => {
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
  
  useEffect(() => {
    const getData = async () => {
      var b = query.split('-')
      var c = ''
      for( let a in query.split('-')){
        c = c  + b[a] + " "
      }
      let params ={
        key:c,
        size: size,
        page: page,
        sort: sort
      }

      apiProduct.getProductsBySearch(params)
        .then((res) => {
          setProducts(res.data.listProduct);
        })
        .catch((err)=>{
          setProducts(null);
        })
      let params1 ={
          key:c,
          size: size,
          page: page,
          sort: 'brand_id'
        }
      apiBrand.getBrandsBySearch(params1).then((res)=>{
        setBrands(res.data.listBrand)
      }).catch((err)=>{
        setBrands(null)
      })
    };
    getData();
  }, [query, sort]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Stack className="filterProduct container" py={1} px={2} direction="column"
    justifyContent="center"
    alignItems="flex-start"
    spacing={2}>
      {brands?(
      <Stack spacing={2}>
        <Typography>Danh sách thương hiệu</Typography>
        <Stack direction='row'>
          {
            brands.map((item) => (
            <>
            <a href={`/brand/${item.id}`}>
              <Box width={150} height={180} border={1} borderRadius={2} borderColor='#d3d3d3' padding={1}>
                <Stack justifyContent="center" alignItems="center">
                  <img src={item.img} width={120} height={120} border={1}></img>
                  <Typography>{item.name}</Typography>
                </Stack>
              </Box>
            </a>
            </>))
          }
        </Stack>
      </Stack>):(<></>)
        
      }
      {products?(
        <Stack direction="row">
          <Stack  direction="row">
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
      </Stack>):(<></>)}
        <Box>
          <Grid container spacing={1}>
            {products?products.map((item) => (
              <>
                <Grid key={item.id} item lg={2} md={4} sm={6} xs={6}>
                  <CardProduct data={item} />
                </Grid>
              </>
            )):
            <Stack direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}>
              <img
              alt=""
              style={{ width: "280px", height: "180px" }}
              src="https://res.cloudinary.com/duk2lo18t/image/upload/v1684156973/frontend/Can_tfind_dx1zk3.png"
            />
              <Typography>Không tìm thấy sản phẩm từ từ khóa {query.replace(/-/g, " ")}</Typography>
            </Stack>
            }
            
          </Grid>
          {products&&products.length===(page+1)*size?(
          <Box>
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
          </Box>):<></>}
        </Box>
    </Stack>
  );
}

export default FilterProductSearch;
