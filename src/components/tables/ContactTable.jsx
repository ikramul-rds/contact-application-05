import { useState } from "react";
import "./_tables.scss";

// context
import { useContacts } from "../../context/ContactContext";

// components
import TableHeader from "./TableHeader";
import FilterSection from "./FilterSection";
import Modal from "../modals/Modal";
import ViewContactModal from "../modals/ViewContactModal";
import DeleteConfirmModal from "../modals/DeleteConfirmModal";
import ContactForm from "../forms/ContactForm";

// assets
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

const ContactTable = () => {
  const { filteredContacts, loading, error, updateContact, deleteContact } =
    useContacts();

  // Modals state
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEditContact = async (contactData) => {
    const success = await updateContact(contactData);
    if (success) {
      setIsEditOpen(false);
      setSelectedContact(null);
    }
  };

  const handleDeleteContact = async () => {
    if (!selectedContact) return;
    const success = await deleteContact(selectedContact.id);
    if (success) {
      setIsDeleteOpen(false);
      setSelectedContact(null);
    }
  };

  const openViewModal = (contact) => {
    setSelectedContact(contact);
    setIsViewOpen(true);
  };

  const openEditModal = (contact) => {
    setSelectedContact(contact);
    setIsEditOpen(true);
  };

  const openDeleteModal = (contact) => {
    setSelectedContact(contact);
    setIsDeleteOpen(true);
  };

  return (
    <div className="contact_tableContainer">
      <TableHeader />
      <FilterSection />

      {loading ? (
        <div className="table_textBox loading">
          <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          Loading contacts... <br />
          Please wait as it is a free API and may take some time to start up.
        </div>
      ) : error ? (
        <div className="table_textBox error">Error: {error}</div>
      ) : (
        <div className="table-container">
          <table className="contact-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td className="actions-cell flex gap-2">
                      <button
                        className="btn btn--secondary btn--sm"
                        onClick={() => openViewModal(contact)}
                      >
                        <BiShow size={18} />
                      </button>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => openEditModal(contact)}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="btn btn--danger btn--sm"
                        onClick={() => openDeleteModal(contact)}
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center pt-4 pb-4"
                    style={{ textAlign: "center", padding: "2rem 0" }}
                  >
                    No contacts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <ViewContactModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        contact={selectedContact}
        onEdit={(c) => {
          setIsViewOpen(false);
          openEditModal(c);
        }}
        onDelete={(c) => {
          setIsViewOpen(false);
          openDeleteModal(c);
        }}
      />

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <ContactForm
          key={selectedContact?.id || "edit"}
          initialData={selectedContact}
          onSubmit={handleEditContact}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteContact}
        contactName={
          selectedContact
            ? `${selectedContact.firstName} ${selectedContact.lastName}`
            : ""
        }
      />
    </div>
  );
};

export default ContactTable;
