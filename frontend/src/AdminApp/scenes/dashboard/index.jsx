import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { statistics } from "../../Constants/Constants";


const Dashboard = () => {
    const theme = useTheme();
    const [chatCount, setChatCount] = useState('');
    const [userCount, setUserCount] = useState('');
    const colors = tokens(theme.palette.mode)
    useEffect(() => {
        axios.get(statistics).then((res)=> {
            console.log(res.data, 'stats')
            setChatCount(res.data.chat_count)
            setUserCount(res.data.user_count)
        })
    },[])
    return (
        <Box m="20px">
            <Box display="flex" justifyContent="start" alignItems="center">
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>

            {/* Grid & Charts */}
            <Box
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(6, 1fr)', md: 'repeat(12, 1fr)' }}
                gridAutoRows="140px"
                gap="20px"
            >
                {/* Row 1 */}

                <Box
                    gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 6' }}
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={userCount}
                        subtitle="Users"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <PersonAddIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 6' }}
                    backgroundColor={colors.primary[400]}
                    display="flex" alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={chatCount}
                        subtitle="Currently Chatting"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <EmailIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        }
                    />
                </Box>
                {/* Row 2 */}
                <Box
                    gridColumn={{ xs: 'span 1', sm: 'span 12', md: 'span 12' }}
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} >
                                Users
                            </Typography>
                            {/* <Typography variant="h3" fontWeight="500" color={colors.greenAccent[500]} >
                                {userCount}
                            </Typography> */}
                        </Box>

                        <Box>
                            <IconButton >
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>

                    </Box>
                    <Box height="250px" mt="-20px">
                        <LineChart isDashboard={true} />
                    </Box>
                </Box>
                {/* Row 3 */}
                <Box
                    gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 6' }}
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="30px"
                >
                    <Typography variant="h5" fontWeight="600">
                        Chats
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection='column'
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" />
                        <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
                            `{chatCount} chat is happening`
                        </Typography>
                        <Typography>Includes all the chats of users</Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn={{ xs: 'span 1', sm: 'span 6', md: 'span 6' }}
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                >
                    <Typography variant="h5" fontWeight="600" sx={{ p: "30px 30px 0 30px" }}>
                        User Chats
                    </Typography>
                    <Box
                        height="250px"
                        mt="-20px"
                    >
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default Dashboard;