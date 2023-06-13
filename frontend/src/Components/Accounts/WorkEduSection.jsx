import { Box, Button, TextField } from "@mui/material"
import { editWorkEdu, profileDetails } from "../../Constants/Constants"
import axios from "../../axios";
import { useEffect, useState } from "react";

const WorkEduSection = (props) => {
  const Token = localStorage.getItem('user_id')
  useEffect(() => {
    axios.get(`${profileDetails}${Token}`).then((response) => {
      setWorkEduData(prevState => ({
        ...prevState,
        "job": response.data.job,
        "education": response.data.education
      }));
    })
  }, [])

  const [workEduData, setWorkEduData] = useState({
    job: '',
    education: ''
  });
  const workEduChange = (e) => {
    const { name, value } = e.target;
    setWorkEduData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const workEduSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${editWorkEdu}${Token}`, workEduData)
      .then((response) => {
        console.log(response)
      })
  };

  return (
    <div>
      <form onSubmit={workEduSubmit}>
        <TextField
          fullWidth
          label="Tell Us About Your Education"
          onChange={workEduChange}
          name="education"
          value={workEduData.education}
          sx={{
            m: "0px 20px 10px 10px ", boxShadow: 5
          }}
        />
        <TextField
          fullWidth
          label="Tell Us About Your Job"
          onChange={workEduChange}
          name="job"
          value={workEduData.job}
          sx={{
            m: "10px 10px 10px 10px ", boxShadow: 5
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

export default WorkEduSection