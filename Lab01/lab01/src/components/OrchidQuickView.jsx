import React from 'react';
import { Modal } from 'react-bootstrap';
import OrchidClip from './OrchidClip';

function OrchidQuickView({ orchid, open, onClose, darkMode }) {
  if (!orchid) return null;

  return (
    <Modal show={open} onHide={onClose} centered size="xl" contentClassName={`quick-view-modal ${darkMode ? 'quick-view-dark' : ''}`}>
      <Modal.Header closeButton closeVariant={darkMode ? 'white' : undefined} className="quick-view-header">
        <div>
          <span>ORCHID PREVIEW</span>
          <Modal.Title>{orchid.name}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="quick-view-body">
        <div className="quick-view-image-wrap">
          <img src={orchid.image} alt={orchid.name} />
          <span className="quick-view-category">{orchid.category}</span>
        </div>
        <div className="quick-view-info">
          <p className="quick-view-intro">A closer look at this beautiful orchid variety.</p>
          <p><b>Origin:</b> {orchid.origin}</p>
          <p><b>Category:</b> {orchid.category}</p>
          <p><b>Color:</b> {orchid.color}</p>
          <p><b>Rating:</b> {orchid.rating} / 5</p>
          <p><b>Natural:</b> {orchid.isNatural ? 'Yes' : 'No'}</p>
          <OrchidClip clip={orchid.clip} orchidName={orchid.name} />
        </div>
      </Modal.Body>
      <Modal.Footer className="quick-view-footer">
        <button type="button" className="quick-view-close" onClick={onClose}>Close preview</button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrchidQuickView;
