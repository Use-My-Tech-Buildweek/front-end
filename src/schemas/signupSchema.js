import * as yup from 'yup'

const signupSchema = yup.object().shape({
    username: yup.string().required(),
    role: yup.number().required().positive().integer(),
    email: yup.string().email(),
    password: yup.string().url(),
    passwordConfirmation: yup.date().default(function () {
      return new Date();
    }),
    aboutMe: yup.string(),
    profilePicture: mixed().test("fileSize", "The file is too large", (value) => {
        console.log("value is ", value)
        if (!value.length) return true // attachment is optional
        return value[0].size <= 2000000
      }),


  });

export default signupSchema

