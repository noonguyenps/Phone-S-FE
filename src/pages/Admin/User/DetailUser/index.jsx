 /* eslint-disable */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-hot-toast";
import "./DetailUser.scss"
import apiProfile from "../../../../apis/apiProfile";
import { numWithCommas } from "../../../../constraints/Util";
import {
  Stack,
  Button,
  Typography,
  Box,
  TableCell,
  TableBody,
  TableRow,
  Table,
  TableHead,
  Avatar,
  Select,
  MenuItem,
} from "@mui/material";

import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import AddressVN from "../../../../components/AddressVN";
import apiAdmin from "../../../../apis/apiAdmin";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';

ChartJS.register(ArcElement, Tooltip, Legend);

function DetailUser() {
  const [user, setUser] = useState([])
  const [addresses, setAddresses] = useState([]);
  const idUser = useParams().id;
  const [orders,setOrders] = useState();
  const [edit, setEdit] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role,setRole] = useState('');

  useEffect(() => {
    const getUser = async () => {
      let param ={
        id:idUser
      }
      apiProfile.getUserByIDWithAdmin(param)
        .then(res => {
          setUser(res.data.user);
          setRole(res.data.user.roleId);
        })
    };
    const getRoles = async () => {
      apiAdmin.getAllRoles()
        .then(res => {
          setRoles(res.data.roles);
        })
    };
    getUser();
    getRoles();
  }, []);

  useEffect(() => {
    const getData = async () => {
      apiAdmin.getUserAddressByID(idUser)
        .then(res => {
          setAddresses(res.data.addressList);
        })
      apiAdmin.getUserOrdersByID(idUser)
        .then(res => {
          setOrders(res.data.listOrder);
        })
    };
    getData();
  }, []);

  const convertDate = (date)=>{
    var dateNew = new Date(date)
    return String(dateNew.getDate()+"/"+String(dateNew.getMonth()+1)+'/'+dateNew.getFullYear())
  };
  const handleChange = (event) => {
    setRole(event.target.value);
  };
  const handleChangeUpdate = (event) => {
    if(edit){
      let params={
        id:user.id,
        roleId:role
      }
      apiAdmin.putRole(params)
        .then((res) => {
          toast.success('Phân quyền thành công');
          setEdit(false);
        }).catch((err)=>{
          toast.success('Phân quyền thất bại');
          setEdit(false);
        })
    }
    else{
      setEdit(true);
    }
    
  };


  return (
    <Box p="2rem" bgcolor="#fff">
      <Typography variant="h6">Chi tiết khách hàng</Typography>
      <Stack p="1rem" spacing={3}>
      <Stack justifyContent="center"  spacing={5}>
        {
          user?(<>
          <Stack alignItems="center">
              <Avatar
                sx={{ width: 100, height: 100 }}
                alt=""
                src={user?.img}
              />
              <Typography color="silver" variant="caption">
              {user?.id}
              </Typography>
              <Typography variant="h6">{user?.fullName}</Typography>
              {
                !edit?(<>
                <Stack direction='row' justifyContent="center" alignItems="center">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{width:150}}
                  value={role}
                  size="small"
                  onChange={handleChange}
                  disabled='disabled'
                >{
                  roles.map((item) =>
                    (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                }
                </Select>
                <Button onClick={handleChangeUpdate}><EditOutlinedIcon/></Button></Stack>
                </>):(<>
                <Stack direction='row' justifyContent="center" alignItems="center">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{width:150}}
                  value={role}
                  size="small"
                  onChange={handleChange}
                >{
                  roles.map((item) =>
                    (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))
                }
                </Select>
                <Button onClick={handleChangeUpdate}><SaveAsOutlinedIcon/></Button>
              </Stack></>)
              }
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Stack direction="row" alignItem="center">
                <PhoneAndroidIcon />
                <Typography  ml={1}>{user?.phone}</Typography>
              </Stack>

              <Stack direction="row" alignItem="center">
                <EmailIcon />
                <Typography  ml={1}>{user?.email}</Typography>
              </Stack>

              <Stack direction="row" alignItem="center">
                <CakeIcon />
                <Typography ml={1}>{convertDate(user.birthDate)}</Typography>
              </Stack>
            </Stack></>):(<></>)
        }
        </Stack>

        <Stack className="detailUser__infowrap" width="100% !important">
          <Typography>Danh sách địa chỉ</Typography>
          {addresses.map((item) => {
            return (
              <Stack className="info" key={item.id} mb={2}>
                <Typography className="name">{item.fullName}</Typography>
                <Typography className="name">{item.companyName}</Typography>
                <Typography className="address">Địa chỉ cụ thể: {`${item.addressDetail}`}</Typography>
                <Typography> Địa chỉ : <AddressVN province={item.province} district={item.district} commune={item.commune}/></Typography>
                <Typography className="number">Điện thoại: {item.phoneNumber}</Typography>
              </Stack>
            )
          })}
        </Stack>
        <Stack spacing={3} Stack className="detailUser__infowrap" width="100% !important">
          <Stack alignItem="center">
            <Typography>Danh sách đơn hàng</Typography>
            <Table
                    className="tableCategory"
                    sx={{ minWidth: "650px" }}
                    stickyHeader
                    size="small"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "20%", top: "64px" }}>Mã đơn hàng/Ngày đặt hàng</TableCell>
                            <TableCell sx={{ width: "15%", top: "64px" }}>Trạng thái&nbsp;</TableCell>
                            <TableCell align="center" sx={{ width: "20%", top: "64px" }}>Ngày xác nhận/hạn xác nhận&nbsp;</TableCell>
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
                                <TableCell component="th" scope="row">{row.orderId} <br/>/ {convertDate(row.createdDate)}</TableCell>
                                <TableCell align="left">{row.orderStatus==0?"Đang xử lý":(
                                    row.orderStatus==1?"Đang vận chuyển":(
                                        row.orderStatus==2?"Đã giao hàng":"Đã hủy"
                                    )
                                )}</TableCell>
                                <TableCell align="center">{convertDate(row.createdDate)}/ {convertDate(row.expectedDate)}</TableCell>
                                <TableCell align="center">{numWithCommas(row.total)} đ</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="center">
                                    <Stack spacing={1} justifyContent="center" py={1}>
                                        <Link to={`/admin/order/detail/${row.orderId}`}>
                                            <Button sx={{ width: "100px" }} variant="outlined" >Xem chi tiết</Button>
                                        </Link>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default DetailUser;
