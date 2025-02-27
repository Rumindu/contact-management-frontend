import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ContactList from "./pages/ContactList";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContactList />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<EditContact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
