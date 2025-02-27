import axios from "axios";
import config from "../config/config";

export interface Contact {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  createdAt?: string;
}

const API_URL = config.API_URL;

export const getContacts = async (search?: string): Promise<Contact[]> => {
  try {
    const url = search
      ? `${API_URL}/contacts?search=${encodeURIComponent(search)}`
      : `${API_URL}/contacts`;

    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const getContact = async (
  id: string | number
): Promise<Contact | null> => {
  try {
    const response = await axios.get(`${API_URL}/contacts/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching contact ${id}:`, error);
    return null;
  }
};

export const addContact = async (
  contact: Omit<Contact, "id">
): Promise<Contact | null> => {
  try {
    const response = await axios.post(`${API_URL}/contacts`, contact);
    return response.data.data;
  } catch (error) {
    console.error("Error adding contact:", error);
    return null;
  }
};

export const updateContact = async (
  id: string | number,
  contact: Omit<Contact, "id">
): Promise<Contact | null> => {
  try {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contact);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating contact ${id}:`, error);
    return null;
  }
};

export const deleteContact = async (id: string | number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/contacts/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting contact ${id}:`, error);
    return false;
  }
};
