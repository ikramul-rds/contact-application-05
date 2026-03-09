import React from "react";
import "./_tables.scss";

// assets
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";

// context
import { useContacts } from "../../context/ContactContext";

// components
import TableHeader from "./TableHeader";
import FilterSection from "./FilterSection";

const ContactTable = ({ onView, onEdit, onDelete }) => {
  const { filteredContacts, loading, error } = useContacts();
  return (
    <div className="contact_tableContainer">
      <TableHeader />
      <FilterSection />

      {loading ? (
        <div className="table_textBox">
          Loading contacts... <br />
          Please wait as it is a free API and may take some time to start up.
        </div>
      ) : error ? (
        <div className="table_textBox">Error: {error}</div>
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
                        onClick={() => onView(contact)}
                      >
                        <BiShow size={18} />
                      </button>
                      <button
                        className="btn btn--primary btn--sm"
                        onClick={() => onEdit(contact)}
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="btn btn--danger btn--sm"
                        onClick={() => onDelete(contact)}
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
    </div>
  );
};

export default ContactTable;
