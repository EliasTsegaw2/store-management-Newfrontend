import React, { useState, useEffect } from 'react';
import ComponentSelectionGrid from './ComponentSelectionGrid';
import type { ComponentItem } from './ComponentSelectionGrid';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface SelectedComponent extends ComponentItem {
  quantity: number;
}

export interface RequestDetails {
  studentName: string;
  studentId: string;
  department: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  reason: string;
  pickupDate: string;
  components: SelectedComponent[];
}

const StudentRequestForm: React.FC = () => {
  const [componentsList, setComponentsList] = useState<ComponentItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<SelectedComponent[]>([]);
  const [form, setForm] = useState<RequestDetails>({
    studentName: '',
    studentId: '',
    department: '',
    courseCode: '',
    courseName: '',
    instructor: '',
    reason: '',
    pickupDate: '',
    components: [],
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        '/api/requests',
        { ...form, components: selectedComponents },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Failed to submit request. Please try again.');
    }
  };

  // Fetch available components from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoading(true);

    const fetchComponents = async () => {
      try {

        const res = await axios.get('/api/inventory?type=component', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = res.data as { items: ComponentItem[] };
        setComponentsList(data.items);
      } catch (err) {
        console.error('Error fetching components', err);
        setError('Failed to load component list.');
      } finally {
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleComponentSelect = (comp: ComponentItem) => {
    const exists = selectedComponents.find((c) => c.model === comp.model);
    if (exists) {
      setSelectedComponents(selectedComponents.filter((c) => c.model !== comp.model));
    } else {
      setSelectedComponents([...selectedComponents, { ...comp, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (model: string, quantity: number) => {
    setSelectedComponents((prev) =>
      prev.map((c) =>
        c.model === model ? { ...c, quantity: Math.max(1, Math.min(quantity, c.available)) } : c
      )
    );
  };

  const handleRemoveComponent = (model: string) => {
    setSelectedComponents((prev) => prev.filter((c) => c.model !== model));
  };

  // ...existing code...

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (submitted) return <Alert severity="success" sx={{ textAlign: 'center' }}>Your request has been submitted!</Alert>;

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {/* Component Browsing */}
        <Typography variant="h6" mb={2}>1. Browse Components</Typography>
        <ComponentSelectionGrid
          data={componentsList}
          selectedModels={selectedComponents.map((c) => c.model)}
          onSelect={handleComponentSelect}
        />
        {selectedComponents.length === 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>Please select at least one component.</Alert>
        )}
        <Divider sx={{ my: 4 }} />

        {/* Student Information */}
        <Typography variant="h6" mb={2}>2. Student Information</Typography>
        <Grid container spacing={2} mb={2}>
          <Grid size={{ xs:12, sm:4}}>
            <TextField name="studentName" label="Student Name" value={form.studentName} onChange={handleChange} required fullWidth size="small" />
          </Grid>
          <Grid size={{ xs:12, sm:4}}>
            <TextField name="studentId" label="Student ID" value={form.studentId} onChange={handleChange} required fullWidth size="small" />
          </Grid>
          <Grid size={{ xs:12, sm:4}}>
            <TextField name="department" label="Department" value={form.department} onChange={handleChange} required fullWidth size="small" />
          </Grid>
          <Grid size={{ xs:12, sm:4}}>
            <TextField name="courseCode" label="Course Code" value={form.courseCode} onChange={handleChange} required fullWidth size="small" />
          </Grid>
          <Grid size={{ xs:12, sm:4}}>
            <TextField name="courseName" label="Course Name" value={form.courseName} onChange={handleChange} required fullWidth size="small" />
          </Grid>
          <Grid size={{ xs:12, sm:4}}>
            <TextField name="instructor" label="Instructor" value={form.instructor} onChange={handleChange} required fullWidth size="small" />
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />

        {/* Request Details */}
        <Typography variant="h6" mb={2}>3. Request Details</Typography>

        {/* Selected Components */}
        {selectedComponents.length > 0 ? (
          <Box mb={3}>
            {selectedComponents.map((item) => (
              <Paper key={item.model} sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2, p: 2, bgcolor: '#F8FAFC', border: '1px solid #E5E8EB' }}>
                <Box component="img" src={item.image || '/images/placeholder.png'} alt={item.name} sx={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 1, bgcolor: '#fff' }} />
                <Box flex={1}>
                  <Typography fontWeight={600} fontSize={16}>{item.name}</Typography>
                  <Typography fontSize={13} color="#4D7399">Model: {item.model}</Typography>
                  <Typography fontSize={13} color="#64748b">Available: {item.available}</Typography>
                </Box>
                <TextField
                  type="number"
                  size="small"
                  inputProps={{ min: 1, max: item.available }}
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.model, Number(e.target.value))}
                  required
                  label="Quantity"
                  sx={{ width: 100 }}
                />
                <IconButton color="error" onClick={() => handleRemoveComponent(item.model)}>
                  <DeleteIcon />
                </IconButton>
              </Paper>
            ))}
          </Box>
        ) : (
          <Alert severity="info" sx={{ mb: 3 }}>No components selected.</Alert>
        )}

        {/* Reason and Pickup Date */}
        <TextField
          name="reason"
          label="Reason for request"
          value={form.reason}
          onChange={handleChange}
          required
          fullWidth
          multiline
          minRows={3}
          sx={{ mb: 3 }}
        />
        <Box mb={3}>
          <Typography fontWeight={500} mb={1}>Preferred Pickup Date:</Typography>
          <TextField
            type="date"
            name="pickupDate"
            value={form.pickupDate || ''}
            onChange={handleChange}
            required
            size="small"
            sx={{ width: 220 }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={
            selectedComponents.length === 0 ||
            !form.studentName ||
            !form.department ||
            !form.reason ||
            !form.pickupDate
          }
          sx={{ fontWeight: 600, py: 1.5 }}
        >
          Submit Request
        </Button>
      </Box>
    </Paper>
  );
};

export default StudentRequestForm;
