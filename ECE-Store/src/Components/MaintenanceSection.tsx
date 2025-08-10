import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material'; // This is the corrected line

import SearchBar from './SearchBar';
import axios from 'axios';

// Define the expected types for API responses for better type safety
interface InventoryApiResponse {
  items: InventoryItem[];
}

interface MaintenanceApiResponse extends Array<MaintenanceItem> {} // Assuming it returns an array directly

interface InventoryItem {
  _id: string;
  name: string;
  model: string;
}

export interface MaintenanceItem {
  _id?: string;
  item: InventoryItem;
  type: string;
  last: string;
  next: string;
  actions: string;
}

const statusOptions = ['All', 'Scheduled', 'Completed'];

const MaintenanceSection: React.FC = () => {
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceItem[]>([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState<MaintenanceItem>({
    _id: '',
    item: { _id: '', name: '', model: '' },
    type: '',
    last: '',
    next: '',
    actions: 'Scheduled',
  });
  const [error, setError] = useState('');

  // Fetch Inventory List on component mount
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get<InventoryApiResponse>('/api/inventory', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInventoryList(res.data.items);
      } catch (err) {
        console.error('Error fetching inventory:', err);
      }
    };
    fetchInventory();
  }, []);

  // Fetch Maintenance Records on component mount
  useEffect(() => {
    const fetchMaintenance = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get<MaintenanceApiResponse>('/api/maintenance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMaintenance(res.data);
      } catch (err) {
        console.error('Error fetching maintenance records:', err);
      }
    };
    fetchMaintenance();
  }, []);

  // Filter the data based on search and status, ensuring maintenance is always an array
  const filteredData = (Array.isArray(maintenance) ? maintenance : []).filter(item =>
    (item.item?.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.item?.model?.toLowerCase().includes(search.toLowerCase())) &&
    (status === 'All' || item.actions === status)
  );

  // Modal actions
  const openAdd = () => {
    setForm({ item: { _id: '', name: '', model: '' }, type: '', last: '', next: '', actions: 'Scheduled' });
    setEditIndex(null);
    setShowModal(true);
    setError('');
  };

  const openEdit = (idx: number) => {
    setForm(maintenance[idx]);
    setEditIndex(idx);
    setShowModal(true);
    setError('');
  };

  // Dedicated handlers for different input types to resolve type errors
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInventorySelectChange = (e: SelectChangeEvent) => {
    const selected = inventoryList.find(inv => inv._id === e.target.value);
    if (selected) {
      setForm({ ...form, item: selected });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.item._id || !form.type || !form.last || !form.next) {
      setError('All fields are required.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await axios.post(
        '/api/maintenance',
        {
          item: form.item._id,
          type: form.type,
          last: form.last,
          next: form.next,
          actions: form.actions,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (editIndex !== null) {
        const updated = [...maintenance];
        updated[editIndex] = form;
        setMaintenance(updated);
      } else {
        setMaintenance([...maintenance, form]);
      }

      setShowModal(false);
      setError('');
    } catch (err) {
      setError('Failed to save maintenance record.');
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header and Controls */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <SearchBar value={search} onChange={setSearch} placeholder="Search by item or model" />
        <FormControl sx={{ minWidth: 120 }}>
          <Select value={status} onChange={e => setStatus(e.target.value as string)} displayEmpty>
            {statusOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={openAdd}
          sx={{
            background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          + Add Maintenance
        </Button>
      </Box>

      {/* Table Section */}
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Last</TableCell>
                <TableCell>Next Due</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary" sx={{ py: 4 }}>
                      No maintenance records found.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.item?.name}</TableCell>
                    <TableCell>{item.item?.model}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: item.type === 'Calibration' ? 'success.dark' : 'warning.dark',
                          bgcolor: item.type === 'Calibration' ? 'success.light' : 'warning.light',
                          p: '4px 8px',
                          borderRadius: 1,
                          display: 'inline-block',
                          fontWeight: 'bold',
                        }}
                      >
                        {item.type}
                      </Typography>
                    </TableCell>
                    <TableCell>{item.last}</TableCell>
                    <TableCell>{item.next}</TableCell>
                    <TableCell>{item.actions}</TableCell>
                    <TableCell align="center">
                      <Button onClick={() => openEdit(idx)} variant="outlined" size="small">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Modal/Dialog */}
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Maintenance Item' : 'Add Maintenance Item'}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid size = {{xs:12}}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Inventory Item</InputLabel>
                  <Select
                    name="item"
                    value={form.item._id}
                    onChange={handleInventorySelectChange}
                    label="Inventory Item"
                  >
                    <MenuItem value="">Select item</MenuItem>
                    {inventoryList.map((inv) => (
                      <MenuItem key={inv._id} value={inv._id}>
                        {inv.name} ({inv.model})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size = {{xs:12}}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={form.type}
                    onChange={handleSelectChange}
                    label="Type"
                  >
                    <MenuItem value="">Select type</MenuItem>
                    <MenuItem value="Calibration">Calibration</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size = {{xs:12}}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Maintained"
                  type="date"
                  name="last"
                  value={form.last}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size = {{xs:12}}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Next Due"
                  type="date"
                  name="next"
                  value={form.next}
                  onChange={handleFormChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid size = {{xs:12}}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="actions"
                    value={form.actions}
                    onChange={handleSelectChange}
                    label="Status"
                  >
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {error && (
                <Grid size = {{xs:12}}>
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editIndex !== null ? 'Update Item' : 'Add Item'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default MaintenanceSection;