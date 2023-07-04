import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import css from './ContactItem.module.css';

export default function ContactItem({ id, name, number, onDelete }) {
  return (
    <div className={css.contactItemWrapper}>
      <p className={css.contactItemName}>{name}</p>
      <a className={css.contactItemNum} href={`tel:${number}`}>
        {number}
      </a>
      <button
        className={css.deleteBtn}
        type="button"
        onClick={() => onDelete(id)}
        aria-label="Delete contact"
      >
        <IconContext.Provider value={{ size: '2em' }}>
          <FaTrashAlt />
        </IconContext.Provider>
      </button>
    </div>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
