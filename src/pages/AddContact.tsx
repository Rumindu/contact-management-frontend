import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { addContact } from "../services/contactService";
import { ContactFormValues } from "../schemas/contactSchema";

const AddContact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Adding contact...");
    try {
      const result = await addContact(data);
      console.log(result);
      if (result) {
        toast.success("Contact added successfully", { id: toastId });
        navigate("/");
      } else {
        toast.error("Failed to add contact", { id: toastId });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 409
          ? "Email already in use"
          : error.response?.data?.message || "Failed to add contact";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Contact</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <ContactForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default AddContact;
