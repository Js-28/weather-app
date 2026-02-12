import React from 'react';

const WeatherCard = ({ type, children }) => {
  return (
    <div className={`col-6 weather-card ${type}-card`}>
      <div className="weather-circle">
        <div className="phone-illustration">
          <div className="phone-screen">
            {children} {/* SVG icon goes here */}
          </div>
        </div>
      </div>
      <h3 className="weather-label">{type.toUpperCase()}</h3>
    </div>
  );
};

export default WeatherCard;
