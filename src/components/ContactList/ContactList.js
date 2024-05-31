import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/slices/contactsSlice';
import './ContactList.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredContacts.map(({ id, name, phone }) => (
        <li key={id}>
          {name}: {phone}
          <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
