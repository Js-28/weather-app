import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../features/auth/components/LoginForm';
import WeatherCard from '../components/WeatherCard';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import bgImg from "../assets/login_bg.png";


const LoginPage = () => {

  // const { isAuthenticated } = useSelector(state => state.auth);

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100 d-flex">
        <div className="col-lg-6 col-md-5 col-12 order-2 order-md-1 d-flex align-items-center justify-content-center p-5 small-bg-image">
          <LoginForm />
        </div>

        <div className="col-lg-6 col-md-7 col-12 px-0 order-1 order-md-2 d-none d-sm-block">
          <div className="row g-0 h-100">
            <img src={bgImg} alt='Background image' />
            {/* <div
              className="login-page"
              style={{ backgroundImage: `url(${bgImg})` }}
            >
            </div> */}
            {/* <WeatherCard type="snow">
              SVG icon for snow
            </WeatherCard>
            <WeatherCard type="rain">
              SVG icon for rain
            </WeatherCard>
            <WeatherCard type="storm">
              SVG icon for storm
            </WeatherCard>
            <WeatherCard type="sunny">
              SVG icon for sunny
            </WeatherCard> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
