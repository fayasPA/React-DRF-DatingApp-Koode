import * as yup from "yup";

const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] };

export const schema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    username: yup.string().required(),
    gender: yup.string().required(),
    email: yup.string().email().required(),
    age: yup.number().positive().required(),
    interest: yup.string().required(),
    password: yup.string().min(3).max(10),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
    image: yup
      .mixed()
      .required("Required")
})