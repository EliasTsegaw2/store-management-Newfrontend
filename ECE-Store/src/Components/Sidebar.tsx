import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Example icon
import InventoryIcon from '@mui/icons-material/Inventory';
import ReportIcon from '@mui/icons-material/Report';
import BuildIcon from '@mui/icons-material/Build';

// Role-based navigation items
const navConfig: Record<string, { label: string; route: string; icon: React.ReactNode }[]> = {
    DepartmentHead: [
        { label: 'Request Approval', route: '/HOD?tab=requests', icon: <DashboardIcon /> },
        { label: 'Inventory', route: '/HOD?tab=inventory', icon: <InventoryIcon /> },
        { label: 'Maintenance', route: '/HOD?tab=maintenance', icon: <BuildIcon /> },
        { label: 'Reports', route: '/HOD?tab=reports', icon: <ReportIcon /> },
    ],
    Student: [
        { label: 'Request', route: '/student?tab=request', icon: <DashboardIcon /> },
        { label: 'Component & Equipment', route: '/student?tab=explore', icon: <InventoryIcon /> },
        { label: 'Reports', route: '/student?tab=reports', icon: <ReportIcon /> },
    ],
    Lecturer: [
        { label: 'Request', route: '/lecturer?tab=request', icon: <DashboardIcon /> },
        { label: 'Inventory', route: '/lecturer?tab=inventory', icon: <InventoryIcon /> },
        { label: 'Maintenance', route: '/lecturer?tab=maintenance', icon: <BuildIcon /> },
        { label: 'Reports', route: '/lecturer?tab=reports', icon: <ReportIcon /> },
    ],
    ARA: [
        { label: 'Component & Equipment Request', route: '/ara?tab=request', icon: <DashboardIcon /> },
        { label: 'Inventory', route: '/ara?tab=inventory', icon: <InventoryIcon /> },
        { label: 'Maintenance', route: '/ara?tab=maintenance', icon: <BuildIcon /> },
        { label: 'Reports', route: '/ara?tab=reports', icon: <ReportIcon /> },
    ],
    SARA: [
        { label: 'Component & Equipment Request', route: '/sara?tab=request', icon: <DashboardIcon /> },
        { label: 'Inventory', route: '/sara?tab=inventory', icon: <InventoryIcon /> },
        { label: 'Maintenance', route: '/sara?tab=maintenance', icon: <BuildIcon /> },
        { label: 'Reports', route: '/sara?tab=reports', icon: <ReportIcon /> },
    ],
    StoreManager: [
        { label: 'Inventory Management', route: '/store-manager?tab=inventory', icon: <InventoryIcon /> },
        { label: 'Approved Requests', route: '/store-manager?tab=approved', icon: <DashboardIcon /> },
        { label: 'ARA/Lecturer Requests', route: '/store-manager?tab=ara', icon: <DashboardIcon /> },
        { label: 'Maintenance', route: '/store-manager?tab=maintenance', icon: <BuildIcon /> },
        { label: 'Reports', route: '/store-manager?tab=reports', icon: <ReportIcon /> },
    ],
};

interface SidebarProps {
    active?: string;
    role?: 'DepartmentHead' | 'Student' | 'Lecturer' | 'ARA' | 'SARA' | 'StoreManager';
}

const Sidebar: React.FC<SidebarProps> = ({ active, role = 'Student' }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);


    const navItems = navConfig[role] || navConfig['Student'];

    // Helper to determine if a nav item is active, supporting tabbed URLs
    const isActive = (item: { label: string; route: string }) => {
        // If the route has a ?tab= param, match active to tab value
        const tabMatch = item.route.match(/\?tab=([^&]+)/);
        if (tabMatch) {
            return active && active.toLowerCase() === tabMatch[1].toLowerCase();
        }
        // Otherwise, fallback to label match
        return active === item.label;
    };

    const roleDisplay = {
        DepartmentHead: 'Head of Department',
        Student: 'Student',
        Lecturer: 'Lecturer',
        ARA: 'ARA',
        SARA: 'SARA',
        StoreManager: 'Store Manager',
    }[role] || 'User';

    return (
        <Box
            component="aside"
            sx={{
                width: collapsed ? 72 : 288,
                p: collapsed ? 1.5 : 4,
                backgroundColor: '#2563eb',
                borderRight: '1px solid rgb(15, 87, 160)',
                transition: 'width 0.2s, padding 0.2s',
                minHeight: '100vh',
                position: 'relative',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: collapsed ? 'center' : 'flex-start',
                color: '#fff',
            }}
        >
            {/* Collapse/Expand Button */}
            <IconButton
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                sx={{
                    position: 'absolute',
                    top: 18,
                    right: collapsed ? 10 : 18,
                    background: '#e0e7ff',
                    color: '#2563eb',
                    '&:hover': {
                        background: '#c5d0ff',
                    },
                    boxShadow: '0 1px 4px rgba(44,62,80,0.07)',
                    transition: 'right 0.2s',
                    zIndex: 2,
                }}
            >
                {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>

            {/* Logo and Role */}
            <Box
                sx={{
                    mb: 4,
                    width: '100%',
                    textAlign: collapsed ? 'center' : 'left',
                    opacity: collapsed ? 0 : 1,
                    transition: 'opacity 0.2s',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#e0e7ff', transition: 'none' }}>
                    Electronics Store
                </Typography>
                <Typography variant="body2" sx={{ color: '#a0c0ff', transition: 'none' }}>
                    {roleDisplay}
                </Typography>
            </Box>

            {/* Navigation */}
            <Box component="nav" sx={{ width: '100%' }}>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {navItems.map((item) => (
                        <ListItem
                            key={item.label}
                            disablePadding
                            onClick={() => navigate(item.route)}
                            sx={{
                                background: isActive(item) ? 'rgba(255, 255, 255, 0.2)' : 'none',
                                borderRadius: 5,
                                cursor: 'pointer',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    p: collapsed ? '8px 0' : '8px 12px',
                                    justifyContent: collapsed ? 'center' : 'flex-start',
                                }}
                            >
                                <ListItemIcon sx={{ minWidth: 40, color: '#e0e7ff' }}>
                                    {item.icon}
                                </ListItemIcon>
                                {!collapsed && (
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontWeight: isActive(item) ? 700 : 500,
                                            color: '#e0e7ff',
                                        }}
                                    />
                                )}
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
};

export default Sidebar;