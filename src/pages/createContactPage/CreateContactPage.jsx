import React from "react";
import "./createContactPage.scss";
import { useNavigate } from "react-router-dom";

// context
import { useContacts } from "../../context/ContactContext";

import ContactForm from "../../components/forms/ContactForm";

const CreateContactPage = () => {
  const navigate = useNavigate();
  const { addContact } = useContacts();

  const handleAddContact = async (contactData) => {
    const success = await addContact(contactData);
    if (success) {
      navigate("/");
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
