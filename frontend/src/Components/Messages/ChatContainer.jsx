import { useEffect, useRef, useState } from "react";
import { baseimageUrl, userChats, getUserMessages, baseWSurl } from "../../Constants/Constants";
import axios from "../../axios";
import { Card, CardContent, CardMedia, Fab, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import moment from "moment";
// import { HiVideoCamera } from "react-icons/hi"
// import { BiPhoneCall } from "react-icons/bi"

function ChatContainer() {

    const [msgSocket, setMsgSocket] = useState();
    const Token = localStorage.getItem('user_id')
    const formatTimestamp = (timestamp) => {
        const formattedTimestamp = moment(timestamp).fromNow();
        return formattedTimestamp
    }
    const [currMessaging, setCurrMessaging] = useState(null);
    const [currMessagingName, setCurrMessagingName] = useState(null);
    const [messages, setMessages] = useState([]);
    const roomName = currMessaging

    useEffect(() => {
        // Websocket start
        if (roomName) {
            const socket = new WebSocket(`${baseWSurl}chat/${roomName}/`);
            socket.onopen = () => {
                console.log('WebSocket connection established.');
            };

            socket.onmessage = event => {
                const message = JSON.parse(event.data, "socket on message");
                getMessages(currMessaging);
                console.log('Received message:', message);
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed.');
            }
            // Websocket ends
            setMsgSocket(socket)

            return () => {
                socket.close();
            };
        }

    }, [currMessaging])

    const getMessages = (id) => {
        setCurrMessaging(id)
        console.log("get messages", id);
        axios.get(`${getUserMessages}${id}`)
            .then(response => {
                (response.data.length !== 0) ? setMessages(response.data) : setMessages(null)
            })
            .catch(error => {
                console.error('Error fetching chats:', error);
            });
    }

    const [chats, setChats] = useState([]);
    const getChats = () => {
        axios.get(`${userChats}${Token}`)
            .then(response => {
                response.data ? setChats(response.data) : setChats(null)
            })
            .catch(error => {
                console.error('Error fetching chats:', error);
            });
    }
    useEffect(() => {
        getChats();
    }, []);

    // submit if the user presses the enter key
    const enterKeyCheck = (e) => {
        if (e.keyCode === 13 && !e.shiftKey && e.target.value !== "") {
            e.preventDefault();
            const submitBtn = e.target.form.querySelector('[type="submit"]');
            submitBtn.click();
        }
    };
    const handleMsgSubmit = (e) => {
        e.preventDefault();
        console.log("submit", e.target.content.value.trim(), "fayas")
        const body = {
            "content": e.target.content.value.trim(),
            "chat_id": currMessaging,
            "sender_id": Token
        }
        {
            e.target.content.value &&
                msgSocket.send(JSON.stringify(body))
            e.target.content.value = null;
            e.target.content.focus();
        }
    }

    const Item = ({ title, id, icon }) => {
        return (
            <Card onClick={() => {
                getMessages(id);
                setCurrMessagingName(title)
            }}
                sx={{ cursor: 'pointer', ":hover": "black", mb: '1px', display: 'flex', borderBottom: "20px", alignItems: 'center', justifyContent: 'start', pl: "5px", py: "5px" }}>
                <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, borderRadius: "50px" }}
                    image={icon}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1', display: 'flex', justifyContent: 'space-between' }}>
                    <Typography component="div" variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="green" component="div">
                        Online
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    // Scroll to the bottom of the container div
    const messageContainer = useRef(null);
    useEffect(() => {
        messageContainer.current &&
            (messageContainer.current.scrollTop = messageContainer.current.scrollHeight)
    }, [messages]);

    return (
        <div className=" w-full  h-full text-black flex ">
            <div className="md:w-1/4 flex-1 border-r border-r-gray-300">
                {chats && chats.map(chat => (
                    <div key={chat.id}>
                        <Item title={chat && (chat.sender.id == Token ?
                            (chat.receiver.username) : (chat.sender.username))}
                            id={chat.id}
                            icon={chat && (chat.sender.id == Token ?
                                (`${baseimageUrl}${chat.receiver.image}`) : (`${baseimageUrl}${chat.sender.image}`))}
                        />
                    </div>
                ))}
            </div>
            {currMessaging && (
                <div className="md:w-3/4 h-[100%]">
                    <div className="flex p-2 bg-[#c6c9eb] justify-between border-b-4">
                        {currMessagingName && <Typography fontSize={20} >{currMessagingName}</Typography>}
                    </div>
                    {messages ? (<div ref={messageContainer} className="h-[80%] border-b-2 pt-5 max-h-[80%] overflow-y-scroll">
                        {messages.map(message => (
                            message.sender == Token ? (
                                <div key={message.id} className="pb-5 ">
                                    <div className="pr-3 flex justify-end text-lg ">{message.content}</div>
                                    <div className="pr-3 flex justify-end text-sm ">{formatTimestamp(message.created_at)}</div>
                                </div>
                            ) : (
                                <div key={message.id} className="pb-5">
                                    <div className="pl-3 flex justify-start text-lg ">{message.content}</div>
                                    <div className="pl-3 flex justify-start text-sm ">{formatTimestamp(message.created_at)}</div>
                                </div>
                            )
                        ))}
                    </div>) : (
                        <div className="h-[80%] flex justify-center items-center">
                            Send Hi...
                        </div>
                    )}
                    <div className="p-3 md:p-0 h-[20%] w-full flex justify-center items-center">
                        <form id="messageform" action="" onSubmit={handleMsgSubmit} className="md:mx-8 w-full flex justify-between ">
                            <TextField sx={{ pr: "10px", width: "90%" }} multiline
                                focused
                                label="Type Something"
                                name="content"
                                rows={1}
                                fullWidth
                                variant="outlined"
                                onKeyUp={enterKeyCheck}
                            />
                            <Fab type="submit" color="primary" aria-label="add"><SendIcon /></Fab>
                        </form>
                    </div>
                </div>)}
        </div>
    )
}

export default ChatContainer;