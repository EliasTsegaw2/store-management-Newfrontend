import { Routes, Route } from 'react-router-dom';

// Import all your page components
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
//import ProfielSettingsPage from './Pages/ProfielSettings';
import StudentPage from './Pages/StudentPage';
import DepartmentHeadPage from './Pages/DepartmentHeadPage';
//import StudentReportsPage from './Pages/StudentReportsPage';
// Placeholder ExplorePage import (replace with actual if exists)
import StoreManagerPage from './Pages/StoreManagerPage';
import ARAPage from './Pages/ARAPage';
import LecturerPage from './Pages/LecturerPage';
// Add SARA page import if it exists
// import SARAPage from './Pages/SARAPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/store-manager' element={<StoreManagerPage />} />
      <Route path='/HOD' element={<DepartmentHeadPage />} />
      <Route path='/student' element={<StudentPage />} />
      <Route path='/ara' element={<ARAPage />} />
      <Route path='/lecturer' element={<LecturerPage />} />
      {/* Uncomment below if SARAPage exists */}
      {/* <Route path='/sara' element={<SARAPage />} /> */}
    </Routes>
  );
}

export default App;