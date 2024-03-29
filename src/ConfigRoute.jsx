import Home from "./pages/Home";
import CustomerAccount from "./pages/CustomerAccount";
import ShoppingCart from "./pages/ShoppingCart";
import FilterProduct from "./pages/FilterProduct";
import DetailProduct from "./pages/DetailProduct";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment";
import PaymentVoucher from "./pages/Payment/PaymentVoucher";
import PaymentPending from "./pages/Payment/PaymentPending"
import Error from "./pages/Error/index";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./components/ChangePassword";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";
import SuccessPayment from "./pages/SuccessPayment";
import Test from "./pages/Test";
import AdminLogin from "./pages/AdminLogin"
import ManagerLogin from "./pages/ManagerLogin"
import Manager from "./pages/Manager";
import CompareProduct from "./pages/CompareProduct";
import FilterProductSearch from "./pages/FilterProductSearch";
import Shipper from "./pages/Shipper";
import ProductBrand from "./pages/ProductBrand";

function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="cart" element={<ShoppingCart />} />
      <Route path="compare" element={<CompareProduct />} />
      <Route element={<PrivateRoute roles={["ADMIN", "USER","MANAGER","SHIPPER"]} />}>
        <Route path="customer/*" element={<CustomerAccount />} />
        <Route path="payment/info" element={<Payment />} />
        <Route path="payment/voucher" element={<PaymentVoucher />} />
        <Route path="payment/pending" element={<PaymentPending />} />
      </Route>
      <Route path="login/admin" element={<AdminLogin/>}/>
      <Route path="login/manager" element={<ManagerLogin/>}/>
      <Route element={<PrivateRoute roles={['ADMIN']} />}>
        <Route path="admin/*" element={<Admin />} />
      </Route>
      <Route element={<PrivateRoute roles={['MANAGER']} />}>
        <Route path="manager/*" element={<Manager />} />
      </Route>
      <Route path="filter/:id" element={<FilterProduct />} />
      <Route path="product/:id" element={<DetailProduct />} />
      <Route path="brand/:id" element={<ProductBrand />} />
      <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
      <Route path="*" element={<Error />} />
      <Route path="search/:id" element={<FilterProductSearch />} />
      <Route path="reset" element={<ChangePassword />} />
      <Route path="payment/:id" element={<SuccessPayment/>} />
      <Route path="test" element={<Test/>}/>
    </Routes>
  );
}

export default ConfigRoute;
