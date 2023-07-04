import AppName from 'components/AppName';
import ContactForm from 'components/ContactForm';
import SectionName from 'components/SectionName';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import css from './App.module.css';

export default function App() {
  return (
    <div className={css.appContainer}>
      <AppName title="Phonebook" />
      <ContactForm />
      <SectionName title="Contacts" />
      <Filter />
      <ContactList />
      <ToastContainer />
    </div>
  );
}
