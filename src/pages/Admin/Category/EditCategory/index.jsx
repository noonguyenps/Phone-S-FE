import React from "react";
import { useEffect, useState } from "react";
import "./EditCategory.scss";
import apiCategory from "../../../../apis/apiCategory";
import { toast } from "react-hot-toast";
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

function EditCategory() {
    const [id, setId] = useState("");
    const [name, setName] = useState("")
    const [parent, setParent] = useState("")
    const [parentName, setParentName] = useState("")
    const [listType, setListType] = useState([]);
    const [update, setUpdate] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    
    
    useEffect(() => {
        const loaddata = () => {
            apiCategory.findCategoryById({ id: params.id })
                    .then(res => {
                        const category = res[0]
                        if (category) {
                            setName(category.name)
                            setParentName(category.parentName)
                            setParent(category.parentId)
                        }
                        else {
                            navigate("/admin/category")
                            toast.error("Danh mục này không tồn tại!")
                        }
                    }
                    )
                setId(params.id)
        }
        loaddata()
    },[])

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
    const handleChangeUpdate = (event) => {
        setUpdate(!update);
    };
    const handleUpdate = () => {
        const params = {
            id: id,
            "name": name,
            parentId: parent
        }
        if (!(name)) {
            toast.warning("Vui lòng nhập đầy đủ thông tin !!");
            return
        }
        apiCategory.updateCategory(params)
            .then(res => {
                toast.success("Cập nhật thành công")
                navigate('/admin/category')
            })
            .catch(error => {
                toast.error("Cập nhật thất bại!")
            })
    }
    return (
        <Box>
            <Stack p={3} justifyContent="center" sx={{ width: "700px" }} spacing={3}>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>Danh mục cha</Typography>
                    {
                        update?(<>
                        <FormControl className="create-address__input" sx={{ flex: 1 }}>
                        <Select
                            size="small"
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={parent}
                            onChange={handleChangeType}
                            input={<InputCustom placeholder="Chọn Loại" />}
                        >
                            {
                                listType.map(item => item.name !== name && <MenuItem value={item.id} >{item.name}</MenuItem>)
                            }
                        </Select>
                        </FormControl>
                        </>):(<>
                        <TextField onClick={handleChangeUpdate} disabled='disabled' size="small" value={parentName?parentName:"Đây là danh mục gốc"} sx={{width:430}}></TextField>
                        </>)
                    }
                </Stack>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>Tên danh mục</Typography>
                    <TextField value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: 1 }} />
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <Button onClick={handleUpdate} sx={{ width: "30%" }} variant="contained">Cập nhật</Button>
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

export default EditCategory