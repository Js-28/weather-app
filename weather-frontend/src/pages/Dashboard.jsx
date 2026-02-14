// import { useState } from 'react';
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../features/auth/authThunks";
// import '../styles/global.css';
// import '../styles/WeatherApp.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import WeatherIcon from '../components/DashboardComponents/WeatherIcon';
// import { cities, weatherData, hourlyForecast } from '../data/weatherData';
// import { useEffect } from "react";


// export default function Dashboard({ onLogout }) {
//   const [selectedCity, setSelectedCity] = useState('London');
//   const currentWeather = weatherData[selectedCity];

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // ✅ Logout handler
//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate("/", { replace: true });// redirect to login page after logout
//     window.location.replace("/");
//   };


  

//   return (
//     <div className="home-page-container">
//       <Navbar onLogout={handleLogout} />

//       <main className="home-page-content">
//         <div className="container-lg py-5">
//           {/* Current Weather */}
//           <section className="current-weather-section mb-5">
//             <h2 className="section-title mb-4">Current Weather</h2>
//             <div className="row g-4">
//               <div className="col-lg-6 col-md-12">
//                 <select className="form-select form-select-lg city-select mb-3" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
//                   {cities.map(city => <option key={city} value={city}>{city}</option>)}
//                 </select>
//                 <div className="weather-card-large">
//                   <h3 className="weather-location-name">{selectedCity}</h3>
//                   <div className="d-flex justify-content-between align-items-start">
//                     <div>
//                       <div className="weather-temp">{currentWeather.temp}°C</div>
//                       <p className="weather-condition">{currentWeather.condition}</p>
//                     </div>
//                     <div className="weather-icon-large"><WeatherIcon icon={currentWeather.icon} size={48} /></div>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-6 col-md-12">
//                 <div className="weather-details-card">
//                   <div className="details-header d-flex justify-content-between align-items-center">
//                     <h4>Monday</h4>
//                     <span>13/02/26</span>
//                   </div>
//                   <div className="details-body">
//                     <div className="row mb-3">
//                       <div className="col-6 mb-3">
//                         <div className="detail-item">
//                           <div className="detail-icon">💧</div>
//                           <span>Humidity: {currentWeather.humidity}%</span>
//                         </div>
//                       </div>
//                       <div className="col-6 mb-3">
//                         <div className="detail-item">
//                           <div className="detail-icon">☔</div>
//                           <span>Precipitation: {currentWeather.precipitation}%</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="row mb-4">
//                       <div className="col-6">
//                         <div className="detail-item">
//                           <div className="detail-icon">💨</div>
//                           <span>Wind: {currentWeather.wind} km/h</span>
//                         </div>
//                       </div>
//                     </div>
//                     <hr/>
//                     <div className="d-flex justify-content-between">
//                       <div className="text-center">
//                         <p className="text-muted mb-1">High</p>
//                         <p className="fw-bold">{currentWeather.high}°C</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-muted mb-1">Low</p>
//                         <p className="fw-bold">{currentWeather.low}°C</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Hourly Forecast */}
//           <section className="hourly-forecast-section">
//             <h2 className="section-title mb-4">Hourly Weather Forecast</h2>
//             <div className="forecast-card overflow-auto">
//               <div className="d-flex gap-3 min-w-max">
//                 {hourlyForecast.map((hour, idx) => (
//                   <div key={idx} className="text-center forecast-hour">
//                     <div className="weather-icon-hour"><WeatherIcon icon={hour.icon} size={32} /></div>
//                     <p className="mb-1 fw-bold">{hour.temp}°C</p>
//                     <p className="mb-0 text-white-75">{hour.time}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentWeather, fetchHourlyForecast } from "../features/auth/weatherSlice";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import WeatherIcon from "../components/DashboardComponents/WeatherIcon";
// import { cities } from "../data/weatherData";
// import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../features/auth/authThunks";

// export default function Dashboard() {
//   const [selectedCity, setSelectedCity] = useState("London");
//   const dispatch = useDispatch();
//   const { current, hourly, loading } = useSelector((state) => state.weather);

//   useEffect(() => {
//     if (selectedCity) {
//       dispatch(fetchCurrentWeather({ city: selectedCity }));
//       dispatch(fetchHourlyForecast({ city: selectedCity }));
//     }
//   }, [dispatch, selectedCity]);




//   const navigate = useNavigate();

//   // ✅ Logout handler
//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate("/", { replace: true });// redirect to login page after logout
//     window.location.replace("/");
//   };

//   return (
//     <div className="home-page-container">
//       <Navbar  onLogout={handleLogout}/>
//       <main className="home-page-content">
//         <div className="container-lg py-5">
//           <section className="current-weather-section mb-5">
//             <h2 className="section-title mb-4">Current Weather</h2>
//             {loading || !current ? (
//               <div>Loading weather...</div>
//             ) : (
//               <div className="row g-4">
//                 <div className="col-lg-6 col-md-12">
//                   <select
//                     className="form-select form-select-lg city-select mb-3"
//                     value={selectedCity}
//                     onChange={(e) => setSelectedCity(e.target.value)}
//                   >
//                     {cities.map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>

