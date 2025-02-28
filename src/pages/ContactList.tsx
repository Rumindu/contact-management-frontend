import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getContacts,
  deleteContact,
  Contact,
} from "../services/contactService";
import toast from "react-hot-toast";
import ContactTable from "../components/ContactTable";
import LoadingSpinner from "../components/LoadingSpinner";
import SearchBox from "../components/SearchBox";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (search?: string) => {
    try {
      setLoading(true);
      setIsSearching(!!search);
      const data = await getContacts(search);
      setContacts(data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch contacts");
      setContacts([]);
    } finally {
      setLoading(false);
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchContacts(searchTerm);
    } else {
      fetchContacts();
      setIsSearching(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      fetchContacts();
      setIsSearching(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    const toastId = toast.loading("Deleting contact...");
    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully", { id: toastId });
      fetchContacts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete contact");
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
      <h1 className="text-3xl font-bold mb-6 text-center">
        Contact Management
      </h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
          isSearching={isSearching}
          searchTerm={searchTerm}
        />
      )}
    </div>
  );
};

export default ContactList;
