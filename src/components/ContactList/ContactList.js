import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, updateContact } from '../../redux/slices/contactsSlice';
import './ContactList.css';
import ContactForm from '../ContactForm/ContactForm';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const filter = useSelector((state) => state.filter);
  const user = useSelector((state) => state.auth.user);

  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(fetchContacts());
    }
  }, [dispatch, user]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleUpdate = (id, updatedContact) => {
    dispatch(updateContact({ id, updatedContact }));
    setEditingContact(null);
  };

  return (
    <div>
      <ContactForm />
      <ul>
        {filteredContacts.map(({ id, name, phone }) => (
          <li key={id}>
            {editingContact?.id === id ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(id, editingContact);
              }}>
                <input
                  type="text"
                  value={editingContact.name}
                  onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                />
                <input
                  type="tel"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <span>{name}</span>
                <span>{phone}</span>
                <button onClick={() => handleEdit({ id, name, phone })}>Edit</button>
                <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
