import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    IconButton,
    InputAdornment,
    Link,
    FormControl,
    InputLabel,
    OutlinedInput // Used for password field with adornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import RoleSelector from './RoleSelector'; // Assuming this component is already modernized or simple

interface RegistrationFormProps {
    // No props needed for this component based on the original code
}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        // Basic client-side validation
        if (!username || !email || !password || !role) {
            setError('All fields are required.');
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role }),
            });
            const data = await res.json();
            if (res.ok) {
                navigate('/login'); // Navigate to login on successful registration
            } else {
                setError(data.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Network error during registration:', err);
            setError('Network error. Please check your connection.');
        }
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
                gap: 2.25, // Equivalent to 18px (8px * 2.25)
                background: 'transparent',
            }}
        >
            {/* Error Message */}
            {error && (
                <Alert
                    severity="error"
                    sx={{
                        borderRadius: 1.5, // Equivalent to 6px
                        fontSize: 13,
                        mt: 0.25, // Equivalent to 2px
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

            {/* Username Input */}
            <TextField
                label="Name"
                variant="outlined"
                fullWidth
                id="username"
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2, // Equivalent to 8px
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
                        fontWeight: 600,
                        color: '#1a237e',
                        fontSize: 14,
                        letterSpacing: 0.1,
                    },
                    '& .MuiInputBase-input': {
                        color: '#1a237e',
                        fontWeight: 500,
                        padding: '10px 12px',
                        fontSize: 15,
                    },
                }}
            />

            {/* Email Input */}
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2, // Equivalent to 8px
                        backgroundColor: '#f8fafc',
                        '& fieldset': {
                            borderColor: '#e3e8f0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#a8b8d0',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: '1.5px',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        fontWeight: 600,
                        color: '#1a237e',
                        fontSize: 14,
                        letterSpacing: 0.1,
                    },
                    '& .MuiInputBase-input': {
                        color: '#1a237e',
                        fontWeight: 500,
                        padding: '10px 12px',
                        fontSize: 15,
                    },
                }}
            />

            {/* Password Input */}
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="password" sx={{
                    fontWeight: 600,
                    color: '#1a237e',
                    fontSize: 14,
                    letterSpacing: 0.1,
                    '&.Mui-focused': {
                        color: '#2563eb', // Label color when focused
                    },
                }}>Password</InputLabel>
                <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    endAdornment={
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
                    }
                    placeholder="Enter your password"
                    required
                    sx={{
                        borderRadius: 2, // Equivalent to 8px
                        backgroundColor: '#f8fafc',
                        '& fieldset': {
                            borderColor: '#e3e8f0',
                        },
                        '&:hover fieldset': {
                            borderColor: '#a8b8d0',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: '1.5px',
                        },
                        '& .MuiInputBase-input': {
                            color: '#1a237e',
                            fontWeight: 500,
                            padding: '10px 12px',
                            fontSize: 15,
                        },
                    }}
                />
            </FormControl>

            {/* Role Selector */}
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="role" sx={{
                    fontWeight: 600,
                    color: '#1a237e',
                    fontSize: 14,
                    letterSpacing: 0.1,
                    '&.Mui-focused': {
                        color: '#2563eb',
                    },
                }}>Role</InputLabel>
                <Box
                    sx={{
                        border: '1.5px solid #e3e8f0',
                        borderRadius: 2, // Equivalent to 8px
                        backgroundColor: '#f8fafc',
                        padding: '2px 6px',
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 40,
                        '&:hover': {
                            borderColor: '#a8b8d0',
                        },
                        '&.Mui-focused': { // Apply focus style to the Box itself
                            borderColor: '#2563eb',
                            borderWidth: '1.5px',
                        },
                    }}
                >
                    <RoleSelector onChange={setRole} />
                </Box>
            </FormControl>

            {/* Sign Up Button */}
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                    mt: 1, // Equivalent to 8px
                    background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
                    color: '#fff',
                    borderRadius: 2.5, // Equivalent to 10px
                    padding: '12px 0',
                    fontWeight: 700,
                    fontSize: 16,
                    letterSpacing: 0.2,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                    transition: 'background 0.2s, color 0.2s',
                    '&:hover': {
                        background: 'linear-gradient(90deg, #1e40af 60%, #17328a 100%)',
                    },
                }}
            >
                Sign up
            </Button>

            {/* Already have an account link */}
            <Typography
                variant="body2"
                sx={{
                    mt: 1.25, // Equivalent to 10px
                    fontSize: 13,
                    color: '#64748b',
                    textAlign: 'center',
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
    );
};

export default RegistrationForm;