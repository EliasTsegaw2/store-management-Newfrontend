import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    Tabs,
    Tab,
    CircularProgress,
    LinearProgress,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SelectChangeEvent } from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import InventoryTable from '../Components/InventoryTable';
import SearchBar from '../Components/SearchBar';
import MaintenanceSection from '../Components/MaintenanceSection';
import UserRoleReports from '../Components/UserRoleReports';

// --- Type Definitions ---
type InventoryItem = {
    _id: string;
    name: string;
    model: string;
    total: number;
    available: number;
    type: string;
    condition: string;
    location: { building: string; room: string; shelf: string } | string;
    description: string;
    lastMaintenance?: string;
    imageUrl?: string;
};

type ApprovedRequest = {
    _id: string;
    requestedBy?: {
        name?: string;
        username?: string;
    };
    components: Array<{
        productId?: {
            name?: string;
            model?: string;
            _id?: string;
        };
        quantity: number;
    }>;
    createdAt: string;
    dispatched?: boolean;
};

type ItemFormState = {
    name: string;
    model: string;
    total: number;
    available: number;
    type: string;
    condition: string;
    location: {
        building: string;
        room: string;
        shelf: string;
    };
    description: string;
    lastMaintenance: string;
    imageUrl: string;
};

type UserRole = 'DepartmentHead' | 'Student' | 'Lecturer' | 'ARA' | 'SARA' | 'StoreManager';
const allowedRoles: UserRole[] = ['DepartmentHead', 'Student', 'Lecturer', 'ARA', 'SARA', 'StoreManager'];

// --- Styled Components ---
const MainContent = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: theme.spacing(4),
    backgroundColor: 'transparent',
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: 1100,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[8],
    padding: theme.spacing(5),
    minHeight: 600,
    display: 'flex',
    flexDirection: 'column',
}));

