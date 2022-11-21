
import React from "react";
import {
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputBase
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useState } from "react";
import apiAttribute from "../../apis/apiAttribute";
import { useEffect } from "react";
import PropTypes from 'prop-types';

function SelectBoxAttribute(props) {
    const [listAttribute, setListAttribute] = useState([]);
    const [listAttributeOption, setListAttributeOption] = useState([]);

    const {attribute,attributeOption} = props
    useEffect(() => {
        const getData = async () => {
          apiAttribute.getAllAttribute()
            .then(res => {
                console.log(res)
              setListAttribute(res);
            })
        };
        getData();
      }, []);
    useEffect(() => {
        const getData = async () => {
          const params = { id: props.attributeId }
          setListAttributeOption([]);
          apiAttribute.getAttributeById(params.id)
            .then(res => {
                console.log(res)
              setListAttributeOption(res);
            })
        };
        getData();
      }, [props.attributeId])
    useEffect(()=>{
        const handle = ()=>{
          let attribute = listAttribute?.find(item=>item.id === props.attributeId)
          let attributeOption = listAttributeOption?.find(item=>item.id === props.attributeOptionId)
        //   if(attribute && attributeOption)
        //       props.setAddressDetails(`${province.name}, ${district.name}, ${commune.name}`)
        //   else
        //       props.setAddressDetails('')
        }
        handle()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[props.attribute,props.attributeOption])
  
  
  return (
    <>
    <Stack direction="row">
          <Typography className={props.classLabel||"create-address__label"}>
            Thuộc tính:
          </Typography>
          <FormControl className="create-address__input" sx={{flex:"1"}}>
            <Select
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={attribute}
              label="Age"
              onChange={e=>props.onChangeAttribute(e.target.value)}
              input={<InputCustom placeholder="Chọn Thuộc tính" />}
            >
              {
                listAttribute.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row">
          <Typography  className={props.classLabel||"create-address__label"}>
            Giá trị
          </Typography>
          <FormControl className="create-address__input" sx={{flex:"1"}}>
            <InputLabel id="demo-simple-select-helper-label"></InputLabel>
            <Select
              sx={{ flex: 0.65 }}
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={attributeOption}
              label="Age"
              onChange={e=>props.onChangeAttributeOption(e.target.value)}
              input={<InputCustom placeholder="Chọn Giá trị" />}
            >
              {
                listAttributeOption.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </Stack></>
  )
}
const InputCustom = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      boxSizing: "border-box",
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      display: "flex",
      height: "40px !important",
      padding: '0px 26px 0px 12px',
      alignItems: "center",
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#1890ff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

  SelectBoxAttribute.propTypes = {
    attribute:PropTypes.string,
    attributeOption:PropTypes.string,
    onChangeAttribute:PropTypes.func,
    onChangeAttributeOption:PropTypes.func,
  };

export default SelectBoxAttribute