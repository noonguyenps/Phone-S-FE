import React from "react";

import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./CustomerAccount.scss";
import jwt_decode from 'jwt-decode';
import { sidebarTab } from "../../constraints/Profile";
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutSuccess } from "../../slices/authSlice";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom"
import Info from "./Info/index";
import PhoneNumber from "./Info/PhoneNumber/index";
import Email from "./Info/Email/index";
import Password from "./Info/Password/index";
import Orders from "./Orders/index";
import Addresses from "./Addresses/index";
import CreateAddress from "./Addresses/CreateAddress/index";
import FavoriteProduct from "./FavoriteProduct/index";
import DiscountCode from "./Coupon/index";
import DetailOrder from "./Orders/DetailOrder";
import { useSelector } from "react-redux";
import apiNotify from "../../apis/apiNotify";
import HomePage from "./HomePage";
import { deleteAll } from "../../slices/cartSlice";
import { clearAll } from "../../slices/paymentSlice"
import Ratting from "../CustomerAccount/Ratting";
import UpdateAddress from "./Addresses/UpdateAddress";
import PrivateRoute from "../../components/PrivateRoute";
import Shipper from "../Shipper";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function CustomerAccount() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const tabId = sidebarTab.find((item) =>
    location.pathname.includes(item.link)
  );
  const userId = useSelector((state) => state.auth.user).id;
  const [selectedTabId, setSelectedTabId] = React.useState(tabId?.id || 0);
  const [badge, setBadge] = React.useState(0);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const tokenDecode = jwt_decode(user?.refreshToken);
  const getRole = tokenDecode.roleNames[0];
  const getData = React.useCallback(async () => {
    let count = 0;
    let param = {
      userId: userId,
    };
    const response = await apiNotify.getNotification(param);
    for (let i = 0; i < response.length; i++) {
      if (response[i].seen === false) {
        count++;
      }
    }
    setBadge(count);
  }, [userId]);

  const handleLogout = () => {
    navigate('/');
    dispatch(logoutSuccess());
    dispatch(deleteAll());
    dispatch(clearAll())
  };

  React.useEffect(() => {
    const handleChangePath = () => {
      const tabId = sidebarTab.find((item) =>
        location.pathname.includes(item.link)
      );
      if (tabId) setSelectedTabId(tabId?.id || 0);
    };
    handleChangePath();

    getData();
  }, [location.pathname, getData]);

  React.useEffect(() => {
    document.title =
      sidebarTab.find((item) => item.id === selectedTabId)?.text ||
      "S-Phone";
  }, [selectedTabId]);
  

  return (
    <Box className="container">
      <Box className="customer-account">
        <Box width="16rem">
          <List sx={{ maxWidth: "300px" }} spacing={2}>
            {sidebarTab.map((item, index) => {
              return (
                <Link key={item.id} to={item.link}>
                  <ListItem
                    disablePadding
                    onClick={() => setSelectedTabId(item.id)}
                    selected={selectedTabId === item.id}
                  >
                    <ListItemButton>
                      <ListItemIcon>{<item.icon />}</ListItemIcon>

                      <ListItemText
                        primary={item.text}
                        sx={{ "&>span": { fontSize: "13px" } }}
                      />
                      {index === 1 ? (
                        badge > 0 ? (
                          <Badge badgeContent={badge} color="error"></Badge>
                        ) : null
                      ) : null}
                    </ListItemButton>
                  </ListItem>
                </Link>
              );
            })}
            {
              getRole==="SHIPPER"?(<>
              <Link key={9} to={'shipping'}>
                  <ListItem
                    disablePadding
                    onClick={() => setSelectedTabId(9)}
                    selected={selectedTabId === 9}
                  >
                    <ListItemButton>
                      <ListItemIcon>{<LocalShippingIcon/>}</ListItemIcon>

                      <ListItemText
                        primary={'Giao hàng'}
                        sx={{ "&>span": { fontSize: "13px" } }}
                      />
                    </ListItemButton>
                  </ListItem>
                </Link>
            </>):(<></>)
            }
            <ListItem
                    disablePadding
                    onClick={handleLogout}
                  >
                    <ListItemButton>
                      <ListItemIcon><LogoutIcon/></ListItemIcon>
                      <ListItemText
                        primary="Đăng xuất"
                        sx={{ "&>span": { fontSize: "13px" } }}
                      />
                    </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box flex={1} mt="16px">
          <Routes>
            <Route
              path="homepage"
              element={<HomePage/>}/>
            <Route
              path="account/edit/*"
              element={
                <Routes>
                  <Route index element={<Info />} />
                  <Route path="phone" element={<PhoneNumber />} />
                  <Route path="email" element={<Email />} />
                  <Route path="pass" element={<Password />} />
                </Routes>
              }
            />
            <Route
              path="order/*"
              element={
                <Routes>
                  <Route path="history" element={<Orders />} />
                  <Route path="detail/:id" element={<DetailOrder />} />
                  <Route path="ratting/:id" element={<Ratting/>}/>
                </Routes>
              }
            />

            <Route
              path="address/*"
              element={
                <Routes>
                  <Route index element={<Addresses />} />
                  <Route path="create" element={<CreateAddress />} />
                  <Route
                    path="edit/:id"
                    element={<UpdateAddress/>}
                  ></Route>
                </Routes>
              }
            />
            <Route path="/wishlist" element={<FavoriteProduct />} />
            <Route path="/coupons" element={<DiscountCode />} />
            <Route element={<PrivateRoute roles={['SHIPPER']} />}>
              <Route path="/shipping/*" element={<Shipper />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomerAccount;
