import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

type StudentRequest = {
  id: number;
  status: string;
  items: { name: string; model: string; quantity: number }[];
  requestedAt: string;
  readyAt: string | null;
  pickedUp: boolean;
};

type Favorite = { name: string; model: string };

type UserReportsSectionProps = {
  role: string;
  requests?: StudentRequest[];
  favorites?: Favorite[];
  reports?: { id: number; title: string; date: string; summary: string }[];
};

const UserReportsSection: React.FC<UserReportsSectionProps> = ({ role, requests = [], favorites = [], reports = [] }) => {
  if (role === 'Student') {
    return (
      <Box>
        <Typography variant="h4" mb={2} fontWeight={800} color="primary">My Reports & Activity</Typography>
        <Box>
          <Typography variant="h6" mb={2} fontWeight={700} color="text.primary">Current & Past Requests</Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Requested At</TableCell>
                  <TableCell>Ready At</TableCell>
                  <TableCell>Picked Up</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell>
                      <Chip
                        label={req.status}
                        color={
                          req.status === 'Approved'
                            ? 'success'
                            : req.status === 'Ready for Pickup'
                            ? 'primary'
                            : req.status === 'Picked Up'
                            ? 'default'
                            : 'error'
                        }
                        variant="outlined"
                        sx={{ fontWeight: 700 }}
                      />
                    </TableCell>
                    <TableCell>
                      <List dense>
                        {req.items.map((item, idx) => (
                          <ListItem key={idx} disableGutters>
                            <ListItemText primary={`${item.name} (${item.model}) x${item.quantity}`} />
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                    <TableCell>{req.requestedAt}</TableCell>
                    <TableCell>{req.readyAt || '-'}</TableCell>
                    <TableCell>
                      <Typography color={req.pickedUp ? 'success.main' : 'error.main'} fontWeight={700}>
                        {req.pickedUp ? 'Yes' : 'No'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {requests.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ color: '#A0AEC0', py: 5 }}>
                      No requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box mt={4}>
          <Typography variant="h6" mb={2} fontWeight={700} color="text.primary">My Favorites</Typography>
          <List>
            {favorites.map((fav, idx) => (
              <ListItem key={idx} disableGutters sx={{ mb: 1 }}>
                <ListItemText primary={<><b>{fav.name}</b> ({fav.model})</>} />
              </ListItem>
            ))}
            {favorites.length === 0 && (
              <ListItem>
                <ListItemText primary={<span style={{ color: '#A0AEC0' }}>No favorites yet.</span>} />
              </ListItem>
            )}
          </List>
        </Box>
      </Box>
    );
  }

  if (role === 'DepartmentHead') {
    return (
      <Box>
        <Typography variant="h4" mb={2} fontWeight={800} color="primary">Department Reports</Typography>
        {reports.length === 0 ? (
          <Typography>No reports available.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Summary</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.summary}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    );
  }

  // Add more role-based report UIs here as needed

  return (
    <Box>
      <Typography variant="h5">Reports</Typography>
      <Typography>No report view implemented for this user type yet.</Typography>
    </Box>
  );
};

export default UserReportsSection;