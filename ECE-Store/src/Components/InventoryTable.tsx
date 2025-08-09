import React, { useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Avatar, Typography, Box, Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// --- Interfaces
export interface InventoryItem {
  _id: string;
  name: string;
  model: string;
  available: number;
  image?: string;
  place?: string;
  type: string;
  imageUrl?: string;
  total?: number;
  position?: string;
  description?: string;
  location?: {
    building?: string;
    room?: string;
    shelf?: string;
  } | string;
  condition?: string;
  lastMaintenance?: string;
}

export interface InventoryTableProps {
  data: InventoryItem[] | null;
  onUpdateStock?: (item: InventoryItem) => void;
}

// --- Helper Functions
const formatLocation = (location: InventoryItem['location'], place?: string) => {
  if (typeof location === 'object' && location !== null) {
    const parts = [];
    if (location.building) parts.push(`Building: ${location.building}`);
    if (location.room) parts.push(`Room: ${location.room}`);
    if (location.shelf) parts.push(`Shelf: ${location.shelf}`);
    return parts.length ? parts.join(', ') : 'N/A';
  }
  if (typeof location === 'string' && location) return location;
  if (place) return place;
  return 'N/A';
};

// --- InventoryTable Component
const InventoryTable: React.FC<InventoryTableProps> = ({ data, onUpdateStock }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isStoreManager = user.role === 'StoreManager';
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [editValues, setEditValues] = useState<InventoryItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [viewingItem, setViewingItem] = useState<InventoryItem | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editValues) return;
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditValues({ ...editValues, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (item: InventoryItem) => {
    setEditingItem(item);
    setEditValues({
      ...item,
      lastMaintenance: item.lastMaintenance ? item.lastMaintenance.split('T')[0] : '',
    });
    setImageFile(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editValues) return;
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: name === 'available' ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    if (!editValues || !editValues._id) return;

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();

      formData.append('name', editValues.name);
      formData.append('model', editValues.model);
      formData.append('available', String(editValues.available));
      if (editValues.location) {
        const locationValue =
          typeof editValues.location === 'string'
            ? editValues.location
            : JSON.stringify(editValues.location);
        formData.append('location', locationValue);
      }
      if (editValues.condition) formData.append('condition', editValues.condition);
      if (editValues.lastMaintenance) formData.append('lastMaintenance', editValues.lastMaintenance);
      if (imageFile) formData.append('image', imageFile);

      await axios.put(`/api/inventory/${editValues._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (onUpdateStock) onUpdateStock(editValues);
      setEditingItem(null);
      setEditValues(null);
      setImageFile(null);
    } catch (error) {
      console.error('Failed to save changes:', error);
      alert('Failed to update item. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditValues(null);
    setImageFile(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2, mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Model Number</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Last Maintenance</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography color="text.secondary">No inventory items found.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {item.imageUrl || item.image ? (
                      <Avatar
                        src={item.imageUrl || item.image}
                        alt={item.name}
                        variant="rounded"
                        sx={{ width: 56, height: 56, cursor: 'pointer' }}
                        onClick={() => setZoomedImage(item.imageUrl || item.image || null)}
                      />
                    ) : (
                      <Avatar variant="rounded" sx={{ width: 56, height: 56, bgcolor: 'grey.200' }}>
                        <Typography variant="caption" color="text.secondary">No Image</Typography>
                      </Avatar>
                    )}
                  </TableCell>
                  <TableCell><Typography fontWeight={500}>{item.name}</Typography></TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell>{item.available}</TableCell>
                  <TableCell>{formatLocation(item.location, item.place)}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        bgcolor: item.condition === 'Damaged' ? 'error.light' : 'success.light',
                        color: item.condition === 'Damaged' ? 'error.dark' : 'success.dark',
                        px: 2, py: 0.5, borderRadius: 2, display: 'inline-block', fontWeight: 600, fontSize: 13,
                      }}
                    >
                      {item.condition || 'Unknown'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.lastMaintenance
                      ? new Date(item.lastMaintenance).toLocaleDateString()
                      : <Typography variant="caption" color="text.secondary">N/A</Typography>}
                  </TableCell>
                  <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.description || <Typography variant="caption" color="text.secondary">N/A</Typography>}
                  </TableCell>
                  <TableCell>
                    {isStoreManager && (
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => setViewingItem(item)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Modal */}
      {isStoreManager && editingItem && editValues && (
        <Dialog open onClose={handleCancel} maxWidth="md" fullWidth>
          <DialogTitle>
            Edit Inventory Item
            <IconButton
              aria-label="close"
              onClick={handleCancel}
              sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box display="flex" flexWrap="wrap" gap={3}>
              {/* Left: Image Upload and Preview */}
              <Box flex="1 1 240px" display="flex" flexDirection="column" gap={2}>
                <Typography variant="subtitle1" color="text.secondary">Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                  }}
                />
                {editValues.image && (
                  <Box
                    component="img"
                    src={editValues.image}
                    alt="Preview"
                    sx={{
                      width: '100%',
                      maxHeight: 280,
                      objectFit: 'contain',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      backgroundColor: 'background.paper',
                      mt: 1,
                    }}
                  />
                )}
              </Box>

              {/* Right: Form Fields */}
              <Box flex="2 1 360px" display="flex" flexDirection="column" gap={2}>
                {[
                  ['Name', 'name'],
                  ['Model', 'model'],
                  ['Quantity', 'available', 'number'],
                  ['Location', 'location'],
                  ['Condition', 'condition'],
                  ['Last Maintenance', 'lastMaintenance', 'date'],
                ].map(([labelText, name, type = 'text']) => (
                  <Box key={name} component="label" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {labelText}:
                    <input
                      type={type}
                      name={name}
                      value={(editValues as any)[name] || ''}
                      onChange={handleEditChange}
                      style={{
                        marginTop: 6,
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: '1px solid #CBD5E1',
                        fontSize: 14,
                        width: '100%',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel} variant="outlined" color="inherit">Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* View Modal */}
      <Dialog open={Boolean(viewingItem)} onClose={() => setViewingItem(null)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {viewingItem?.name}
          <IconButton
            aria-label="close"
            onClick={() => setViewingItem(null)}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {viewingItem?.imageUrl || viewingItem?.image ? (
            <Box
              component="img"
              src={viewingItem.imageUrl || viewingItem.image}
              alt={viewingItem.name}
              sx={{ width: '100%', maxHeight: 300, objectFit: 'contain', mb: 2, borderRadius: 1 }}
            />
          ) : null}
          <Typography><strong>Model:</strong> {viewingItem?.model}</Typography>
          <Typography><strong>Quantity Available:</strong> {viewingItem?.available}</Typography>
          <Typography><strong>Location:</strong> {formatLocation(viewingItem?.location, viewingItem?.place)}</Typography>
          <Typography><strong>Condition:</strong> {viewingItem?.condition || 'Unknown'}</Typography>
          <Typography><strong>Last Maintenance:</strong> {viewingItem?.lastMaintenance ? new Date(viewingItem.lastMaintenance).toLocaleDateString() : 'N/A'}</Typography>
          <Typography><strong>Description:</strong> {viewingItem?.description || 'N/A'}</Typography>
        </DialogContent>
      </Dialog>

      {/* Zoomed Image View */}
      {zoomedImage && (
        <Dialog open onClose={() => setZoomedImage(null)} maxWidth="md">
          <Box
            component="img"
            src={zoomedImage}
            alt="Zoomed"
            sx={{
              maxWidth: '100%',
              maxHeight: '80vh',
              borderRadius: 2,
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
            }}
          />
        </Dialog>
      )}
    </>
  );
};

export default InventoryTable;
