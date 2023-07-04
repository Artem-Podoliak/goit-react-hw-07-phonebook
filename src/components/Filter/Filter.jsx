import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { getFilterValue, changeFilter } from 'redux/filter/slice';
import css from './Filter.module.css';

export default function Filter() {
  const filterValue = useSelector(getFilterValue);
  const dispatch = useDispatch();

  const filterInputId = nanoid();

  const onFilterChange = evt => {
    dispatch(changeFilter(evt.currentTarget.value));
  };

  return (
    <div className={css.filterWrapper}>
      <label className={css.filterInputLabel} htmlFor={filterInputId}>
        Find contacts by name
        <input
          className={css.filterInput}
          type="text"
          placeholder="Search field"
          id={filterInputId}
          value={filterValue}
          onChange={onFilterChange}
        />
      </label>
    </div>
  );
}
