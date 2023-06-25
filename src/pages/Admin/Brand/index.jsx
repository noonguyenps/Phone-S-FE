 /* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import "./Brand.scss";
import { useState, useEffect } from "react";
import { Stack, Button, Typography, Modal, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import apiBrand from "../../../apis/apiBrand";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-hot-toast";
import AddressVN from "../../../components/AddressVN";

function Brand() {
  const [modalDelete, setModalDelete] = React.useState(false);
  const closeModalDelete = () => setModalDelete(false);
  const [itemdelete, setItemdelete] = useState("")
  const [brand, setBrand] = useState([])
  const [page, setPage] = useState(0)
  const size = 10
  const openModalDelete = (itemdelete) => {
    setItemdelete(itemdelete)
    setModalDelete(true)
  }
  useEffect(() => {
    let params = {
      page:page,
      size:size
    }
    const getData = async () => {
      apiBrand.getAllBrand(params)
        .then(res => {
          setBrand(res.data.listBrand);
        }).catch(err=>{
          setBrand(null);
        })
    };
    getData();
  }, [page]);
  const handleDelete = () => {
    apiBrand.deleteBrandById({id:itemdelete.id})
    .then(res=>{
      toast.success("Xóa thành công")
      const newbrand = brand.filter(item => {
        return itemdelete.id !== item.id
      })
      setBrand(newbrand)
    })
    .catch(error=>{
      toast.error("Xóa không thành công!")
    })
    closeModalDelete()
  }

  const handleExport = () => {
    apiBrand.exportBrand()
    .then((res)=>{
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `brand_${Date.now()}.xlsx`);
      document.body.appendChild(link);
      link.click();
    })
    .catch(error=>{
      toast.error("Xuất file không thành công")
    })
  }
  return (
    <Stack direction="row" sx={{ backgroundColor: "#fff" }} p={3} width="100%">
      <Stack spacing={2} width="100%">
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography>Danh sách thương hiệu</Typography>
          <Link to="/admin/brand/create">
            <Button sx={{width:160}} variant="contained">Thêm thương hiệu</Button>
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%", position: "relative" }}>
          <Button sx={{background:'green', width:160}} variant="contained" onClick={handleExport}>Xuất file Excel</Button>
        </Stack>

        <Table
          className="tableBrand"
          width="700px"
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "15%", top: "64px" }}>
                Tên nhãn hiệu
              </TableCell>
              <TableCell align="center" sx={{ width: "15%", top: "64px" }}>Mô tả</TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Địa chỉ cụ thể&nbsp;
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Địa chỉ&nbsp;
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Thông tin liên lạc&nbsp;
              </TableCell>
              <TableCell align="center" sx={{ width: "15%", top: "64px" }}>
                Ảnh&nbsp;
              </TableCell>
              <TableCell align="center" sx={{ width: "15%", top: "64px" }}>
                Thao tác&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brand.map((item, id) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.description}</TableCell>
                <TableCell align="center">{item.addressDetails}</TableCell>
                <TableCell align="center">
                  <AddressVN province={item.brandProvince} district={item.brandDistrict} commune={item.brandCommune}/>
                </TableCell>
                <TableCell align="center">
                  <Typography>{item.phone}</Typography>
                </TableCell>
                <TableCell align="center">
                  <img alt="" width="80px" height="80px" src={item.img} />
                </TableCell>
                <TableCell>
                  <Stack spacing={1} justifyContent="center" py={1}>
                  <Link to={`edit/${item.id}`} style={{flex:1}}>
                    <Button variant="contained" sx={{width:"100%"}}>Sửa</Button> </Link>
                    <Button
                      onClick={()=>openModalDelete(item)}
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
            brand.length<10?(<></>):(<Button sx={{backgroundColor:'#EEEEEE', color:'red'} } onClick={() => { setPage(page+1) }}>Sau</Button>)
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
                Bạn có chắc muốn xoá thương hiệu này ?
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button onClick={closeModalDelete} variant="outlined">
                Hủy
              </Button>
              <Button variant="contained" onClick={handleDelete}>Xóa bỏ</Button>
            </Stack>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
}

export default Brand;
