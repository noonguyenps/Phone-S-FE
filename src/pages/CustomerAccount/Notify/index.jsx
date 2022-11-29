import { useState, useEffect } from "react";
import apiMain from "../../../apis/apiMain"
import apiNotify from "../../../apis/apiNotify"
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Notify.scss";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  Stack,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  Button,
} from "@mui/material";

import EmptyNotify from "../../../components/EmptyNotify";
import HomeIcon from "@mui/icons-material/Home";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ReceiptIcon from "@mui/icons-material/Receipt";
import UpdateIcon from "@mui/icons-material/Update";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function sayHello(id) {
  toast.success("say oh yeah" +id);
}

function seenNotification(id) {
  let params = {
    id : id
  }
  const response = apiNotify.updateNotification(params)
  if(response){
    toast.success("Đã đọc");
  }
}

function deleteNotification(id) {
  let params = {
    id : id
  }
  const response = apiNotify.deleteNotification(params)
  if(response){
    toast.success("Đã xóa");
  }
}

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
        <Box sx={{ p: 0 }}>
         {children}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const options = ["Đánh dấu đọc tất cả", "Xóa tất cả thông báo"];
const ITEM_HEIGHT = 48;

function Notify() {
  const userId= useSelector(state => state.auth.user).id
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [notification, setNotification] = useState([[], [], [], []])
  const [page, setPage] = useState(0);
  const size = 50;

  useEffect(() => {
    const getData = async () => {
      let param = {
        page: page,
        size: size,
        type: "order"
      }
      const response = await apiNotify.getNotification(param)
      if (response) {
        let data = response.data.listNotifications.map(item=>{return {...item,icon:getIconByType(item.type)}})
        const ty = [
          data,
          data.filter(item => item.type === "discount"),
          data.filter(item => item.type === "order"),
          data.filter(item => item.type === "system"),
        ]
        setNotification(ty) 
      }
    }
    getData()
  }, [])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDate = (timestamp) => {
    let date = new Intl.DateTimeFormat('en-GB').format(timestamp);
    return date ;
}

  return (  
    <Box sx={{ width: "100%", top: "0" }}>
      <Typography variant="h6">Thông báo của tôi</Typography>

      <Box sx={{ width: "100%", mt: "1rem", backgroundColor: "#fff" }}>
        <Stack
          position="static"
          color="default"
          direction="row"
          alignItems="center"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
            bgcolor="#ffffff"
          >
            <Tab
              icon={
                <Badge variant="dot" color="error">
                  <HomeIcon color="action" />
                </Badge>
              }
              aria-label="Home"
              sx={{ coler: "#666666" }}
              {...a11yProps(0)}
            />
            <Tab
              icon={
                <Badge variant="dot" color="error">
                  <CardGiftcardIcon color="action" />
                </Badge>
              }
              aria-label="Gift Card"
              {...a11yProps(1)}
            />
            <Tab
              icon={<ReceiptIcon />}
              aria-label="Receipt"
              {...a11yProps(2)}
            />
            <Tab icon={<UpdateIcon />} aria-label="Update" {...a11yProps(3)} />
          </Tabs>
          <Box marginRight="0px" marginLeft="auto">
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "25ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === "Pyxis"}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Stack>

        <TabPanel value={value} index={value}>
          <Stack sx={{ minHeight: "400px" }}>
            {notification[value].length === 0 ? <EmptyNotify /> : notification[value].map((item) => (
              <Stack
                key={item.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
                padding={3}
              >
                <Typography variant="body2">{handleDate(item.date)}</Typography>

                <Box className="icon">
                  <Box className={`icon__img icon__img--${item.type}`}>
                    {item.icon&&<item.icon />}
                  </Box>
                </Box>

                <Box style={{ flex: 1 }}>
                  <Typography variant="body2" className="text-overflow-2-lines">{item.text}</Typography>
                  <a
                    style={{ fontSize: "13px", color: "#0b74e5" }}
                    target="_blank"
                    href={item.link}
                    rel="noreferrer"
                  >
                    Chi tiết
                  </a>
                </Box>

                <Button onClick={() => seenNotification(item.id)}>Đánh dấu đã đọc</Button>

                <Button color="warning" onClick={() => deleteNotification(item.id)}>Xóa</Button>
              </Stack>
            ))}
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
}


const listType = [
  {
    name:'discount',
    icon:CardGiftcardIcon
  },
  {
    name:'order',
    icon:ReceiptIcon
  },
  {
    name:'system',
    icon:UpdateIcon
  }
]
const getIconByType =type=>{
  const list = listType.find(item=>item.name===type)
  if(list){
    return list.icon
  }
  return null
}

export default Notify;
