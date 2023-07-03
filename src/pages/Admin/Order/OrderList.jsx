 /* eslint-disable */
import React, { useState } from "react";
import { useEffect } from "react";
import { Link,Routes,Route } from "react-router-dom";
import "./Order.scss";
import {
    Stack,
    Tabs,
    Tab,
    Button,
    Typography,
    TextField,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    InputBase,
    Pagination,
} from "@mui/material";
import apiCart from "../../../apis/apiCart";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import DetailOrder from "./DetailOrder";
import { numWithCommas } from "../../../constraints/Util";

const listStatus = ["Mã đơn hàng", "Nhãn đơn hàng"]
const items = [
    { id: 0, label: 'Tất cả'},
    { id: 2, label: 'Đang xử lý'},
    { id: 3, label: 'Đang vận chuyển'},
    { id: 4, label: 'Đã giao hàng'},
    { id: 5, label: 'Đã hủy'},
]

function OrderList() {
    const [selected, setSelected] = React.useState(0)
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [value, setValue] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [sort, setSort] = useState('order_id');
    const [status, setStatus] = useState(0);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const size = 10;

    useEffect(() => {
        const getData = async () => {
            if(Number(value) == 0||Number(value)>4){
                let param = {
                    page: page,
                    size: size,
                    sort: sort,
                    };
                apiCart.getOrders(param)
                    .then(res=>{
                    setOrders(res.data.listOrder);      
                    })
                    .catch(setOrders([]))
            }
            else{
                let param = {
                    page: page,
                    size: size,
                    status: status,
                    };
                apiCart.getOrdersByStatus(param)
                    .then(res=>{
                    setOrders(res.data.listOrder);      
                    })
                    .catch(setOrders([]))
            }
        };
        getData();
      }, [page, sort, status]);

      const convertDate = (date)=>{
        var dateNew = new Date(date)
        return String(dateNew.getDate()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
      };

    const handleClickTab = (i) => {
        if (i !== selected)
            setSelected(i)
    }
    


    useEffect(() => {
        const filterData = () => {
          switch (value) {
            case 1: {
              setSort("default");
              setPage(0);
              setStatus(0);
              break;
            }
            case 2: {
              setSort("default");
              setPage(0);
              setStatus(1);
              break;
            }
            case 3: {
              setSort("default");
              setPage(0);
              setStatus(2);
              break;
            }
            case 4: {
              setSort("default");
              setPage(0);
              setStatus(3);
              break;
            }
            case 5: {
                setSort("total_up");
                setPage(0);
                setStatus(4);
                break;
            }
            case 6: {
                setSort("total_down");
                setPage(0);
                setStatus(4);
                break;
            }  
            default: {
              setSort("order_id");
              setPage(0);
              setStatus(4);
              break;
            }
          }
        };
    
        filterData();
      }, [value]);


    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }
    const [orderDate, setOrderDate] = useState(0);
    const onChangeOrderDate = (e) => {
        setOrderDate(e.target.value)
    }
    const handleChangePage = (event, newValue) => {
        setPage(newValue);
      };
    return (<>
    
        <Stack bgcolor="#fff" p={3}>
            <Stack spacing={2}>
                <Typography>Danh sách đơn hàng</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                <Stack width="256px">
                    <Select
                        value={status}
                        onChange={onChangeStatus}
                        input={<BootstrapInput />}
                    >{
                            [0, 1].map(item =>
                                <MenuItem value={item}>{listStatus[item]}</MenuItem>)
                        }
                    </Select>
                </Stack>


                <Stack direction="row" sx={{ width: "500px", position: "relative" }}>
                    <TextField
                        id="outlined-basic"
                        label="Tìm kiếm"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        size="small"
                    />
                    <Button>
                        <SearchIcon sx={{ fontSize: "28px" }} />
                    </Button>
                </Stack>
                </Stack>
                <Tabs
                    value={value}
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
                        label='Đang xử lý'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                    <Tab
                        key='3'
                        label='Đang vận chuyển'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                    <Tab
                        key='4'
                        label='Đã giao hàng'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                    <Tab
                        key='5'
                        label='Đã hủy'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                    <Tab
                        key='6'
                        label='Giá trị Cao-Thấp'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                    <Tab
                        key='7'
                        label='Giá trị Thấp-Cao'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                    <Tab
                        key='8'
                        label='Đến hạn'
                        sx={{
                        fontSize: "12px",
                        textTransform: "none",
                        fontWeight: "500",
                        }}
                    />
                </Tabs>
                <Table
                    className="tableCategory"
                    sx={{ minWidth: "650px" }}
                    stickyHeader
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "20%", top: "64px" }}>Mã đơn hàng</TableCell>
                            <TableCell sx={{ width: "15%", top: "64px" }}>Trạng thái&nbsp;</TableCell>
                            <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Ngày đặt hàng&nbsp;</TableCell>
                            <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Giá trị đơn hàng&nbsp;</TableCell>
                            <TableCell sx={{ width: "15%", top: "64px" }}>Nhãn đơn hàng&nbsp;</TableCell>
                            <TableCell sx={{ width: "10%", top: "64px" }}>Thao tác&nbsp;</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.orderId}</TableCell>
                                <TableCell align="left">
                                    {row.orderStatus==0?(<Typography style={{ color: "#0000ff" }}>Đang xử lý</Typography>):(
                                    row.orderStatus==1?(<Typography style={{ color: "#ffa500" }}>Đang vận chuyển</Typography>):(
                                        row.orderStatus==2?(<Typography style={{ color: "#008000" }}>Đã giao hàng</Typography>):
                                        (<Typography style={{ color: "#ff0000" }}>Đã hủy</Typography>)
                                    )
                                )}</TableCell>
                                <TableCell align="center">{convertDate(row.createdDate)}</TableCell>
                                <TableCell align="center">{numWithCommas(row.total)} đ</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">
                                    <Stack spacing={1} justifyContent="center" py={1}>
                                        <Link to={`detail/${row.orderId}`}>
                                            <Button sx={{ width: "100px" }} variant="outlined" >Xem chi tiết</Button>
                                        </Link>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {orders?(<></>):(<><Typography align="center" sx={{fontSize:'19px'}}>Chưa có đơn hàng</Typography></>)}
                <Stack direction='row' spacing={2} justifyContent="center">
                    {
                        page==0?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'}} onClick={() => { setPage(page-1) }}>Trước</Button>)
                    }
                    <Button sx={{backgroundColor:'#EEEEEE'}}>Trang {page+1}</Button>
                    {
                        orders?.length<10?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'} } onClick={() => { setPage(page+1) }}>Sau</Button>)
                    }
                </Stack>
            </Stack>
        </Stack>
        <Routes>
            <Route path='detail' element={<DetailOrder />} />
        </Routes>
    </>
    )
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({

    '& .MuiInputBase-input': {
        boxSizing: "border-box",
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #888',
        fontSize: 14,
        display: 'flex',
        alignItems: "center",
        height: '40px !important',
        padding: '4px 10px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),

        '&:focus': {
            borderRadius: 4,
            borderColor: '#1890ff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default OrderList