 /* eslint-disable */
import "./Coupon.scss"
import React from "react";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
    Stack,
    Box,
    Button,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    TextField,
    InputBase,
    Modal,
} from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import apiCoupon from "../../../apis/apiCoupon";
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';
import { toast } from "react-hot-toast";

function Coupon() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const [fillterVoucher, setFillterVoucher] = useState();
    const closeModalDelete = () => setModalDelete(false);
    const [itemDelete, setItemDelete] = useState("")
    const [status, setStatus] = useState(0)
    const [coupons, setCoupons] = useState([])
    const [listCoupon, setListCoupon] = useState([])
    const [page, setPage] = useState(0)
    const size = 10

    const openModalDelete = (itemDelete) => {
        setItemDelete(itemDelete)
        setModalDelete(true)
    }
    const handleDelete = () => {
        let message = ''
        const newCoupon = coupons.filter(item => {
            message = 'Voucher' + item.id +' đã bị xóa bởi Admin'
            return itemDelete.id !== item.id
        })
        apiCoupon.deleteCouponById({ id: itemDelete.id, message:message })
            .then(res => {
                toast.success("Xóa thành công")
                setCoupons(newCoupon)
            })
            .catch(error => {
                toast.error("Xóa không thành công!")
            })
        closeModalDelete()
    }
    useEffect(() => {
        const getData = async () => {
            apiCoupon.getCoupons()
                .then(res => {
                    setListCoupon(res.data.listVoucher);
                })
        };
        getData();
      }, [page]);


    return (
        <Stack direction="row" bgcolor="#fff" p={3}>
      <Stack spacing={2} width="100%">
        <Stack direction="row" justifyContent="space-between">
          <Typography>Danh sách Mã giảm giá</Typography>
          <Link to="create">
            <Button variant="contained">Thêm Mã giảm giá</Button>
          </Link>
        </Stack>
        <Stack direction="row" width="100%" position="relative">
          <TextField
            id="outlined-basic"
            label='Tìm mã giảm giá'
            placeholder="Tìm mã giảm giá"
            variant="outlined"
            width="100% !important"
            value={fillterVoucher}
            onChange={(event) => setFillterVoucher(event.target.value)}
          />
        </Stack>
        <Table
          className="tableCategory"
          sx={{ minWidth: "650px" }}
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
                <TableCell sx={{ width: "calc(13*100%/101)" }}>Tên Mã giảm giá</TableCell>
                <TableCell sx={{ width: "calc(13*100%/101)" }}>Mã giảm giá</TableCell>
                <TableCell sx={{ width: "calc(13*100%/101)" }}>Tổng số mã</TableCell>
                <TableCell sx={{ width: "calc(13*100%/101)" }}>Loại giảm giá</TableCell>
                <TableCell sx={{ width: "calc(18*100%/101)" }}>Thời gian áp dụng</TableCell>
                <TableCell sx={{ width: "calc(13*100%/101)" }}>Thao tác</TableCell>
            </TableRow>
        </TableHead>
          <TableBody>
          {listCoupon?.map((item) => (
                            <TableRow
                                key={item}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Stack>
                                        <Typography sx={{ color: "#1890ff" }}> {item.type} </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Stack>
                                        <Typography sx={{ color: "#1890ff" }}> {item.id} </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Typography>{item.amount}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Typography>{item.value}</Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(18*100%/101)", padding: "8px" }}>
                                    <Typography>Từ: {new Date(item.fromDate).toLocaleString()} </Typography>
                                    <Typography>Đến: {new Date(item.expiredDate).toLocaleString()} </Typography>
                                </TableCell>
                                <TableCell sx={{ width: "calc(13*100%/101)" }}>
                                    <Stack spacing={1}>
                                        <Link to={`edit/${item.id}`} >
                                            <Button sx={{ p: "4px" }} variant="outlined" className="btn__update">Sửa</Button>
                                        </Link>
                                        <Button
                                            onClick={() => openModalDelete(item)}
                                            variant="outlined"
                                            color="error"
                                        >
                                            Xóa
                                        </Button>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
          </TableBody>
        </Table>
        <Stack direction='row' spacing={2} justifyContent="center">
          {
            page==0?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'}} onClick={() => { setPage(page-1) }}>Trước</Button>)
          }
          <Button sx={{backgroundColor:'#EEEEEE'}}>Trang {page+1}</Button>
          {
            coupons.length<10?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'} } onClick={() => { setPage(page+1) }}>Sau</Button>)
          }
        </Stack>
      </Stack>
      <Modal
                sx={{ overflowY: "scroll" }}
                open={modalDelete}
                onClose={closeModalDelete}
            >
                <Stack
                    className="modal-info"
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    width="26rem"
                >
                    <Stack>
                        <InfoOutlinedIcon color="primary" />
                    </Stack>

                    <Stack spacing={3}>
                        <Stack>
                            <Typography sx={{ fontWeight: "bold" }}>
                                Bạn có chắc muốn xoá mã giảm giá này ?
                            </Typography>
                        </Stack>

                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                            <Button onClick={closeModalDelete} variant="outlined">
                                Hủy
                            </Button>
                            <Button variant="contained" color="error" onClick={handleDelete}>Xóa bỏ</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Modal>
    </Stack>

    )
}

const listStatus = ["Tất cả", "Đang diễn ra", "Sắp diễn ra", "Đã kết thúc"]
export default Coupon