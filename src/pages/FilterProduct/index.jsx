import { useState, useEffect, useCallback } from "react";
import React, {useRef} from "react";
import { Link } from "react-router-dom";
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
import StarIcon from "@mui/icons-material/Star";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { numWithCommas } from "../../constraints/Util";
import CardProduct from "../../components/CardProduct";
import apiProduct from "../../apis/apiProduct";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function FilterProduct(props) {
  const idCategory = useParams().id;
  const slugCategory = useParams().slug;
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(0);
  const [products, setProducts] = useState([]);
  const [categoryChild, setCategoryChild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [test, setTest] = useState([1,2,3]);
  const [filter, setFilter] = useState({});
  const [filterPrice, setFilterPrice] = useState({
    minPrice: "",
    maxPrice: "",
    option: -1,
    apply: false,
    value: "",
  });

  const [productFilter, setProductFilter] = useState([]);

  const navigate = useNavigate();
  const size = 30;
  const sort = "product_id";

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
        const response = await apiProduct.getProductByCategory(params);
        if (response) {
          setProducts(response.data.listProduct);
        }
      }
    };
    getData();
  }, [page, category]);

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
  }, [page, category]);

  useEffect(() => {
    const filterData = () => {
      if (!category) return;
      let data = [...products];
      switch (value) {
        case 1: {
          const getData = async () => {
            let param = {
              idCategory: idCategory,
              page: page,
              size: size,
              sort: "product_sell_amount",
            };
            apiProduct
              .getProductByCategory(param)
              .then((res) => {
                data = res.data.listProduct;
                setProductFilter(data);
                console.log("res data: ", data);
              })
              .catch((err) => console.log(err));
          };
          getData();
          break;
        }
        case 2: {
          const getData = async () => {
            let param = {
              idCategory: idCategory,
              page: page,
              size: size,
              sort: "create_at",
            };
            apiProduct
              .getProductByCategory(param)
              .then((res) => {
                data = res.data.listProduct;
                setProductFilter(data);
                console.log("res data: ", data);
              })
              .catch((err) => console.log(err));
          };
          getData();
          break;
        }
        case 3: {
          const getData = async () => {
            let param = {
              idCategory: idCategory,
              page: page,
              size: size,
              sort: "product_price_down",
            };
            apiProduct
              .getProductByCategory(param)
              .then((res) => {
                data = res.data.listProduct;
                setProductFilter(data);
                console.log("res data: ", data);
              })
              .catch((err) => console.log(err));
          };
          getData();
          break;
        }
        case 4: {
          const getData = async () => {
            let param = {
              idCategory: idCategory,
              page: page,
              size: size,
              sort: "product_price_up",
            };
            apiProduct
              .getProductByCategory(param)
              .then((res) => {
                data = res.data.listProduct;
                setProductFilter(data);
                console.log("res data: ", data);
              })
              .catch((err) => console.log(err));
          };
          getData();
          break;
        }
        default: {
          const getData = async () => {
            let param = {
              idCategory: idCategory,
              page: page,
              size: size,
              sort: "product_id",
            };
            apiProduct
              .getProductByCategory(param)
              .then((res) => {
                data = res.data.listProduct;
                setProductFilter(data);
                console.log("res data: ", data);
              })
              .catch((err) => console.log(err));
          };
          getData();
          break;
        }
      }
      setProductFilter(data);
    };

    filterData();
  }, [products, filter, category, filterPrice, value]);


  const onChangeMinPrice = (e) => {
    let value = Number(e.target.value);
    if (Number.isInteger(value) && value >= 0) {
      setFilterPrice({ ...filterPrice, minPrice: value, option: -1 });
    } else {
      setFilterPrice({ ...filterPrice, minPrice: 0, option: -1 });
    }
  };
  const onChangeMaxPrice = (e) => {
    let value = Number(e.target.value);
    if (Number.isInteger(value) && value >= 0) {
      setFilterPrice({ ...filterPrice, maxPrice: value, option: -1 });
    } else {
      setFilterPrice({ ...filterPrice, maxPrice: 1000000000, option: -1 });
    }
  };

  const onSetFilterPrice = (value, index) => {
    setFilterPrice((pre) => {
      return {
        ...pre,
        option: index,
        value: value,
      };
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeFilter = useCallback(
    (e, propertyName) => {
      let property = filter[propertyName] || [];
      if (e.target.checked) {
        property = [...property, e.target.name];
      } else property = property.filter((item) => item !== e.target.name);

      setFilter((filter) => {
        return {
          ...filter,
          [propertyName]: [...property],
        };
      });

      console.log({
        ...filter,
        [propertyName]: [...property],
      });
    },
    [filter]
  );
  const onChangeCategory = (rate) => {
    if (filter.rate === rate) {
      const newFilter = delete filter.rate;
      setFilter(newFilter);
    } else {
      setFilter({ ...filter, rate });
    }
  };
  const onChangeRating = (rate) => {
    if (filter.rate === rate) {
      const newFilter = delete filter.rate;
      setFilter(newFilter);
    } else {
      setFilter({ ...filter, rate });
    }
  };
  const onChangeShipping = (e) => {
    setFilter({ ...filter, shipping: e.target.value });
  };
  const handleApplyFilterPrice = () => {
    setFilterPrice((pre) => {
      return { ...pre, apply: !pre.apply };
    });
  };

  return (
    <Stack className="filterProduct container" direction="row" spacing={1}>
      <Stack className="filterProduct__sidebar" direction="column">
      <Box className='filterProduct__form'>
                    <Typography className='filterProduct__title'>DANH MỤC SẢN PHẨM</Typography>
                    <FormGroup>{
                            categories.map(item =>
                              <Box key={item.id} onClick={() => refreshPage()}>
                              <Link to={`/filter/${item.id}`}>
                                <Box fontSize="13px">
                                  {item.name}
                                </Box>
                              </Link>
                            </Box>)
                        }
                    </FormGroup>
                </Box>
        <Box className='filterProduct__form'>
                    <Typography className='filterProduct__title'>Đánh giá</Typography>
                    <FormGroup>
                        {
                            [5, 4, 3].map(item =>
                                <Box key={item} onClick={() => onChangeRating(item)}
                                    className={`filterProduct__rating ${item === filter.rate ? 'selected' : ''}`}>
                                    <Rating
                                        name="hover-feedback"
                                        value={item}
                                        readOnly
                                        icon={<StarIcon sx={{ fontSize: 16 }} />}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} sx={{ fontSize: 16 }} />}
                                    /><Box fontSize="13px">{`từ ${item} sao`}</Box>
                                </Box>)
                        }
                    </FormGroup>
                </Box>
        <Box className='filterProduct__form'>
                    <Typography className='filterProduct__title'>Giao hàng</Typography>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={onChangeShipping}>
                        <FormControlLabel className='filterProduct__label'
                            value="noidia"
                            control={<Radio className="filterProduct__radiobutton" />}
                            label="Hàng Nội Địa" />
                        <FormControlLabel className='filterProduct__label'
                            value="quocte"
                            control={<Radio className="filterProduct__radiobutton" />}
                            label="Hàng Quốc Tế" />
                    </RadioGroup>
                </Box>
      </Stack>
      <Box sx={{ flex: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
            {tabs.map((item) => (
              <Tab
                key={item.id}
                label={item.name}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
            ))}
          </Tabs>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {productFilter.map((item) => (
              <Grid key={item.id} item xs={3}>
                <CardProduct data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
}

function FilterForm(props) {
  const { property, onChangeFilter } = props;
  const [expand, setExpand] = useState(false);
  const handleExpand = () => {
    setExpand((pre) => !pre);
  };

  return (
    <Box className="filterProduct__form">
      <Typography className="filterProduct__title">{property.name}</Typography>
      <FormGroup>
        {(expand ? property.values : property.values.slice(0, 4)).map(
          (item) => (
            <FormControlLabel
              key={item.id}
              className="filterProduct__label"
              name={item.value}
              onChange={(e) => onChangeFilter(e, property.name)}
              control={<Checkbox className="filterProduct__checkbox" />}
              label={item.value}
            />
          )
        )}
      </FormGroup>
      {expand ? (
        <Stack
          onClick={handleExpand}
          direction="row"
          sx={{ cursor: "pointer", marginTop: "14px" }}
        >
          <Typography sx={{ fontSize: 14, color: "#0D5CB6" }}>
            Thu gọn
          </Typography>
          <KeyboardArrowUpIcon sx={{ fontSize: 20, color: "#0D5CB6" }} />
        </Stack>
      ) : (
        <Stack
          onClick={handleExpand}
          direction="row"
          sx={{ cursor: "pointer", marginTop: "14px" }}
        >
          <Typography sx={{ fontSize: 14, color: "#0D5CB6" }}>
            Xem thêm
          </Typography>
          <KeyboardArrowDownIcon sx={{ fontSize: 20, color: "#0D5CB6" }} />
        </Stack>
      )}
    </Box>
  );
}

const services = [
  {
    id: 1,
    name: "Giao siêu tốc 2h",
  },
  {
    id: 2,
    name: "Không giới hạn",
  },
  {
    id: 3,
    name: "Rẻ hơn hoàn tiền",
  },
  {
    id: 4,
    name: "Trả góp 0%",
  },
];
const refreshPage = ()=>{
  window.location.reload();
}
const tabs = [
  {
    id: 1,
    name: "Phổ biến",
  },
  {
    id: 2,
    name: "Bán chạy",
  },
  {
    id: 3,
    name: "Hàng mới",
  },
  {
    id: 4,
    name: "Giá thấp",
  },
  {
    id: 5,
    name: "Giá cao",
  },
];
export default FilterProduct;
