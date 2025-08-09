import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoginForm from '../Components/LoginForm';

// Custom styled components for the layout
const GradientBackground = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(120deg, #e3eafc 0%, #f8fafc 100%)',
});

const LoginCard = styled(Paper)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    boxShadow: '0 8px 40px rgba(37, 99, 235, 0.13), 0 2px 8px rgba(0,0,0,0.04)',
    borderRadius: 28,
    overflow: 'hidden',
    border: '1.5px solid #e3e8f0',
    minWidth: 720,
    maxWidth: 900,
});

const ImageSection = styled(Box)({
    flex: 1.2,
    minWidth: 320,
    background: 'linear-gradient(135deg, #2563eb 60%, #1e40af 100%)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

const handleLogin = async (identifier: string, password: string) => {
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: identifier, password }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                switch (data.user.role) {
                    case 'ARA':
                        navigate('/ara');
                        break;
                    case 'Lecturer':
                        navigate('/lecturer');
                        break;
                    case 'DepartmentHead':
                        navigate('/HOD');
                        break;
                    case 'Student':
                        navigate('/student');
                        break;
                    case 'StoreManager':
                        navigate('/store-manager');
                        break;
                    default:
                        navigate('/');
                }
            } else {
                alert(data.error || 'Login failed');
            }
        } catch {
            alert('Network error');
        }
    };

    return (
        <GradientBackground>
            <LoginCard>
                {/* Left Side: Image Section */}
                <ImageSection>
                    <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                        alt="Corporate pattern"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.85,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(120deg, rgba(37,99,235,0.25) 0%, rgba(30,64,175,0.18) 100%)',
                        }}
                    />
                </ImageSection>
                {/* Right Side: Login Form */}
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: '48px 36px 40px 36px',
                        position: 'relative',
                        bgcolor: 'background.paper',
                    }}
                >
                    {/* Floating Icon */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: -36,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: 'linear-gradient(135deg, #2563eb 60%, #1e40af 100%)',
                            borderRadius: '50%',
                            width: 72,
                            height: 72,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 16px rgba(37,99,235,0.13)',
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>
                    {/* Welcome Text */}
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            color: '#1a237e',
                            mt: 5,
                            letterSpacing: 0.5,
                        }}
                    >
                        Welcome Back
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 4, mt: 1, maxWidth: 320 }}
                    >
                        Sign in to your organization account to continue.
                    </Typography>
                    {/* Login Form Component */}
                    <Box sx={{ width: '100%', maxWidth: 340 }}>
                        <LoginForm onLogin={handleLogin} />
                    </Box>
                </Box>
            </LoginCard>
        </GradientBackground>
    );
};

export default LoginPage;