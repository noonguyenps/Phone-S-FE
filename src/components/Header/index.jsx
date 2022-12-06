import React, { useEffect, useState, useCallback,useRef, } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { DebounceInput } from "react-debounce-input";

import { Stack, Button, Typography, Badge, Box, Modal, Grid, Item } from "@mui/material";

import "./Header.scss";

import Login from "../Login";
import SignUp from "../SignUp";
import ForgetPassword from "../ForgetPassword";

import { addItem, removeAll } from "../../slices/searchSlice";
import { logoutSuccess } from "../../slices/authSlice";

import apiProduct from "../../apis/apiProduct";
import apiHome from "../../apis/apiHome";

import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import { deleteAll } from "../../slices/cartSlice";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const handleSubmitSearch = () => {
    let obj = {
      text: searchText,
      slug: searchText.replace(/\s/g, "-"),
    };
    handleSaveSearch(obj);
    navigate(`search/${obj.slug}`);
  };

  const onChangeSearch = (event) => {
    setSearchText(event.target.value);
  };
  

  const [modalLogin, setModalLogin] = useState(false);
  const openModalLogin = () => setModalLogin(true);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgetPwd, setIsForgetPwd] = useState(false);

  const cart = useSelector((state) => state.cart.items);

  const [cartUser, setCartUser] = useState(0);

  const user = useSelector((state) => state.auth.user);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      apiHome.getCategories({})
        .then(res => {
          setCategories(res)
        })
        .catch(error => {
          setCategories([])
        })
    }
    getData()
  }, [])

  const handleSaveSearch = (data) => {
    dispatch(addItem(data));
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    dispatch(deleteAll());
  };

  const closeModalLogin = () => {
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  };

  const closeModalForgetPWD = () => {
    setIsForgetPwd(false);
    setModalLogin(false);
    setIsLoginForm(true);
    setIsRegister(false);
  };

  const handleReturnLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsForgetPwd(false);
    setIsRegister(false);
  }, []);

  const handleOpenSignup = useCallback(() => {
    setIsRegister(true);
    setIsForgetPwd(false);
    setIsLoginForm(false);
  }, []);

  const handleOpenLogin = useCallback(() => {
    setIsLoginForm(true);
    setIsRegister(false);
    setIsForgetPwd(false);
  }, []);

  const handleOpenForgetPwd = useCallback(() => {
    setIsForgetPwd(true);
    setIsRegister(false);
    setIsLoginForm(false);
  }, []);

  return (
    <header className="header">
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          height: "100px",
          width: "100%",
          maxWidth: "1240px",
          margin: "0 auto",
        }}
      >
        <Link className="header__logo" to={"/"}>
          <Stack spacing={1} pt={1}>
            <img
              alt=""
              style={{ width: "110px", height: "70px" }}
              src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
            />
          </Stack>
        </Link>


        <Stack
          alignItems="flex-start"
          justifyContent="center"
          py={2}
          className="header__account"
        >
          <Stack
            alignItems="center"
            sx={{ color: "white", width: "160px", maxWidth: "160px" }}
          >
            <CategoryIcon sx={{ fontSize: "32px" }}/>
                <Stack>
                  <Button
                    sx={{ color: "white", padding: "6px 0" }}
                    endIcon={<ArrowDropDownOutlinedIcon />}
                  >
                    <Typography
                      className="text-overflow-1-lines"
                      sx={{ fontSize: "15px", textAlign: "start" }}>
                      Danh mục
                    </Typography>
                  </Button>
                </Stack>
                <Box className="header__dropdown">
                  {
                    categories.map((item)=>(
                      <a href={`/filter/${item.id}`}>{item.name}</a>
                    ))
                  }
                </Box>
            </Stack>
        </Stack>

        <Box sx={{ flex: 1 }} className="header__search">
          <Stack
            direction="row"
            alignItems="center"
            borderRadius={50}
            sx={{ weight :"100%", padding: "0", height: "40px", flex: 1, position: "relative" }}>
            <DebounceInput
              style={{ height: "100%", flex: 1 }}
              id="input-search"
              placeholder="Bạn muốn tìm gì ?"
              value={searchText}
              onChange={onChangeSearch}
              debounceTimeout={500}
            />
            <Button
              sx={{
                height: "100%",
                backgroundColor: "#006600",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
              }}
              variant="contained"
              onClick={() => handleSubmitSearch(searchText)}>
            <SearchIcon />
            </Button>
          </Stack>
        </Box>

        <Stack spacing={1} className="header__cart">
          <a href="tel:0868704516">
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{ color: "white", width: "110px", maxWidth: "110px" }}
            >
              <PhoneIcon sx={{ fontSize: "32px" }} />
              <Typography fontSize="12px">Gọi đặt hàng</Typography>
            </Stack>
          </a>
        </Stack>

        <Stack spacing={1} className="header__cart">
          <Link to="/cart">
            <Stack
              justifyContent="center"
              alignItems="center"
              spacing={1}
              sx={{ color: "white", width: "110px", maxWidth: "110px" }}
            >
              <Badge color="warning" badgeContent={user?cartUser:cart.length} showZero>
                <ShoppingBagIcon sx={{ fontSize: "32px" }} />
              </Badge>
              <Typography fontSize="12px">Giỏ hàng</Typography>
            </Stack>
          </Link>
        </Stack>

        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={3}
          py={2}
          className="header__account"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing="10px"
            sx={{ color: "white", width: "160px", maxWidth: "160px" }}
          >
            {user ? (
              <>
              <Stack justifyContent="center"
                      alignItems="center" className="header__cart">
                <Stack><img src={user.img} /></Stack>
                <Button
                  href = "/customer/account/edit"
                  sx={{ color: "white" }}>
                  <Typography sx={{ fontSize: "13px" }}>Quản lý tài khoản</Typography>
                </Button>
                <Typography px={2} sx={{ fontSize: "13px" }}>{user.fullName}</Typography>
              </Stack>
            </>
            ) : (
              <>
                <Stack justifyContent="center" alignItems="center" className="header__cart">
                  <Stack><PersonOutlineOutlinedIcon sx={{ fontSize: "32px" }} /></Stack>
                  <Button
                    onClick={openModalLogin}
                    sx={{ color: "white" }}>
                    <Typography sx={{ fontSize: "13px" }}>Đăng nhập</Typography>
                  </Button>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalLogin}
        onClose={closeModalLogin}
      >
        <Box className="modal-login" sx={{ width: "360px" }}>
          {isLoginForm && (
            <Login
              handleOpenSignup={handleOpenSignup}
              closeModalLogin={closeModalLogin}
              handleOpenForgetPwd={handleOpenForgetPwd}
            />
          )}

          {isRegister && (
            <SignUp
              handleOpenLogin={handleOpenLogin}
              closeModalLogin={closeModalLogin}
            />
          )}

          {isForgetPwd && (
            <ForgetPassword
              closeModalForgetPWD={closeModalForgetPWD}
              handleReturnLogin={handleReturnLogin}
            />
          )}
        </Box>
      </Modal>
    </header>
  );
}
export default Header;
