import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  styled, // Import styled for custom components if needed
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout'; // For logout icon
import SettingsIcon from '@mui/icons-material/Settings'; // For settings icon
import AccountCircle from '@mui/icons-material/AccountCircle'; // For profile menu icon


// Custom styled component for the brand/logo area
const BrandBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5), // 12px
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}));

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For profile menu

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd navigate to a search results page:
    // navigate(`/search?query=${search}`);
    console.log('Search query:', search);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOption = (action: string) => {
    handleProfileMenuClose();
    if (action === 'profile') {
      navigate('/profile');
    } else if (action === 'settings') {
      navigate('/profiel-settings');
    } else if (action === 'logout') {
      // Clear user session/token and redirect to login
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/login');
    }
  };


  // Get user and role for dynamic nav links
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'Student';

  // Role-based nav links for header (match sidebar logic)
  let navLinks: { label: string; route: string }[] = [];
  if (role === 'Lecturer') {
    navLinks = [
      { label: 'Request', route: '/lecturer?tab=request' },
      { label: 'Inventory', route: '/lecturer?tab=inventory' },
      { label: 'Maintenance', route: '/lecturer?tab=maintenance' },
      { label: 'Reports', route: '/lecturer?tab=reports' },
    ];
  } else if (role === 'ARA') {
    navLinks = [
      { label: 'Request', route: '/ara?tab=request' },
      { label: 'Inventory', route: '/ara?tab=inventory' },
      { label: 'Maintenance', route: '/ara?tab=maintenance' },
      { label: 'Reports', route: '/ara?tab=reports' },
    ];
  } else if (role === 'DepartmentHead') {
    navLinks = [
      { label: 'Request Approval', route: '/HOD?tab=requests' },
      { label: 'Inventory', route: '/HOD?tab=inventory' },
      { label: 'Maintenance', route: '/HOD?tab=maintenance' },
      { label: 'Reports', route: '/HOD?tab=reports' },
    ];
  } else if (role === 'StoreManager') {
    navLinks = [
      { label: 'Inventory', route: '/store-manager?tab=inventory' },
      { label: 'Approved Requests', route: '/store-manager?tab=approved' },
      { label: 'ARA/Lecturer Requests', route: '/store-manager?tab=ara' },
      { label: 'Maintenance', route: '/store-manager?tab=maintenance' },
      { label: 'Reports', route: '/store-manager?tab=reports' },
    ];
  } else if (role === 'Student') {
    navLinks = [
      { label: 'Request', route: '/student?tab=request' },
      { label: 'Component & Equipment', route: '/student?tab=explore' },
      { label: 'Reports', route: '/student?tab=reports' },
    ];
  } else {
    navLinks = [
      { label: 'Dashboard', route: '/' },
      { label: 'Inventory', route: '/inventory' },
      { label: 'Maintenance', route: '/maintenance' },
      { label: 'Reports', route: '/reports' },
    ];
  }

  const profileOptions = [
    { label: 'Profile', action: 'profile', icon: <AccountCircle /> },
    { label: 'Settings', action: 'settings', icon: <SettingsIcon /> },
    { label: 'Logout', action: 'logout', icon: <LogoutIcon /> },
  ];

  return (
    <AppBar position="static" sx={{
      backgroundColor: '#1E293B', // Dark background for the header
      color: '#F1F5F9', // Light text color
      borderBottom: '2px solid #334155',
      zIndex: 100,
      px: { xs: 2, md: 4 }, // Responsive padding
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', height: 72 }}>
        {/* Logo + Title */}
        <BrandBox onClick={() => navigate('/')}>
          <svg width="24" height="24" fill="#38BDF8" viewBox="0 0 16 16">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 1.33333H14V5.77777V10.2222H8V14.6667H2V10.2222V5.77777H8V1.33333Z" />
          </svg>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 700, fontSize: 18 }}>
              ASTU | ECE Department
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: 12 }}>
              Store Inventory System
            </Typography>
          </Box>
        </BrandBox>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 3 }}> {/* gap: 24px */}
          {navLinks.map(link => (
            <Button
              key={link.route}
              onClick={() => navigate(link.route)}
              sx={{
                color: location.pathname === link.route ? '#38BDF8' : '#E2E8F0',
                fontWeight: location.pathname === link.route ? 700 : 500,
                borderBottom: location.pathname === link.route ? '2px solid #38BDF8' : '2px solid transparent',
                borderRadius: 0, // Remove default button border-radius
                py: 0.5, // Padding top/bottom
                px: 1, // Padding left/right
                minWidth: 'auto', // Allow buttons to shrink
                '&:hover': {
                  backgroundColor: 'transparent', // No background change on hover
                  color: '#38BDF8', // Highlight text on hover
                  borderBottomColor: '#38BDF8', // Highlight border on hover
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {/* Right-side Controls */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> {/* gap: 20px */}
          {/* Search */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#334155',
              borderRadius: 2, // 8px
              p: 0.5, // 4px
              width: { xs: 100, sm: 150, md: 200 }, // Responsive width
              transition: 'width 0.3s ease-in-out',
              '&:focus-within': {
                width: { xs: 150, sm: 200, md: 250 }, // Expand on focus
              },
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: '#E2E8F0', fontSize: 14 }}
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="submit" sx={{ p: '6px', color: '#38BDF8' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Notifications Icon */}
          <IconButton title="Notifications" sx={{ color: '#38BDF8' }}>
            <Badge badgeContent={1} color="error" variant="dot"> {/* Example notification */}
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Profile */}
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{ p: 0 }} // Remove default padding for avatar
          >
            <Avatar sx={{ bgcolor: '#94A3B8', width: 36, height: 36, fontSize: 14, fontWeight: 600, color: '#1E293B' }}>
              {user && user.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 2, // 8px
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: 160,
              },
            }}
          >
            {profileOptions.map((opt) => (
              <MenuItem key={opt.action} onClick={() => handleProfileOption(opt.action)} sx={{ py: 1.25 }}> {/* 10px padding */}
                {opt.icon && <Box sx={{ mr: 1 }}>{opt.icon}</Box>}
                <Typography textAlign="center">{opt.label}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;