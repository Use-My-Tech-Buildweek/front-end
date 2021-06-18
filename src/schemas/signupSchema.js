import * as yup from 'yup'

const signupSchema = yup.object().shape({
    username: yup.string().required(),
    role: yup
        .string()
        .required()
        .oneOf(['Renter', 'Client'], "You must select a role"),
    email: yup
        .string()
        .email('enter a valid email'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'password must be at least 6 characters long'),
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    aboutMe: yup
        .string()
        .max(500, "limited to 500 characters"),
    profilePicture: yup
        .mixed()
        .test("fileSize", "The file is too large", 
        (value) => {
            console.log("value is ", value)
            if (!value.length) return true // attachment is optional
            return value[0].size <= 2000000
            }
        )
  });

export default signupSchema

