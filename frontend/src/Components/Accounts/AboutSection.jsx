import { Box, Button, TextField } from "@mui/material"
import { editAbout, profileDetails } from "../../Constants/Constants"
import axios from "../../axios";
import { useEffect, useState } from "react";

const AboutSection = (props) => {
  const Token = localStorage.getItem('user_id')
  useEffect(() => {
    axios.get(`${profileDetails}${Token}`).then((response) => {
      console.log(response, "-----")
      setAboutData(prevState => ({
        ...prevState,
        "about": response.data.about
      }));
    })
  }, [])

  const [aboutData, setAboutData] = useState({
    about: '',
    // password: ''
  });
  const aboutChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const aboutSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${editAbout}${Token}`, aboutData)
      .then((response) => {
      })
  };

  return (
    <div>
      <form onSubmit={aboutSubmit}>
        <TextField
          label="Tell us about yourself"
          fullWidth
          multiline
          rows={3}
          onChange={aboutChange}
          name="about"
          value={aboutData.about}
          sx={{
            m: "0px 20px 10px 10px ", boxShadow: 10
            // borderRadius: 5,
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

export default AboutSection