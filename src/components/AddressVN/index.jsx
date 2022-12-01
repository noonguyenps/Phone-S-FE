import React from "react";
import {
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import apiAddress from "../../apis/apiAddressVN";
import { useEffect } from "react";
import PropTypes from 'prop-types';

function AddressVN(props) {
    const [communeName,setCommuneName] = useState("")
    const [provinceName,setProvinceName] = useState("")
    const [districtName,setDistrictName] = useState("")
   
    const {province,district,commune} = props
    useEffect(() => {
      const getData = async () => {
        let param ={
            id:province
        }
        apiAddress.getProvince(param)
          .then(res => {
            setProvinceName(res);
          })
      };
      getData();
    }, []);

    useEffect(() => {
        const getData = async () => {
          let param ={
              id:district
          }
          apiAddress.getDistrict(param)
            .then(res => {
              setDistrictName(res);
            })
        };
        getData();
      }, []);

    useEffect(() => {
        const getData = async () => {
          let param ={
              id:commune
          }
          apiAddress.getCommune(param)
            .then(res => {
              setCommuneName(res);
            })
        };
        getData();
      }, []);
  
  return (
          <span>{communeName?', '+communeName:""}{districtName?', '+districtName:""}{provinceName?', '+provinceName:''}</span>
  )
}
  AddressVN.propTypes = {
    province: PropTypes.string,
    district:PropTypes.string,
    commune:PropTypes.string
  };

export default AddressVN