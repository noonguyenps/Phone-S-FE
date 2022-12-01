import { Box, Typography, Stack, Button } from "@mui/material";
import React from "react";
import "./OrderItem.scss";
import { orderTabs } from "../../constraints/OrderItem";
import { numWithCommas } from "../../constraints/Util";
import { Link } from "react-router-dom";
function OrderItem(props) {
  const { order } = props;
  const handleDate = (timestamp) => {
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
    return date ;
}
  return (
    <Box className="orderItem">
       <Stack direction='row' className="orderItem__heading">
        <Stack>
        <Typography
          component="span"
          variant="h3"
          fontWeight={500} color="#888"
          align="center"
        >
          {order?.name}
        </Typography>
        <Typography
          component="span"
          variant="h3"
          fontWeight={500} color="#888"
        >
          {handleDate(order.createdDate)}
        </Typography>
        </Stack>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <Typography
          component="span"
          variant="h3"
          fontWeight={500} color="#888"
        >
          Trạng thái: {order.orderStatus==0?"Đang xử lý":(
                                order.orderStatus==1?"Đang vận chuyển":(
                                    order.orderStatus==2?"Đã giao hàng":"Đã hủy"
                                )
                            )}
        </Typography>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <Typography
          component="span"
          variant="h3"
          fontWeight={500} color="#888"
        >
          Tổng tiền: {numWithCommas(order.total)} đ
        </Typography>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <Link to={`detail/${order.orderId}`}>
            <Button sx={{ width: "100px" }} >Xem chi tiết</Button>
        </Link>
      </Stack>
    </Box>
  );
}

const getState = (state) => orderTabs.find((item) => item.id === state.id);

export default OrderItem;
