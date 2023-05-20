import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext);
    return(
        <Box display="flex" justifyContent="end" p={2} >
            {/* Search Bar */}
            {/* <Box display="flex"
             backgroundColor={colors.primary[400]} 
             borderRadius="3px">
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Search" />
                <IconButton type="button">
                    <SearchIcon />
                </IconButton>
            </Box> */}
            {/* Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ?(
                    <DarkModeOutinedIcon />
                    ): (
                        <LightModeOutinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutinedIcon />
                </IconButton>

            </Box>
        </Box>
    )
}

export default Topbar ;