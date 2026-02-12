// import React from 'react';
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../authThunks";
// import { useNavigate } from "react-router-dom";




// const LoginForm = () => {

//   const dispatch = useDispatch();
// const navigate = useNavigate();

// const { loading, error, isAuthenticated } = useSelector(state => state.auth);

// const [form, setForm] = useState({
//   email: "",
//   password: ""
// });


// const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]: e.target.value
//   });
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const res = await dispatch(loginUser(form));

//   if (res.meta.requestStatus === "fulfilled") {
//     navigate("/dashboard");
//   }
// };
//   return (
//     <div className="login-form w-100" style={{ maxWidth: '450px' }}>
//       <h2 className="mb-2 fw-bold text-center">Welcome to Weather App!</h2>
//       <p className="text-muted mb-4 text-center">Let's sign you in</p>

//       <form onSubmit={handleSubmit}>
//        <div className="mb-3">
//                 <input
//                   type="email"
//                   className="form-control form-control-lg"
//                   placeholder="Email"
//                   style={{
//                     borderRadius: '12px',
//                     padding: '15px 20px',
//                     border: '2px solid #e0e0e0'
//                   }}
//                    name="email"
//   onChange={handleChange}
//                 />
//               </div>

//               <div className="mb-2">
//                 <input
//                   type="password"
//                    name="password"
//   onChange={handleChange}
//                   className="form-control form-control-lg"
//                   placeholder="Password"
//                   style={{
//                     borderRadius: '12px',
//                     padding: '15px 20px',
//                     border: '2px solid #e0e0e0'
//                   }}
//                 />
//               </div>

//               <div className="text-center mb-4">
//                 <a href="#" className="text-decoration-none text-dark">Forgot password?</a>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-lg w-100 text-white fw-semibold mb-3"
//                 style={{
//                   backgroundColor: '#1e6b8f',
//                   borderRadius: '12px',
//                   padding: '15px',
//                   border: 'none'
//                 }}
//               >
//                 Login
//               </button>

//               <p className="text-center mb-3">
//                 Don't have an account? <a href="#" className="text-decoration-none" style={{ color: '#1e6b8f' }}>Sign up</a>
//               </p>

//               <div className="divider-container mb-3">
//                 <div className="divider-line"></div>
//                 <span className="divider-text">OR</span>
//                 <div className="divider-line"></div>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-lg w-100 btn-outline-secondary d-flex align-items-center justify-content-center"
//                 style={{
//                   borderRadius: '12px',
//                   padding: '15px',
//                   border: '2px solid #e0e0e0'
//                 }}
//               >
//                 <svg width="20" height="20" viewBox="0 0 20 20" className="me-2">
//                   <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
//                   <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
//                   <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
//                   <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
//                 </svg>
//                 <span style={{ color: '#1e6b8f' }}>Login with Google</span>
//               </button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../validations/loginValidation";
import { loginUser } from "../authThunks";
// import GoogleButton from "./GoogleButton";
import AuthLoader from "../../../components/Loader";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-form w-100" style={{ maxWidth: "450px" }}>
      <h2 className="mb-2 fw-bold text-center">
        Welcome to Weather App!
      </h2>
      <p className="text-muted mb-4 text-center">
        Let’s sign you in
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validateLogin}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={async (values) => {
          const res = await dispatch(loginUser(values));
          if (res.meta.requestStatus === "fulfilled") {
            navigate("/dashboard");
          }
        }}
      >
        {({ touched, errors }) => (
          <Form noValidate>

            {/* Email */}
            <div className="mb-3">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control form-control-lg ${touched.email && errors.email ? "is-invalid" : ""
                  }`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback"
              />
            </div>

            {/* Password */}
            <div className="mb-3 position-relative">
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className={`form-control form-control-lg pe-5 ${touched.password && errors.password ? "is-invalid" : ""
                  }`}
              />

              <button
                type="button"
                className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>

              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </div>


            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            {loading ? (
              <AuthLoader />
            ) : (
              <button
                type="submit"
                className="btn btn-lg w-100 text-white fw-semibold mb-3"
                style={{
                  backgroundColor: "#1e6b8f",
                  borderRadius: "12px",
                  padding: "15px",
                }}
              >
                Login
              </button>
            )}

            <div className="divider-container mb-3">
              <div className="divider-line"></div>
              <span className="divider-text">OR</span>
              <div className="divider-line"></div>
            </div>

             {/* <button
                type="button"
                className="btn btn-lg w-100 btn-outline-secondary d-flex align-items-center justify-content-center"
                style={{
                  borderRadius: '12px',
                  padding: '15px',
                  border: '2px solid #e0e0e0'
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" className="me-2">
                  <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
                  <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
                  <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
                  <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
                </svg>
                <span style={{ color: '#1e6b8f' }}>Login with Google</span>
              </button> */}

              <button
  type="button"
  className="btn btn-lg w-100 btn-outline-secondary d-flex align-items-center justify-content-center"
  onClick={() =>
    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`)
  }
  style={{
    borderRadius: "12px",
    padding: "15px",
    border: "2px solid #e0e0e0",
  }}
>
  {/* Google SVG */}
  <span style={{ color: "#1e6b8f" }}>Login with Google</span>
</button>

            {/* <GoogleButton /> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

