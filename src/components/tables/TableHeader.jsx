import "./_tables.scss";
import { useNavigate } from "react-router-dom";

// context
import { useContacts } from "../../context/ContactContext";

const TableHeader = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useContacts();

  return (
    <div className="table_header">
      <h2>All Contacts</h2>

      <form className="search_box" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn--secondary">
          Search
        </button>
      </form>

      <button
        className="btn btn--primary"
        onClick={() => navigate("/add-contact")}
      >
        Add new contact
      </button>
    </div>
  );
};

export default TableHeader;
