import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getContacts,
  deleteContact,
  Contact,
} from "../services/contactService";
import ContactTable from "../components/ContactTable";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBox from "../components/SearchBox";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (search?: string) => {
    try {
      setLoading(true);
      const data = await getContacts(search);
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const handleSearch = () => {
    fetchContacts(searchTerm);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleDelete = async (id: string | number) => {
    try {
      await deleteContact(id);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleEdit = (contact: Contact) => {
    navigate(`/edit/${contact.id}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Centered title at the top */}
      <h1 className="text-3xl font-bold mb-6 text-center">
        Contact Management
      </h1>

      {/* Action bar with Add button on left and search on right */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Contact
        </button>

        <div className="w-72">
          <SearchBox
            ref={searchInputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            onSearch={handleSearch}
            placeholder="Search contacts..."
          />
        </div>
      </div>

      {/* Table section */}
      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <ContactTable
          contacts={contacts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default ContactList;
