import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrchidDetail({ darkMode }) {
  const { id } = useParams(); // useParams() lấy id từ URL
  const navigate = useNavigate();
  const [orchid, setOrchid] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    // Lấy tất cả orchids và tìm theo index
    axios.get(API_URL)
      .then(res => {
        const orchidIndex = parseInt(id); // goij id là index của orchid trong mảng
        if (orchidIndex >= 0 && orchidIndex < res.data.length) {
          setOrchid(res.data[orchidIndex]);
        } else {
          setError('Orchid not found.');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load orchid data.');
        setLoading(false);
      });
  }, [API_URL, id]);

  if (loading) return <div style={{ color: darkMode ? '#fff' : '#222', padding: 40 }}>Loading...</div>;
  if (error || !orchid) return <div style={{ color: darkMode ? '#fff' : '#222', padding: 40 }}>{error || 'Orchid not found.'}</div>;

  return (
    <div style={{
      background: darkMode ? '#181818' : '#fff',
      color: darkMode ? '#fff' : '#222',
      fontFamily: 'Montserrat, sans-serif',
      padding: '40px 0',
      minHeight: '60vh',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      paddingTop: 90,
    }}>

      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: 110,
          left: 32,
          background: 'none',
          border: '2px solid #F7B6C2',
          color: darkMode ? '#fff' : '#222',
          borderRadius: 8,
          padding: '8px 20px',
          fontSize: 18,
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 2,
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = '#F7B6C2';
          e.currentTarget.style.color = '#222';
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'none';
          e.currentTarget.style.color = darkMode ? '#fff' : '#222';
        }}
      >
        ← Back 
      </button>
      <div style={{
        background: darkMode ? '#23232b' : '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
        padding: 32,
        minWidth: 320,
        maxWidth: 900,
        width: '90vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 40,
      }}>
        {/* Left: Image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={orchid.image} alt={orchid.name} style={{ width: 280, height: 380, objectFit: 'cover', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }} />
        </div>
        {/* Right: Info */}
        <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontWeight: 800, fontSize: 32, margin: '8px 0 18px 0', textAlign: 'left' }}>{orchid.name}</h2>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Origin:</b> {orchid.origin}</div>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Category:</b> {orchid.category}</div>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Color:</b> {orchid.color}</div>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Rating:</b> {orchid.rating} / 5</div>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Special:</b> {orchid.isSpecial ? 'Yes' : 'No'}</div>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Natural:</b> {orchid.isNatural ? 'Yes' : 'No'}</div>
          <div style={{ fontSize: 18, marginBottom: 10 }}><b>Likes:</b> {orchid.numberOfLike}</div>
        </div>
      </div>
    </div>
  );
}

export default OrchidDetail; 