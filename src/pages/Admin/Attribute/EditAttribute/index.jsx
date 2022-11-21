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
import { toast } from "react-toastify";
import apiAttribute from "../../../../apis/apiAttribute";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


function EditAttribute() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const [listAttributeOption, setListAttributeOption] = useState([])
    const closeModalDelete = () => setModalDelete(false);
    const [attribute, setAttribute] = useState([]);

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

  return (
  <Stack direction="row" sx={{ backgroundColor: "#fff" }} p={3} width="100%">
      <Stack spacing={2} width="100%">
        <Stack direction="row" justifyContent="space-between" width="100%">
          <Typography>{attribute.name}</Typography>
          <Button>
                <Button variant="outlined" pr={2}>Xóa thuộc tính</Button>
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
        </Stack>
      </Modal>
    </Stack>
  );
}
export default EditAttribute;
