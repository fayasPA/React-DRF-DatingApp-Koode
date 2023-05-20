import Header from "../Header/Header";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import axios from "../../axios";
import { baseimageUrl, getMatches } from "../../Constants/Constants";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Matches() {
    const Token = localStorage.getItem('user_id')
    const [matches, setMatches] = useState([])
    const getUserMatches = () => {
        axios.get(`${getMatches}${Token}`).then((response) => {
            console.log(response.data,);
            setMatches(response.data)
        })
    }
    useEffect(() => {
        getUserMatches()
    }, [])

    return (
        <div className="">
            <div className="w-100 h-20 flex justify-center items-center border-b-4">
                <Header title="Matches" subtitle="" />
            </div>
            <div className="h-full pb-20">
                <ImageList sx={{ width: '50%', maxHeight: '100%' }}>
                    {matches.map((match) => (
                        <ImageListItem key={match.id}>
                            <img
                                src={`${baseimageUrl}${match.user2.image}`}
                                alt="user2 image"
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title={match.user2.username}
                                subtitle={match.age}
                                actionIcon={
                                    <Link to='/messages'>
                                        <IconButton
                                            sx={{ color: 'white', background: 'black', mr: '5px' }}
                                            aria-label={` ${match.user2.username}`}
                                        >
                                            <SmsIcon />
                                        </IconButton>
                                    </Link>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>


        </div>
    )
}
export default Matches;