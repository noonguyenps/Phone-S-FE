import { useCallback, useEffect, useState } from 'react'
import {Typography, Box, Button, Stack, Radio, RadioGroup, TextField } from '@mui/material';
import { numWithCommas } from "../../constraints/Util"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import AddressVN from '../../components/AddressVN';
import { Routes, Route } from 'react-router-dom';
import ShippingDetail from './ShippingDetail';
import apiShipping from '../../apis/apiShipping';
import {Table,TableHead,TableBody,TableRow,TableCell} from '@mui/material';
import Test from '../Test'
import ShippingList from './ShippingList';

function Shipper() {
  const [page, setPage] = useState(0);
  const size = 10;
  const [openModalDelete, setOpenModelDelete] = useState(false);
  const [listShipping, setListShipping] = useState(); 
  const user = useSelector(state => state.auth.user);
  const navigate = useNavigate()

  useEffect(() => {
    const loadTitle = () => {
      document.title = "Thông tin giao hàng"
    }
    loadTitle()
  }, [])
  return (
  <>
    <Box className="container" >
      <Box>
        <Routes>
            <Route path="/" element={<ShippingList />} />
          <Route path="detail/:id" element={<ShippingDetail />} />
        </Routes>
      </Box>
    </Box>
  </>
  )
}
export default Shipper