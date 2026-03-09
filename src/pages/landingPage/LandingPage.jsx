import { useState } from "react";
import "./landingPage.scss";

// context
import { useContacts } from "../../context/ContactContext";

// components
import ContactTable from "../../components/tables/ContactTable";
import ContactForm from "../../components/forms/ContactForm";
import Modal from "../../components/modals/Modal";
import ViewContactModal from "../../components/modals/ViewContactModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";

const LandingPage = () => {
  const { updateContact, deleteContact } = useContacts();

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
    <div className="landingPage">
      <main className="container">
        <ContactTable
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      </main>

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

export default LandingPage;
