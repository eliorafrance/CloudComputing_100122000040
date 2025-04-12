import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load contacts - this is where you'd typically fetch data from an API
    const fetchContacts = async () => {
      // Sample data for demonstration purposes
      const sampleContacts = [
        { id: '1', name: 'John Doe', email: 'john@example.com', phone: '555-1234' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678' }
      ];
      setContacts(sampleContacts); // Set the contacts to state
    };
    
    fetchContacts();
  }, []);

  // Delete a contact
  const deleteContact = (id) => {
    // In a real app, you'd make an API call to delete the contact
    // Update state by filtering out the deleted contact
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  return (
    <div className="contact-list-container">
      <h2>My Contacts</h2>
      
      <div className="list-actions">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
        </div>
        <Link to="/contact-form" className="add-button">Add New Contact</Link> {/* Correct path to add new contact */}
      </div>

      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <Link to={`/edit/${contact.id}`} className="edit-button">Edit</Link>
                  <button onClick={() => deleteContact(contact.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactList;