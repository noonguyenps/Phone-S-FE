import React from 'react'
import {
  Stack,
  Button,
  Typography
} from "@mui/material";

function EmptyNotify(props) {
  return (
    <Stack
      sx={{
        width: "100px",
        paddingLeft:10
      }}
      justifyContent="center"
      alignItems="center"
      p="2rem"
    >
      <img
        alt=""
        src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
      />
      <Typography variant="body1">{props.title}</Typography>

      <a href='/'><Button variant="contained" color="warning">
        Tiếp tục mua sắm
      </Button>
      </a>
    </Stack>
  )
}

export default EmptyNotify;

