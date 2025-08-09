import React from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

const roles = [
    { value: 'ARA', label: 'ARA' },
    { value: 'Lecturer', label: 'Lecturer' },
    { value: 'DepartmentHead', label: 'Department Head' },
    { value: 'Student', label: 'Student' },
    { value: 'StoreManager', label: 'Store Manager' },
];

const RoleSelector: React.FC<{ onChange: (role: string) => void }> = ({ onChange }) => {
    const [selectedRole, setSelectedRole] = React.useState('');

const handleRoleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value as string; // Assert the value as a string
        setSelectedRole(value);
        onChange(value);
    };


    return (
        <FormControl fullWidth size="small">
            <InputLabel id="role-selector-label">Role</InputLabel>
            <Select
                labelId="role-selector-label"
                id="role-selector"
                value={selectedRole}
                label="Role"
                onChange={handleRoleChange}
            >
                <MenuItem value="">
                    <em>Select Role</em>
                </MenuItem>
                {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                        {role.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RoleSelector;