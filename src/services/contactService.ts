import axios from "axios";

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Contact[];
}

const API_URL = "http://localhost:4000";

export const getContacts = async (): Promise<Contact[]> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_URL}/contacts`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
};

export const deleteContact = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/contacts/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting contact:", error);
    return false;
  }
};
