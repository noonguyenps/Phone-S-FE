import { Link } from "react-router-dom";
import apiProfile from "../../../apis/apiProfile";
import React, { useState,  useEffect } from 'react'
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
import apiAttribute from "../../../apis/apiAttribute";

import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";


function Attribute() {
    const [modalDelete, setModalDelete] = React.useState(false);
    const closeModalDelete = () => setModalDelete(false);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        const getData = async () => {
          apiAttribute.getAllAttribute()
            .then(res => {
              setAttributes(res.data.listAttribute);
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
          <Typography>Danh sách thuộc tính</Typography>
          <Link to='/admin/attribute/create'>
                <Button variant="outlined" pr={2}>Thêm thuộc tính</Button>
            </Link>
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
                Tên thuộc tính
              </TableCell>
              <TableCell align="center" sx={{ width: "20%", top: "64px" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {attributes.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{item.id}</TableCell>

                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center" >
                  <Stack spacing={1} justifyContent="center" py={1}>
                    <Link to={`/admin/attribute/detail/${item.id}`}>
                      <Button variant="contained">Xem</Button>
                    </Link>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
export default Attribute;
