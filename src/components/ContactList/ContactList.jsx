import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContactsItems, removeContact } from 'redux/contacts/slice';
import { getFilterValue } from 'redux/filter/slice';
import sortContactsByName from 'utils/sortContactsByName';
import ContactItem from 'components/ContactItem';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getContactsItems);
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const totalContactsAmount = contacts.length;

  const getVisibleContacts = useMemo(
    () => () => {
      const normalizedFilter = filterValue.toLowerCase().trim();
      return contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(normalizedFilter) ||
            contact.number.includes(normalizedFilter)
        )
        .sort(sortContactsByName);
    },
    [contacts, filterValue]
  );

  const visibleContacts = getVisibleContacts();

  const onDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  return totalContactsAmount > 0 ? (
    <>
      <p className={css.totalContactsText}>
        Contacts amount:{' '}
        <span className={css.totalContactsNum}>{totalContactsAmount}</span>
      </p>
      <ul className={css.phonebookList}>
        {visibleContacts.length ? (
          visibleContacts.map(({ id, name, number }) => (
            <li className={css.listElement} key={id}>
              <ContactItem
                id={id}
                name={name}
                number={number}
                onDelete={onDeleteContact}
              />
            </li>
          ))
        ) : (
          <p className={css.noMatchesText}>No contact matches</p>
        )}
      </ul>
    </>
  ) : (
    <p className={css.noContactsText}>
      There are no contacts in your phonebook
    </p>
  );
}
