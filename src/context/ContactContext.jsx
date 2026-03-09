import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";

const ContactContext = createContext();

// const API_URL = "http://localhost:3000/contacts";
const API_URL = "http://localhost:8888/.netlify/functions/api/contacts"; // Netlify Functions endpoint

const initialState = {
  contacts: [],
  searchQuery: "",
  filterMethod: "",
  loading: true, // Initialize to true to avoid flicker/cascading update
  error: null,
};

function contactReducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, contacts: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "SET_FILTER_METHOD":
      return { ...state, filterMethod: action.payload };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload),
      };
    default:
      return state;
  }
}

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactReducer, initialState);

  const fetchContacts = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch contacts");
      const data = await response.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, []);

  const addContact = useCallback(async (contactData) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) throw new Error("Failed to add contact");
      const newContact = await response.json();
      dispatch({ type: "ADD_CONTACT", payload: newContact });
      return true;
    } catch (error) {
      console.error("Error adding contact:", error);
      return false;
    }
  }, []);

  const updateContact = useCallback(async (contactData) => {
    try {
      const response = await fetch(`${API_URL}/${contactData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
      if (!response.ok) throw new Error("Failed to update contact");
      const updatedContact = await response.json();
      dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
      return true;
    } catch (error) {
      console.error("Error updating contact:", error);
      return false;
    }
  }, []);

  const deleteContact = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete contact");
      dispatch({ type: "DELETE_CONTACT", payload: id });
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      return false;
    }
  }, []);

  const filteredContacts = useMemo(() => {
    let result = [...state.contacts];
    const { searchQuery, filterMethod } = state;

    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.firstName.toLowerCase().includes(lowerQuery) ||
          c.lastName.toLowerCase().includes(lowerQuery) ||
          c.email.toLowerCase().includes(lowerQuery) ||
          c.phone.includes(searchQuery),
      );
    }

    if (filterMethod === "asc") {
      result.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (filterMethod === "desc") {
      result.sort((a, b) => b.firstName.localeCompare(a.firstName));
    } else if (filterMethod === "none") {
      // do nothing
    }

    return result;
  }, [state.contacts, state.searchQuery, state.filterMethod]);

  const setSearchQuery = useCallback((query) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }, []);

  const setFilterMethod = (method) => {
    dispatch({ type: "SET_FILTER_METHOD", payload: method });
  };

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const value = useMemo(
    () => ({
      ...state,
      filteredContacts,
      setSearchQuery,
      setFilterMethod,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
    }),
    [
      state,
      filteredContacts,
      setSearchQuery,
      fetchContacts,
      addContact,
      updateContact,
      deleteContact,
    ],
  );

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
