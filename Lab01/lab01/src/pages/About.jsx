import React from 'react';

function About({ darkMode }) {
  return (
    <div style={{
      minHeight: '80vh',
      background: darkMode ? '#181818' : '#fff',
      color: darkMode ? '#fff' : '#222',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 120,
      fontFamily: 'Montserrat, sans-serif',
      padding: '48px 16px',
    }}>
      <h2 style={{ fontSize: 44, fontWeight: 800, marginBottom: 24, color: '#F7B6C2' }}>About Floral Haven</h2>
      <div style={{ maxWidth: 700, fontSize: 20, lineHeight: 1.7, color: darkMode ? '#ccc' : '#444', textAlign: 'center', marginBottom: 32 }}>
        Floral Haven is a gathering place for orchid lovers and the art of flower cultivation. We offer rare and exquisite orchid varieties, nurtured by experienced artisans who blend traditional techniques with modern technology.

        Our mission is to spread the beauty of nature, making it easy for everyone to access and own the most stunning orchids. The Floral Haven team is dedicated to serving customers with unwavering quality and creativity.

        Join us in exploring the vibrant world of orchids and experiencing the most heartfelt service!
      </div>
      <div style={{ fontSize: 18, color: darkMode ? '#F7B6C2' : '#C9A4D8', fontWeight: 600 }}>
        "Elevate your living space with the natural beauty of exquisite orchids."
      </div>
    </div>
  );
}

export default About; 