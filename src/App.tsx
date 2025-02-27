import React, { useEffect, useState } from "react";
import { getContacts, deleteContact, Contact } from "./services/contactService";
import ContactTable from "./components/ContactTable";
import LoadingSpinner from "./components/LoadingSpinner";

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
    console.log("Edit contact:", contact);
    // Implement edit functionality later
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Contact Management
      </h1>
      <ContactTable
        contacts={contacts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
