
import { useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { getContactsFilter } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import { setFilter } from '../../redux/filterSlice';


export const Filter = () => {
  const searchTermId = nanoid();
  const contacts = useSelector(getContacts);
  const filterValue = useSelector(getContactsFilter);
  const dispatch = useDispatch();
  const handleSearch = (event) => {
    dispatch(setFilter(event.target.value));
    console.log(event.target.value);
  }
  const bestMatches = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filterValue.trim().toLowerCase()) &&
      filterValue.trim() !== ''
  );

  return (
    <div className={css.contactList}>
      <label htmlFor={searchTermId}>
        <span className={css.formLabel}>Find Contacts By Name</span>
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
          required
          onChange={handleSearch}
          id={searchTermId}
          autoComplete="off"
          className={css.formInput}
        />
      </label>

      {filterValue !== '' && (
        <ul className={css.contactsList}>
          {bestMatches.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



