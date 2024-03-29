import React from 'react'
import './CardFlashsale.scss'
import {
    Card,
    CardContent ,
     CardMedia,
     Typography,
     Box
 } from '@mui/material';
import { Link } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress';
import { numWithCommas } from '../../constraints/Util';


function CardFlashsale({ data }) {
    return (
        <Link className="card__wrap" to={`/product/${data.id}`}>
            <Card className='card'>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    width="6px"
                    height="160px"
                    image={data?.image}
                />
                <Typography className="card__title" variant="h5" component="div" fontSize="14px" padding={2}>{data.name}</Typography>
                <CardContent className="card__content">
                    <Typography className="card__price" color={`${data?.discount!==0 ? "#ff0000" : "#000000"}`} variant="h5">
                    {
                        data?.discount!==0 ?
                        <>{numWithCommas(Math.round(data?.price*(1-0.01*data.discount)))} ₫ <Box className="card__sale">{data?.discount}%</Box>
                        </>
                        :
                        <>{numWithCommas(data?.price)} ₫ </>
                    } 
                    </Typography>
                    <Box className='card-flashsale__sold' >
                        <LinearProgress variant="determinate" value={data.sold/data.inventory*100} />
                        <Box>Đã bán {data.sold}</Box>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    )
}

export default CardFlashsale