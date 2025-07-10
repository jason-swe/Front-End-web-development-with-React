import React from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function Orchids({ orchids, darkMode, onDetails, onEdit, onDelete }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: 32,
      width: '90%',
      maxWidth: 1200,
      margin: '0 auto',
    }}>
      {orchids.map((orchid) => (
        <div key={orchid.id} style={{
          background: darkMode ? '#23232b' : '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 18px 24px 18px',
          minHeight: 420,
          border: '1.5px solid #f3e0e7',
          transition: 'box-shadow 0.2s',
          position: 'relative',
        }}>
          <img src={orchid.image} alt={orchid.name} style={{ width: 180, height: 200, objectFit: 'cover', marginBottom: 12, borderRadius: 16 }} />
          <div style={{ fontWeight: 700, fontSize: 20, color: darkMode ? '#fff' : '#222', marginBottom: 6, fontFamily: 'Montserrat, sans-serif', textAlign: 'center' }}>{orchid.name}</div>
          <div style={{ fontSize: 14, color: darkMode ? '#eee' : '#444', marginBottom: 4, textAlign: 'left', width: '100%' }}><b>Origin:</b> {orchid.origin}</div>
          <div style={{ fontSize: 14, color: darkMode ? '#eee' : '#444', marginBottom: 4, textAlign: 'left', width: '100%' }}><b>Color:</b> {orchid.color}</div>
          <div style={{ fontSize: 14, color: darkMode ? '#eee' : '#444', marginBottom: 4, textAlign: 'left', width: '100%' }}><b>Category:</b> {orchid.category}</div>
          <div style={{ fontSize: 14, color: darkMode ? '#eee' : '#444', marginBottom: 4, textAlign: 'left', width: '100%' }}><b>Rating:</b> {orchid.rating} / 5</div>
          <div style={{ fontSize: 14, color: darkMode ? '#eee' : '#444', marginBottom: 4, textAlign: 'left', width: '100%' }}><b>Special:</b> {orchid.isSpecial ? 'Yes' : 'No'}</div>
          <div style={{ fontSize: 14, color: darkMode ? '#eee' : '#444', marginBottom: 12, textAlign: 'left', width: '100%' }}><b>Natural:</b> {orchid.isNatural ? 'Yes' : 'No'}</div>
          <button
            style={{
              background: darkMode ? '#23232b' : '#fff',
              color: darkMode ? '#fff' : '#222',
              border: '2px solid #F7B6C2',
              borderRadius: 8,
              padding: '10px 0',
              fontSize: 18,
              fontWeight: 600,
              width: '100%',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
              marginTop: 'auto',
              fontFamily: 'Montserrat, sans-serif',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = '#F7B6C2';
              e.currentTarget.style.color = '#222';
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = darkMode ? '#23232b' : '#fff';
              e.currentTarget.style.color = darkMode ? '#fff' : '#222';
            }}
            onClick={() => onDetails(orchid)}
          >
            Details
          </button>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 14, width: '100%' }}>
            {onEdit && (
              <button
                title="Edit"
                onClick={() => onEdit(orchid)}
                style={{
                  background: 'rgba(247,182,194,0.10)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transition: 'background 0.2s',
                  color: darkMode ? '#F7B6C2' : '#C9A4D8',
                  outline: 'none',
                  padding: 0,
                }}
                onMouseOver={e => e.currentTarget.style.background = '#F7B6C2'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(247,182,194,0.10)'}
              >
                <EditOutlinedIcon style={{ fontSize: 22 }} />
              </button>
            )}
            {onDelete && (
              <button
                title="Delete"
                onClick={() => onDelete(orchid)}
                style={{
                  background: 'rgba(255,77,79,0.10)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                  transition: 'background 0.2s',
                  color: '#ff4d4f',
                  outline: 'none',
                  padding: 0,
                }}
                onMouseOver={e => e.currentTarget.style.background = '#ff4d4f'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,77,79,0.10)'}
              >
                <DeleteOutlineIcon style={{ fontSize: 22 }} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orchids; 