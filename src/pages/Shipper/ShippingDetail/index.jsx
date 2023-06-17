import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apiShipping from '../../../apis/apiShipping';
import { toast } from 'react-hot-toast';
import {Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import AddressVN from '../../../components/AddressVN';
import { numWithCommas } from '../../../constraints/Util';
import ImageUploading from "react-images-uploading";
import Loading from '../../../components/Loading';



function ShippingDetail(){
    let id = useParams().id;
    const [shipping, setShipping] = useState(null);
    const [openModalDelete, setOpenModelDelete] = useState(false);
    const navigate = useNavigate();
    const [index,setIndex] = useState(0);
    const [listImage, setListImage] = useState([]);
    const [listAddNewImage, setListAddNewImage]= useState([]);
    const [listUrl,setListUrl] = useState([]);
    const [loadingShowmore, setLoadingShowmore] = useState(false)
    const buttonRef = useRef(null);
    const [refesh,setRefesh] = useState(false);
    const handleChangeAddNewImage = (index) => {
        setListAddNewImage(prev =>[...prev,index]);
        setIndex(index+1);
      };
    const onChange = (imageList,i) => {
        setListImage(prev=> [...prev,imageList]);
      };
    

    useEffect(() => {
          async function fetchData() {
            await apiShipping.getShippingById(id)
              .then((res)=>{
                setShipping(res.data.shipping);
              }).catch((err)=>{
                toast.error("Có lỗi xảy ra" + err);
              })
          }
          fetchData();
      },[refesh]);


      function uploadListImageBE(index){
        return new Promise((resolve, reject)=>{
          apiShipping.uploadImg(id,listImage[index]).then((res)=>{
          listUrl[index] = res.data.url;
          setListUrl(prev =>[...prev]);
          })
          .catch((err)=>{
            console.log(err);
            reject(err);
          })
          .finally(()=>{
              resolve();
          })}
        )
      };
      async function saveProduct(){
        setLoadingShowmore(true)
        for(var index in listImage){
          await uploadListImageBE(index);
        }
        let params = {
          img1 : listUrl[0]?listUrl[0]:"",
          img2 : listUrl[1]?listUrl[1]:"",
          img3 : listUrl[2]?listUrl[2]:"",
          
        }
        apiShipping.updateShipping(id,params.img1,params.img2,params.img3)
        .then((res)=>{
          toast.success("Giao hàng thành công");
          setLoadingShowmore(false)
          setRefesh(!refesh)
        })
        .catch((err)=>{
          toast.error("Đã xảy ra lỗi")
          setLoadingShowmore(false)
          setRefesh(!refesh)
        })
      }

    return(
    <>
    <Stack spacing={2}>
        <Box>
            <Stack direction='row' justifyContent="space-between"  alignItems="center">
            <a href="../"><Typography sx={{color:'#ff0000'}}>Trở về</Typography></a>
            <Typography>CHI TIẾT ĐƠN HÀNG</Typography>
            <Button></Button>
            </Stack>
        </Box>
        <Box>
            <Stack direction='row'>
                <img></img>
                <Stack>
                    <Typography>Tên người nhận : {shipping?.customerName}</Typography>
                    <Typography>Số điện thoại : {shipping?.customerPhone}</Typography>
                    {shipping?(<>
                    <Typography>Địa chỉ : {shipping.addressDetail}, <AddressVN province={shipping.province} district={shipping.district} commune={shipping.commune}/></Typography>
                    </>):(<></>)}
                </Stack>
            </Stack>
        </Box>
        <Box>
            <Typography>Danh sách sản phẩm</Typography>
                <Table className="productTable" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell sx ={{width:'100px'}}>Hình ảnh</TableCell>
                        <TableCell>Số lượng</TableCell>
                    </TableRow>
                </TableHead>
                {shipping?.carts.map((row)=>(
                <TableBody>
                        <TableRow key={row} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>
                                <Stack>
                                    <Typography sx={{ color: "#1890ff" }}>{row.productName}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell sx ={{width:'100px'}} align='center'>
                                <img style={{width:'100px', height:'100px'}} src = {row.productImage?row.productImage:'https://res.cloudinary.com/duk2lo18t/image/upload/v1667887284/frontend/R_zzr2lm.png'}></img>
                            </TableCell>
                            <TableCell>
                                <Stack direction="row" justifyContent="center">
                                    <Typography sx={{ margin: "auto 0" }}>{row.quantity}</Typography>
                                </Stack>
                            </TableCell>
                        </TableRow>
                </TableBody>))}
            </Table>
        </Box>
        <Box>
            <Stack alignItems='center'>
            {
                shipping?.statusPayment?(<>
                <Typography sx={{color:'green'}}>Đã Thanh Toán</Typography></>):(<>{shipping?.total?(<Typography sx={{color:'red'}}>Tổng giá trị : {numWithCommas(shipping?.total)} VND</Typography>):(<></>)}</>)
            }
            </Stack>
        </Box>
        <Box>
            <Typography sx={{width:'20%'}}>Hình ảnh giao hàng</Typography>
            {
                shipping?.statusOrder===2?(<>
                <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Box sx={{width:'100%'}}>
                  <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    shipping?.image1?(<>
                    <Box margin={2}
                sx={{
                width: "15rem",
                height: "15rem",
                  }}>
                      <Stack key={0}
                      sx={{
                          width: "15rem",
                          height: "15rem",
                          borderRadius: "5px",
                        }}
                        spacing={3}
                        className="image-item"
                        
                      >
                        <img
                          style={{
                            width: "15rem",
                            height: "15rem",
                            alignSelf: "center",
                          }}
                          src={shipping?.image1}
                          alt=""/>
                      </Stack>
                </Box>
                    </>):(<></>)
                }
                {
                    shipping?.image2?(<>
                    <Box margin={2}
                sx={{
                width: "15rem",
                height: "15rem",
                  }}>
                      <Stack key={0}
                      sx={{
                          width: "15rem",
                          height: "15rem",
                          borderRadius: "5px",
                        }}
                        spacing={3}
                        className="image-item"
                        
                      >
                        <img
                          style={{
                            width: "15rem",
                            height: "15rem",
                            alignSelf: "center",
                          }}
                          src={shipping?.image2}
                          alt=""/>
                      </Stack>
                </Box>
                    </>):(<></>)
                }
                {
                    shipping?.image3?(<>
                    <Box margin={2}
                sx={{
                width: "15rem",
                height: "15rem",
                  }}>
                      <Stack key={0}
                      sx={{
                          width: "15rem",
                          height: "15rem",
                          borderRadius: "5px",
                        }}
                        spacing={3}
                        className="image-item"
                        
                      >
                        <img
                          style={{
                            width: "15rem",
                            height: "15rem",
                            alignSelf: "center",
                          }}
                          src={shipping?.image3}
                          alt=""/>
                      </Stack>
                </Box>
                    </>):(<></>)
                }
              </Grid>
            </Box>
          </Stack></>):(<>
                <Stack direction='row' padding ={1} sx={{width:'100%'}}>
            <Box sx={{width:'100%'}}>
                  <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {listAddNewImage.map((index) =>(
                  <Box padding={3}>
                  <ImageUploading
                    value={listImage[index]}
                    onChange={onChange}
                    dataURLKey="data_url"
                    acceptType={["jpg"]}
                  >
                    {({
                      imageList,
                      onImageUpload,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <Box className="upload__image-wrapper">
                        {imageList.length === 0 ? (
                          <Stack
                            sx={{
                              width: "15rem",
                              height: "15rem",
                              border: "2px dashed grey",
                              borderRadius: "5px",
                            }}
                            style={isDragging ? { color: "red" } : null}
                            justifyContent="center"
                            alignItems="center"
                            onClick={onImageUpload}
                            {...dragProps}
                          >
                            <Typography align="center"
                              sx={{ ml: "auto", mr: "auto", color: "blue", alignItems:"center" }}
                            >
                              Chọn hoặc kéo thả hình ảnh
                            </Typography>
                          </Stack>
                        ) : null}

                        {imageList.map((image,i) => (
                          <Stack
                            key={i}
                            sx={{
                              width: "100%",
                              height: "20rem",
                              borderRadius: "5px",
                            }}
                            spacing={3}
                            className="image-item"
                          >
                            <img
                              style={{
                                width: "15rem",
                                height: "15rem",
                                alignSelf: "center",
                              }}
                              src={image.data_url}
                              alt=""
                            />
                            <Stack
                              direction="row"
                              className="image-item__btn-wrapper"
                              justifyContent="center"
                              spacing={5}>
                            </Stack>
                          </Stack>
                        ))}
                      </Box>
                    )}
                  </ImageUploading>
                </Box>
                ))}
                {
                    index<3?(<>
                    <Box p={2} paddingLeft={2} 
                sx={{
                width: "15rem",
                height: "15rem",
                  }}>
                      <Stack key={0}
                      sx={{
                          width: "15rem",
                          height: "15rem",
                          borderRadius: "5px",
                        }}
                        spacing={3}
                        className="image-item"
                        
                      >
                        <img
                          style={{
                            width: "15rem",
                            height: "15rem",
                            alignSelf: "center",
                          }}
                          src={"https://th.bing.com/th/id/R.49f5920e471dbe4aadf67dbcba5ee404?rik=LX2UXU7UQpK8BA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fplus%2fplus_PNG15.png&ehk=DzbRuCqrTXMbMQm2rvj63rfKcTtr2VzXf%2ffsIL3UZG8%3d&risl=&pid=ImgRaw&r=0"}
                          alt=""
                          ref={buttonRef}
                          onClick={() => (handleChangeAddNewImage(index))}/>
                      </Stack>
                </Box>
                    </>):(<></>)
                }
              </Grid>
            </Box>
          </Stack>
          <Stack alignItems='center'>
          {
            loadingShowmore?(<>
            <Button className="btn__addProduct" variant="contained" component="label">
                <Loading/>
              </Button>
              </>):(
              <Button className="btn__addProduct" variant="contained" component="label" onClick={() =>(saveProduct())}>
                <Typography sx={{color:"#ffffff"}}>Xác nhận giao hàng</Typography>
              </Button>)
          }
            </Stack></>)
            }
        </Box>
    </Stack>
    </>)
}
export default ShippingDetail;