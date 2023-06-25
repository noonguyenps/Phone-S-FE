import { Link } from "react-router-dom";
import React, { useState,  useEffect} from 'react';
import { useParams,useNavigate } from "react-router-dom";
import {
  Stack,
  Button,
  Typography,
  Modal,
  TextField,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { toast } from "react-hot-toast";
import apiAttribute from "../../../../apis/apiAttribute";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import id from "date-fns/esm/locale/id/index.js";


function EditAttribute() {
    
    const [modalDelete, setModalDelete] = React.useState(false);
    const openModalDelete = () => {
      setModalDelete(true)
  }
    const [listAttributeOption, setListAttributeOption] = useState([])
    const closeModalDelete = () => setModalDelete(false);
    const [attribute, setAttribute] = useState([]);
    const nav = useNavigate();

    const idAttr=useParams().id
    useEffect(() => {
        const getData = async () => {
          apiAttribute.getAttributeById(idAttr)
            .then(res => {
              setAttribute(res.data.attribute);
              setListAttributeOption(res.data.attribute.values);
            })
            .catch(error=>{
              toast.error("Không có thuộc tính");
            })
        };
        getData();
      }, []);
      const handleDelete = () => {
        apiAttribute.deleteAttribute(idAttr)
        .then(res=>{
            toast.success("Xóa thuộc tính thành công")
            nav('/admin/attribute')
        })
        .catch(error=>{
        toast.error("Xóa thuộc tính không thành công!")
        })
        closeModalDelete()
      }
  return (
  <Stack direction="row" sx={{ backgroundColor: "#fff" }} p={3} width="100%">
      <Stack spacing={2} width="100%">
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography>{attribute.name}</Typography>
          <Button>
                <Button variant="outlined" onClick={()=>openModalDelete()} pr={2}>Xóa thuộc tính</Button>
            </Button>
        </Stack>

        <Stack direction="row" justifyContent="flex-end"></Stack>

        <Stack direction="row" sx={{ width: "100%", position: "relative" }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            sx={{ width: "100%" }}
          />
          <span className="brand__iconSearch">
            <SearchIcon sx={{ fontSize: "28px" }} />
          </span>
        </Stack>

        <Table
          className="tableBrand"
          sx={{ minWidth: "50rem" }}
          stickyHeader
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                ID
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Giá trị
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {listAttributeOption.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.id}</TableCell>

                <TableCell align="center">{item.value}</TableCell>
                <TableCell align="center" >
                  <Stack spacing={1} justifyContent="center" py={1}>
                      <Button variant="contained">Xem</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button>Thêm giá trị</Button>
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
                                        Bạn có chắc muốn xoá thuộc tính?
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
  );
}
export default EditAttribute;
