import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getContacts,
  deleteContact,
  Contact,
} from "../services/contactService";
import ContactTable from "../components/ContactTable";
import LoadingSpinner from "../components/LoadingSpinner";

const ContactList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: string | number) => {
    try {
      await deleteContact(id);
      fetchContacts(); // Refresh the contact list after delete
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Management</h1>
        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Contact
        </button>
      </div>
      <ContactTable
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ContactList;
