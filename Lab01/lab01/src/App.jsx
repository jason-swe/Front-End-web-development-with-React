import React, { useState, useEffect } from 'react';
import useDarkMode from './hooks/useDarkMode';
import './App.css';
import lightBg from './assets/lightmode_theme.png';
import darkBg from './assets/darkmode_theme.png';
import darkFlower from './assets/dark.png';
import OrchidModal from './components/OrchidModal';
import Orchids from './pages/Orchids';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import OrchidDetail from './pages/OrchidDetail';
import Contact from './pages/Contact';
import { Navbar, Nav, Container } from 'react-bootstrap';
import axios from 'axios';
import About from './pages/About';
import { auth, provider } from './firebase/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const [darkMode, toggleDarkMode] = useDarkMode(false);
  const [activeNav, setActiveNav] = useState('Home');
  const location = useLocation();
  const [orchids, setOrchids] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrchid, setEditOrchid] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const theme = darkMode ? 'dark' : 'light';
  const bgImage = darkMode ? darkBg : lightBg;

  // Fetch orchids from API
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setOrchids(res.data))
      .catch(err => console.error('Fetch orchids error:', err));
  }, [API_URL]);

  React.useEffect(() => {
    // Cập nhật activeNav dựa trên pathname
    if (location.pathname === '/contact') setActiveNav('Contact');
    else if (location.pathname === '/') setActiveNav('Home');
    // Có thể mở rộng cho các mục khác nếu cần
  }, [location.pathname]);

  // Scroll lên đầu trang mỗi khi chuyển route
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Thêm hàm thêm mới orchid
  const handleAddOrchid = async (data) => {
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      setShowAddModal(false);
      // Reload lại danh sách
      axios.get(API_URL)
        .then(res => setOrchids(res.data));
    } catch (err) {
      alert('Add failed!');
    }
  };

  // Thêm hàm edit orchid
  const handleEditOrchid = (orchid) => {
    setEditOrchid(orchid);
    setShowEditModal(true);
  };
  const handleSaveEditOrchid = async (data) => {
    try {
      await axios.put(`${API_URL}/${data.id}`, data);
      setShowEditModal(false);
      setEditOrchid(null);
      axios.get(API_URL)
        .then(res => setOrchids(res.data));
    } catch (err) {
      alert('Edit failed!');
    }
  };
  // Xóa orchid
  const handleDeleteOrchid = async (orchid) => {
    if (!window.confirm('Are you sure you want to delete this orchid?')) return;
    try {
      await fetch(`${API_URL}/${orchid.id}`, { method: 'DELETE' });
      axios.get(API_URL)
        .then(res => setOrchids(res.data));
    } catch (err) {
      alert('Delete failed!');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      alert('Login failed!');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <>
      {/* Header */}
      <Navbar expand="lg" variant={darkMode ? 'dark' : 'light'} bg={darkMode ? 'dark' : 'light'} fixed="top" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: 0 }}>
        <Container fluid style={{ padding: '0 48px' }}>
          <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 36, color: '#F7B6C2' }}>❀</span>
            <span style={{ fontWeight: 700, fontSize: 32, color: '#F7B6C2' }}>FER202</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <Nav className="me-auto" style={{ alignItems: 'center', gap: 8, fontFamily: 'Montserrat, sans-serif', fontWeight: 400, fontSize: 16 }}>
              <Nav.Link as={Link} to="/" active={activeNav === 'Home'} onClick={() => setActiveNav('Home')} style={{ color: activeNav === 'Home' ? '#F7B6C2' : undefined, fontWeight: 400 }}>Home</Nav.Link>
              <Nav.Link as={Link} to="#" active={activeNav === 'Shop'} onClick={() => setActiveNav('Shop')} style={{ color: activeNav === 'Shop' ? '#F7B6C2' : undefined, fontWeight: 400 }}>Shop</Nav.Link>
              <Nav.Link as={Link} to="#" active={activeNav === 'Product'} onClick={() => setActiveNav('Product')} style={{ color: activeNav === 'Product' ? '#F7B6C2' : undefined, fontWeight: 400 }}>Product</Nav.Link>
              <Nav.Link as={Link} to="#" active={activeNav === 'Blog'} onClick={() => setActiveNav('Blog')} style={{ color: activeNav === 'Blog' ? '#F7B6C2' : undefined, fontWeight: 400 }}>Blog</Nav.Link>
              <Nav.Link as={Link} to="#" active={activeNav === 'Pages'} onClick={() => setActiveNav('Pages')} style={{ color: activeNav === 'Pages' ? '#F7B6C2' : undefined, fontWeight: 400 }}>Pages</Nav.Link>
              <Nav.Link as={Link} to="/contact" active={activeNav === 'Contact'} onClick={() => setActiveNav('Contact')} style={{ color: activeNav === 'Contact' ? '#F7B6C2' : undefined, fontWeight: 400 }}>Contact</Nav.Link>
            </Nav>
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginLeft: 24 }}>
              <button onClick={toggleDarkMode} style={{
                marginLeft: 16,
                background: 'none',
                border: '1px solid #F7B6C2',
                borderRadius: 20,
                padding: '4px 16px',
                color: darkMode ? '#fff' : '#222',
                cursor: 'pointer',
                fontWeight: 600
              }}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <div style={{ marginLeft: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                {user ? (
                  <>
                    <img src={user.photoURL} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '2px solid #F7B6C2' }} />
                    <span style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8', fontSize: 16 }}>{user.displayName}</span>
                    <button onClick={handleLogout} style={{ background: '#F7B6C2', color: '#222', border: 'none', borderRadius: 8, padding: '4px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginLeft: 4 }}>Logout</button>
                  </>
                ) : (
                  <button onClick={handleGoogleLogin} style={{ background: '#F7B6C2', color: '#222', border: 'none', borderRadius: 8, padding: '4px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Login with Google</button>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Landing Page và About Section chỉ hiện khi không phải trang details, contact hoặc about */}
      {!(location.pathname.startsWith('/orchid/') || location.pathname === '/contact' || location.pathname === '/about') && (
        <>
          <div className={`landing-page ${theme}`} style={{
            minHeight: '100vh',
            background: `url(${bgImage}) center/cover no-repeat`,
            color: darkMode ? '#fff' : '#222',
            transition: 'background 0.5s, color 0.5s',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 90,
            boxSizing: 'border-box',
          }}>
            <main style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              minHeight: '80vh',
              paddingLeft: 100,
              width: '100vw',
              boxSizing: 'border-box',
              maxWidth: '100vw',
              paddingTop: 24
            }}>
              <div style={{ fontSize: 20, color: '#F7B6C2', marginBottom: 12, fontWeight: 500 }}>
                | Hot Flower
              </div>
              <h1 style={{ fontSize: 64, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                Jason<br />Orchids Gallery
              </h1>
              <p style={{ fontSize: 20, margin: '24px 0 32px 0', color: darkMode ? '#eee' : '#444', maxWidth: 500 }}>
              Discover The Exquisite Beauty Of Premium Orchids Carefully Cultivated By Top Artisans.
              </p>
              <button style={{
                background: '#F7B6C2',
                color: '#222',
                border: 'none',
                borderRadius: 8,
                padding: '16px 40px',
                fontSize: 22,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}>
                Start Shopping
              </button>
            </main>
          </div>
          <section style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 0',
            background: darkMode ? '#181818' : '#fff',
            boxSizing: 'border-box',
            minHeight: 500,
            gap: 60,
          }}>
            {/* ảnh hoa bên trái */}
            <div style={{
              background: '#f8e8ef',
              borderRadius: 24,
              padding: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
              minWidth: 340,
              minHeight: 400,
              border: '4px dashed #C9A4D8',
            }}>
              <img src="https://cdn.pixabay.com/photo/2023/02/04/21/32/flowers-7768218_1280.jpg" alt="flower" style={{ width: 400, height: 460, objectFit: 'cover', borderRadius: 16 }} />
            </div>
            {/* phần content ben phải */}
            <div style={{ maxWidth: 600 }}>
              <div style={{ color: '#C9A4D8', fontSize: 22, fontWeight: 500, marginBottom: 8 }}>About Us</div>
              <h2 style={{ fontSize: 48, fontWeight: 800, margin: 0, marginBottom: 24, color: darkMode ? '#fff' : '#222' }}>
              The Art of Orchid Elegance
              </h2>
              <p style={{ fontSize: 18, color: darkMode ? '#eee' : '#444', marginBottom: 12 }}>
              Our nursery is dedicated to cultivating and delivering exquisite orchids across the city. With specialized growing techniques and careful handling, we ensure each orchid reaches you in perfect bloom. Our experienced horticulturists and premium varieties guarantee nature's finest artistry.
              </p>
              <p style={{ fontSize: 18, color: darkMode ? '#eee' : '#444', marginBottom: 12 }}>
              We combine traditional knowledge with modern cultivation methods to bring you vibrant, healthy orchids that last. From rare species to beloved classics, each plant is nurtured with passion and expertise.
              </p>
              <p style={{ fontSize: 18, color: darkMode ? '#eee' : '#444', marginBottom: 32 }}>
              Carefully packaged to preserve delicate blooms during delivery
              </p>
              <button
                style={{
                  background: '#F7B6C2',
                  color: '#222',
                  border: 'none',
                  borderRadius: 8,
                  padding: '16px 40px',
                  fontSize: 22,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}
                onClick={() => navigate('/about')}
              >
                Know More About Us
              </button>
            </div>
          </section>
        </>
      )}

      <Routes>
        <Route path="/" element={
          <section style={{
            width: '100%',
            background: darkMode ? 'linear-gradient(135deg, #1a1122 60%, #2a183a 100%)' : 'linear-gradient(135deg, #fff 60%, #f8e8ef 100%)',
            padding: '60px 0 80px 0',
            boxSizing: 'border-box',
            minHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h2 style={{
              fontSize: 48,
              fontWeight: 800,
              color: darkMode ? '#fff' : '#222',
              marginBottom: 8,
              fontFamily: 'Montserrat, sans-serif',
            }}>Featured Categories</h2>
            <p style={{
              color: darkMode ? '#eee' : '#444',
              fontSize: 18,
              marginBottom: 40,
              maxWidth: 600,
              textAlign: 'center',
            }}>
              Discover the exquisite beauty of our handpicked orchid varieties, each cultivated with care to bring nature's elegance into your home. From rare species to timeless classics, find the perfect bloom to inspire your space            </p>
            <div style={{ width: '90%', maxWidth: 1200, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link to="/special" style={{ textDecoration: 'none' }}>
                  <button className="btn" style={{ fontWeight: 600, border: '2px solid #F7B6C2', color: '#F7B6C2', background: 'transparent' }}>Special</button>
                </Link>
                <Link to="/naturals" style={{ textDecoration: 'none' }}>
                  <button className="btn" style={{ fontWeight: 600, border: '2px solid #F7B6C2', color: '#F7B6C2', background: 'transparent' }}>Naturals</button>
                </Link>
              </div>


              {

                // Nếu chưa đăng nhập (user == null) thì KHÔNG hiển thị nút Add Orchid
                // Nếu đã đăng nhập (user != null) thì HIỆN nút Add Orchid
              
              user && (
                <div>
                  <button className="btn" style={{ fontWeight: 600, border: '2px solid #4CAF50', color: '#4CAF50', background: 'transparent', marginLeft: 16 }} onClick={() => setShowAddModal(true)}>
                    + Add Orchid
                  </button>
                </div>
              )}

                
              {/* // Nếu đã đăng nhập (user != null): truyền props onEdit, onDelete cho Orchids => hiện nút Edit/Delete trên từng card
              // Nếu chưa đăng nhập: KHÔNG truyền onEdit, onDelete => Orchids.jsx sẽ không render nút Edit/Delete
              // => Chỉ user đăng nhập mới có quyền CRUD */}

            </div>
            <Orchids 
              orchids={orchids} 
              darkMode={darkMode} 
              onDetails={orchid => {
                const nav = document.createElement('a');
                nav.href = `/orchid/${orchids.indexOf(orchid)}`;
                nav.click();
              }}
              {...(user ? { onEdit: handleEditOrchid, onDelete: handleDeleteOrchid } : {})}
            />

              {/* / Chỉ hiển thị modal Add/Edit khi đã đăng nhập (user != null)
              // Nếu user == null: KHÔNG render OrchidModal (Add/Edit)
              // Nếu user != null: render OrchidModal để thao tác CRUD
              //  */}
              
            {user && <OrchidModal open={showAddModal} onClose={() => setShowAddModal(false)} darkMode={darkMode} onSave={handleAddOrchid} />}
            {user && <OrchidModal open={showEditModal} onClose={() => { setShowEditModal(false); setEditOrchid(null); }} darkMode={darkMode} orchid={editOrchid} onSave={handleSaveEditOrchid} />}
          </section>
        } />
        <Route path="/naturals" element={
          <section style={{
            width: '100%',
            background: darkMode ? 'linear-gradient(135deg, #1a1122 60%, #2a183a 100%)' : 'linear-gradient(135deg, #fff 60%, #f8e8e8 100%)',
            padding: '60px 0 80px 0',
            boxSizing: 'border-box',
            minHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, color: darkMode ? '#fff' : '#222', marginBottom: 8 }}>Natural Orchids</h2>
            <Orchids 
              orchids={orchids.filter(o => o.isNatural)} 
              darkMode={darkMode} 
              onDetails={orchid => {
                const nav = document.createElement('a');
                nav.href = `/orchid/${orchids.indexOf(orchid)}`;
                nav.click();
              }}
            />
          </section>
        } />
        <Route path="/special" element={
          <section style={{
            width: '100%',
            background: darkMode ? 'linear-gradient(135deg, #1a1122 60%, #2a183a 100%)' : 'linear-gradient(135deg, #fff 60%, #f8e8e8 100%)',
            padding: '60px 0 80px 0',
            boxSizing: 'border-box',
            minHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <h2 style={{ fontSize: 44, fontWeight: 800, color: darkMode ? '#fff' : '#222', marginBottom: 8 }}>Special Orchids</h2>
            <Orchids 
              orchids={orchids.filter(o => o.isSpecial)} 
              darkMode={darkMode} 
              onDetails={orchid => {
                const nav = document.createElement('a');
                nav.href = `/orchid/${orchids.indexOf(orchid)}`;
                nav.click();
              }}
            />
          </section>
        } />
        <Route path="/orchid/:id" element={<OrchidDetail darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="/about" element={<About darkMode={darkMode} />} />
      </Routes>

      {/* Footer Section */}
      <footer style={{
        width: '100%',
        background: 'linear-gradient(135deg, #1a1122 60%, #2a183a 100%)',
        color: '#fff',
        padding: '60px 0 0 0',
        fontFamily: 'Montserrat, sans-serif',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 48px',
          flexWrap: 'wrap',
          gap: 32,
        }}>
          {/* Logo + Desc + Social */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ fontSize: 36, color: '#fff' }}>❀</span>
              <span style={{ fontWeight: 700, fontSize: 32, color: '#fff' }}>UX/UI Design</span>
            </div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 24, maxWidth: 340 }}>
              More Than 1000 Orchids For The Sale.
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="#" style={{ background: '#F7B6C2', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, textDecoration: 'none' }}><i className="fa fa-facebook" style={{ color: '#fff' }}>f</i></a>
              <a href="#" style={{ background: '#F7B6C2', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, textDecoration: 'none' }}><i className="fa fa-twitter" style={{ color: '#fff' }}>t</i></a>
              <a href="#" style={{ background: '#F7B6C2', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, textDecoration: 'none' }}><i className="fa fa-linkedin" style={{ color: '#fff' }}>in</i></a>
            </div>
          </div>


          {/* Company */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Company</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>Home</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>Services</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>Features</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>About Us</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>Contact</div>
          </div>


          {/* Contact Us */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Contact Us</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>+84 91234567</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>www.orchids.com</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>quanho17082005@gmail.com</div>
            <div style={{ color: '#ccc', fontSize: 18, marginBottom: 10 }}>FPT University</div>
          </div>

          
          {/* Subscribe */}
          <div style={{ flex: 1.5, minWidth: 320 }}>
            <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Get the latest information from us</div>
            <form style={{ display: 'flex', maxWidth: 400 }} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Enter Your Email" style={{

                flex: 1,
                padding: '14px 18px',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                fontSize: 18,
                outline: 'none',
              }} />

              <button type="submit" style={{
                background: '#F7B6C2',
                color: '#222',
                border: 'none',
                borderRadius: '0 8px 8px 0',
                fontWeight: 700,
                fontSize: 20,
                padding: '0 36px',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}>Send</button>
            </form>
          </div>
        </div>
        <div style={{
          borderTop: '1px solid #3a2a4a',
          marginTop: 48,
          padding: '24px 48px 18px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1400,
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#ccc',
          fontSize: 16,
          flexWrap: 'wrap',
        }}>
          <div>Copyright ©2025 FER202. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: 16 }}>Terms & Conditions</a>
            <a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: 16 }}>Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
