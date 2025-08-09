import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import StudentRequestApproval from '../Components/StudentRequestApproval';
import InventoryTable from '../Components/InventoryTable';
import type { InventoryItem } from '../Components/InventoryTable';
import MaintenanceSection from '../Components/MaintenanceSection';
import UserRoleReports from '../Components/UserRoleReports';
import SearchBar from '../Components/SearchBar';
import { Box, Container, Paper, Tabs, Tab, CircularProgress } from '@mui/material';


export interface Request {
  _id: string;
  studentName: string;
  studentId: string;
  department: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  reason: string;
  pickupDate: string;
  approved: boolean;
  components: {
    productId: {
      _id: string;
      name: string;
      model: string;
    };
    quantity: number;
  }[];
  requestedBy: {
    _id: string;
    username: string;
    email: string;
  };
}

const tabLabels = [
  { value: 'requests', label: 'Requests' },
  { value: 'inventory', label: 'Inventory' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'reports', label: 'Reports' },
];

const DepartmentHeadPage: React.FC = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || 'DepartmentHead';
  const queryTab = new URLSearchParams(location.search).get('tab') as 'requests' | 'inventory' | 'maintenance' | 'reports' | undefined;
  const [tab, setTab] = useState<'requests' | 'inventory' | 'maintenance' | 'reports'>(queryTab || 'requests');
  const [requests, setRequests] = useState<Request[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [limit] = useState(10);

  useEffect(() => {
    if (queryTab && queryTab !== tab) setTab(queryTab);
  }, [queryTab]);

  useEffect(() => { fetchRequests(); }, []);

  useEffect(() => { fetchInventory(); }, [search, limit]);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/requests/pending', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(res.data as Request[]);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/inventory', {
        params: {
          search,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data as { items: InventoryItem[]; total: number };
      const items = Array.isArray(data.items) ? data.items : [];
      setInventory(items.map((item: InventoryItem) => ({ ...item, available: Number(item.available) })));
    } catch (err) {
      console.error('Error fetching inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`/api/requests/${id}/approve`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };
  const handleReject = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };


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
            {tab === 'requests' && (
              <StudentRequestApproval requests={requests} onApprove={handleApprove} onReject={handleReject} />
            )}
            {tab === 'inventory' && (
              <>
                <Box mb={2}>
                  <SearchBar value={search} onChange={setSearch} />
                </Box>
                {loading ? (
                  <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <CircularProgress />
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

export default DepartmentHeadPage;
