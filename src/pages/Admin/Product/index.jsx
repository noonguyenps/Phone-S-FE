import React from 'react'
import {
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
import "./Product.scss"
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ImageUploading from "react-images-uploading";
import apiProduct from '../../../apis/apiProduct';
import { useState , useEffect} from 'react';
import { DriveFileMoveRounded } from '@mui/icons-material';

function Product() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const openModalDelete = () => setModalDelete(true);
    const closeModalDelete = () => setModalDelete(false);
    const [countProduct, setCountProduct] = useState(0);
    const [print, setPrint] = React.useState('');
    const [listProducts, setListProducts] = useState([]);
    const size = 10;

    useEffect(() => {
        const getData = async () => {
            apiProduct.getCountProducts()
                .then(res => {
                    setCountProduct(res.data.countProduct);
                })
        };
        getData();
      }, []);
    useEffect(() => {
        const getData = async () => {
            let params ={
                page:0,
                size:size,
                sort:"product_id"
            }
            apiProduct.getProducts()
                .then(res => {
                    setListProducts(res.data.listProduct);
                })
        };
        getData();
      }, []);
    const handleChangePrint = (event) => {
        setPrint(event.target.value);
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
    
    return (
        <>
            <Box className="productAdmin">
                <Stack direction="row" mb={1} justifyContent="space-between" alignItems="center" sx={{ backgroundColor: "#FFF", height: "80px" }} px={2}>
                    <Typography >Quản lý sản phẩm</Typography>
                    <Link to='/admin/product/create'>
                        <Button variant="outlined" pr={2}>Tạo sản phẩm</Button>
                    </Link>
                </Stack>
                <Box sx={{ backgroundColor: "#fff" }} p={2}>
                    <Stack direction="row">
                        <FormControl sx={{ m: 1, minWidth: 120, flex: 1 }}>
                            <Select
                                value={print}
                                onChange={handleChangePrint}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                cursor="pointer"
                            >
                                <MenuItem value="">
                                    Xuất danh sách tất cả sản phẩm
                                </MenuItem>
                                <MenuItem value={10}>Hạn sử dụng</MenuItem>
                                <MenuItem value={20}>Xuất nhập tồn</MenuItem>
                                <MenuItem value={30}>Thông tin chi tiết</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120, flex: 1 }}>
                            <Select
                                value={select}
                                onChange={handleChangeSelect}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                disabled
                            >
                                <MenuItem value="">
                                    Xuất danh sách sản phẩm đã chọn
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 120, flex: 1 }}>
                            <Select
                                value={update}
                                onChange={handleChangeUpdate}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                cursor="pointer"
                            >
                                <MenuItem value="">
                                    Cập nhật danh sách sản phẩm
                                </MenuItem>
                                <MenuItem value={10}>Thay đổi giá, trạng thái sản phẩm</MenuItem>
                                <MenuItem value={20}>Thay đổi kiểu nhập kho, số lượng</MenuItem>
                                <MenuItem value={30}>Thêm mincode của sản phẩm</MenuItem>
                                <MenuItem value={40} disabled>Ẩn sản phẩm</MenuItem>
                                <MenuItem value={50} disabled>Bật sản phẩm hàng loạt</MenuItem>
                                <MenuItem value={60} disabled>Tắt sản phẩm hàng loạt</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} py={2}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Tổng cộng có: {(countProduct/size).toFixed(0)} bản ghi</Typography>
                        <Pagination count={(countProduct/size).toFixed(0)} color="primary" variant="outlined" shape="rounded" />
                        {/* <TextField id="outlined-basic" label="Nhập số trang" variant="outlined" size='small' />
                        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>Hiển thị: </Typography>
                        <FormControl sx={{ flex: 1 }} >
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={page}
                                onChange={handleChange}
                                size="small"
                            >
                                <MenuItem value={10} defaultValue>10/Trang</MenuItem>
                                <MenuItem value={20}>20/Trang</MenuItem>
                                <MenuItem value={30}>30/Trang</MenuItem>
                            </Select>
                        </FormControl> */}
                        <Stack direction="row" sx={{ width: "500px", position: "relative" }}>
                            <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                sx={{ width: "100%" }}
                                size="small"
                            />
                            <span className="order__iconSearch">
                                <SearchIcon sx={{ fontSize: "28px" }} />
                            </span>
                        </Stack>
                    </Stack>
                    <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell justifyContent="center">
                                    <Checkbox></Checkbox>
                                </TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
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
                            {listProducts.map(row => (
                                <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>
                                        <Checkbox></Checkbox>
                                    </TableCell>
                                    <TableCell>
                                        <Stack>
                                            <Typography sx={{ color: "#1890ff" }}>{row.name}</Typography>
                                            <Typography>{row.id}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" justifyContent="center">
                                            <Typography sx={{ margin: "auto 0" }}>{row.price} VND</Typography>
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
                                        {row.status === 0 ?(
                                            <Typography>Đang bán</Typography>
                                        ):(<Typography>Tạm ngưng</Typography>)}
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{convertDate(row.createAt)}</Typography>
                                    </TableCell>
                                    <TableCell align='center'>
                                        <Stack spacing={1} justifyContent="center" py={1}>
                                            <Button variant="contained">Sửa</Button>
                                            <Button onClick={openModalDelete} variant="outlined" color="error">
                                                Xóa
                                            </Button>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                                    <Button variant="contained">Xóa bỏ</Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Modal>
                </Box>
            </Box>


        </>
    )
}

export default Product