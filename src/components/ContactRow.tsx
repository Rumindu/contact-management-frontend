import React from "react";
import { Contact } from "../services/contactService";
import ActionButton from "./ActionButton";

interface ContactRowProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string | number) => void;
}

const ContactRow: React.FC<ContactRowProps> = ({
  contact,
  onEdit,
  onDelete,
}) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">{contact.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
        <ActionButton
          label="Edit"
          onClick={() => onEdit(contact)}
          variant="edit"
        />
        <ActionButton
          label="Delete"
          onClick={() => onDelete(contact.id)}
          variant="delete"
        />
      </td>
    </tr>
  );
};

export default ContactRow;