// --- Component Start ---
const StoreManagerPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // --- State Hooks ---
    const [tab, setTab] = useState<string>('inventory');
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [approvedRequests, setApprovedRequests] = useState<ApprovedRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [limit] = useState(20);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addError, setAddError] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [locationFilter, setLocationFilter] = useState('All');
    const [condition, setCondition] = useState('All');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [dispatchingId, setDispatchingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<ItemFormState>({
        name: '',
        model: '',
        total: 0,
        available: 0,
        type: '',
        condition: '',
        location: { building: '', room: '', shelf: '' },
        description: '',
        imageUrl: '',
        lastMaintenance: '',
    });

    const [role, setRole] = useState<UserRole | undefined>(undefined);

    // --- Effects ---
    // Initial role check from localStorage
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const user = JSON.parse(storedUser);
                if (user.role && allowedRoles.includes(user.role)) {
                    setRole(user.role);
                }
            }
        } catch {
            console.error('Failed to parse user data from localStorage.');
        }
    }, []);

    // Sync tab state with URL query parameter
    useEffect(() => {
        const queryTab = new URLSearchParams(location.search).get('tab');
        const allowedTabs = ['inventory', 'approved', 'ara', 'maintenance', 'reports'];
        const initialTab = queryTab && allowedTabs.includes(queryTab) ? queryTab : 'inventory';
        setTab(initialTab);
    }, [location.search]);

    // Dynamic Options for Filters - Correctly handles initial empty inventory array
    const categoryOptions = ['All', ...Array.from(new Set(inventory?.map((i) => i.model)))];
    const locationOptions = [
        'All',
        ...Array.from(
            new Set(
                inventory
                    ?.map((i) =>
                        typeof i.location === 'object' && i.location !== null
                            ? [i.location.building, i.location.room, i.location.shelf].filter(Boolean).join(' / ')
                            : typeof i.location === 'string'
                                ? i.location
                                : ''
                    )
                    .filter(Boolean)
            )
        ),
    ];
    const conditionOptions = ['All', ...Array.from(new Set(inventory?.map((i) => i.condition).filter(Boolean)))];

    // Fetch inventory data
    useEffect(() => {
        if (tab !== 'inventory') {
            setInventory([]);
            return;
        }

        const fetchInventory = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token not found.');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get<{ items: InventoryItem[]; total: number; }>('/api/inventory', {
                    params: {
                        search,
                        model: category !== 'All' ? category : undefined,
                        place: locationFilter !== 'All' ? locationFilter : undefined,
                        condition: condition !== 'All' ? condition : undefined,
                        page,
                        limit,
                    },
                    headers: { Authorization: `Bearer ${token}` },
                });
                setInventory(res.data.items);
                setTotal(res.data.total);
            } catch (error) {
                console.error('Error fetching inventory:', error);
                setInventory([]);
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, [tab, search, category, locationFilter, condition, page, limit]);

    // Fetch approved requests
    useEffect(() => {
        if (tab !== 'approved') return;
        const fetchApprovedRequests = async () => {
            setLoading(true); // Added loading state for this tab
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token not found.');
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get<ApprovedRequest[]>('/api/requests/approved', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = Array.isArray(res.data) ? res.data : [];
                const sorted = data.sort((a, b) => Number(a.dispatched) - Number(b.dispatched));
                setApprovedRequests(sorted);
            } catch (err) {
                console.error('Failed to load approved requests:', err);
                setApprovedRequests([]);
            } finally {
                setLoading(false);
            }
        };
        fetchApprovedRequests();
    }, [tab]);

    // --- Handlers ---
    const handleTabChange = (_event: React.SyntheticEvent, newTab: string) => {
        setTab(newTab);
        navigate(`?tab=${newTab}`, { replace: true });
        setPage(1);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'total' || name === 'available' ? Number(value) : value,
        }));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: value,
            },
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Name is required.';
        if (!formData.model) newErrors.model = 'Model is required.';
        if (typeof formData.total !== 'number' || formData.total < 0)
            newErrors.total = 'Total must be a non-negative number.';
        if (typeof formData.available !== 'number' || formData.available < 0)
            newErrors.available = 'Available must be a non-negative number.';
        if (!formData.type) newErrors.type = 'Type is required.';
        if (!formData.condition) newErrors.condition = 'Condition is required.';
        return newErrors;
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddError('');
        const validationErrors = validateForm();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            setAddError('Please fill all fields correctly.');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setAddError('Authentication token not found. Please log in.');
                return;
            }
            await axios.post('/api/inventory', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowAddModal(false);
            setFormData({
                name: '',
                model: '',
                total: 0,
                available: 0,
                type: '',
                condition: '',
                location: { building: '', room: '', shelf: '' },
                description: '',
                imageUrl: '',
                lastMaintenance: '',
            });
            setErrors({});
            setPage(1);
        } catch (err) {
            console.error('Failed to add item:', err);
            setAddError('Failed to add item.');
        }
    };

    const handleDispatch = async (id: string) => {
        setDispatchingId(id);
        interface DispatchResponse {
            message: string;
            dispatched: any[];
            backordered: any[];
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Authentication token not found. Please log in.');
                return;
            }
            const res = await axios.post<DispatchResponse>(`/api/requests/${id}/dispatch`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const { message, dispatched, backordered } = res.data;
            let successMsg = `${message}\n\nDispatched Items:\n` + dispatched.map((item: any) =>
                `- ${item.productId?.name || 'Unknown'} (x${item.quantity})`
            ).join('\n');
            if (backordered && backordered.length > 0) {
                successMsg += `\n\nBackordered Items:\n` + backordered.map((item: any) =>
                    `- ${item.name} (Requested: ${item.requested}, Available: ${item.available})`
                ).join('\n');
            }
            alert(successMsg);
            setApprovedRequests(prev => prev.filter(req => req._id !== id));
        } catch (err: any) {
            console.error('Dispatch failed:', err);
            const { error, backordered } = err.response?.data || {};
            let errorMsg = error || 'Dispatch failed. Please try again.';
            if (backordered && Array.isArray(backordered)) {
                errorMsg += `\n\nUnavailable Items:\n` + backordered.map((item: any) =>
                    `- ${item.name} (Requested: ${item.requested}, Available: ${item.available})`
                ).join('\n');
            }
            alert(errorMsg);
        } finally {
            setDispatchingId(null);
        }
    };

    const renderTabContent = () => {
        switch (tab) {
            case 'inventory':
                return (
                    <Box>
                        <Box sx={{ marginBottom: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <SearchBar
                                value={search}
                                onChange={setSearch}
                                placeholder="Search by item name or model number"
                            />
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>Category</InputLabel>
                                <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Category">
                                    {categoryOptions.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt === 'All' ? 'All Categories' : opt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>Location</InputLabel>
                                <Select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} label="Location">
                                    {locationOptions.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt === 'All' ? 'All Locations' : opt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 150 }}>
                                <InputLabel>Condition</InputLabel>
                                <Select value={condition} onChange={(e) => setCondition(e.target.value)} label="Condition">
                                    {conditionOptions.map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt === 'All' ? 'All Conditions' : opt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setShowAddModal(true)}
                                sx={{
                                    background: 'linear-gradient(90deg, #2563eb 60%, #1e40af 100%)',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: 15,
                                    boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
                                    '&:hover': { opacity: 0.9 },
                                }}
                            >
                                Add New Item
                            </Button>
                        </Box>

                        {loading ? (
                            <Box sx={{ textAlign: 'center', padding: 5 }}>
                                <LinearProgress />
                                <Typography sx={{ marginTop: 2 }}>Loading inventory...</Typography>
                            </Box>
                        ) : inventory?.length === 0  ? (
                            <Box sx={{ textAlign: 'center', padding: 5 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No inventory items found.
                                </Typography>
                            </Box>
                        ) : (
                            <>
                                <InventoryTable data={inventory} />
                                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                                    <Button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        variant="outlined"
                                    >
                                        Previous
                                    </Button>
                                    <Typography sx={{ alignSelf: 'center' }}>
                                        Page {page} of {Math.ceil(total / limit) || 1}
                                    </Typography>
                                    <Button
                                        disabled={page >= Math.ceil(total / limit)}
                                        onClick={() => setPage(page + 1)}
                                        variant="outlined"
                                    >
                                        Next
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                );

            // ...inside renderTabContent()
            case 'approved':
                return (
                    <Box>
                        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, fontWeight: 700 }}>
                            Approved Requests from HOD
                        </Typography>
                        {loading ? (
                            <Box sx={{ textAlign: 'center', padding: 5 }}>
                                <LinearProgress />
                                <Typography sx={{ marginTop: 2 }}>Loading approved requests...</Typography>
                            </Box>
                        ) : (
                            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: 'primary.lightest' }}>
                                            <TableCell>Requester</TableCell>
                                            <TableCell>Items</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* THIS IS THE FIXED LINE */}
                                        {approvedRequests?.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    No approved requests found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            approvedRequests?.map((req) => (
                                                <TableRow key={req._id}>
                                                    <TableCell>{req.requestedBy?.name || 'Unknown'}</TableCell>
                                                    <TableCell>
                                                        <ul>
                                                            {req.components.map((item, idx) => (
                                                                <li key={idx}>
                                                                    {item.productId?.name || 'Unnamed Item'} (
                                                                    {item.productId?.model || 'Unknown Model'}) x{item.quantity}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </TableCell>
                                                    <TableCell>{new Date(req.createdAt).toLocaleDateString()}</TableCell>
                                                    <TableCell>
                                                        {req.dispatched ? (
                                                            <Box
                                                                sx={{
                                                                    bgcolor: 'success.light',
                                                                    color: 'success.dark',
                                                                    px: 2,
                                                                    py: 0.5,
                                                                    borderRadius: 2,
                                                                    display: 'inline-block',
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                ✅ Dispatched
                                                            </Box>
                                                        ) : (
                                                            <Button
                                                                onClick={() => handleDispatch(req._id)}
                                                                disabled={dispatchingId === req._id}
                                                                variant="contained"
                                                                size="small"
                                                            >
                                                                {dispatchingId === req._id ? <CircularProgress size={24} color="inherit" /> : 'Dispatch'}
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                );
            // ...
            case 'ara':
                return (
                    <Box>
                        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, fontWeight: 700 }}>
                            Requests from ARA/Lecturers
                        </Typography>
                        {/* The rest of your ARA content goes here */}
                    </Box>
                );

            case 'maintenance':
                return (
                    <Box>
                        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, fontWeight: 700 }}>
                            Maintenance
                        </Typography>
                        <MaintenanceSection />
                    </Box>
                );

            case 'reports':
                return (
                    <UserRoleReports
                        role="StoreManager"
                        data={{
                            'Full Inventory Management': inventory,
                            'Order Processing': approvedRequests,
                            'Maintenance Scheduling': [],
                            'Inventory Statistics': [],
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e3eafc 0%, #f8fafc 100%)',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />
            <Box sx={{ display: 'flex', flex: 1 }}>
                {role ? (
                    <Sidebar
                        active={
                            tab === 'inventory'
                                ? 'Inventory Management'
                                : tab === 'approved'
                                    ? 'Approved Requests'
                                    : tab === 'ara'
                                        ? 'ARA/Lecturer Requests'
                                        : 'Maintenance'
                        }
                        role={role}
                    />
                ) : (
                    <Sidebar role="StoreManager" />
                )}
                <MainContent>
                    <DashboardPaper>
                        <Typography
                            variant="h4"
                            component="h1"
                            gutterBottom
                            sx={{
                                marginBottom: 4,
                                fontSize: 28,
                                fontWeight: 800,
                                color: 'primary.main',
                                letterSpacing: 0.5,
                            }}
                        >
                            Store Manager Dashboard
                        </Typography>
                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            sx={{ marginBottom: 3, borderBottom: 1, borderColor: 'divider' }}
                        >
                            <Tab value="inventory" label="Inventory Management" />
                            <Tab value="approved" label="Approved Requests" />
                            <Tab value="ara" label="ARA/Lecturer Requests" />
                            <Tab value="maintenance" label="Maintenance" />
                            <Tab value="reports" label="Reports" />
                        </Tabs>
                        {renderTabContent()}
                    </DashboardPaper>
                </MainContent>
            </Box>
            <Footer />

            {/* Add Item Modal */}
            <Dialog open={showAddModal} onClose={() => setShowAddModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                            Add New Inventory Item
                        </Typography>
                        <IconButton onClick={() => setShowAddModal(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <form onSubmit={handleAddItem}>
                    <DialogContent dividers>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleFormChange}
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                            <TextField
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleFormChange}
                                required
                                error={!!errors.model}
                                helperText={errors.model}
                            />
                            <TextField
                                label="Total"
                                name="total"
                                type="number"
                                value={formData.total}
                                onChange={handleFormChange}
                                required
                                error={!!errors.total}
                                helperText={errors.total}
                            />
                            <TextField
                                label="Available"
                                name="available"
                                type="number"
                                value={formData.available}
                                onChange={handleFormChange}
                                required
                                error={!!errors.available}
                                helperText={errors.available}
                            />
                            <FormControl fullWidth required error={!!errors.type}>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleSelectChange}
                                    label="Type"
                                >
                                    <MenuItem value="equipment">Equipment</MenuItem>
                                    <MenuItem value="component">Component</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required error={!!errors.condition}>
                                <InputLabel>Condition</InputLabel>
                                <Select
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleSelectChange}
                                    label="Condition"
                                >
                                    {conditionOptions.slice(1).map((opt) => (
                                        <MenuItem key={opt} value={opt}>
                                            {opt}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Building"
                                name="building"
                                value={formData.location.building}
                                onChange={handleLocationChange}
                            />
                            <TextField
                                label="Room"
                                name="room"
                                value={formData.location.room}
                                onChange={handleLocationChange}
                            />
                            <TextField
                                label="Shelf"
                                name="shelf"
                                value={formData.location.shelf}
                                onChange={handleLocationChange}
                            />
                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleFormChange}
                                multiline
                                rows={4}
                            />
                            <TextField
                                label="Last Maintenance Date"
                                name="lastMaintenance"
                                type="date"
                                value={formData.lastMaintenance}
                                onChange={handleFormChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            {addError && <Typography color="error">{addError}</Typography>}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowAddModal(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add Item
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    );
};

export default StoreManagerPage;