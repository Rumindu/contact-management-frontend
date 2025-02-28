import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import { getContact, updateContact } from "../services/contactService";
import { ContactFormValues } from "../schemas/contactSchema";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

const EditContact: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [defaultValues, setDefaultValues] = useState<
    ContactFormValues | undefined
  >();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const contact = await getContact(id);
        if (contact) {
          setDefaultValues({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          });
        } else {
          toast.error("Contact not found");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to load contact");
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [id, navigate]);

  const handleSubmit = async (data: ContactFormValues) => {
    if (!id) return;

    setIsSubmitting(true);
    const toastId = toast.loading("Updating contact...");
    try {
      const result = await updateContact(id, data);
      if (result) {
        toast.success("Contact updated successfully", { id: toastId });
        navigate("/");
      } else {
        toast.error("Failed to update contact", { id: toastId });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.status === 409
          ? "Email already in use"
          : error.response?.data?.message || "Failed to update contact";
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Edit Contact</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        {defaultValues && (
          <ContactForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default EditContact;
