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
import { initSocket, subscribeCity, unsubscribeCity, onNewNotification } from "../utils/socket";
import { addNotification, setSubscribedCity, clearNotifications, removeNotification } from "../features/notification/notificationSlice";
import { FaDroplet, FaWind } from "react-icons/fa6";

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [geoCoords, setGeoCoords] = useState(null);
  const [geoDenied, setGeoDenied] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [weatherCity, setWeatherCity] = useState(null);
const [hydrated, setHydrated] = useState(false);

const { current, hourly, loading, error } = useSelector((state) => state.weather);

const { list: cities, loading: citiesLoading } = useSelector(state => state.cities);
// const { city: subscribedCity } = useSelector(state => state.notifications);

const { list: notifications, city: subscribedCity } = useSelector(
  (state) => state.notifications || { list: [], city: null }
);


const { id: userId } = useSelector(state => state.auth.user || {});



const [socket, setSocket] = useState(null);

useEffect(() => {
  if (!userId) return;

  const token = document.cookie
    .split("; ")
    .find(row => row.startsWith("token="))
    ?.split("=")[1];

  const s = initSocket(token);
  setSocket(s);

  s.on("newNotification", (data) => {
    dispatch(addNotification(data));
    dispatch(setSubscribedCity(data.city)); // <- KEY FIX

    if (Notification.permission === "granted") {
      new Notification(`Weather Update: ${data.city}`, {
        body: data.message
      });
    }
  });

  return () => {
    s.disconnect();
  };
}, [userId, dispatch]);


// useEffect(() => {
//   if (!socket || !selectedCity) return;

//   subscribeCity(selectedCity.name); // don't send userId, backend already knows
//   dispatch(setSubscribedCity(selectedCity.name));

//   return () => {
//     unsubscribeCity(); // backend handles via socket auth
//   };
// }, [selectedCity, socket]);



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
  // useEffect(() => {
  //   if (!selectedCity && navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (pos) => {
  //         const { latitude, longitude } = pos.coords;
  //         if (latitude != null && longitude != null) {
  //           setGeoCoords({ lat: latitude, lon: longitude });
  //           dispatch(fetchCurrentWeather({ lat: Number(latitude), lon: Number(longitude) }));
  //           dispatch(fetchHourlyForecast({ lat: Number(latitude), lon: Number(longitude) }));
  //         } else {
  //           setGeoDenied(true);
  //         }
  //       },
  //       () => setGeoDenied(true)
  //     );
  //   } else if (!navigator.geolocation) {
  //     setGeoDenied(true);
  //   }
  // }, [dispatch, selectedCity]);


useEffect(() => {
  if (!hydrated) return;
  if (weatherCity) return;

  if (!navigator.geolocation) {
    setGeoDenied(true);
    return;
  }

//   navigator.geolocation.getCurrentPosition(
//     async (pos) => {
//       const { latitude, longitude } = pos.coords;

//       // get city name from weather api
//       const result = await dispatch(fetchCurrentWeather({ lat: latitude, lon: longitude }));
//       dispatch(fetchHourlyForecast({ lat: latitude, lon: longitude }));

//       const cityName = result.payload?.name;

//       if (cityName) {
//         setWeatherCity(cityName);
//         dispatch(setSubscribedCity(cityName));

//         // save DB
//         await fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({
//   city: city.name,
//   lat: city.lat,
//   lon: city.lon
// }),
//         });

//         if (socket) subscribeCity(cityName);
//       }
//     },
//     () => setGeoDenied(true)
//   );

navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const { latitude, longitude } = pos.coords;

    // Load weather
    const result = await dispatch(fetchCurrentWeather({
      lat: latitude,
      lon: longitude
    }));

    dispatch(fetchHourlyForecast({
      lat: latitude,
      lon: longitude
    }));

    const detectedCity = result.payload?.name;

    if (detectedCity) {
      dispatch(setSubscribedCity(detectedCity));

      // save coordinates to DB
      await fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: detectedCity,
          lat: latitude,
          lon: longitude
        }),
      });

      if (socket) subscribeCity(detectedCity);
    }
  },
  () => setGeoDenied(true)
);

}, [hydrated, weatherCity, socket]);

// useEffect(() => {
//   if (!weatherCity) return;

//   dispatch(fetchCurrentWeather({ city: weatherCity }));
//   dispatch(fetchHourlyForecast({ city: weatherCity }));
// }, [weatherCity]);


