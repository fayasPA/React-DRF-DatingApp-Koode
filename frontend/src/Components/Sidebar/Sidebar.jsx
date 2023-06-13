import { useContext, useEffect, useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Button, Hidden, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import LogoutIcon from '@mui/icons-material/Logout';
import { tokens } from '../../theme';
import AuthContext from '../../Context/AuthContext';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import axios from '../../axios';
import { baseimageUrl, getUser } from '../../Constants/Constants';
import SocketContext from '../../Context/SocketContext';

const Item = ({ title, to, icon, selected, setSelected, notMessage, setNot_message }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <MenuItem active={selected === title}
            style={(notMessage) ? { color: 'red' } : { color: colors.grey[100] }}
            onClick={() => {
                setSelected(title)
                if (to === 'notification') {
                    setNot_message(null); // Set not_message to null when clicking on the Notifications menu item
                }
            }}
            icon={icon}
        >
            <div className='flex items-center'>{notMessage && (
                <Box borderRadius='50%' style={{ padding: '1px', color: 'red', marginRight: '3px' }} fontSize={20} >{notMessage}</Box>
            )}
                <Typography>{title}</Typography>
            </div>
            <Link to={to} />
        </MenuItem>
    )
}

export const Sidebar = () => {

    const notification_socket = useContext(SocketContext)
    const [not_message, setNot_message] = useState(null);
    const Token = localStorage.getItem('user_id')
    const navigate = useNavigate();
    const logoutHandle = useContext(AuthContext)
    useEffect(() => {
        getFiles()
    }, [])
    const [userDetails, setUserDetails] = useState()
    const getFiles = () => {
        axios.get(`${getUser}${Token}`).then((response) => {
            setUserDetails(response.data)
        })
    }
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isCollapsed, setIsCollapsed] = useState(isSmallScreen);
    const [selected, setSelected] = useState('Dashboard');
    const toAccountsPage = () => {
        navigate('/accounts')
    };

    useEffect(() => {
        if (notification_socket) {
            notification_socket.onmessage = (event) => {
                const likemessage = JSON.parse(event.data, 'SOCKET ON MESSAGE');
                console.log('Received notification@sidebar:', likemessage.message);
                if (likemessage.message) {
                    setNot_message(likemessage.message);
                    console.log('FAYAS@token correct');
                }
            };
        }
    }, [notification_socket]);

    return (
        <Box
            sx={{
                height: '100vh',
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
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
                                justifyContent="end"
                                alignItems="center"
                                ml="15px"
                            >
                                <IconButton color={colors.grey[100]} onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>

                            </Box>
                        )}
                    </MenuItem>
                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img onClick={toAccountsPage} src={userDetails && `${baseimageUrl}${userDetails.image}`} alt="profile-pic" width="100px" height="100%"
                                    style={{ cursor: "pointer", borderRadius: "25%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography onClick={toAccountsPage} variant='h2' color={colors.grey[100]} fontWeight="bold"
                                    sx={{ m: "10px 0 0 ", cursor: "pointer" }}
                                > {userDetails && userDetails.username}</Typography>
                            </Box>
                        </Box>

                    )}
                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {isCollapsed && (
                            <Item title=""
                                to="/"
                                icon={<img src={userDetails && `${baseimageUrl}${userDetails.image}`} alt="profile-user" width="50px" height="50px"
                                    style={{ cursor: "pointer", borderRadius: "25%" }}
                                />}
                                selected={selected}
                                setSelected={setSelected}
                            />)}
                        <Item title="Home"
                            to=""
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item title="Matches"
                            to="matches"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item title="Messages"
                            to="messages"
                            icon={<ChatOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item title="Notifications"
                            to="notification"
                            icon={not_message ? <NotificationAddIcon /> : <NotificationsActiveOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                            notMessage={not_message}
                            setNot_message={setNot_message}
                        />

                        <Box m={!isCollapsed ? undefined : "10px 0 0 -10px"} >
                            <Button color='inherit' onClick={logoutHandle.logOutUser}  >
                                <Item title={isCollapsed ? "" : "LOG OUT"}
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