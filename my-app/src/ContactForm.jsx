import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ContactForm() {
  const { id } = useParams(); // this is contact_id
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch contact by contact_id
  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      fetch(`http://localhost:4000/contacts/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch contact');
          return res.json();
        })
        .then((data) => {
          setContact(data); // Backend returns object with correct fields
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching contact:', err);
          setError('Contact not found');
          setIsLoading(false);
          navigate('/contacts');
        });
    }
  }, [id, isEditing, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:4000/contacts/${id}`
      : 'http://localhost:4000/contacts';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });

      if (!response.ok) throw new Error('Failed to save contact');

      navigate('/contacts');
    } catch (error) {
      console.error('Error saving contact:', error);
      setError('An error occurred while saving the contact.');
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-form-container">
      <h2>{isEditing ? 'Edit Contact' : 'Add New Contact'}</h2>

      {error && <div className="error-message">{error}</div>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
            <button type="submit" disabled={isLoading}>
              {isEditing ? 'Update Contact' : 'Save Contact'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/contacts')}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
