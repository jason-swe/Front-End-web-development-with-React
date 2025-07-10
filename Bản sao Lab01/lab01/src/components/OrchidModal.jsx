import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function OrchidModal({ open, onClose, orchid, darkMode, onSave }) {
  const isEdit = Boolean(orchid);
  const [form, setForm] = useState({
    name: '',
    image: '',
    origin: '',
    category: '',
    color: '',
    rating: 5,
    isSpecial: false,
    isNatural: false,
    numberOfLike: 0,
  });

  useEffect(() => {
    if (orchid) setForm(orchid);
    else setForm({
      name: '', image: '', origin: '', category: '', color: '', rating: 5, isSpecial: false, isNatural: false, numberOfLike: 0
    });
  }, [orchid, open]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <Modal show={open} onHide={onClose} centered size="lg" backdrop="static" contentClassName={darkMode ? 'bg-dark text-light' : ''}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton closeVariant={darkMode ? 'white' : undefined} style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <Modal.Title style={{ fontWeight: 800, fontSize: 28, color: '#F7B6C2', letterSpacing: 1 }}>{isEdit ? 'Edit Orchid' : 'Add Orchid'}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          borderRadius: 18,
          boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
          padding: '32px 16px 8px 16px',
          background: darkMode ? '#23232b' : '#fff',
        }}>


          <div style={{ flex: 1, minWidth: 220 }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Image URL</Form.Label>
              <Form.Control name="image" value={form.image} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Origin</Form.Label>
              <Form.Control name="origin" value={form.origin} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Category</Form.Label>
              <Form.Control name="category" value={form.category} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Color</Form.Label>
              <Form.Control name="color" value={form.color} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Rating</Form.Label>
              <Form.Control name="rating" type="number" min={1} max={5} value={form.rating} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>
            <Form.Group className="mb-3" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Form.Check type="checkbox" label="Special" name="isSpecial" checked={form.isSpecial} onChange={handleChange} style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8', fontSize: 18 }} />
              <Form.Check type="checkbox" label="Natural" name="isNatural" checked={form.isNatural} onChange={handleChange} style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8', fontSize: 18 }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 600, color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>Likes</Form.Label>
              <Form.Control name="numberOfLike" type="number" min={0} value={form.numberOfLike} onChange={handleChange} required style={{ borderRadius: 10, fontSize: 18, padding: '10px 14px', background: darkMode ? '#181818' : '#f8e8ef', color: darkMode ? '#fff' : '#222', border: '1.5px solid #F7B6C2' }} />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none', paddingTop: 0, display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
          <Button variant={darkMode ? 'light' : 'secondary'} onClick={onClose} type="button" style={{ borderRadius: 8, fontWeight: 600, padding: '8px 32px', fontSize: 18, border: '1.5px solid #F7B6C2', background: darkMode ? '#23232b' : '#fff', color: darkMode ? '#F7B6C2' : '#C9A4D8' }}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" style={{ borderRadius: 8, fontWeight: 700, padding: '8px 32px', fontSize: 18, background: '#F7B6C2', border: 'none', color: '#222', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default OrchidModal; 