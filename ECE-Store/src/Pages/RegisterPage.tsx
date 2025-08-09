import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Link
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Using a Material-UI icon
import RegistrationForm from '../Components/RegistrationForm';

// Custom styled components for the layout
const GradientBackground = styled(Box)({
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(120deg, #e3eafc 0%, #f8fafc 100%)',
});

const RegisterCard = styled(Paper)({
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

const RegisterPage: React.FC = () => {
    return (
        <GradientBackground>
            <RegisterCard>
                {/* Left Side: Pattern/Image */}
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

                {/* Right Side: Registration Form */}
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
                        {/* Replaced SVG with Material-UI Icon */}
                        <CheckCircleIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    {/* Create Account Title */}
                    <Typography
                        variant="h5"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            color: '#1a237e',
                            mt: 5, // Adjusted margin-top to account for the floating icon
                            letterSpacing: 0.5,
                        }}
                    >
                        Create Your Account
                    </Typography>

                    {/* Welcome Message */}
                    <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 4, mt: 1, maxWidth: 320 }}
                    >
                        Welcome! Please fill in the details below to register for your organization account.
                    </Typography>

                    {/* Registration Form Component */}
                    <Box sx={{ width: '100%', maxWidth: 340 }}>
                        <RegistrationForm />
                    </Box>

                    {/* Already have an account link */}
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 4, // Equivalent to 32px
                            fontSize: 13,
                            color: '#94a3b8',
                            textAlign: 'center',
                            letterSpacing: 0.1,
                        }}
                    >
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            underline="none"
                            sx={{
                                color: '#2563eb',
                                fontWeight: 600,
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </RegisterCard>
        </GradientBackground>
    );
};

export default RegisterPage;