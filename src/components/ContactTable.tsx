import React, { useState } from "react";
import { Contact } from "../services/contactService";
import ContactRow from "./ContactRow";

interface ContactTableProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string | number) => void;
}

const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  onEdit,
  onDelete,
}) => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div
                className="flex items-center gap-2 cursor-pointer hover:text-gray-700"
                onClick={handleSort}
              >
                Name
                <span className="inline-block">
                  {sortDirection === "asc" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedContacts.length > 0 ? (
            sortedContacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
