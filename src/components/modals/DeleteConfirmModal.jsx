import React from "react";
import "./_modals.scss";

// components
import Modal from "./Modal";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, contactName }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-confirm">
        <h2>Confirm Deletion</h2>
        <p className="mt-4">
          Are you sure you want to delete <strong>{contactName}</strong>?
        </p>
        <div className="form-actions mt-4">
          <button className="btn btn--secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn--danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
