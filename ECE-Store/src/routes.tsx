// src/routes.tsx
import { Routes, Route } from 'react-router-dom';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import DepartmentHeadPage from './Pages/DepartmentHeadPage';
import StudentPage from './Pages/StudentPage';
import ARAPage from './Pages/ARAPage';
import LecturerPage from './Pages/LecturerPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/HOD" element={<DepartmentHeadPage />} />
            <Route path="/student" element={<StudentPage />} />
            <Route path="/ara" element={<ARAPage />} />
            <Route path="/lecturer" element={<LecturerPage />} />
        </Routes>
    );
};

export default AppRoutes;