//   useEffect(() => {
//   if (selectedCity) {
//     setGeoCoords(null);
//     dispatch(fetchCurrentWeather({
//       lat: selectedCity.lat,
//       lon: selectedCity.lon
//     }));
//     dispatch(fetchHourlyForecast({
//       lat: selectedCity.lat,
//       lon: selectedCity.lon
//     }));
//   } else {
//     setGeoCoords(null);
//     dispatch(resetWeather());
//   }
// }, [dispatch, selectedCity]);


  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/", { replace: true });
    window.location.replace("/");
  };

  const getDayAndDate = () => {
  // if (!current) return { day: "", date: "" };
  if (!current || current.timezone == null) 
  return { day: "", date: "" };

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


useEffect(() => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}, []);


// useEffect(() => {
//   const fetchSubscribedCity = async () => {
//     if (!userId) return;

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/me`, {
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (data.subscribedCity) {
//         setSelectedCity({ name: data.subscribedCity });
//         dispatch(setSubscribedCity(data.subscribedCity));

//         // Emit socket join
//         if (socket) subscribeCity(data.subscribedCity);
//       }
//     } catch (err) {
//       console.error("Failed to fetch subscribed city:", err);
//     }
//   };

//   fetchSubscribedCity();
// }, [userId, socket, dispatch]);


// useEffect(() => {
//   const restoreCity = async () => {
//     if (!userId) return;

//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/me`, {
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (data.subscribedCity) {
//         // show in bell
//         dispatch(setSubscribedCity(data.subscribedCity));

//         // show weather ALSO (only if nothing else chosen)
//         setWeatherCity(data.subscribedCity);

//         if (socket) subscribeCity(data.subscribedCity);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setHydrated(true);
//     }
//   };

//   restoreCity();
// }, [userId, socket, dispatch]);


useEffect(() => {
  const restoreCity = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/me`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.city && data.lat && data.lon) {

        dispatch(setSubscribedCity(data.city));

        dispatch(fetchCurrentWeather({
          lat: data.lat,
          lon: data.lon
        }));

        dispatch(fetchHourlyForecast({
          lat: data.lat,
          lon: data.lon
        }));

        // if (socket) subscribeCity(data.city);

      }

    } catch (err) {
      console.error(err);
    } finally {
      setHydrated(true);
    }
  };

  restoreCity();
}, [userId, dispatch]);


useEffect(() => {
  if (!socket || !subscribedCity) return;
  subscribeCity(subscribedCity);
}, [socket, subscribedCity]);


useEffect(() => {
  if (!current?.name) return;
  dispatch(setSubscribedCity(current.name));
}, [current, dispatch]);


// useEffect(() => {
//   if (geoCoords && socket) {
//     const cityName = current?.name; // assuming `current.name` is returned from weather API
//     if (cityName) {
//       dispatch(setSubscribedCity(cityName));
//       subscribeCity(cityName);

//       // Save to DB
//       fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
//         method: "POST",
//         credentials: "include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ city: cityName }),
//       }).catch(err => console.error(err));
//     }
//   }
// }, [geoCoords, current, socket, dispatch]);



  return (
    <div className="home-page-container">
      <Navbar onLogout={handleLogout} />
      <main className="home-page-content">
        <div className="container-lg py-5">
          <section className="current-weather-section mb-5">
            <h2 className="section-title mb-4">Current Weather</h2>

            {/* {geoDenied && !selectedCity && (
              <div className="alert alert-warning">
                Location access denied. Please select a city.
              </div>
            )} */}

            {hydrated && geoDenied && !weatherCity && (
  <div className="alert alert-warning">
    Location access denied. Please select a city.
  </div>
)}

             {/* Subscribed city display */}
  <div className="alert alert-info d-flex align-items-center gap-2">
    <i className="bi bi-bell-fill"></i>
    Subscribed city: <strong>{subscribedCity || "None"}</strong>
  </div>


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


onClick={async () => {
  setCityInput(`${city.name}, ${city.country}`);
  setShowSuggestions(false);

  // // weather changes immediately
  // setWeatherCity(city.name);

    // 1️⃣ LOAD WEATHER USING COORDINATES (REAL LOCATION)
  dispatch(fetchCurrentWeather({
    lat: city.lat,
    lon: city.lon
  }));

  dispatch(fetchHourlyForecast({
    lat: city.lat,
    lon: city.lon
  }));

  // subscription changes
  dispatch(setSubscribedCity(city.name));

  // save DB
  await fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
  city: city.name,
  lat: city.lat,
  lon: city.lon
})
  });

  if (socket) subscribeCity(city.name);
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
                  <div className="weather-card-large d-flex justify-content-between align-items-start">
                    <div>
                      <h3 className="weather-location-name">{current.name}</h3>
                      <div className="weather-temp">{Math.round(current.main.temp)}°C</div>
                      <p className="weather-condition">{current.weather[0].description}</p>
                    </div>
                    <div className="weather-icon-large">
                        <img src={`https://openweathermap.org/payload/api/media/file/${current.weather[0].icon}.png`} />
                      {/* <WeatherIcon icon={current.weather[0].icon} size={48} /> */}
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12">
                  <div className="weather-details-card">
                    <div className="details-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{day}</h5>
                      <h5 className="mb-0">{date}</h5>
                    </div>
                    <div className="details-body">
                      <div className="row mb-3">
                        <div className="col-6">
                          <div className="detail-item mb-0">
                            <div className="detail-icon"><FaDroplet size={18}/></div>
                            <span>Humidity: {current.main.humidity}%</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="detail-item mb-0">
                            <div className="detail-icon"><FaWind size={18}/></div>
                            <span>Wind: {current.wind.speed} m/s</span>
                          </div>
                        </div>
                      </div>
                      <hr className="my-4"/>
                      <div className="d-flex justify-content-between">
                        <div className="text-center">
                          <p className="text-muted mb-0">High: <span className="fw-bold"> {Math.round(current.main.temp_max)}°C</span></p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted mb-0">Low: <span className="fw-bold"> {Math.round(current.main.temp_min)}°C</span></p>
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
            {/* {!error && !loading && hourly.length > 0 && ( */}
            {!error && !loading && current && hourly?.length> 0 && (

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
                          {/* {new Date((hour.dt + current.timezone) * 1000).getUTCHours()}:00 */}
                          {new Date((hour.dt + (current?.timezone || 0)) * 1000).getUTCHours()}:00
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
      <div
  className="position-fixed bottom-0 end-0 p-3"
  style={{ zIndex: 1050 }}
>
  {notifications.length > 0 &&
    notifications.map((notif, idx) => (
      <div
        key={idx}
        className="toast show align-items-center text-bg-primary border-0 mb-2"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            <strong>{notif.city}:</strong> {notif.message}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() =>
              dispatch(removeNotification(idx)) // optional
            }
          ></button>
        </div>
      </div>
    ))}
</div>

    </div>
  );
}



// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentWeather, fetchHourlyForecast } from "../features/weather/weatherSlice";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import WeatherIcon from "../components/DashboardComponents/WeatherIcon";
// import { useNavigate } from "react-router-dom";
// import { logoutUser } from "../features/auth/authThunks";
// import { fetchCities } from "../features/city/citiesSlice"; 
// import { initSocket, subscribeCity } from "../utils/socket";
// import { addNotification, setSubscribedCity, removeNotification } from "../features/notification/notificationSlice";
// import { FaDroplet, FaWind } from "react-icons/fa6";

// export default function Dashboard() {
//   const [cityInput, setCityInput] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [geoDenied, setGeoDenied] = useState(false);
//   const [hydrated, setHydrated] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { current, hourly, loading, error } = useSelector((state) => state.weather);
//   const { list: cities, loading: citiesLoading } = useSelector(state => state.cities);
//   const { list: notifications, city: subscribedCity } = useSelector(
//     (state) => state.notifications || { list: [], city: null }
//   );
//   const { id: userId } = useSelector(state => state.auth.user || {});

//   const [socket, setSocket] = useState(null);

//   // --- SOCKET INIT ---
//   useEffect(() => {
//     if (!userId) return;

//     const token = document.cookie
//       .split("; ")
//       .find(row => row.startsWith("token="))
//       ?.split("=")[1];

//     const s = initSocket(token);
//     setSocket(s);

//     s.on("newNotification", (data) => {
//       dispatch(addNotification(data));
//       dispatch(setSubscribedCity(data.city));

//       if (Notification.permission === "granted") {
//         new Notification(`Weather Update: ${data.city}`, { body: data.message });
//       }
//     });

//     return () => s.disconnect();
//   }, [userId, dispatch]);

//   // --- FETCH TOP CITIES ---
//   useEffect(() => {
//     dispatch(fetchCities());
//   }, [dispatch]);

//   // --- SEARCH CITIES (DEBOUNCE) ---
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       dispatch(fetchCities(cityInput));
//     }, 300);

//     return () => clearTimeout(delay);
//   }, [cityInput, dispatch]);

//   // --- CENTRALIZED CITY ACTIVATION ---
//   const activateCity = async ({ city, lat, lon, source }) => {
//     // 1️⃣ Load weather
//     dispatch(fetchCurrentWeather({ lat, lon }));
//     dispatch(fetchHourlyForecast({ lat, lon }));

//     // 2️⃣ Update redux (bell icon)
//     dispatch(setSubscribedCity(city));

//     // 3️⃣ Join socket
//     if (socket) subscribeCity(city);

//     // 4️⃣ Save to DB (only GPS or manual)
//     if (source === "gps" || source === "manual") {
//       try {
//         await fetch(`${import.meta.env.VITE_API_URL}/notifications/subscribe`, {
//           method: "POST",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ city, lat, lon }),
//         });
//       } catch (e) {
//         console.error("Failed to save subscription");
//       }
//     }
//   };

//   // --- APP BOOTSTRAP LOGIC ---
//   useEffect(() => {
//     const boot = async () => {
//       if (!userId) return;

//       // 1️⃣ Try GPS
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (pos) => {
//             const { latitude, longitude } = pos.coords;

//             const result = await dispatch(fetchCurrentWeather({
//               lat: latitude,
//               lon: longitude
//             }));

//             const detectedCity = result.payload?.name;

//             if (detectedCity) {
//               await activateCity({
//                 city: detectedCity,
//                 lat: latitude,
//                 lon: longitude,
//                 source: "gps"
//               });
//             }
//           },

//           // 2️⃣ Fallback to DB
//           async () => {
//             try {
//               const res = await fetch(`${import.meta.env.VITE_API_URL}/cities/me`, {
//                 credentials: "include",
//               });

//               const data = await res.json();

//               if (data.city && data.lat && data.lon) {
//                 await activateCity({
//                   city: data.city,
//                   lat: data.lat,
//                   lon: data.lon,
//                   source: "db"
//                 });
//               } else {
//                 setGeoDenied(true);
//               }
//             } catch {
//               setGeoDenied(true);
//             }
//           }
//         );
//       } else {
//         setGeoDenied(true);
//       }

//       setHydrated(true);
//     };

//     boot();
//   }, [userId]);

//   // --- MANUAL CITY SELECTION ---
//   const handleCitySelect = async (city) => {
//     setCityInput(`${city.name}, ${city.country}`);
//     setShowSuggestions(false);

//     await activateCity({
//       city: city.name,
//       lat: city.lat,
//       lon: city.lon,
//       source: "manual"
//     });
//   };

//   // --- LOGOUT ---
//   const handleLogout = async () => {
//     await dispatch(logoutUser());
//     navigate("/", { replace: true });
//     window.location.replace("/");
//   };

//   // --- DATE DISPLAY ---
//   const getDayAndDate = () => {
//     if (!current || current.timezone == null) return { day: "", date: "" };
//     const localTime = new Date((current.dt + current.timezone) * 1000);
//     const day = localTime.toLocaleDateString("en-US", { weekday: "long" });
//     const date = localTime.toLocaleDateString("en-GB");
//     return { day, date };
//   };
//   const { day, date } = getDayAndDate();

//   // --- CLICK OUTSIDE TO CLOSE SUGGESTIONS ---
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!e.target.closest(".city-select")) setShowSuggestions(false);
//     };
//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, []);

//   // --- NOTIFICATIONS PERMISSION ---
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <div className="home-page-container">
//       <Navbar onLogout={handleLogout} />
//       <main className="home-page-content">
//         <div className="container-lg py-5">
//           <section className="current-weather-section mb-5">
//             <h2 className="section-title mb-4">Current Weather</h2>

//             {hydrated && geoDenied && !subscribedCity && (
//               <div className="alert alert-warning">
//                 Location access denied. Please select a city.
//               </div>
//             )}

//             <div className="alert alert-info d-flex align-items-center gap-2">
//               <i className="bi bi-bell-fill"></i>
//               Subscribed city: <strong>{subscribedCity || "None"}</strong>
//             </div>

//             {/* CITY SEARCH */}
//             <div className="position-relative mb-3">
//               <input
//                 type="text"
//                 className="form-control form-control-lg city-select"
//                 placeholder="Search city..."
//                 value={cityInput}
//                 onChange={(e) => { setCityInput(e.target.value); setShowSuggestions(true); }}
//                 onFocus={() => setShowSuggestions(true)}
//               />

//               {showSuggestions && cityInput && (
//                 <div className="list-group position-absolute w-100 shadow"
//                      style={{ zIndex: 1000, maxHeight: "250px", overflowY: "auto" }}>
//                   {citiesLoading && <div className="list-group-item">Loading...</div>}
//                   {!citiesLoading && cities.length === 0 && (
//                     <div className="list-group-item text-muted">No cities found</div>
//                   )}
//                   {!citiesLoading && cities.map((city, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       className="list-group-item list-group-item-action"
//                       onClick={() => handleCitySelect(city)}
//                     >
//                       {city.name}{city.state ? `, ${city.state}` : ""}, {city.country}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {error && <div className="alert alert-danger">{error}</div>}
//             {!error && loading && <div>Loading weather...</div>}

//             {!error && !loading && current && (
//               <div className="row g-4">
//                 <div className="col-lg-6 col-md-12">
//                   <div className="weather-card-large d-flex justify-content-between align-items-start">
//                     <div>
//                       <h3 className="weather-location-name">{current.name}</h3>
//                       <div className="weather-temp">{Math.round(current.main.temp)}°C</div>
//                       <p className="weather-condition">{current.weather[0].description}</p>
//                     </div>
//                     <div className="weather-icon-large">
//                       <img src={`https://openweathermap.org/payload/api/media/file/${current.weather[0].icon}.png`} />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-lg-6 col-md-12">
//                   <div className="weather-details-card">
//                     <div className="details-header d-flex justify-content-between align-items-center">
//                       <h5 className="mb-0">{day}</h5>
//                       <h5 className="mb-0">{date}</h5>
//                     </div>
//                     <div className="details-body">
//                       <div className="row mb-3">
//                         <div className="col-6">
//                           <div className="detail-item mb-0">
//                             <div className="detail-icon"><FaDroplet size={18}/></div>
//                             <span>Humidity: {current.main.humidity}%</span>
//                           </div>
//                         </div>
//                         <div className="col-6">
//                           <div className="detail-item mb-0">
//                             <div className="detail-icon"><FaWind size={18}/></div>
//                             <span>Wind: {current.wind.speed} m/s</span>
//                           </div>
//                         </div>
//                       </div>
//                       <hr className="my-4"/>
//                       <div className="d-flex justify-content-between">
//                         <div className="text-center">
//                           <p className="text-muted mb-0">High: <span className="fw-bold">{Math.round(current.main.temp_max)}°C</span></p>
//                         </div>
//                         <div className="text-center">
//                           <p className="text-muted mb-0">Low: <span className="fw-bold">{Math.round(current.main.temp_min)}°C</span></p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>

//           {/* HOURLY FORECAST */}
//           <section className="hourly-forecast-section">
//             {!error && !loading && current && hourly?.length > 0 && (
//               <div>
//                 <h2 className="section-title mb-4">Hourly Forecast</h2>
//                 <div className="forecast-card overflow-auto">
//                   <div className="d-flex gap-3 min-w-max">
//                     {hourly.slice(0, 12).map((hour, idx) => (
//                       <div key={idx} className="text-center forecast-hour">
//                         <div className="weather-icon-hour">
//                           <WeatherIcon icon={hour.weather[0].icon} size={32} />
//                         </div>
//                         <p className="mb-1 fw-bold">{Math.round(hour.main.temp)}°C</p>
//                         <p className="mb-0 text-white-75">
//                           {new Date((hour.dt + (current?.timezone || 0)) * 1000).getUTCHours()}:00
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </section>
//         </div>
//       </main>
//       <Footer />

//       {/* NOTIFICATIONS */}
//       <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
//         {notifications.length > 0 &&
//           notifications.map((notif, idx) => (
//             <div key={idx} className="toast show align-items-center text-bg-primary border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true">
//               <div className="d-flex">
//                 <div className="toast-body">
//                   <strong>{notif.city}:</strong> {notif.message}
//                 </div>
//                 <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => dispatch(removeNotification(idx))}></button>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// }
