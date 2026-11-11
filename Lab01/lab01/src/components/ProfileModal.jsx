import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function ProfileModal({ open, onClose, user, darkMode, onSave }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { displayName: user?.displayName || '', phone: user?.phone || '' },
    validationSchema: Yup.object({ displayName: Yup.string().trim().required(), phone: Yup.string().matches(/^[0-9+() -]*$/, 'Invalid phone') }),
    onSubmit: onSave,
  });

  if (!user) return null;

  return (
    <Modal show={open} onHide={onClose} centered contentClassName={darkMode ? 'bg-dark text-light' : ''}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton closeVariant={darkMode ? 'white' : undefined}>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="displayName" required value={formik.values.displayName} onChange={formik.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={formik.values.phone} onChange={formik.handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" style={{ background: '#F7B6C2', border: 0, color: '#222' }}>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProfileModal;
