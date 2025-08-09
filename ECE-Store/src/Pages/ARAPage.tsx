

import React, { useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import InventoryTable from '../Components/InventoryTable';
import ARARequestForm from '../Components/ARARequestForm';
import MaintenanceSection from '../Components/MaintenanceSection';
import UserRoleReports from '../Components/UserRoleReports';
import SearchBar from '../Components/SearchBar';
import { Box, Container, Paper, Tabs, Tab } from '@mui/material';

const tabLabels = [
  { value: 'request', label: 'Component & Equipment Request' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'reports', label: 'Reports' },
];

import { useLocation, useNavigate } from 'react-router-dom';

const ARAPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryTab = new URLSearchParams(location.search).get('tab') as 'request' | 'inventory' | 'maintenance' | 'reports' | undefined;
  const [tab, setTab] = React.useState<'request' | 'inventory' | 'maintenance' | 'reports'>(queryTab || 'request');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'ARA';
  // Example state for inventory and search
  const [inventory, setInventory] = React.useState<any[]>([]);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Sync tab state with URL query param
  useEffect(() => {
    if (queryTab && queryTab !== tab) setTab(queryTab);
  }, [queryTab]);

  // When tab changes, update the URL
  useEffect(() => {
    if (tab !== queryTab) {
      navigate(`/ara?tab=${tab}`, { replace: true });
    }
  }, [tab]);


  // Fetch inventory when tab is 'inventory' or search changes
  useEffect(() => {
    if (tab !== 'inventory') return;
    const fetchInventory = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/inventory', {
          params: { search },
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data as { items: any[] };
        setInventory(Array.isArray(data.items) ? data.items : []);
      } catch (err) {
        setInventory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [tab, search]);

  return (
    <>
      <Header />
      <Box display="flex" minHeight="100vh" bgcolor="#f5f6fa">
        <Sidebar active={tab} role={role} />
        <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
          <Paper elevation={2} sx={{ mb: 2, p: 2 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              {tabLabels.map(t => (
                <Tab key={t.value} value={t.value} label={t.label} />
              ))}
            </Tabs>
          </Paper>
          <Paper elevation={1} sx={{ p: 2, minHeight: 500 }}>
            {tab === 'request' && <ARARequestForm />}
            {tab === 'inventory' && (
              <>
                <Box mb={2}>
                  <SearchBar value={search} onChange={setSearch} />
                </Box>
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <span>Loading...</span>
                  </Box>
                ) : (
                  <InventoryTable data={inventory} />
                )}
              </>
            )}
            {tab === 'maintenance' && <MaintenanceSection />}
            {tab === 'reports' && <UserRoleReports role={role} data={{}} />}
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ARAPage;
