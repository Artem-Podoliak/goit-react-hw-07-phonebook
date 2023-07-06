import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { getFilterValue } from 'redux/filter/slice';
import { useGetAllContactsQuery } from './../../redux/services/phoneBookApi';
import sortContactsByName from 'utils/sortContactsByName';
import ContactItem from 'components/ContactItem';
import css from './ContactList.module.css';

export default function ContactList() {
  const { data: contacts } = useGetAllContactsQuery();

  const filterValue = useSelector(getFilterValue);

  const totalContactsAmount = () => {
    if (!contacts) {
      return 0;
    }
    return contacts.length;
  };

  const getVisibleContacts = useMemo(
    () => () => {
      if (!contacts) {
        return;
      }

      const normalizedFilter = filterValue.toLowerCase().trim();

      return contacts
        .filter(
          contact =>
            contact.name.toLowerCase().includes(normalizedFilter) ||
            contact.phone.includes(normalizedFilter)
        )
        .sort(sortContactsByName);
    },
    [contacts, filterValue]
  );

  const visibleContacts = getVisibleContacts();

  return totalContactsAmount() > 0 ? (
    <>
      <p className={css.totalContactsText}>
        Contacts amount:{' '}
        <span className={css.totalContactsNum}>{totalContactsAmount()}</span>
      </p>
      <ul className={css.phonebookList}>
        {visibleContacts.length ? (
          visibleContacts.map(({ id, name, phone }) => (
            <li className={css.listElement} key={id}>
              <ContactItem
                id={id}
                name={name}
                phone={phone}
                // onDelete={useDeleteContactMutation}
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
