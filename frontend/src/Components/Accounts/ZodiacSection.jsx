import { Box, Button, TextField } from "@mui/material"
import { editZodiac, profileDetails } from "../../Constants/Constants"
import axios from "../../axios";
import { useEffect, useState } from "react";

const ZodiacSection = (props) => {
  const Token = localStorage.getItem('user_id')
  useEffect(() => {
    axios.get(`${profileDetails}${Token}`).then((response) => {
      console.log(response, "-----")
      setZodiacData(prevState => ({
        ...prevState,
        "zodiac": response.data.zodiac
      }));
    })
  }, [])

  const [zodiacData, setZodiacData] = useState({
    zodiac: '',
  });
  const zodiacChange = (e) => {
    const { name, value } = e.target;
    setZodiacData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const zodiacSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${editZodiac}${Token}`, zodiacData)
      .then((response) => {
      })
  };

  return (
    <div>
      <form onSubmit={zodiacSubmit}>
        <TextField
          label="Tell us your zodiac sign"
          fullWidth
          onChange={zodiacChange}
          name="zodiac"
          value={zodiacData.zodiac}
          sx={{
            m: "0px 20px 10px 10px ", boxShadow: 10
          }}
        />
        <Box display="flex" justifyContent="space-evenly">
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={props.handleChange}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default ZodiacSection