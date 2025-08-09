import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Grid, MenuItem, InputAdornment, Fade, Divider, Chip } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SendIcon from '@mui/icons-material/Send';
import CelebrationIcon from '@mui/icons-material/Celebration';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const componentOptions = [
  'Resistor', 'Capacitor', 'LED', 'Sensor Kit', 'Breadboard', 'IC', 'Transistor', 'Microcontroller', 'Relay', 'Switch', 'Display', 'Other'
];

const placeOptions = ['Shelf A', 'Shelf B', 'Shelf C', 'Lab 1', 'Lab 2', 'Other'];

const LecturerRequestForm: React.FC = () => {
  const [fields, setFields] = useState([
    { component: '', quantity: 1, place: '', reason: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (idx: number, key: string, value: any) => {
    setFields(prev => prev.map((f, i) => i === idx ? { ...f, [key]: value } : f));
  };

  const addField = () => {
    setFields(prev => [...prev, { component: '', quantity: 1, place: '', reason: '' }]);
  };

  const removeField = (idx: number) => {
    setFields(prev => prev.length > 1 ? prev.filter((_, i) => i !== idx) : prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFields([{ component: '', quantity: 1, place: '', reason: '' }]);
  };

  return (
    <Fade in>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 5, background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f6fa 100%)', boxShadow: '0 8px 32px rgba(44,62,80,0.12)' }}>
        <Typography variant="h4" fontWeight={800} color="primary" mb={2} sx={{ letterSpacing: 1 }}>
          <InventoryIcon sx={{ mr: 1, fontSize: 36, color: '#2563eb' }} />
          Lecturer Component & Equipment Request
        </Typography>
        <Divider sx={{ mb: 3 }}><Chip label="Request Details" color="primary" variant="outlined" /></Divider>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {fields.map((field, idx) => (
              <Grid size={{ xs: 12 }} key={idx}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 2, background: '#f0f4ff', position: 'relative' }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        select
                        label="Component"
                        value={field.component}
                        onChange={e => handleChange(idx, 'component', e.target.value)}
                        fullWidth
                        required
                        color="primary"
                        sx={{ background: '#fff', borderRadius: 2 }}
                      >
                        {componentOptions.map(opt => (
                          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                      <TextField
                        label="Quantity"
                        type="number"
                        value={field.quantity}
                        onChange={e => handleChange(idx, 'quantity', Math.max(1, Number(e.target.value)))}
                        fullWidth
                        required
                        color="primary"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">#</InputAdornment>,
                          inputProps: { min: 1 }
                        }}
                        sx={{ background: '#fff', borderRadius: 2 }}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <TextField
                        select
                        label="Place"
                        value={field.place}
                        onChange={e => handleChange(idx, 'place', e.target.value)}
                        fullWidth
                        required
                        color="primary"
                        sx={{ background: '#fff', borderRadius: 2 }}
                      >
                        {placeOptions.map(opt => (
                          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <TextField
                        label="Reason for Request"
                        value={field.reason}
                        onChange={e => handleChange(idx, 'reason', e.target.value)}
                        fullWidth
                        required
                        color="primary"
                        multiline
                        minRows={2}
                        sx={{ background: '#fff', borderRadius: 2 }}
                      />
                    </Grid>
                  </Grid>
                  {fields.length > 1 && (
                    <Button
                      onClick={() => removeField(idx)}
                      size="small"
                      color="error"
                      startIcon={<RemoveCircleOutlineIcon />}
                      sx={{ position: 'absolute', top: 12, right: 12, borderRadius: 2, fontWeight: 700 }}
                    >
                      Remove
                    </Button>
                  )}
                </Paper>
              </Grid>
            ))}
            <Grid size={{ xs: 12 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddCircleOutlineIcon />}
                onClick={addField}
                sx={{ borderRadius: 3, fontWeight: 700, mb: 2 }}
              >
                Add Another Component
              </Button>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                size="large"
                sx={{ borderRadius: 3, fontWeight: 700, px: 5, py: 1.5, fontSize: 18, boxShadow: '0 2px 8px #2563eb33' }}
              >
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </form>
        {submitted && (
          <Fade in={submitted}>
            <Box mt={4} textAlign="center">
              <CelebrationIcon sx={{ fontSize: 60, color: '#2563eb' }} />
              <Typography variant="h5" color="primary" fontWeight={700} mt={2}>
                Request Submitted!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Your request has been received. You will be notified once it is processed.
              </Typography>
            </Box>
          </Fade>
        )}
      </Paper>
    </Fade>
  );
};

export default LecturerRequestForm;
