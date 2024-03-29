import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import "./Addresses.scss";
import { Typography, Button, Stack, Box, Dialog } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import apiAddress from '../../../apis/apiAddress';
import EmptyNotify from '../../../components/EmptyNotify';
import { toast } from "react-hot-toast";
import AddressVN from "../../../components/AddressVN";

function Addresses() {
  const [itemdelete, setItemdelete] = useState(null)
  const [addresses, setAddresses] = useState([]);
  const [dialogDelete, setDialogDelete] = useState(false);

  useEffect(() => {
    const getData = async () => {
      apiAddress.getUserAddress()
        .then(res => {
          setAddresses(res.data.addressList);
          console.log(res.data.addressList)
        })
    };
    getData();
  }, []);

  const handleDelete = () => {

    const newaddress = addresses.filter(item => {
      return itemdelete.id !== item.id
    }
    )
    setAddresses(newaddress)
    closeDialogDeleteAll()
    apiAddress.deleteAddressById({ id: itemdelete.id })
      .then(res => {
        toast.success("Xóa thành công")
      })
      .catch(error => {
        toast.error("Xóa không thành công!")
      })
  }
  
  const openDialogDeleteAll = (itemdelete) => {
    setItemdelete(itemdelete)
    setDialogDelete(true)
  }
  const closeDialogDeleteAll = () => {
    setDialogDelete(false)
  }

  return (
    <Stack spacing={2} className="addresses">
      <Stack direction='row' justifyContent="space-between" alignItems="center">
        <Typography className="heading">Danh sách địa chỉ</Typography>
        <Link to="/customer/address/create">
          <Button startIcon={<AddIcon />}>
            Thêm địa chỉ mới
          </Button>
        </Link>
      </Stack>
      <Stack spacing={5}>{
        addresses.length === 0 ?
          <Typography>Bạn chưa có địa chỉ</Typography>
          : addresses.map((item) => {
            return (
              <Stack key={item.id}
                direction="row"
                width="100%"
                className="items"
              >
                <Stack className="info">
                  <Stack direction='row'>
                  <Typography>Tên người nhận</Typography>
                  <Typography className="name">: {item.fullName}</Typography>
                  </Stack>
                  <Stack direction='row'>
                  <Typography>Tên công ty</Typography>
                  <Typography className="name">: {item.companyName}</Typography>
                  </Stack>
                  <Typography className="address">Địa chỉ cụ thể: {`${item.addressDetail}`}</Typography>
                  <Typography className="address">Địa chỉ : <AddressVN province={Number(item.province)} district={item.district} commune={item.commune}/></Typography>
                  <Typography className="number">Điện thoại: {item.phoneNumber}</Typography>
                </Stack>

                <Stack direction="row" className="action">
                  <Link to={`edit/${item.id}`}
                    state={{ id: item.id }}>
                    <Button className="Modify" variant="text">
                      Chỉnh sửa
                    </Button></Link>
                  <Button onClick={() => openDialogDeleteAll(item)} className="Delete" variant="text">
                    Xóa
                  </Button>
                </Stack>
                {
                  dialogDelete &&
                  <Dialog onClose={closeDialogDeleteAll} open={dialogDelete}>
                    <Box className="dialog-removecart">
                      <Box className="dialog-removecart__title">
                        <h4>Xoá địa chỉ</h4>
                      </Box>
                      <Box className="dialog-removecart__content">
                        Bạn có muốn xóa địa chỉ
                      </Box>
                      <Box className="dialog-removecart__choose">
                        <Button
                          variant="outlined"
                          onClick={handleDelete}
                          sx={{ width: "120px", height: "36px" }}
                        >
                          Xác nhận
                        </Button>
                        <Button
                          variant="contained"
                          onClick={closeDialogDeleteAll}
                          sx={{ width: "57px", height: "36px" }}
                        >
                          Huỷ
                        </Button>
                      </Box>
                    </Box>
                  </Dialog>
                }
              </Stack>
            )
          })
      }</Stack>
    </Stack>
  );
}

export default Addresses;
