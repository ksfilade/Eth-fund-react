import React from 'react';
import './search.styles.scss';

function Search() {
  return (
  <div className='browse__search'>
      <h1>Browse fundraisers</h1>
      <p>People around the world are raising money for what they are passionate about.</p>
      <div className='search'>
          <div className='search__selected_category'>
            <p> Category</p>
          </div>
          <div className='search__input'>
            {/* <input type="text"/> */}
            <input className='signin__box__credentials__input' type="text" placeholder="Search Fundrisers"/>

          </div>
          <div className='search__button'>
            <button>Search</button>
          </div>
          
          {/* <div className='search__select_category'>
            <div className='search__select_category__items'>
              <p>health</p>
              <p>FUNERALS</p>
              <p>goals</p>
              <p>education</p>
            </div>
          </div> */}
      </div>
  </div>
  );
}
export default Search;