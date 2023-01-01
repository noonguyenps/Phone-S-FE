import React from "react";
import "./Footer.scss";
import fb from "../../assets/img/fb.jpg";
import youtube from "../../assets/img/ytb.jpg";
import zalo from "../../assets/img/zalo.jpg";
import { Stack, Typography, Box } from "@mui/material";

function Footer() {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row" sx={{fontSize:'11px'}}>
        <Stack spacing={2} paddingTop={2}>
          <Typography>Điện thoại - BlackFriday 2022 - Quà Tết 2023</Typography>
          <Typography>Điện thoại Iphone - Iphone 13</Typography>
          <Typography>Điện thoại iPhone 12 - iPhone cũ giá rẻ</Typography>
        </Stack>

        <Stack spacing={2} paddingTop={2}>
          <Typography>Điện thoại Samsung - Điện thoại Oppo</Typography>
          <Typography>Điện thoại Samsung S22 - Samsung A73</Typography>
          <Typography>Sansung A13 - Samsung A53 - Samsung A23</Typography>
        </Stack>
        <Stack>
          <Box>
            <Typography
              component="h4"
              sx={{ marginTop: "16px" }}
              className="block__title"
            >
              Chứng nhận bởi
            </Typography>
            <Stack direction="row" spacing={1}>
              <a href={"/"} style={{ height: "32px" }}>
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png"
                  width="32"
                  height="32"
                  alt=""
                />
              </a>
              <a
                href={"/"}
                style={{ height: "32px" }}
              >
                <img
                  src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg"
                  height="32"
                  width="83"
                  alt=""
                />
              </a>
            </Stack>
          </Box>
          <Box>
            <Typography component="h4" className="block__title">
              Kết nối với chúng tôi
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <a href="https://www.facebook.com/tin.ngoc.2412/">
                <img width="32px" height="32px" alt="" src={fb} />
              </a>
              <a href="https://www.youtube.com">
                <img width="32px" height="32px" alt="" src={youtube} />
              </a>
              <a href="https://www.facebook.com/tin.ngoc.2412/">
                <img width="32px" height="32px" alt="" src={zalo} />
              </a>
            </Stack>
          </Box>
        </Stack>

        <Stack>
          <Box paddingTop={2}>
            <Typography component="h4" className="block__title">
              Phương thức thanh toán
            </Typography>
            <img alt="" src="https://res.cloudinary.com/duk2lo18t/image/upload/c_scale,w_150/v1665717537/frontend/Payment_ajfanu.png" style={{ maxWidth: "200px" }} />
          </Box>
          <Box>
            <Typography
              component="h4"
              style={{ margin: "16px 0 12px" }}
              className="block__title"
            >
              Dịch vụ giao hàng
            </Typography>
            <Stack direction="row" spacing={1}>
              <a href={"https://www.ahamove.com"} style={{ height: "32px" }}>
                <img
                  src="https://res.cloudinary.com/duk2lo18t/image/upload/c_scale,w_50/v1665715888/frontend/R_c5kits.jpg" width="50" height="50" alt=""/>
              </a>
              <a href="https://www.grab.com/my/express/">
              <img src='https://res.cloudinary.com/duk2lo18t/image/upload/c_scale,w_50/v1665716275/frontend/grab_hdru5c.jpg' width="50" height="50" alt=""></img>
              </a>
              <a href="https://web.lalamove.com/">
              <img src='https://res.cloudinary.com/duk2lo18t/image/upload/c_scale,w_50/v1665716744/frontend/lalamove_sznu40.jpg' width="50" height="50" alt=""></img>
              </a>
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
