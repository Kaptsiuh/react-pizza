import React from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 1000), 
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  }

  return ( 
    <div className={styles.root}>
      <svg className={styles.icon} 
      enableBackground="new 0 0 50 50" 
      height="50px" 
      id="Layer_1" 
      version="1.1" 
      viewBox="0 0 50 50" 
      width="50px" 
      xmlns="http://www.w3.org/2000/svg">
        <rect fill="none" height="50" width="50"/><circle cx="21" cy="20" fill="none" r="16" stroke="#000000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
        <line fill="none" stroke="#000000" strokeMiterlimit="10" strokeWidth="4" x1="32.229" x2="45.5" y1="32.229" y2="45.5"/>
      </svg>
      <input 
      ref={inputRef}
      value={value}
      onChange={onChangeInput} 
      className={styles.input} 
      placeholder='Search pizzas...' />
        {searchValue && (
        <svg 
          onClick={onClickClear}
          className={styles.close}
          viewBox="0 0 32 32" 
          xmlns="http://www.w3.org/2000/svg">
          <title/>
          <g id="cross">
            <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="7" x2="25" y1="7" y2="25"/>
            <line fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2px" x1="7" x2="25" y1="25" y2="7"/>
          </g>
        </svg>
        )}
    </div>
    
   );
}
 
export default Search;