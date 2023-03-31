/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/alt-text */
import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { sidebar } from "../../constraints/Admin";
import { styled } from "@mui/material/styles";
import "./Admin.scss";

import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import "./Admin.scss";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  Stack,
  ClickAwayListener,
  IconButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import CreateCoupon from "./Coupon/CreateCoupon";
import EditCoupon from "./Coupon/EditCoupon";
import AdminLogin from "./Login";
import Brand from "./Brand";
import CreateBrand from "./Brand/CruBrand";
import UpdateBrand from "./Brand/UpdateBrand";
import Category from "./Category";
import AddCategory from "./Category/AddCategory/index";
import EditCategory from "./Category/EditCategory/index";
import CouponAdmin from "./Coupon";
import Dashboard from "./Dashboard";
import Order from "./Order";
import Product from "./Product";
import CreateProduct from "./Product/CreateProduct";
import Rating from "./Rating";
import User from "./User";
import DetailUser from "./User/DetailUser";
import Attribute from "./Attribute";
import AddAttribute from "./Attribute/AddAttribute";
import EditAttribute from "./Attribute/EditAttribute";

import { useSelector } from "react-redux";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - calc(${theme.spacing(8)} + 1px))`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Admin() {
  const [setOpenAccount] = React.useState(false);

  const user = useSelector((state) => state.auth.user);

  const handleClickAccount = () => {
    setOpenAccount((prev) => !prev);
  };

  const handleClickAwayAccount = () => {
    setOpenAccount(false);
  };

  const [selectedTabId, setSelectedTabId] = React.useState(0);

  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Stack direction="row">
      <AppBar
        sx={{ backgroundColor: "white", color: "black" }}
        position="fixed"
        open={open}
      >
        <Toolbar>
          <Stack
            width="100%"
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Stack direction="row" spacing={3} alignItems="center">
              <IconButton sx={{ border: "1px solid silver" }}>
                <TextsmsOutlinedIcon sx={{ borderRadius: "50%" }} />
              </IconButton>
              <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Box borderRadius="50%" alt="" component="img" src={user.img} sx={{ width: "24px", height: "24px" }}/>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: "14px",
                      paddingLeft: "6px",
                      fontWeight: "Light",
                    }}
                  >
                    {user.fullName}
                  </Typography>
                </Stack>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            <img
              width={40}
              height={50}
              src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
              alt=""
            />
          </IconButton>
          <Typography variant="h5" fontFamily={'Roboto'}>eManage</Typography>
        </DrawerHeader>

        <Divider />

        <List>
          {sidebar.map((item) => (
            <Link to={item.link}>
              <ListItem
                key={item.id}
                disablePadding
                sx={{ display: "block" }}
                selected={selectedTabId === item.id}
                onClick={() => setSelectedTabId(item.id)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {<item.icon />}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        flexGrow={1}
        p={0}
        bgcolor="#f5f5fa"
        minHeight="40rem"
      >
        <DrawerHeader />
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="order/*" element={<Order />} />
          <Route
            path="product/*"
            element={
              <Routes>
                <Route index element={<Product />} />
                <Route path="create" element={<CreateProduct />} />
              </Routes>
            }
          />

          <Route
            path="category/*"
            element={
              <Routes>
                <Route index element={<Category />} />
                <Route path="add" element={<AddCategory />} />
                <Route
                  path="edit/:id"
                  element={<EditCategory/>}
                />
              </Routes>
            }
          />

          <Route
            path="brand/*"
            element={
              <Routes>
                <Route path="create" element={<CreateBrand />} />
                <Route path="edit/:id" element={<UpdateBrand />} />
                <Route index element={<Brand />} />
              </Routes>
            }
          />
          <Route
            path="attribute/*"
            element={
              <Routes>
                <Route path="create" element={<AddAttribute />} />
                <Route path="detail/:id" element={<EditAttribute />} />
                <Route index element={<Attribute/>} />
              </Routes>
            }
          />
          <Route
            path="coupon/*"
            element={
              <Routes>
                <Route index element={<CouponAdmin />} />
                <Route path="create" element={<CreateCoupon />} />
                <Route path="edit/:id" element={<EditCoupon/>} />
              </Routes>
            }
          />

          <Route
            path="user/*"
            element={
              <Routes>
                <Route index element={<User />} />
                <Route path="detail/:id" element={<DetailUser />} />
              </Routes>
            }
          />

          <Route path="rating" element={<Rating />} />
        </Routes>
      </Box>
    </Stack>
  );
}

export default Admin;
