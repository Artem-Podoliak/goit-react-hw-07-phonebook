import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { getContactsItems, addContact } from 'redux/contacts/slice';
import { showInfoMessage, showSuccessMessage } from 'utils/notifications';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContactsItems);
  const dispatch = useDispatch();

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  const onNameChange = evt => {
    setName(evt.currentTarget.value);
  };

  const onNumberChange = evt => {
    setNumber(evt.currentTarget.value);
  };

  const formReset = () => {
    setName('');
    setNumber('');
  };

  const onContactFormSubmit = evt => {
    evt.preventDefault();

    const existingContact = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() &&
        contact.number === number
    );

    if (existingContact) {
      showInfoMessage('This contact is already in your phonebook');
      return;
    }

    const existingNumber = contacts.find(contact => contact.number === number);

    if (existingNumber) {
      showInfoMessage('This phone number is already in your phonebook');
      return;
    }

    dispatch(addContact({ name, number }));
    showSuccessMessage('New contact has been added to your phonebook');
    formReset();
  };

  return (
    <div className={css.formWrapper}>
      <form className={css.contactSubmitForm} onSubmit={onContactFormSubmit}>
        <label className={css.formInputLabel} htmlFor={nameInputId}>
          Name
          <input
            className={css.formInput}
            type="text"
            name="name"
            placeholder="Type name here"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={onNameChange}
            id={nameInputId}
            required
          />
        </label>
        <label className={css.formInputLabel} htmlFor={numberInputId}>
          Number
          <input
            className={css.formInput}
            type="tel"
            name="number"
            placeholder="Type number here"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={onNumberChange}
            id={numberInputId}
            required
          />
        </label>
        <button className={css.formSubmitBtn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
}
