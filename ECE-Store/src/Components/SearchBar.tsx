import React from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChange,
    placeholder = "Search...",
}) => {
    return (
        <Paper
            component="form"
            elevation={0}
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 500,
                borderRadius: 28,
                background: 'linear-gradient(90deg, #f8fafc 60%, #e0e7ef 100%)',
                boxShadow: '0 2px 12px rgba(44,62,80,0.07)',
                border: '1.5px solid #e5e8eb',
                transition: 'box-shadow 0.2s, border 0.2s',
                minHeight: 48,
            }}
        >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon sx={{ color: '#2563eb' }} />
            </IconButton>

            <InputBase
                sx={{ ml: 1, flex: 1, color: '#22223B', fontSize: 18, fontWeight: 500 }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
            />

            {value && (
                <IconButton
                    type="button"
                    sx={{
                        p: '10px',
                        color: '#2563eb',
                        bgcolor: '#e0e7ff',
                        borderRadius: '50%',
                        '&:hover': {
                            bgcolor: '#c5d0ff',
                        },
                        boxShadow: '0 1px 4px rgba(37,99,235,0.08)',
                    }}
                    aria-label="clear"
                    onClick={() => onChange('')}
                >
                    <CloseIcon />
                </IconButton>
            )}
        </Paper>
    );
};

export default SearchBar;