//                   <div className="weather-card-large">
//                     <h3 className="weather-location-name">{selectedCity}</h3>
//                     <div className="d-flex justify-content-between align-items-start">
//                       <div>
//                         <div className="weather-temp">{Math.round(current.main.temp)}°C</div>
//                         <p className="weather-condition">{current.weather[0].description}</p>
//                       </div>
//                       <div className="weather-icon-large">
//                         <WeatherIcon icon={current.weather[0].icon} size={48} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-6 col-md-12">
//                   <div className="weather-details-card">
                  //   <div className="details-header d-flex justify-content-between align-items-center">
                  //     <h4>Monday</h4>
                  //     <span>13/02/26</span>
                  //   </div>
                  //   <div className="details-body">
                  //     <div className="row mb-3">
                  //       <div className="col-6 mb-3">
                  //         <div className="detail-item">
                  //           <div className="detail-icon">💧</div>
                  //           <span>Humidity: {current.main.humidity}%</span>
                  //         </div>
                  //       </div>
                  //       <div className="col-6 mb-3">
                  //         <div className="detail-item">
                  //           <div className="detail-icon">💨</div>
                  //           <span>Wind: {current.wind.speed} m/s</span>
                  //         </div>
                  //       </div>
                  //     </div>
                  //     <hr />
                  //     <div className="d-flex justify-content-between">
                  //       <div className="text-center">
                  //         <p className="text-muted mb-1">High</p>
                  //         <p className="fw-bold">{Math.round(current.main.temp_max)}°C</p>
                  //       </div>
                  //       <div className="text-center">
                  //         <p className="text-muted mb-1">Low</p>
                  //         <p className="fw-bold">{Math.round(current.main.temp_min)}°C</p>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
//                 </div>
//               </div>
//             )}
//           </section>

//           <section className="hourly-forecast-section">
//             <h2 className="section-title mb-4">Hourly Forecast</h2>
//             {loading || !hourly.length ? (
//               <div>Loading hourly forecast...</div>
//             ) : (
//               <div className="forecast-card overflow-auto">
//                 <div className="d-flex gap-3 min-w-max">
//                   {hourly.slice(0, 12).map((hour, idx) => (
//                     <div key={idx} className="text-center forecast-hour">
//                       <div className="weather-icon-hour">
//                         <WeatherIcon icon={hour.weather[0].icon} size={32} />
//                       </div>
//                       <p className="mb-1 fw-bold">{Math.round(hour.main.temp)}°C</p>
//                       <p className="mb-0 text-white-75">{new Date(hour.dt * 1000).getHours()}:00</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather, fetchHourlyForecast, resetWeather } from "../features/weather/weatherSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeatherIcon from "../components/DashboardComponents/WeatherIcon";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authThunks";
import { fetchCities } from "../features/city/citiesSlice"; 

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [geoCoords, setGeoCoords] = useState(null);
  const [geoDenied, setGeoDenied] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { current, hourly, loading, error } = useSelector((state) => state.weather);

  const { list: cities, loading: citiesLoading } = useSelector(state => state.cities);

// Load top 5 cities on mount
useEffect(() => {
  dispatch(fetchCities());
}, [dispatch]);

