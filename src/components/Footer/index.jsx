import React from "react";
import "./Footer.scss";
import fb from "../../assets/img/fb.jpg";
import youtube from "../../assets/img/ytb.jpg";
import zalo from "../../assets/img/zalo.jpg";
import { Stack, Typography, Box } from "@mui/material";
import { footerLink } from "../../constraints/Footer";

function Footer() {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row">
        <Stack>
          <Typography component="h4" className="block__title">
            Hỗ trợ khách hàng
          </Typography>
          <div className="hotline">
            Hotline:&nbsp;
            <a href="tel:0868704516"> 0868704516</a>
            <span className="small-text" style={{ marginRight: "1rem" }}>
              (1000 đ/phút, 8-21h kể cả T7, CN)
            </span>
          </div>
          {footerLink.supportCustomer.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}

          <div className="security">
            Hỗ trợ khách hàng:&nbsp;
            <a href="mailto:ngoctin2412test@gmail.com">ngoctin2412test@gmail.com</a>
          </div>
          <div className="security">
            Báo lỗi bảo mật:&nbsp;
            <a href="mailto:ngoctin2412test@gmail.com">ngoctin2412test@gmail.com</a>
          </div>
        </Stack>

        <Stack>
          <Typography component="h4" className="block__title">
            Về Chúng tôi
          </Typography>
          {footerLink.aboutTiki.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}
        </Stack>

        <Stack>
          <Box>
            <Typography component="h4" className="block__title">
              Hợp tác và liên kết
            </Typography>
            <a href={"https://thuvienphapluat.vn/van-ban/thuong-mai/nghi-dinh-52-2013-nd-cp-thuong-mai-dien-tu-187901.aspx?_ga=2.85203161.1739556867.1665717787-1218695441.1665717787"}>
              Quy chế hoạt động Sàn GDTMĐT của Việt Nam
            </a>
          </Box>
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
          <Box>
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

      <Box className="container address-info">
        <Typography>
          Trụ sở chính: Số 1, Võ Văn Ngân, phường Linh Chiểu, Tp Thủ Đức, Tp Hồ Chí Minh
        </Typography>
        <Typography>
          S-Phone nhận đặt hàng trực tuyến và giao hàng tận nơi, chưa hỗ trợ mua và
          nhận hàng trực tiếp tại văn phòng hoặc trung tâm xử lý đơn hàng
        </Typography>
        <Typography style={{ marginBottom: "0" }}>
          © 2022 - Bản quyền thuộc về Dương Văn Ngọc Tín
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
