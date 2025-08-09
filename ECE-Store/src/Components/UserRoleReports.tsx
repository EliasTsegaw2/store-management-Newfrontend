import React from 'react';
import { Box, Typography, Paper, Grid, Divider, List, ListItem, ListItemText } from '@mui/material';

interface ReportSection {
  title: string;
  items: string[];
}

interface UserRoleReportsProps {
  role: 'ARA' | 'Lecturer' | 'DepartmentHead' | 'StoreManager' | 'Student';
  data: Record<string, any>; // Data for each section, keyed by section name
}

const roleSections: Record<string, ReportSection[]> = {
  ARA: [
    { title: 'Inventory Overview', items: ['List of all components and equipment, with status and availability.'] },
    { title: 'Assigned Inventory', items: ['Items assigned to the ARA for management or maintenance.'] },
    { title: 'Maintenance Tasks', items: ['Scheduled and completed maintenance actions for items under their care.'] },
    { title: 'Personal Requests', items: ['Requests/orders submitted by the ARA, with status tracking.'] },
  ],
  Lecturer: [
    { title: 'Course Inventory', items: ['Inventory available for their courses (components/equipment).'] },
    { title: 'Student Requests', items: ['Requests from students in their courses, with approval/status options if applicable.'] },
    { title: 'Personal Requests', items: ['Requests/orders submitted by the lecturer.'] },
    { title: 'Maintenance Status', items: ['Maintenance logs for items used in their courses.'] },
  ],
  DepartmentHead: [
    { title: 'Department Inventory', items: ['All inventory belonging to their department.'] },
    { title: 'Department Requests', items: ['All requests/orders from users in their department, with approval controls.'] },
    { title: 'Maintenance Logs', items: ['Maintenance history and upcoming schedules for department equipment.'] },
    { title: 'Department Statistics', items: ['Summary stats (total items, requests, maintenance actions).'] },
  ],
  StoreManager: [
    { title: 'Full Inventory Management', items: ['All inventory items, with add/edit/delete capabilities.'] },
    { title: 'Order Processing', items: ['All orders/requests, with dispatch and tracking controls.'] },
    { title: 'Maintenance Scheduling', items: ['Create and track maintenance tasks for all inventory.'] },
    { title: 'Inventory Statistics', items: ['Stock levels, usage rates, and alerts for low stock.'] },
  ],
  Student: [
    { title: 'Available Inventory', items: ['List of items available to request/borrow.'] },
    { title: 'My Requests', items: ['Requests/orders submitted by the student, with status updates.'] },
    { title: 'Borrowed Items', items: ['Items currently checked out by the student.'] },
    { title: 'Maintenance Status', items: ['Maintenance updates for items they have borrowed.'] },
  ],
};

const UserRoleReports: React.FC<UserRoleReportsProps> = ({ role, data }) => {
  const sections = roleSections[role] || [];

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        {role} Reports
      </Typography>
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid size = {{ xs:12, md:6}} key={section.title}>
            <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
              <Typography variant="h6" color="primary" mb={1}>
                {section.title}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Render actual data if available, else show description */}
              {data && data[section.title] ? (
                Array.isArray(data[section.title]) ? (
                  <List>
                    {data[section.title].map((item: any, idx: number) => (
                      <ListItem key={idx}>
                        <ListItemText primary={typeof item === 'string' ? item : JSON.stringify(item)} />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>{JSON.stringify(data[section.title])}</Typography>
                )
              ) : (
                section.items.map((desc, i) => (
                  <Typography key={i} color="text.secondary" fontSize={14}>
                    {desc}
                  </Typography>
                ))
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserRoleReports;
