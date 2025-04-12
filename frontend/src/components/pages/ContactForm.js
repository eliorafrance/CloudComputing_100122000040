import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ContactForm() {
  const { id } = useParams(); // Get the id from URL if editing
  const navigate = useNavigate();
  const isEditing = !!id; // Check if we are editing an existing contact

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    // Fetch contact details if editing an existing contact
    if (isEditing) {
      const fetchContact = async () => {
        try {
          const response = await axios.get(`/api/contacts/${id}`); // API call to get contact details
          setContact(response.data);
        } catch (error) {
          console.error('Error fetching contact:', error);
          alert('Contact not found');
          navigate('/contacts'); // Redirect to contacts list if not found
        }
      };
      
      fetchContact();
    }
  }, [id, isEditing, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Update existing contact
        await axios.put(`/api/contacts/${id}`, contact); // API call for update
        console.log('Updating contact:', contact);
      } else {
        // Create new contact
        await axios.post('/api/contacts', contact); // API call for creating a new contact
        console.log('Creating new contact:', contact);
      }
      
      // Navigate back to contacts list after saving
      navigate('/contacts');
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('There was an error saving the contact.');
    }
  };

  return (
    <div className="contact-form-container">
      <h2>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h2>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={contact.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Notes:</label>
          <textarea
            name="notes"
            value={contact.notes}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit">{isEditing ? 'Update Contact' : 'Save Contact'}</button>
          <button type="button" onClick={() => navigate('/contacts')} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;