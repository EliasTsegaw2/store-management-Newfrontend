import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    IconButton,
    InputAdornment,
    Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface LoginFormProps {
    onLogin: (identifier: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!identifier || !password) {
            setError('Username/email and password are required');
            return;
        }
        setError('');
        onLogin(identifier, password);
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                width: '100%',
                maxWidth: 340,
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5, // Equivalent to 20px (8px * 2.5)
                background: 'transparent',
            }}
        >
            {/* Error Message */}
            {error && (
                <Alert
                    severity="error"
                    sx={{
                        borderRadius: 2, // Equivalent to 8px
                        fontSize: 14,
                        mb: 0.25, // Equivalent to 2px
                        textAlign: 'center',
                        fontWeight: 600,
                        letterSpacing: 0.1,
                        justifyContent: 'center', // Center content horizontally
                    }}
                >
                    {error}
                </Alert>
            )}

            {/* Username/Email Input */}
            <TextField
                label="Username or Email"
                variant="outlined"
                fullWidth
                id="identifier"
                type="text"
                placeholder="Enter your username or email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5, // Equivalent to 10px
                        backgroundColor: '#f8fafc',
                        '& fieldset': {
                            borderColor: '#e3e8f0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#a8b8d0', // Lighter blue on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb', // Blue on focus
                            borderWidth: '1.5px',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 700,
                        color: '#1a237e',
                        fontSize: 15,
                        letterSpacing: 0.1,
                    },
                    '& .MuiInputBase-input': {
                        color: '#1a237e',
                        fontWeight: 500,
                        padding: '12px 14px',
                        fontSize: 16,
                    },
                }}
            />

            {/* Password Input */}
            <TextField
                label="Password"
                variant="outlined"
                fullWidth
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={showPassword ? 'hide password' : 'show password'}
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                sx={{ color: '#64748b' }}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5, // Equivalent to 10px
                        backgroundColor: '#f8fafc',
                        '& fieldset': {
                            borderColor: '#e3e8f0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#a8b8d0', // Lighter blue on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb', // Blue on focus
                            borderWidth: '1.5px',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 700,
                        color: '#1a237e',
                        fontSize: 15,
                        letterSpacing: 0.1,
                    },
                    '& .MuiInputBase-input': {
                        color: '#1a237e',
                        fontWeight: 500,
                        padding: '12px 14px',
                        fontSize: 16,
                    },
                }}
            />

            {/* Login Button */}
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 1, // Equivalent to 8px
                    background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
                    color: '#fff',
                    borderRadius: 3, // Equivalent to 12px
                    padding: '14px 0',
                    fontWeight: 800,
                    fontSize: 17,
                    letterSpacing: 0.2,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                    transition: 'background 0.2s, color 0.2s',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #1e40af 60%, #17328a 100%)',
                    },
                }}
            >
                Login
            </Button>

            {/* Register Link */}
            <Typography
                variant="body2"
                sx={{
                    mt: 1.25, // Equivalent to 10px
                    fontSize: 14,
                    color: '#64748b',
                    textAlign: 'center',
                }}
            >
                Don't have an account?{' '}
                <Link
                    href="/register"
                    underline="none"
                    sx={{
                        color: '#2563eb',
                        fontWeight: 700,
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    Sign up
                </Link>
            </Typography>
        </Box>
    );
};

export default LoginForm;