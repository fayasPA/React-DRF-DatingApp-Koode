import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import { TextField, useMediaQuery } from "@mui/material"
import { addImage1, profileDetails, getUser, baseimageUrl } from "../../Constants/Constants"
import axios from "../../axios";
import { useEffect, useState } from "react";

export default function ImageSection() {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const Token = localStorage.getItem('user_id')
  const [images, setImages] = useState([])
  const [imageNo, setImageNo] = useState([0, 1, 2, 3])
  useEffect(() => {
    // user details
    axios.get(`${getUser}${Token}`).then((response) => {
      setImages((prevImages) => [...prevImages, response.data.image])
    })
  }, [])
  useEffect(() => {
    // User Profile details
    axios.get(`${profileDetails}${Token}`).then((response) => {
      if (response.data.image1) {
        setImages((prevImages) => [...prevImages, response.data.image1])
      }
      if (response.data.image2) {
        setImages((prevImages) => [...prevImages, response.data.image2])
      }
      if (response.data.image3) {
        setImages((prevImages) => [...prevImages, response.data.image3])
      }
    })
  }, [])

  const imageChange = (event) => {
    imageSubmit(event)
  };
  const imageSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.files[0], "IMAGE");
    const formData = new FormData();
    formData.append("image1", e.target.files[0]);
    axios
      .post(`${addImage1}${Token}`, formData)
      .catch((error) => {
        console.error(error);
      });
  };
  const alternateInput = () => {
    return (
      <div className='h-full flex justify-center place-items-center'>
        <form >
          <TextField onChange={imageChange} id="outlined-basic" type="file" />
        </form>
      </div>
    )
  }
  return (
    <div className='flex justify-center pb-10'>
      <ImageList sx={isSmallScreen ? { width: 300, height: 300, borderTopLeftRadius: 100 } : { width: 400, height: 300, borderTopLeftRadius: 100 }} cols={isSmallScreen ? 1 : 2} rowHeight={300}>
        {imageNo?.map((item, index) => (
          <ImageListItem key={index}>
            {images[item] ? <img className=''
              src={`${baseimageUrl}${images[item]}`}
              alt="profile images"
              loading="lazy"
            /> : (alternateInput(item))}
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: '',
    title: 'Coffee',
  },
];





