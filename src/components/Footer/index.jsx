import React from "react";
import "./Footer.scss";
import fb from "../../assets/img/fb.jpg";
import youtube from "../../assets/img/ytb.jpg";
import zalo from "../../assets/img/zalo.jpg";
import { Stack, Typography, Box } from "@mui/material";
import { fontStyle } from "@mui/system";

function Footer() {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row">
        <Stack spacing={1} paddingTop={2}>
          <Typography sx = {{fontSize:18 , fontStyle:'bold'}}>Hỗ Trợ - Dịch Vụ</Typography>
          <a href ='/' style={{fontSize:14, color:"black"}}>Mua hàng trả góp</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Hướng dẫn đặt hàng và thanh toán</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Tra cứu đơn hàng</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Chính sách bảo hành</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Phạm vi, điều khoản gói bảo hành mở rộng</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Chính sách bảo mật</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Chính sách giải quyết khiếu nại</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Điều khoản mua bán hàng hóa</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Câu hỏi thường gặp</a>
        </Stack>

        <Stack spacing={1} paddingTop={2}>
          <Typography sx = {{fontSize:18 , fontStyle:'bold'}}>Thông Tin Liên Hệ</Typography>
          <a href ='/' style={{fontSize:14, color:"black"}}>Bán hàng Online</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Chăm sóc Khách Hàng</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Hỗ Trợ Kỹ thuật</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Hỗ trợ Bảo hành & Sửa chữa</a>
          <a href ='/' style={{fontSize:14, color:"black"}}>Liên hệ khối văn phòng</a>
        </Stack>

        <Stack spacing={1} paddingTop={2}>
          <Typography sx = {{fontSize:18 , fontStyle:'bold'}}>Tổng đài</Typography>
          <a href ='/' style={{fontSize:16, color:"black"}}>0868704516</a>
          <a href ='/' style={{fontSize:16, color:"black"}}>ngoctin2412@gmail.com</a>
        </Stack>


        <Stack spacing={1} paddingTop={2}>
          <Box>
            <Typography sx = {{fontSize:18 , fontStyle:'bold'}}>
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
            <Typography sx = {{fontSize:18 , fontStyle:'bold'}}>
              Kết nối với chúng tôi
            </Typography>
            <Stack direction="row" spacing={1} mb={1}>
              <a href="https://www.facebook.com/tin.ngoc.2412/">
                <img width="32px" height="32px" alt="" src="https://res.cloudinary.com/duk2lo18t/image/upload/v1677044111/fb-removebg-preview_orbshf.png" />
              </a>
              <a href="https://www.youtube.com">
                <img width="32px" height="32px" alt="" src="https://res.cloudinary.com/duk2lo18t/image/upload/v1677044234/ytb-removebg-preview_zxzw3j.png" />
              </a>
              <a href="https://www.facebook.com/tin.ngoc.2412/">
                <img width="32px" height="32px" alt="" src="https://res.cloudinary.com/duk2lo18t/image/upload/v1677044226/zalo-removebg-preview_rackra.png" />
              </a>
            </Stack>
          </Box>
        </Stack>

        <Stack>
          <Box paddingTop={2}>
            <Typography sx = {{fontSize:18 , fontStyle:'bold'}}>
              Phương thức thanh toán
            </Typography>
            <img alt="" src="https://res.cloudinary.com/duk2lo18t/image/upload/v1677044408/frontend/Payment_ajfanu-removebg-preview_pxx1ga.png" style={{ maxWidth: "200px" }} />
          </Box>
          <Box>
            <Typography
              sx = {{fontSize:18 , fontStyle:'bold'}}
            >
              Dịch vụ giao hàng
            </Typography>
            <Stack direction="row" spacing={1}>
              <a href={"https://www.ahamove.com"} style={{ height: "32px" }}>
                <img
                  src="https://res.cloudinary.com/duk2lo18t/image/upload/v1677044510/frontend/R_c5kits-removebg-preview_nx32np.png" width="50" height="50" alt=""/>
              </a>
              <a href="https://www.grab.com/my/express/">
              <img src='https://res.cloudinary.com/duk2lo18t/image/upload/v1677044529/frontend/grab_hdru5c-removebg-preview_jdynld.png' width="50" height="50" alt=""></img>
              </a>
              <a href="https://web.lalamove.com/">
              <img src='https://res.cloudinary.com/duk2lo18t/image/upload/c_scale,w_50/v1665716744/frontend/lalamove_sznu40.jpg' width="50" height="50" alt=""></img>
              </a>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Stack padding={2} textAlign='center'>
        <h4>© 2022. TRANG WEB THƯƠNG MẠI ĐIỆN TỬ S-PHONE</h4>
        <h5>Địa chỉ: Số 1 Võ Văn Ngân, Linh chiểu , Thủ Đức , Thành phố Hồ Chí Minh , Việt Nam. Điện thoại: 086 8704 516. Chịu trách nhiệm nội dung: Dương Văn Ngọc Tín.</h5>
      </Stack>
    </Box>
  );
}

export default Footer;
