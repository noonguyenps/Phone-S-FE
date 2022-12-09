import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Tabs, 
  Tab,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  MenuItem,
  FormControl,
  Select,
  Checkbox,
  Modal
} from '@mui/material';
import "./Orders.scss";
import SearchIcon from "@mui/icons-material/Search";
import OrderItem from "../../../components/OrderItem/index.jsx";
import { orderTabs} from "../../../constraints/OrderItem";
import { numWithCommas} from "../../../constraints/Util";
import { useEffect } from "react";
import apiCart from "../../../apis/apiCart";
import { useSelector } from "react-redux";

function Orders() {
  const [orders, setOrders] = useState([]);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const user = useSelector(state => state.auth.user)
  
  const size = 10;

  useEffect(() => {
    const getData = async () => {
      let params = {
        page: page,
        size: size,
        sort:'order_id',
      };
      apiCart.getOrdersByUser(params)
        .then(response=>{
          setOrders(response.data.listOrder);
          setTotalPage(Math.ceil(response.pagination._totalRows / size));
        })
        .catch(setOrders([]))
    };
    getData();
  }, [page,user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
  };

  const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDay()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };
  return (
    <>
      <Typography variant="h6">Đơn hàng của tôi</Typography>
      <Box className="myorder" sx={{ width: "100%" }}>
        <Box className="myorder__tabs">
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {orderTabs.map((item) => (
              <Tab
                key={item.id}
                label={item.type}
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "400",
                }}
                {...a11yProps(item.id)}
              />
            ))}
          </Tabs>
        </Box>
        <Box>
            {orders.length!==0 ? (
              <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow>
                      <TableCell>Mã đơn vận</TableCell>
                      <TableCell>Tổng tiền</TableCell>
                      <TableCell>Ngày tạo</TableCell>
                      <TableCell>Trạng thái</TableCell>
                      <TableCell>Thao tác</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {orders.map(row => (
                      <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell>
                              <Stack>
                                  <Typography sx={{ color: "#1890ff" }}>{row.name}</Typography>
                              </Stack>
                          </TableCell>
                          <TableCell>
                              <Stack direction="row" justifyContent="center">
                                  <Typography sx={{ margin: "auto 0" }}>{numWithCommas(row.total)} VND</Typography>
                              </Stack>
                          </TableCell>
                          <TableCell align="center">{convertDate(row.createdDate)}</TableCell>
                          <TableCell align="center">{row.orderStatus==0?"Đang xử lý":(
                                row.orderStatus==1?"Đang vận chuyển":(
                                    row.orderStatus==2?"Đã giao hàng":"Đã hủy"
                                )
                            )}</TableCell>
                          <TableCell align='center'>
                              <Stack spacing={1} justifyContent="center" py={1}>
                              <a href={`detail/${row.orderId}`}>
                                        <Button sx={{ width: "100px" }} variant="outlined" >Xem chi tiết</Button>
                              </a>
                              </Stack>
                          </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
          </Table>
            ) : (
              <Box  className="myorder__none">
                <img
                 height="200px"
                 width="200px"
                  src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
                  alt=""
                />
                <Typography>Chưa có đơn hàng</Typography>
              </Box>
            )}
          {/* </TabPanel>
          {orderTabs.slice(1, orderTabs.length).map((item) => {
            const tmp = getOrderByType(orders, item.id);
            if (tmp.length === 0)
              return (
                <TabPanel key={item.id} value={value} index={item.id} dir={theme.direction}>
                  <Box className="myorder__none">
                    <img
                      height="200px"
                      width="200px"
                      src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
                      alt=""
                    />
                    <Typography>Chưa có đơn hàng</Typography>
                  </Box>
                </TabPanel>
              );
            else
              return (
                <TabPanel key={item.id} value={value} index={item.id} dir={theme.direction}>
                  {tmp.map((item) => (
                    <OrderItem key={item.id} order={item} />
                  ))}
                </TabPanel>
              );
          })} */}

          {totalPage > 1 ? <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={totalPage} page={page} onChange={handleChangePage} />
          </Stack> : <></>}
        </Box>
      </Box>
    </>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// const getOrderByType = (orders, id) =>
//   orders.filter((item) => item.orderId === id);

export default Orders;