// Search cities when typing (debounced)
useEffect(() => {
  const delay = setTimeout(() => {
    dispatch(fetchCities(cityInput));
  }, 300);

  return () => clearTimeout(delay);
}, [cityInput, dispatch]);

  // --- Geolocation on mount ---
  useEffect(() => {
    if (!selectedCity && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          if (latitude != null && longitude != null) {
            setGeoCoords({ lat: latitude, lon: longitude });
            dispatch(fetchCurrentWeather({ lat: Number(latitude), lon: Number(longitude) }));
            dispatch(fetchHourlyForecast({ lat: Number(latitude), lon: Number(longitude) }));
          } else {
            setGeoDenied(true);
          }
        },
        () => setGeoDenied(true)
      );
    } else if (!navigator.geolocation) {
      setGeoDenied(true);
    }
  }, [dispatch, selectedCity]);

  // --- City selection overrides geolocation ---
  // useEffect(() => {
  //   if (selectedCity) {
  //     setGeoCoords(null);
  //     dispatch(fetchCurrentWeather({ city: selectedCity }));
  //     dispatch(fetchHourlyForecast({ city: selectedCity }));
  //   } else {
  //     // ✅ If user selects the default empty option, reset everything
  //     setGeoCoords(null);
  //     dispatch(resetWeather());
  //   }
  // }, [dispatch, selectedCity]);


  useEffect(() => {
  if (selectedCity) {
    setGeoCoords(null);
    dispatch(fetchCurrentWeather({
      lat: selectedCity.lat,
      lon: selectedCity.lon
    }));
    dispatch(fetchHourlyForecast({
      lat: selectedCity.lat,
      lon: selectedCity.lon
    }));
  } else {
    setGeoCoords(null);
    dispatch(resetWeather());
  }
}, [dispatch, selectedCity]);


  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/", { replace: true });
    window.location.replace("/");
  };

  // const getDayAndDate = () => {
  //   if (!current) return { day: "", date: "" };
  //   const timestamp = current.dt ? current.dt * 1000 : Date.now();
  //   const dateObj = new Date(timestamp);
  //   const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  //   const date = dateObj.toLocaleDateString("en-GB");
  //   return { day, date };
  // };

  const getDayAndDate = () => {
  if (!current) return { day: "", date: "" };

  // current.timezone is in seconds
  const localTime = new Date((current.dt + current.timezone) * 1000);
  const day = localTime.toLocaleDateString("en-US", { weekday: "long" });
  const date = localTime.toLocaleDateString("en-GB");
  return { day, date };
};

  const { day, date } = getDayAndDate();

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".city-select")) {
      setShowSuggestions(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);




  return (
    <div className="home-page-container">
      <Navbar onLogout={handleLogout} />
      <main className="home-page-content">
        <div className="container-lg py-5">
          <section className="current-weather-section mb-5">
            <h2 className="section-title mb-4">Current Weather</h2>

            {geoDenied && !selectedCity && (
              <div className="alert alert-warning">
                Location access denied. Please select a city.
              </div>
            )}

            {/* City selector */}
            {/* <select
              className="form-select form-select-lg city-select mb-3"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select> */}
            
{/* Autocomplete City Search */}
<div className="position-relative mb-3">

  <input
    type="text"
    className="form-control form-control-lg city-select"
    placeholder="Search city..."
    value={cityInput}
    onChange={(e) => {
      setCityInput(e.target.value);
      setShowSuggestions(true);
    }}
    onFocus={() => setShowSuggestions(true)}
  />

  {showSuggestions && cityInput && (
    <div className="list-group position-absolute w-100 shadow"
         style={{ zIndex: 1000, maxHeight: "250px", overflowY: "auto" }}>
      
      {citiesLoading && (
        <div className="list-group-item">Loading...</div>
      )}

      {!citiesLoading && cities.length === 0 && (
        <div className="list-group-item text-muted">
          No cities found
        </div>
      )}

      {!citiesLoading &&
        // cities.map((city) => (
        //   <button
        //     type="button"
        //     key={city}
        //     className="list-group-item list-group-item-action"
        //     onClick={() => {
        //       setCityInput(city);
        //       setSelectedCity(city);
        //       setShowSuggestions(false);
        //     }}
        //   >
        //     {city}
        //   </button>
        // ))
        cities.map((city, index) => (
  <button
    key={index}
    type="button"
    className="list-group-item list-group-item-action"
    onClick={() => {
      setCityInput(`${city.name}, ${city.country}`);
      setSelectedCity(city);
      setShowSuggestions(false);
    }}
  >
    {city.name}{city.state ? `, ${city.state}` : ""}, {city.country}
  </button>
))}
        
    </div>
  )}
</div>



            {error && <div className="alert alert-danger">{error}</div>}
            {!error && loading && <div>Loading weather...</div>}

            {!error && !loading && current && (
              <div className="row g-4">
                {/* Current weather card */}
                <div className="col-lg-6 col-md-12">
                  <div className="weather-card-large">
                    <h3 className="weather-location-name">{current.name}</h3>
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <div className="weather-temp">{Math.round(current.main.temp)}°C</div>
                        <p className="weather-condition">{current.weather[0].description}</p>
                      </div>
                      <div className="weather-icon-large">
                        <WeatherIcon icon={current.weather[0].icon} size={48} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="weather-details-card">
                    <div className="details-header d-flex justify-content-between align-items-center">
                      <h4>{day}</h4>
                      <span>{date}</span>
                    </div>
                    <div className="details-body">
                      <div className="row mb-3">
                        <div className="col-6 mb-3">
                          <div className="detail-item">
                            <div className="detail-icon">💧</div>
                            <span>Humidity: {current.main.humidity}%</span>
                          </div>
                        </div>
                        <div className="col-6 mb-3">
                          <div className="detail-item">
                            <div className="detail-icon">💨</div>
                            <span>Wind: {current.wind.speed} m/s</span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <div className="text-center">
                          <p className="text-muted mb-1">High</p>
                          <p className="fw-bold">{Math.round(current.main.temp_max)}°C</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted mb-1">Low</p>
                          <p className="fw-bold">{Math.round(current.main.temp_min)}°C</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Hourly forecast */}
          <section className="hourly-forecast-section">
            {!error && !loading && hourly.length > 0 && (
              <div>
                <h2 className="section-title mb-4">Hourly Forecast</h2>
                <div className="forecast-card overflow-auto">
                  <div className="d-flex gap-3 min-w-max">
                    {hourly.slice(0, 12).map((hour, idx) => (
                      <div key={idx} className="text-center forecast-hour">
                        <div className="weather-icon-hour">
                          <WeatherIcon icon={hour.weather[0].icon} size={32} />
                        </div>
                        <p className="mb-1 fw-bold">{Math.round(hour.main.temp)}°C</p>
                        <p className="mb-0 text-white-75">
                          {/* {new Date(hour.dt * 1000).getHours()}:00 */}
                          {new Date((hour.dt + current.timezone) * 1000).getUTCHours()}:00
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
