 /* eslint-disable */
 import React, { useState } from "react";
 import { useEffect } from "react";
 import { Link,Routes,Route } from "react-router-dom";
 import "./Rating.scss";
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
     FormControl,
     InputBase,
     Pagination,
 } from "@mui/material";
 import apiCart from "../../../apis/apiCart";
 import apiRating from "../../../apis/apiRating";
 import SearchIcon from "@mui/icons-material/Search";
 import Checkbox from '@mui/material/Checkbox';
 import MenuItem from '@mui/material/MenuItem';
 import Select from '@mui/material/Select';
 import { styled } from '@mui/material/styles';
 import { numWithCommas } from "../../../constraints/Util";
 
 const listStatus = [{id:0,name:"Mặc định"},{id:1,name:"Sao"}, {id:2,name:"Mã Sản phẩm"},{id:3,name:"Mã Người dùng"}]
 function Rating() {
     const [selected, setSelected] = React.useState(0)
     const [orders, setOrders] = useState([]);
     const [ratings, setRatings] = useState([]);
     const [page, setPage] = useState(0);
     const [value, setValue] = useState(0);
     const [sort, setSort] = useState('order_id');
     const [status, setStatus] = useState(0);
     const [fillter, setFillter] = useState(0);
     const [fillterData, setFillterData] = useState("");
     const [fillterChange, setFillterChange] = useState(0);
     const [fillterDataChange, setFillterDataChange] = useState("");
 
 
     const handleChange = (event, newValue) => {
         setValue(newValue);
     };
     
     const size = 10;
 
     useEffect(() => {
         const getData = async () => {
            if(Number(fillterChange)==0){
                let params = {
                    page: page,
                    size: size,
                    sort: sort,
                    };
               apiRating.getAllRating(params)
                    .then(res=>{
                    setRatings(res.data.listRating);      
                    })
                    .catch(setRatings([]))
            }
            else{
                if(Number(fillterChange)==1){
                    let params = {
                        page: page,
                        size: size,
                        sort: sort,
                        star:Number(fillterData),
                    };
                    apiRating.getAllRatingByStar(params)
                    .then(res=>{
                    setRatings(res.data.listRating);      
                    })
                    .catch(setRatings([]))
                }else if(Number(fillterChange)==2){
                    let params = {
                        page: page,
                        size: size,
                        sort: sort,
                        productId:fillterData,
                    };
                    apiRating.getAllRatingByProduct(params)
                    .then(res=>{
                    setRatings(res.data.listRating);      
                    })
                    .catch(setRatings([]))
                }else if(Number(fillterChange)==3){
                    let params = {
                        page: page,
                        size: size,
                        sort: sort,
                        userId:fillterData,
                    };
                    apiRating.getAllRatingByUser(params)
                    .then(res=>{
                    setRatings(res.data.listRating);      
                    })
                    .catch(setRatings([]))
                }
            }
         };
         getData();
       }, [page, sort, fillterChange,fillterDataChange]);
 
     const handleDate = (timestamp) => {
         let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
         return date ;
     }
 
     const handleClickTab = (i) => {
         if (i !== selected)
             setSelected(i)
     }
     
 
 
     useEffect(() => {
         const filterData = () => {
           switch (value) {
             case 1: {
               setSort("date_up");
               setPage(0);
               break;
             }
             case 2: {
               setSort("date_down");
               setPage(0);
               break;
             }
             case 3: {
               setSort("rating_point_up");
               setPage(0);
               break;
             }
             case 4: {
               setSort("rating_point_down");
               setPage(0);
               break;
             }  
             default: {
               setSort("id");
               setPage(0);
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
                 <Typography>Danh sách đánh giá</Typography>
                 <Stack direction="row" alignItems="center" spacing={1}>
                 <Stack width="256px">
                    <FormControl sx={{width:'80%'}}>
                            <Select size="small" labelId="demo-simple-select-helper-label" 
                                id="demo-simple-select-helper" value={fillter}
                                onChange={(event)=>{
                                    setFillter(event.target.value)
                                }} 
                                >
                                {
                                    listStatus.map(item => <MenuItem value={item.id} >{item.name}</MenuItem>)
                                }
                            </Select>
                    </FormControl>
                 </Stack>
                 <Stack direction="row" sx={{ width: "500px", position: "relative" }}>
                     <TextField
                         id="outlined-basic"
                         label="Tìm kiếm"
                         variant="outlined"
                         value={fillterData}
                         onChange={event=>{
                            setFillterData(event.target.value)
                         }}
                         sx={{ width: "100%" }}
                         size="small"
                     />
                     <Button onClick={event => {setFillterChange(fillter)
                    setFillterDataChange(fillterData)}}>
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
                         label='Mới nhất'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='3'
                         label='Cũ nhất'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='4'
                         label='Nhiều sao'
                         sx={{
                         fontSize: "12px",
                         textTransform: "none",
                         fontWeight: "500",
                         }}
                     />
                     <Tab
                         key='5'
                         label='Ít sao'
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
                             <TableCell sx={{ width: "5%", top: "64px" }}>Mã đánh giá</TableCell>
                             <TableCell sx={{ width: "15%", top: "64px" }}>Đánh giá&nbsp;</TableCell>
                             <TableCell align="center" sx={{ width: "15%", top: "64px" }}>Người đánh giá&nbsp;</TableCell>
                             <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Mã sản phẩm/ Tên sản phẩm&nbsp;</TableCell>
                             <TableCell sx={{ width: "15%", top: "64px" }}>Ảnh sản phẩm&nbsp;</TableCell>
                             <TableCell sx={{ width: "15%", top: "64px" }}>Ảnh đánh giá&nbsp;</TableCell>
                             <TableCell sx={{ width: "5%", top: "64px" }}>Số sao&nbsp;</TableCell>
                             <TableCell sx={{ width: "10%", top: "64px" }}>Thao tác&nbsp;</TableCell>
                         </TableRow>
                     </TableHead>
                     <TableBody>
                         {ratings?.map((row) => (
                             <TableRow
                                 key={row.id}
                                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                             >
                                 <TableCell component="th" scope="row">{row.id}</TableCell>
                                 <TableCell align="center">{row.comment}</TableCell>
                                 <TableCell align="center">{row.nickname?row.nickname:"Người dùng S-Phone"}</TableCell>
                                 <TableCell align="center">{row.productResponse.id} / {row.productResponse.name}</TableCell>
                                 <TableCell sx ={{width:'100px'}} align='center'>
                                        <img style={{width:'100px', height:'100px'}} src = {row.productResponse.img[0]?row.productResponse.img[0]:'https://res.cloudinary.com/duk2lo18t/image/upload/v1667887284/frontend/R_zzr2lm.png'}></img>
                                </TableCell>
                                <TableCell sx ={{width:'100px'}} align='center'>
                                        <img style={{width:'100px', height:'100px'}} src = {row.urls[0]?row.urls[0]:'https://res.cloudinary.com/duk2lo18t/image/upload/v1667887284/frontend/R_zzr2lm.png'}></img>
                                </TableCell>
                                <TableCell align="center">{row.star}</TableCell>
                                 <TableCell align="center">
                                     <Stack spacing={1} justifyContent="center" py={1}>
                                         <Link to={`/product/${row.productResponse.id}`}>
                                             <Button sx={{ width: "100px" }} variant="outlined" >Xem đánh giá</Button>
                                         </Link>
                                     </Stack>
                                 </TableCell>
                             </TableRow>
                         ))}
                     </TableBody>
                 </Table>
                 {ratings?(<></>):(<><Typography align="center" sx={{fontSize:'19px'}}>Chưa có đơn hàng</Typography></>)}
                 <Stack direction='row' spacing={2} justifyContent="center">
                     {
                         page==0?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'}} onClick={() => { setPage(page-1) }}>Trước</Button>)
                     }
                     <Button sx={{backgroundColor:'#EEEEEE'}}>Trang {page+1}</Button>
                     {
                         ratings?.length<10?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'} } onClick={() => { setPage(page+1) }}>Sau</Button>)
                     }
                 </Stack>
             </Stack>
         </Stack>
     </>
     )
 }

 export default Rating