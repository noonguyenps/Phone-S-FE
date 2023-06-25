import React from 'react'
import {
    Typography,
    Stack,
    Button,
    TextField,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Modal
} from '@mui/material';
import "./Product.scss"
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from '@mui/icons-material/Search';
import apiProduct from '../../../apis/apiProduct';
import { toast } from "react-hot-toast";
import { useState , useEffect} from 'react';
import { numWithCommas } from '../../../constraints/Util';

function Product() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const openModalDelete = (itemdelete) => {
        setItemdelete(itemdelete)
        setModalDelete(true)
    }
    const closeModalDelete = () => setModalDelete(false);
    const [listProducts, setListProducts] = useState([]);
    const [value, setValue] = useState(0)
    const [page, setPage] = useState(0)
    const [sort, setSort] = useState("product_id")
    const [refesh, setRefesh] = useState(0)
    const [status, setStatus] = useState(1)
    const [itemdelete, setItemdelete] = useState("")
    const size = 10;
    useEffect(() => {
        const getData = async () => {
            if(Number(value)<5){
                let params ={
                    page:page,
                    size:size,
                    sort:sort
                }
                apiProduct.getProductsWithAdmin(params)
                    .then(res => {
                        setListProducts(res.data.listProduct);
                    })
            }
            else{
                if(Number(value) == 5){
                    let params ={
                        page:page,
                        size:size,
                        status:status
                    }
                    apiProduct.getProductsByStatus(params)
                        .then(res => {
                            setListProducts(res.data.listProduct);
                        })
                }
                else{
                    let params ={
                        page:page,
                        size:size,
                        status:status
                    }
                    apiProduct.getProductsByStatus(params)
                        .then(res => {
                            setListProducts(res.data.listProduct);
                        })
                }
            }
        };
        getData();
    }, [page, sort, status, refesh]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [update, setUpdate] = React.useState('');

    const handleChangeUpdate = (event) => {
        setUpdate(event.target.value);
    };
    const [select, setSelect] = React.useState('');

    const handleChangeSelect = (event) => {
        setSelect(event.target.value);
    };
    const convertDate = (date)=>{
        var dateNew = new Date(date)
        return String(dateNew)
    };
    useEffect(() => {
        const filterData = () => {
          switch (value) {
            case 1: {
              setSort("product_sell_amount");
              setPage(0);
              setStatus(2);
              break;
            }
            case 2: {
              setSort("create_at");
              setPage(0);
              setStatus(2);
              break;
            }
            case 3: {
              setSort("product_price_down");
              setPage(0);
              setStatus(2);
              break;
            }
            case 4: {
              setSort("product_price_up");
              setPage(0);
              setStatus(2);
              break;
            }
            case 5: {
                setPage(0);
                setStatus(1);
                setSort('default');
                break;
            }
            case 6: {
                setPage(0);
                setStatus(0);
                setSort('default');
                break;
            }
            default: {
              setSort("product_id");
              setPage(0);
              setStatus(2);
              break;
            }
          }
        };
    
        filterData();
      }, [value]);

      const handleExport = () => {
        apiProduct.exportProduct()
        .then((res)=>{
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `product_${Date.now()}.xlsx`);
          document.body.appendChild(link);
          link.click();
        })
        .catch(error=>{
          toast.error("Xuất file không thành công")
        })
      }

      const handleDelete = () => {
        apiProduct.deleteProductById(itemdelete.id)
        .then(res=>{
            toast.success("Xóa sản phẩm thành công")
            setRefesh(refesh+1)
        })
        .catch(error=>{
        toast.error("Xóa sản phẩm không thành công!")
        })
        closeModalDelete()
      }
    
    return (
        <>
        <Stack bgcolor="#fff" p={3} spacing={1}>
        <Stack direction="row">
            <Stack spacing={2} width="100%">
                <Stack direction="row" justifyContent="space-between">
                    <Typography>Danh sách sản phẩm</Typography>
                    <Link to="create">
                        <Button sx={{width:160}} variant="contained">Thêm Sản phẩm</Button>
                    </Link>
                </Stack>
            </Stack>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
            <TextField size='small'
            label='Tìm sản phẩm'></TextField>
            <Button sx={{background:'green', width:160}} variant="contained" onClick={handleExport}>Xuất file Excel</Button>
        </Stack>
        <Tabs
            value={value}
            width={500}
            onChange={handleChange}
            sx={{
              width:'790px'
            }}
            padding = {1}
            textColor="primary"
            indicatorColor="primary"
            aria-label="basic tabs example"
          >
              <Tab
                key='1'
                label='Xem nhiều'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='2'
                label='Mua nhiều'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='3'
                label='Hàng mới'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='4'
                label='Giá Thấp-Cao'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='5'
                label='Giá Cao-Thấp'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='6'
                label='Đang mở bán'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
              <Tab
                key='7'
                label='Đang tạm ẩn'
                sx={{
                  fontSize: "12px",
                  textTransform: "none",
                  fontWeight: "500",
                }}
              />
          </Tabs>
          <Stack padding ={1}>
          <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell sx ={{width:'100px'}}>Hình ảnh</TableCell>
                                <TableCell>Giá bán</TableCell>
                                <TableCell>Nhà cung cấp</TableCell>
                                <TableCell>Danh mục</TableCell>
                                <TableCell>Thương hiệu</TableCell>
                                <TableCell>Trạng thái</TableCell>
                                <TableCell>Ngày tạo</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listProducts?.map(row => (
                                <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Stack>
                                            <Typography sx={{ color: "#1890ff" }}>{row.name}</Typography>
                                            <Typography>{row.id}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell sx ={{width:'100px'}} align='center'>
                                        <img style={{width:'100px', height:'100px'}} src = {row.img[0]?row.img[0]:'https://res.cloudinary.com/duk2lo18t/image/upload/v1667887284/frontend/R_zzr2lm.png'}></img>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" justifyContent="center">
                                            <Typography sx={{ margin: "auto 0" }}>{numWithCommas(row.price)} VND</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.brand}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.category}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Typography>{row.brand}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.status === 1 ?(
                                            <Typography>Đang bán</Typography>
                                        ):(<Typography>Đang ẩn</Typography>)}
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{convertDate(row.createAt)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Stack spacing={1} justifyContent="center" py={1}>
                                            <Button variant="contained">Sửa</Button>
                                            <Button 
                                            onClick={()=>openModalDelete(row)} 
                                            variant="outlined" color="error">
                                                Xóa
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
        </Stack>
        <Stack direction='row' spacing={2} justifyContent="center">
          {
            page==0?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'}} onClick={() => { setPage(page-1) }}>Trước</Button>)
          }
          <Button sx={{backgroundColor:'#EEEEEE'}}>Trang {page+1}</Button>
          {
            listProducts?.length<10?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'} } onClick={() => { setPage(page+1) }}>Sau</Button>)
          }
        </Stack>
        <Modal
                        sx={{ overflowY: "scroll" }}
                        open={modalDelete}
                        onClose={closeModalDelete}
                    >
                        <Stack className="modal-info" direction="row" spacing={2} justifyContent='center' width='26rem' >
                            <Stack>
                                <InfoOutlinedIcon color="primary" />
                            </Stack>

                            <Stack spacing={3}>
                                <Stack>
                                    <Typography fontWeight="bold">
                                        Bạn có chắc muốn xoá sản phẩm?
                                    </Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                    <Button onClick={closeModalDelete} variant="outlined">Hủy</Button>
                                    <Button variant="contained" onClick={handleDelete}>Xóa bỏ</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Modal>
        </Stack>
        </>
    )
}

export default Product