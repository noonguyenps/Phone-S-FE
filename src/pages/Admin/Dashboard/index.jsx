import React, { useState,  useEffect } from 'react';
import "./Dashboard.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import apiAdmin from "../../../apis/apiAdmin";
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import StartIcon from '@mui/icons-material/Start';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {numWithCommas} from "../../../constraints/Util"
import { Button, Link } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [countOrder, setCountOrder]=useState(0);
  const [countRevenue, setCountRevenue]=useState(0);
  const [orderPerMonth, setOrderPerMonth] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [userPerMonth, setUserPerMonth] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [labels1, setLabels1] = useState([]);
  const [datasets1,setDataSets1] = useState([]);
  const backgroundColor = ["#003f5c", "#58508d", "#bc5090", "#ff6361","#003f5a", "#58508c", "#bc5070", "#ff6356"];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Biểu đồ doanh thu",
      },
    },
  };
  const data = {
    labels:["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Khách hàng",
        data: userPerMonth,
        backgroundColor: "rgb(144,238,144)",
      },
      {
        label: "Đơn hàng",
        data: orderPerMonth,
        backgroundColor: "rgb(173,216,230)",
      },
    ],
  };
  useEffect(() => {
    const getData = async () => {
      await apiAdmin.getStatistic()
        .then(res => {
          setCountUser(res.data.countUser);
          setCountProduct(res.data.countProducts);
          setCountOrder(res.data.countOrder);
          setCountRevenue(res.data.countRevenue);
          setUserPerMonth(res.data.userPerMonth);
          setOrderPerMonth(res.data.orderPerMonth);
          for(let a in res.data.categoryPrice){
            setLabels1((prev)=>[...prev,res.data.categoryPrice[a].name])
            setDataSets1((prev)=>[...prev,res.data.categoryPrice[a].value])
          }
        })
        .catch(error=>{
        })
    };
    getData();
  }, []);
  return (
    <Box>
      <Stack direction="row" spacing={{ xs: 1, sm: 2, md: 4 }} margin='2rem' alignItems="baseline" justifyContent="space-between">
        <Stack direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}>
          <DashboardIcon sx={{ fontSize: 30 }}/>
          <Typography sx={{ fontSize: 26 }}>Dashboard</Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        margin='2rem'
      >
        <Box
            sx={{
                width: 230,
                height: 180,
                borderRadius: 2,
                backgroundColor: '#1e71e5',
              }}
        >
          <Stack sx={{backgroundColor: '#1064dc',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <ShoppingBagOutlinedIcon sx={{color:"white"}}/>
                  <Typography color="white">Đơn hàng</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <Typography color="white" sx={{ fontSize: 26 }} fontWeight={500}>
                      {`${numWithCommas(countOrder)}`}
                  </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{backgroundColor: '#1064dc',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
              <Link href='/admin/order'>
                <Stack direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  spacing={2}>
                    <Typography color="white">Xem chi tiết</Typography>
                    <StartIcon sx={{color:"white"}}/>
                </Stack>
              </Link>
            </Stack>
          </Stack>
        </Box>

        <Box
            sx={{
                width: 230,
                height: 180,
                borderRadius: 2,
                backgroundColor: '#5af560',
              }}
        >
          <Stack sx={{backgroundColor: '#23c129',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <InventoryIcon sx={{color:"white"}}/>
                  <Typography color="white">Sản phẩm</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <Typography color="white" sx={{ fontSize: 26 }} fontWeight={500}>
                    {`${numWithCommas(countProduct)}`}
                  </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{backgroundColor: '#23c129',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
              <Link href='/admin/product'>
              <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}>
                  <Typography color="white">Xem chi tiết</Typography>
                  <StartIcon sx={{color:"white"}}/>
              </Stack>
              </Link>
            </Stack>
          </Stack>
        </Box>

        <Box
            sx={{
                width: 230,
                height: 180,
                borderRadius: 2,
                backgroundColor: '#d9c64f',
              }}
        >
          <Stack sx={{backgroundColor: '#ae9f3d',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <PersonIcon sx={{color:"white"}}/>
                  <Typography color="white">Khách hàng</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <Typography color="white" sx={{ fontSize: 26 }} fontWeight={500}>
                    {`${numWithCommas(countUser)}`}
                  </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{backgroundColor: '#ae9f3d',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
            <Link href='/admin/user'>
              <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}>
                  <Typography color="white">Xem chi tiết</Typography>
                  <StartIcon sx={{color:"white"}}/>
              </Stack>
            </Link>
            </Stack>
          </Stack>
        </Box>

        <Box
            sx={{
                width: 230,
                height: 180,
                borderRadius: 2,
                backgroundColor: '#e04f38',
              }}
        >
          <Stack sx={{backgroundColor: '#c2351e',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <LocalAtmIcon sx={{color:"white"}}/>
                  <Typography color="white">Doanh thu</Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Stack spacing={2} margin='1rem'>
              <Stack direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}>
                  <Typography color="white" sx={{ fontSize: 26 }} fontWeight={500}>
                    {`${numWithCommas(countRevenue)} ${"đ"}`}
                  </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack sx={{backgroundColor: '#c2351e',borderRadius: 2,}}>
            <Stack spacing={2} margin='1rem'>
            <Link href='/admin/order'>
              <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}>
                  <Typography color="white">Xem chi tiết</Typography>
                  <StartIcon sx={{color:"white"}}/>
              </Stack>
            </Link>
            </Stack>
          </Stack>
        </Box>
        
      </Stack>
      <Stack direction='row' spacing={5} margin='2rem' alignItems="center"  justifyContent="center">
        <Box>
          <Stack alignItems="center" justifyContent="center">
                <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>Thống kê danh mục</Typography>
          </Stack>
          <Pie
            options={{
              width: "400",
              height: "400"
            }}
            data={{
              labels: labels1,
              datasets: [{
                data:datasets1,
                backgroundColor:backgroundColor
              }]
            }}
          />
        </Box>
        <Box width="700px" height="300px">
              <Stack alignItems="center" justifyContent="center">
                <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>Thống kê người dùng</Typography>
              </Stack>
              <Bar options={options} data={data}/>
        </Box>
        
      </Stack>
    </Box>
  );
}
export default Dashboard;
