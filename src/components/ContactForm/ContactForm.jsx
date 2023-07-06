import { useState } from 'react';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
} from './../../redux/services/phoneBookApi';
import { nanoid } from '@reduxjs/toolkit';
import {
  showInfoMessage,
  showSuccessMessage,
  showErrorMessage,
} from 'utils/notifications';
import css from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { data: contacts } = useGetAllContactsQuery();
  const [addContact, { isLoading: isCreating }] = useAddContactMutation();

  const nameInputId = nanoid();
  const phoneInputId = nanoid();

  const onNameChange = evt => {
    setName(evt.currentTarget.value);
  };

  const onPhoneChange = evt => {
    setPhone(evt.currentTarget.value);
  };

  const formReset = () => {
    setName('');
    setPhone('');
  };

  const onContactFormSubmit = async evt => {
    evt.preventDefault();
    // if (contacts !== undefined) {
    //   console.log(contacts);
    //   contacts.find(
    //     contact =>
    //       contact.name.toLowerCase() === name.toLowerCase() &&
    //       contact.phone === phone
    //   );
    //   showInfoMessage('This contact is already in your phonebook');
    //   return;
    // }
    if (
      contacts.find(
        contact =>
          contact.name.toLowerCase() === name.toLowerCase() &&
          contact.phone === phone
      )
    ) {
      showInfoMessage('This contact is already in your phonebook');
      return;
    }
    // if (contacts !== undefined) {
    //   contacts.find(contact => contact.phone === phone);
    //   showInfoMessage('This phone number is already in your phonebook');
    //   return;
    // }

    if (contacts.find(contact => contact.phone === phone)) {
      showInfoMessage('This phone number is already in your phonebook');
      return;
    }

    const newContact = {
      name: name,
      phone: phone,
    };

    try {
      await addContact(newContact);
      showSuccessMessage('New contact has been added in your phonebook');
    } catch (error) {
      console.log(error.message);
      showErrorMessage('Something goes wrong, new contact was not created');
    }

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
        <label className={css.formInputLabel} htmlFor={phoneInputId}>
          Number
          <input
            className={css.formInput}
            type="tel"
            name="phone"
            placeholder="Type number here"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={phone}
            onChange={onPhoneChange}
            id={phoneInputId}
            required
          />
        </label>
        <button
          className={css.formSubmitBtn}
          type="submit"
          disabled={isCreating}
        >
          {isCreating ? 'Adding...' : 'Add contact'}
        </button>
      </form>
    </div>
  );
}
