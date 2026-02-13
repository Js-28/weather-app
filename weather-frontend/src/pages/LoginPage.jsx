import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from '../features/auth/components/LoginForm';
import WeatherCard from '../components/WeatherCard';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const LoginPage = () => {

  // const { isAuthenticated } = useSelector(state => state.auth);

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-lg-5 col-md-6 col-12 d-flex align-items-center justify-content-center bg-white p-5">
          <LoginForm />
        </div>

        <div className="col-lg-7 col-md-6 col-12 p-0">
          <div className="row g-0 h-100">
            <WeatherCard type="snow">
              {/* SVG icon for snow */}
            </WeatherCard>
            <WeatherCard type="rain">
              {/* SVG icon for rain */}
            </WeatherCard>
            <WeatherCard type="storm">
              {/* SVG icon for storm */}
            </WeatherCard>
            <WeatherCard type="sunny">
              {/* SVG icon for sunny */}
            </WeatherCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
