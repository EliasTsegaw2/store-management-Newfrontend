import React, { useState } from 'react';
import { Box, Grid, Card, CardActionArea, Typography, TextField, Avatar, Chip } from '@mui/material';

export interface ComponentItem {
  name: string;
  model: string;
  available: number;
  image?: string;
}

interface ComponentSelectionGridProps {
  data: ComponentItem[];
  selectedModels: string[];
  onSelect: (item: ComponentItem) => void;
}



const ComponentSelectionGrid: React.FC<ComponentSelectionGridProps> = ({
  data,
  selectedModels,
  onSelect,
}) => {
  const [search, setSearch] = useState('');
  const safeData = Array.isArray(data) ? data : [];
  const filtered = safeData.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.model.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ef 100%)',
        borderRadius: 3,
        p: 4,
        boxShadow: 3,
        mx: 'auto',
        maxWidth: 900,
        minWidth: 350,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search component or model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, background: '#fff', borderRadius: 2 }}
      />
      <Grid container spacing={3} justifyContent="center">
        {filtered.length > 0 ? (
          filtered.map((item, idx) => {
            const isSelected = selectedModels.includes(item.model);
            // Use a more unique key if possible (model + idx)
            return (
              <Grid key={item.model + '-' + idx} size={{ xs:12, sm:6, md:4 }}>
                <Card
                  variant={isSelected ? 'elevation' : 'outlined'}
                  sx={{
                    border: isSelected ? '2.5px solid #2563eb' : '1.5px solid #cbd5e1',
                    borderRadius: 3,
                    background: isSelected
                      ? 'linear-gradient(135deg, #e0e7ff 70%, #f0f6ff 100%)'
                      : '#fff',
                    boxShadow: isSelected ? 6 : 1,
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                >
                  <CardActionArea onClick={() => onSelect(item)} sx={{ p: 2 }}>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                      <Avatar
                        src={item.image || '/images/placeholder.png'}
                        alt={item.name}
                        sx={{ width: 70, height: 70, mb: 1, bgcolor: '#f3f6fa', boxShadow: 1 }}
                      />
                      <Typography fontWeight={700} fontSize={15} color="primary.dark" mb={0.5}>
                        {item.name}
                      </Typography>
                      <Chip label={item.model} color={isSelected ? 'primary' : 'default'} size="small" sx={{ mb: 0.5 }} />
                      <Typography fontSize={12} color="text.secondary">
                        <b>Available:</b> {item.available}
                      </Typography>
                      {/* Remove Button to avoid nested <button> warning */}
                      {isSelected && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            bgcolor: 'primary.main',
                            color: '#fff',
                            borderRadius: '50%',
                            width: 22,
                            height: 22,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 700,
                            boxShadow: 2,
                          }}
                          title="Selected"
                        >
                          ✓
                        </Box>
                      )}
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Grid size={{ xs: 12 }}>
            <Typography color="text.secondary" align="center" sx={{ py: 5 }}>
              No components found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ComponentSelectionGrid;