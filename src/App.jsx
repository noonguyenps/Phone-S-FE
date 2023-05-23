import { Toaster } from "react-hot-toast";
import {Fab} from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./style/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfigRoute from "./ConfigRoute";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance, axiosInstanceExcel } from "./apis/axiosClient";
import { loginSuccess, logoutSuccess } from "./slices/authSlice";
import CheckAuthentication from "./components/CheckAuthentication";
import { MessengerChat } from "react-messenger-chat-plugin";
import CompareOutlinedIcon from '@mui/icons-material/CompareOutlined';


function App() {
  const isAdmin = window.location.href.includes("admin");
  const isManager = window.location.href.includes("manager");
  const user = useSelector((state) => state.auth.user);
  const compare = useSelector((state)=> state.compare.items)

  const dispatch = useDispatch();
  if (user) {
    axiosInstance(user, dispatch, loginSuccess, logoutSuccess);
    axiosInstanceExcel(user, dispatch, loginSuccess, logoutSuccess);
  }

  return (
    <>
      <BrowserRouter>
        <CheckAuthentication />
          {isAdmin||isManager ? null : <Header />}
          <ConfigRoute />
          {isAdmin||isManager||compare.length!=2 ? null : <Fab style={{
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 60,
              left: 'auto',
              position: 'fixed',
          }}><a href="/compare"><CompareOutlinedIcon/></a></Fab>}
          {isAdmin||isManager ? null : <Footer />}
          <div><Toaster/></div>
      </BrowserRouter>
      {isAdmin||isManager ? null : (
        <MessengerChat
          pageId="104755285882431"
          language="vi_VN"
          loggedInGreeting="loggedInGreeting"
          loggedOutGreeting="loggedOutGreeting"
          greetingDialogDisplay={"show"}
          debugMode={true}
          onMessengerShow={() => {
            console.log("onMessengerShow");
          }}
          onMessengerHide={() => {
            console.log("onMessengerHide");
          }}
          onMessengerDialogShow={() => {
            console.log("onMessengerDialogShow");
          }}
          onMessengerDialogHide={() => {
            console.log("onMessengerDialogHide");
          }}
          onMessengerMounted={() => {
            console.log("onMessengerMounted");
          }}
          onMessengerLoad={() => {
            console.log("onMessengerLoad");
          }}
        />
      )}
    </>
  );
}

export default App;
