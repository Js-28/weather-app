// // App.jsx
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchMe } from './features/auth/authThunks';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import NotFound from './pages/NotFound';
// import './styles/WeatherApp.css';
// import './styles/global.css';

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMe());
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         {/* <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="*" element={<NotFound />} /> */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMe } from './features/auth/authThunks';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/WeatherApp.css';
import './styles/global.css';
import PublicRoute from "./components/PublicRoute";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> */}
         <Route
    path="/"
    element={
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    }
  />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;