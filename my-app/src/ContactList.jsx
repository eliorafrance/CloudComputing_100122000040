// src/ContactList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './contact.css';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:4000/contacts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch contacts');

        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setError('Could not fetch contacts');
      }
    };

    fetchContacts();
  }, []);

  const handleDelete = async (contact_id) => {
    try {
      if (!contact_id) {
        throw new Error('Contact ID is missing');
      }

      const response = await fetch(`http://localhost:4000/contacts/${contact_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      alert('Contact deleted successfully');
      setContacts((prev) => prev.filter(contact => contact.contact_id !== contact_id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Error deleting contact');
    }
  };

  return (
    <div className="contact-list-container">
      <h2>Contacts</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="contact-list">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div key={contact.contact_id} className="contact-card">
              <div className="contact-details">
                <p><strong>Name:</strong> {contact.name}</p>
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
              </div>
              <div className="contact-actions">
                <Link to={`/edit-contact/${contact.contact_id}`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(contact.contact_id)} className="delete-button">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No contacts available</p>
        )}
      </div>
    </div>
  );
}

export default ContactList;


