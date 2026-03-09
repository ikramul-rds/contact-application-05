import React from "react";
import "./_modals.scss";

// components
import Modal from "./Modal";

const ViewContactModal = ({ isOpen, onClose, contact, onEdit, onDelete }) => {
  if (!contact) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="view-contact">
        <h2>Contact Details</h2>
        <div className="contact-info mt-4">
          <p>
            <strong>First Name:</strong> {contact.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {contact.lastName}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.phone}
          </p>
        </div>
        <div className="form-actions mt-4">
          <button
            className="btn btn--primary"
            onClick={() => {
              onClose();
              onEdit(contact);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn--danger"
            onClick={() => {
              onClose();
              onDelete(contact);
            }}
          >
            Delete
          </button>
          <button className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewContactModal;
