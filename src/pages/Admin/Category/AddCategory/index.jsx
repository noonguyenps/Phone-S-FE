import React from "react";
import { useEffect, useState } from "react";
import "./AddCategory.scss";
import apiCategory from "../../../../apis/apiCategory";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";


import {
    Box,
    Typography,
    Stack,
    TextField,
    MenuItem,
    Select,
    FormControl,
    Button,
    InputBase,
    styled
} from "@mui/material";

function AddCategory(props) {
    const [name, setName] = useState("")
    const [parent, setParent] = useState("")
    const [listType, setListType] = useState([]);

    useEffect(() => {
        const getData = async () => {
            apiCategory.showAllCategory()
                .then(res => {
                    setListType(res.data.listCategory);
                })
        };
        getData();
    }, []);

    const handleChangeType = (event) => {
        setParent(event.target.value);
    };

    const handleSave = () => {
        if (!(name)) {
            toast.warning("Hãy nhập tên danh mục !!");
            return
        }
        else {
            if(parent){
                const params = {
                    name : name,
                    parentId: parent
                }
                apiCategory.insertCategoryChild(params)
                .then(res => {
                    toast.success("Thêm danh mục thành công")
                    setName("")
                    setParent("")
                })
                .catch(error => {
                    toast.error("Thêm danh mục thất bại!")
                })
            }
            else{
                const params = {
                    name : name,
                }
                apiCategory.insertCategoryRoot(params)
                .then(res => {
                    toast.success("Thêm danh mục thành công")
                    setName("")
                    setParent("")
                })
                .catch(error => {
                    toast.error("Thêm danh mục thất bại!")
                })
            }
        }
    }
    return (
        <Box>
            <Stack p={3} justifyContent="center" sx={{ width: "700px" }} spacing={3}>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>Danh mục cha</Typography>
                    <FormControl className="create-address__input" sx={{ flex: 1 }}>
                        <Select
                            size="small"
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={parent}
                            onChange={handleChangeType}
                            input={<InputCustom placeholder="Chọn Danh mục cha" />}
                        >
                            {
                                listType.map(item => item.name !== name && <MenuItem value={item.id} >{item.name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>Tên danh mục</Typography>
                    <TextField value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: 1 }} />
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <Button onClick={handleSave} sx={{ width: "30%" }} variant="contained">Thêm</Button>
                </Stack>
            </Stack>
        </Box>
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

export default AddCategory