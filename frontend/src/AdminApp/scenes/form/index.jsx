import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editUsers, getUser } from "../../Constants/Constants";
import axios from "../../axios";
import Swal from "sweetalert2"

const ageRegExp =
    /^\S[0-9]{1,3}$/;
const userSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string(),
    email: yup.string().email("invalid email").required("required"),
    age: yup.string().matches(ageRegExp, "Age is not valid").required("required"),
    username: yup.string().required("required"),
}
)

const Form = () => {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        username: ""
    });

    const params = useParams();
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        const body = values
        axios.post(`${editUsers}${params.id}`, body).then((res) => {
            Swal.fire({
                position: "center",
                type: "success",
                title: `Successfully Edited ${values.username}`,
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/admin/team')
        })
    }
    useEffect(() => {
        axios.get(`${getUser}${params.id}`).then((res) => {
            setInitialValues({
                firstName: res.data.first_name,
                lastName: res.data.last_name,
                email: res.data.email,
                age: res.data.age,
                username: res.data.username,
            });
        })
    }, [])
    return (
        <Box m="20px">
            <Header title="EDIT USER" subtitle="Edit the user profile" />
            {initialValues.username && <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
            >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="age Number"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.age}
                                name="age"
                                error={!!touched.age && !!errors.age}
                                helperText={touched.age && errors.age}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.username}
                                name="username"
                                error={!!touched.username && !!errors.username}
                                helperText={touched.username && errors.username}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display='flex' justifyContent="end" mt="20px">
                            <Button type="Submit" color="secondary" variant="contained">
                                Edit User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>}
        </Box>
    )
}

export default Form
