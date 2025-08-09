import React, { useState } from 'react';

export interface ComponentItem {
  name: string;
  model: string;
  available: number;
}

interface ComponentSelectionTableProps {
  data: ComponentItem[];
  selectedModel: string | null;
  onSelect: (item: ComponentItem) => void;
}

const ComponentSelectionTable: React.FC<ComponentSelectionTableProps> = ({
  data,
  selectedModel,
  onSelect,
}) => {
  const [search, setSearch] = useState('');

  // Filter and limit to 8 items
  const filtered = data
    .filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.model.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 8);

  return (
    <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 24, marginBottom: 32 }}>
      <input
        type="text"
        placeholder="Search component or model..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: 16,
          width: '100%',
          padding: 8,
          borderRadius: 6,
          border: '1px solid #E5E8EB',
        }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#F8FAFC' }}>
            <th style={{ padding: 12, textAlign: 'left', color: '#0D141C', fontWeight: 500 }}>Component Name</th>
            <th style={{ padding: 12, textAlign: 'left', color: '#0D141C', fontWeight: 500 }}>Model Number</th>
            <th style={{ padding: 12, textAlign: 'left', color: '#0D141C', fontWeight: 500 }}>Available</th>
            <th style={{ padding: 12, textAlign: 'center', color: '#4D7399', fontWeight: 500 }}>Select</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item, idx) => (
            <tr
              key={idx}
              style={{
                borderTop: '1px solid #E5E8EB',
                background: selectedModel === item.model ? '#F0F6FF' : undefined,
              }}
            >
              <td style={{ padding: 12 }}>{item.name}</td>
              <td style={{ padding: 12, color: '#4D7399' }}>{item.model}</td>
              <td style={{ padding: 12 }}>{item.available}</td>
              <td style={{ padding: 12, textAlign: 'center' }}>
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  style={{
                    background: selectedModel === item.model ? '#4D7399' : '#E8EDF5',
                    color: selectedModel === item.model ? '#fff' : '#4D7399',
                    border: 'none',
                    borderRadius: 6,
                    padding: '6px 16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {selectedModel === item.model ? 'Selected' : 'Select'}
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', color: '#A0AEC0', padding: 32 }}>
                No components found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ComponentSelectionTable;