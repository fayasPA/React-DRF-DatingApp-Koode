import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"
import { useLocation, useNavigate, } from "react-router-dom";
import axios from "../../axios"
import { searchUsers } from "../../Constants/Constants";

const Topbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext);

    // search
    const location = useLocation();
    const [searchElem, setSearchElem] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const fetchData = (value) => {
        const body = {
            searchItem: value
        }
        if (value) {
            axios.post(searchUsers, body).then((response) => {
                setSearchResult(response.data)
            })
        }
        else {
            setSearchResult("")
        }
    }
    const handleChange = (value) => {
        setSearchElem(value);
        fetchData(value);
    }
    const handleSearchOption = (id) => {
        console.log('id', id)
        navigate(`/admin/searchuser/${id}`)
        setSearchElem('')
        setSearchResult('')
    }
    return (
        <Box display="flex" justifyContent="end" p={2} >
            {/* Search Bar */}
            {(location.pathname === '/admin/team') && (
                <Box>
                    <Box display="flex"
                        backgroundColor={colors.primary[400]}
                        borderRadius="3px">
                        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchElem} onChange={(e) => handleChange(e.target.value)} />
                        <IconButton type="button">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Box>
                        {searchResult &&
                            <div className="absolute bg-white text-black flex-col w-full mt-2">
                                {searchResult.map((result, index) => {
                                    return <div onClick={() => handleSearchOption(result.id)} className="p-2" key={index}>
                                        {result.username}
                                    </div>
                                })
                                }
                            </div>
                        }
                    </Box>
                </Box>
            )}

            {/* Icons */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutinedIcon />
                    ) : (
                        <LightModeOutinedIcon />
                    )}
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar;