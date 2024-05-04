import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { getContactsFilter } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactsSlice';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';

export const ContactList = ({children}) => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const handleDelete = (evt) => { dispatch(deleteContact(evt.target.name)) };
  const filterValue = useSelector(getContactsFilter);

  

  return (
    <div className={css.contactsSection}>
      <h3 className={css.contactsTitle}>Contacts</h3>
      {children}
      {filterValue === '' && (
        <ul className={css.contactsList}>
          {contacts.map(contact => (
            <li key={contact.id} className={css.contactsItem}>
              <span>
                {contact.name}: {contact.number}
              </span>
              <button
                type="submit"
                className={css.contactsButton}
                name={contact.id}
                onClick={handleDelete}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ContactList.propTypes = {
  children: PropTypes.node,
};
