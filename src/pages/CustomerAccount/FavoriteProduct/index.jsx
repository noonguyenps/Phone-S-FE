import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
} from "@mui/material";

import CardProduct from "../../../components/CardProduct";
import apiAccount from "../../../apis/apiAccount";
import { useSelector } from "react-redux";

function FavoriteProduct() {
  const user = useSelector((state) => state.auth.user);

  console.log(user);

  const [myFavorites, setMyFavorites] = useState([]);
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const size = 10;

  useEffect(() => {
    const getMyFavorites = async () => {
      let param = {
        page: page,
        size: size,
      };
      await apiAccount.getWishListByUser().then((res) => {
        if (res.data.listProduct.length !== 0) {
          setMyFavorites(res.data.listProduct);
        }
      });
    };

    getMyFavorites();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h6">Danh sách yêu thích</Typography>
      {
        myFavorites.length===0?(<>
          <Box  className="myorder__none">
                  <img
                  height="200px"
                  width="200px"
                    src="https://res.cloudinary.com/duk2lo18t/image/upload/v1665719834/frontend/S-Phone_cpfelx.png"
                    alt=""
                  />
                  <Typography>Danh sách yêu thích của bạn đang trống</Typography>
          </Box>
        </>):(
        <>
          <Grid container sx={{ backgroundColor: "white", padding: "1rem" }}>
          {myFavorites.map((item) => {
            let data = {
              id: item.id,
              image: item.image,
              name: item.name,
              rate: item.rate,
              sold: item.sold,
              discount: item.discount,
              price: item.price,
              slug: item.slug,
            };
            return (
              <Grid key={item.id} item lg={2} md={4} sm={4} xs={4}>
                <CardProduct data={data} />
              </Grid>
            );
          })}
        </Grid>
        </>)
      }
    </Box>
  );
}
export default FavoriteProduct;
