
import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import StudentRequestForm from '../Components/StudentRequestForm';
import SearchBar from '../Components/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import UserRoleReports from '../Components/UserRoleReports';
import { Box, Paper, Typography, Tabs, Tab, Container } from '@mui/material';

const REQUESTS = [
  {
    id: 1,
    status: 'Approved',
    items: [
      { name: 'Resistor', model: 'R-100', quantity: 10 },
      { name: 'Breadboard', model: 'BB-101', quantity: 2 },
    ],
    requestedAt: '2025-06-01',
    readyAt: '2025-06-03',
    pickedUp: false,
  },
];


const StudentPage: React.FC = () => {
  const [tab, setTab] = useState<'request' | 'explore' | 'reports'>('request');
  const [search, setSearch] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  // Sync tab with URL query param
  useEffect(() => {
    const queryTab = new URLSearchParams(location.search).get('tab') as
      | 'request'
      | 'explore'
      | 'reports'
      | null;
    if (queryTab && queryTab !== tab) {
      setTab(queryTab);
    }
  }, [location.search, tab]);

  // Change tab and update URL query
  const handleTabChange = (newTab: typeof tab) => {
    setTab(newTab);
    navigate(`/student?tab=${newTab}`);
  };

  return (
    <Box>
      <Header />
      <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
        <Sidebar
          active={
            tab === 'request'
              ? 'Request'
              : tab === 'explore'
                ? 'Component & Equipment'
                : 'Reports'
          }
          role="Student"
        />
        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => handleTabChange(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab value="request" label="Request" />
              <Tab value="explore" label="Explore" />
              <Tab value="reports" label="Reports" />
            </Tabs>
          </Paper>
          <Paper elevation={1} sx={{ p: 3, minHeight: 500 }}>
            {tab === 'request' && (
              <>
                <Typography variant="h5" fontWeight={700} mb={3}>
                  Student Request Portal
                </Typography>
                <StudentRequestForm />
              </>
            )}
            {tab === 'explore' && (
              <>
                <Typography variant="h5" fontWeight={800} color="primary" mb={2} letterSpacing={0.5}>
                  Explore Components & Equipment
                </Typography>
                <Box mb={3} maxWidth={420}>
                  <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search by name or model..."
                  />
                </Box>
                {/* Add component grid or list here if needed */}
              </>
            )}
            {tab === 'reports' && (
              <UserRoleReports
                role="Student"
                data={{
                  'Available Inventory': [],
                  'My Requests': REQUESTS,
                  'Borrowed Items': [],
                  'Maintenance Status': [],
                }}
              />
            )}
          </Paper>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default StudentPage;
