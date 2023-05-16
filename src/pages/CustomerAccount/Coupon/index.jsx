import * as React from "react";
import "./Coupon.scss";
import { useState, useEffect, useCallback, } from "react";
import apiCoupon from "../../../apis/apiCoupon";
import PropTypes from "prop-types";
import GetCoupon from "../../../components/GetCoupon";
import {
  Typography,
  Box,
  Stack,
  Divider,
  Grid,
  Button,
} from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Coupon() {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {setOpen(false); setRefresh(refresh+1)}, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [myCoupons, setMyCoupons] = React.useState([]);
  const [page, setPage] = useState(0);
  const size = 8;

  useEffect(() => {
    const getCoupons = async () => {
      let param = {
        page: page,
        size: size,
      };
      const response = await apiCoupon.getCouponByUser(param);
      if (response) {
        setMyCoupons(response.data.listVoucher);
      }
    };
    getCoupons();
  }, [page, refresh]);

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const handleDate = (timestamp) => {
    let date = new Intl.DateTimeFormat('en-GB').format(timestamp);
    return date ;
  };

  return (
    <Box className="coupon">
      <Typography variant="h6">Danh sách mã giảm giá</Typography>
      <Box sx={{ width: "100%", top: "0" }}>
          <Grid container spacing={1.5}>
            {myCoupons.map((item) => (
              <Grid item xs={6} key={item.id}>
                <Stack
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "0.6rem",
                  }}
                  className="coupon-container"
                  direction="row"
                  justifyContent="space-between"
                  backgroundColor="#fff"
                >
                  <Stack
                    sx={{ flex: "1", height: "132px" }}
                    direction="row"
                    spacing={3}
                  >
                    <Stack
                      sx={{ marginLeft: "1rem", width: "6rem" }}
                      alignItems="center"
                      justifyContent="center"
                      gap="0.3rem"
                    >
                      <img
                        alt=""
                        src="https://res.cloudinary.com/duk2lo18t/image/upload/v1661389658/coupon_dc26by.png"
                        style={{
                          width: "5rem",
                          height: "5rem",
                          justifyContent: "center",
                        }}
                      />
                    </Stack>
                    <Divider orientation="vertical" flexItem />
                    <Stack flex="1">
                      <Typography
                        sx={{
                          fontSize: "17px",
                          fontWeight: "500",
                          lineHeight: "24px",
                          color: "#242424",
                          marginTop: "10px",
                        }}
                        className="text-overflow-2-lines"
                      >
                        {item.type}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#242424",
                          fontSize: "17px",
                          fontWeight: "400",
                          marginTop: "10px",
                        }}
                        className="text-overflow-3-lines"
                      >Giá trị : {item.value} đ
                      </Typography>
                      <Typography
                        sx={{
                          color: "#787878",
                          fontSize: "13px",
                          fontWeight: "400",
                          marginBottom: "0px",
                          marginTop: "auto",
                        }}
                      >
                        {handleDate(item.fromDate)} - {handleDate(item.toDate)}
                      </Typography>
                      {item.toDate>new Date().getTime()?(<Typography
                        sx={{
                          color: "#787878",
                          fontSize: "13px",
                          fontWeight: "400",
                          marginBottom: "0px",
                          marginTop: "auto",
                        }}
                      >
                        Trạng thái : Còn hạn
                      </Typography>):(<Typography
                        sx={{
                          color: "#787878",
                          fontSize: "13px",
                          fontWeight: "400",
                          marginBottom: "0px",
                          marginTop: "auto",
                        }}
                      >
                        Trạng thái : Hết hạn
                      </Typography>)}
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
      </Box>
      <br/>
      <Stack alignItems="center">
        <Stack
          sx={{
            width: "270px",
            height: "46px",
            backgroundColor: "#ffffff",
            borderRadius: "24px",
          }}
        >
          <Button
            color="primary"
            size="large"
            fontSize="14px"
            onClick={handleOpen}
          >
            Nhận mã giảm giá
          </Button>
        </Stack>
      </Stack>
      <GetCoupon handleOpen={handleOpen} handleClose={handleClose} open={open} />
    </Box>
    
  );
}

export default Coupon;
