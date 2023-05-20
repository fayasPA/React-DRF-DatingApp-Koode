
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataTeam } from "../../data/mockData"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined"
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined"
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined"
import { useTheme } from "@emotion/react"
import Header from "../../components/Header"
import { Box, Button, Typography } from "@mui/material"
import axios from "../../axios"
import { useEffect, useState } from "react"
import { blockUser, getUsers } from "../../Constants/Constants"
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Swal from "sweetalert2";

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users,setUsers] = useState([])

    useEffect(() => {
        getUsersList();
      }, []);

    const blockUserBtn = (id, is_active, username) => {
        Swal.fire({
            title: is_active ? `Are you sure to block ${username}`: `Are you sure to UnBlock ${username}`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
          }).then((result) => {
            if (result.value) {
                console.log("axios");
              axios
                .put(`${blockUser}/${id}`)
                .then((res) => {
                  getUsersList();
                  { is_active ? Swal.fire("Blocked!", `${res.data.name} has been blocked`, "success"):
                  Swal.fire("UnBlocked!", `${res.data.name} has been Unblocked`, "success")
                }})
                .catch((err) => {
                  Swal.fire(
                    "Not Deleted!",
                    "Some Error."
                  );
                });
            }
          });
    }
    const getUsersList = () => {
        axios
          .get(getUsers)
          .then((response) => {
        console.log(response.data);
        setUsers(response.data);
          })
          .catch((error) => {
            console.log("inside catch");
            console.log(error);
          });
    };

      const columns = [
        // { field: "id", headerName: "ID" },
        { 
            field: "username",
            headerName: "Username",
            flex: 1,
            cellClassName: "name-column--cell"
        },
        { 
            field: "age",
            headerName: "Age",
            type: "number",
            headerAlign: "left",
            align: 'left',
            cellClassName: "name-column--cell"
        },
        { 
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "is_active",
            headerName: "Block/Unblock",
            flex: 1,
            headerAlign: "center",
            renderCell: ({ row: { is_active, id , username}}) => {
                return(
                    <Box onClick={() => blockUserBtn(id, is_active, username)} 
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={colors.greenAccent[600]}
                    borderRadius="5px"
                    sx={{cursor: "pointer"}}
                    >
                        {is_active ? <LockTwoToneIcon />: <LockOpenIcon />}
                    </Box>
                )
            }
        }]
    return (
        <Box m="20px">
            <Header title="USERS" subtitle="Managing App users" />
            <Box m="40px 0 0 0" height="75vh" sx={{
                "& .MuiDataGrid-root": {
                    border: "none"
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none"
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                    borderBottom: "10px"
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none"
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: colors.blueAccent[700],
                    borderTop: "none"
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `${colors.grey[100]} !important`,
                    borderTop: "none"
                },
            }}>
                <DataGrid
                    key={Math.random()}
                    rows={users}
                    columns={columns} 
                    components={{Toolbar: GridToolbar}}    
                />
            </Box>
        </Box>
    )
}

export default Team;