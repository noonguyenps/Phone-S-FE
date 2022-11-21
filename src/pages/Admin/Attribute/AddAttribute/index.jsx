import React from "react";
import { useEffect, useState } from "react";
import apiAttribute from "../../../../apis/apiAttribute";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Stack,
    TextField,
    Button,
} from "@mui/material";

function AddAttribute(props) {
    const [id, setId] = useState("");
    const [name, setName] = useState("")

    const handleSave = () => {
        const params = {
            "id":id,
            "name":name
        }
        if (!(name)&&!(id)) {
            toast.warning("Vui lòng nhập đầy đủ thông tin !!");
            return
        }
        else {
            apiAttribute.addAttribute([params])
                .then(res => {
                    toast.success("Thêm thuộc tính thành công")
                    setName("")
                    setId("")
                })
                .catch(error => {
                    toast.error("Thêm thuộc tính thất bại!")
                })
        }
    }
    return (
        <Box>
            <Stack p={3} justifyContent="center" sx={{ width: "700px" }} spacing={3}>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>ID</Typography>
                    <TextField value={id} onChange={(event) => {
                        setId(event.target.value)
                    }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: 1 }} />
                </Stack>
                <Stack direction="row" p={2} >
                    <Typography sx={{ width: "200px" }}>Tên thuộc tính</Typography>
                    <TextField value={name} onChange={(event) => {
                        setName(event.target.value)
                    }} size="small" id="outlined-basic" variant="outlined" sx={{ flex: 1 }} />
                </Stack>
                <Stack justifyContent="center" alignItems="center">
                    <Button onClick={handleSave} sx={{ width: "30%" }} variant="contained">{"Thêm"}</Button>
                </Stack>
            </Stack>
        </Box>
    )
}
export default AddAttribute