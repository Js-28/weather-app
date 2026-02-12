// export const validateLogin = (values) => {
//   const errors = {};

//   const emailRegex =
//     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//   if (!values.email.trim()) {
//     errors.email = "Email is required";
//   } else if (!emailRegex.test(values.email)) {
//     errors.email = "Invalid email format";
//   }

//   if (!values.password) {
//     errors.password = "Password is required";
//   } else if (values.password.length < 8) {
//     errors.password = "Password must be at least 8 characters";
//   }

//   return errors;
// };


import * as Yup from "yup";

export const validateLogin = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});
