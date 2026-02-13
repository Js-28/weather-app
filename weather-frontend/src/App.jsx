// // // App.jsx
// // import { useEffect } from 'react';
// // import { useDispatch } from 'react-redux';
// // import { fetchMe } from './features/auth/authThunks';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import LoginPage from './pages/LoginPage';
// // import Dashboard from './pages/Dashboard';
// // import NotFound from './pages/NotFound';
// // import './styles/WeatherApp.css';
// // import './styles/global.css';

// // function App() {
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     dispatch(fetchMe());
// //   }, [dispatch]);

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<LoginPage />} />
// //         {/* <Route path="/dashboard" element={<Dashboard />} />
// //         <Route path="*" element={<NotFound />} /> */}
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;


// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchMe } from './features/auth/authThunks';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import './styles/WeatherApp.css';
// import './styles/global.css';
// import PublicRoute from "./components/PublicRoute";


// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMe());
//   }, [dispatch]);

  
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path="/" element={<LoginPage />} /> */}
//          <Route
//     path="/"
//     element={
//       <PublicRoute>
//         <LoginPage />
//       </PublicRoute>
//     }
//   />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { fetchMe } from "./features/auth/authThunks";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./pages/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import PublicRoute from "./components/PublicRoute";
// // import RouteGuard from "./components/RouteGuard";
// // import GlobalHistoryListener from "./components/GlobalHistoryListener";
// // import HistoryLogger from "./components/HistoryLogger";
// import AuthSuccess from "./components/AuthGate";

// import "./styles/WeatherApp.css";
// import "./styles/global.css";

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchMe());
//   }, [dispatch]);
  

//   return (
//     <Router>
//       {/* Global back/forward protection */}
//       {/* <RouteGuard /> */}
//         {/* <GlobalHistoryListener />
//         <HistoryLogger /> */}

//       <Routes>
//         {/* Public route */}
//         <Route
//           path="/"
//           element={
//             <PublicRoute>
//               <LoginPage />
//             </PublicRoute>
//           }
//         />
//         <Route path="/auth-success" element={<AuthSuccess />} />

//         {/* Protected route */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Optional: catch-all */}
//         <Route path="*" element={<PublicRoute><LoginPage /></PublicRoute>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMe } from "./features/auth/authThunks";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import GuestLayout from "./layouts/GuestLayout";
import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AuthSuccess from "./pages/AuthSuccess";

import "./styles/WeatherApp.css";
import "./styles/global.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <Router>
      <Routes>

        {/* 🌍 Guest Zone */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        {/* 🔐 Authenticated Zone */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/auth-success" element={<AuthSuccess />} /> */}
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
