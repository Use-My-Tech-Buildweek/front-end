import * as yup from 'yup'

const signupSchema = yup.object().shape({
    username: yup.string().required('username is required').min(3, "username must be at least 3 characters long"),
    department: yup
        .string()
        .required()
        .oneOf(['renter', 'owner'], "You must select a role"),
    // email: yup
    //     .string()
    //     .email('enter a valid email'),
    password: yup
        .string()
        .required('Password is required')
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirmPassword: yup
        .string()
        .required('You must confirm your password')
        .oneOf([yup.ref('password'), null], 'password must match'),
    // bio: yup
    //     .string()
    //     .max(500, "limited to 500 characters"),
    // profileImg: yup
    //     .mixed()
    //     .test("fileSize", "The file is too large", 
    //     (value) => {
    //         console.log("value is ", value)
    //         if (!value.length) return true // attachment is optional
    //         return value[0].size <= 2000000
    //         }
    //     )
  });

export default signupSchema

