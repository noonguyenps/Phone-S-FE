import React, { useState,  useEffect } from 'react';
import "./Dashboard.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import apiAdmin from "../../../apis/apiAdmin";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {numWithCommas} from "../../../constraints/Util"

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
    labels:["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Khách hàng",
        data: userPerMonth,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Đơn hàng",
        data: orderPerMonth,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  useEffect(() => {
    const getData = async () => {
      apiAdmin.getStatistic()
        .then(res => {
          console.log(res)
          setCountUser(res.data.countUser);
          setCountProduct(res.data.countProducts);
          setCountOrder(res.data.countOrder);
          setCountRevenue(res.data.countRevenue);
          setUserPerMonth(res.data.userPerMonth);
          setOrderPerMonth(res.data.orderPerMonth);
        })
        .catch(error=>{
        })
    };
    getData();
  }, []);
  return (
    <Box>
      <Stack direction='row' spacing={5} margin='2rem' alignItems="center"  justifyContent="center">
      <Box width="700px" height="300px">
            <Stack alignItems="center" justifyContent="center">
              <Typography sx={{ fontSize: "18px", fontWeight: "500" }}>Thống kê người dùng</Typography>
            </Stack>
            <Bar options={options} data={data}/>
      </Box>
        <Stack spacing={2}>
        <Stack className="dashboard__item" key={1} direction="row" >
                  <Stack alignItems="center" justifyContent="center" margin='1rem'>
                    <Typography className="dashboard__title">
                      {"Tổng khách hàng"}
                    </Typography>
                    <Typography color="#2a2a2a" fontWeight={500}>
                      {`${numWithCommas(countUser)} ${"Khách hàng"}`}
                    </Typography>
                  </Stack>
        </Stack>
        <Stack className="dashboard__item" key={2} direction="row" >
        <Stack alignItems="center" justifyContent="center" margin='1rem'>
                    <Typography className="dashboard__title">
                      {"Tổng sản phẩm"}
                    </Typography>
                    <Typography color="#2a2a2a" fontWeight={500}>
                      {`${numWithCommas(countProduct)} ${"Sản phẩm"}`}
                    </Typography>
                  </Stack>
        </Stack><Stack className="dashboard__item" key={3} direction="row" >
        <Stack alignItems="center" justifyContent="center" margin='1rem'>
                    <Typography className="dashboard__title">
                      {"Tổng đơn hàng"}
                    </Typography>
                    <Typography color="#2a2a2a" fontWeight={500}>
                      {`${numWithCommas(countOrder)} ${"Đơn hàng"}`}
                    </Typography>
                  </Stack>
        </Stack><Stack className="dashboard__item" key={4} direction="row" >
                  <Stack alignItems="center" justifyContent="center" margin='1rem'>
                    <Typography className="dashboard__title">
                      {"Tổng doanh thu"}
                    </Typography>
                    <Typography color="#2a2a2a" fontWeight={500}>
                      {`${numWithCommas(countRevenue)} ${"VND"}`}
                    </Typography>
                  </Stack>
        </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
export default Dashboard;
