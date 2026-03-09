import React from "react";
import "./createContactPage.scss";
import { useNavigate } from "react-router-dom";

// context
import { useContacts } from "../../context/ContactContext";

import ContactForm from "../../components/forms/ContactForm";

const CreateContactPage = () => {
  const { addContact } = useContacts();
  const navigate = useNavigate();

  const handleAddContact = async (contactData) => {
    const success = await addContact(contactData);
    if (success) {
      navigate("/"); // Redirect to Home Page after successful creation
    }
  };

  return (
    <div className="create_contactPpage">
      <main className="container">
        <div className="form_wrapper">
          <ContactForm
            onSubmit={handleAddContact}
            onCancel={() => navigate("/")}
          />
        </div>
      </main>
    </div>
  );
};

export default CreateContactPage;
