import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Button, Hidden, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import LogoutIcon from '@mui/icons-material/Logout';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <MenuItem active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}


export const Sidebar = () => {
    const navigate = useNavigate();
    const logoutHandle = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login")
      };
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isCollapsed, setIsCollapsed] = useState(isSmallScreen);
    const [selected, setSelected] = useState('Dashboard')
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                }
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape='square'>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100]
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant='h3' color={colors.grey[100]}>
                                    ADMIN
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>

                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {/* <img src={"adminAvatar"} alt="profile-admin" width="100px" height="100px" style={{
                                    cursor: "pointer", borderRadius: "50%"
                                }} /> */}
                            </Box>
                            <Box textAlign="center">
                                <Typography variant='h2' color={colors.grey[100]} fontWeight="bold"
                                    sx={{
                                        m: "10px 0 0 "
                                    }}
                                > Fayas</Typography>
                                <Typography variant='h5' color={colors.greenAccent[500]}>Minglee Admin</Typography>
                            </Box>
                        </Box>
                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item title="Dashboard"
                            to=""
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Item title="Manage Users"
                            to="team"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <Typography
                            variant='h6'
                            color={colors.grey[300]}
                            sx={{
                                m: "15px 0 5px 20px"
                            }}
                        >Charts</Typography>

                        <Item title="Bar Chart"
                            to="bar"
                            icon={<BarChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item title="Pie Chart"
                            to="pie"
                            icon={<PieChartOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item title="Line Chart"
                            to="line"
                            icon={<TimelineOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item title="Geography Chart"
                            to="geography"
                            icon={<MapOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Box m={!isCollapsed ? undefined : "10px 0 0 -10px"} >
                            <Button color='inherit' onClick={logoutHandle}>
                                <Item title={isCollapsed ? "": "LOG OUT"}
                                to=""
                                icon={<LogoutIcon />}
                                selected={selected}
                                setSelected={setSelected}
                                />
                            </Button>
                        </Box>
                        
                    </Box>
                </Menu>
            </ProSidebar>

        </Box>
    )
}
export default Sidebar;