import React, { useState } from 'react';
import './search.styles.scss';

function Search() {
  const [showCategoryDropDown, setshowCategoryDropDown] = useState(false)
  return (
  <div className='browse__search'>
      <h1>Browse fundraisers</h1>
      <p>People around the world are raising money for what they are passionate about.</p>
      <div className='search'>
          <div className='search__selected_category' onClick = {() => setshowCategoryDropDown(!showCategoryDropDown)}>
            <p> Category</p>
          </div>
          <div className='search__input'>
            {/* <input type="text"/> */}
            <input className='signin__box__credentials__input' type="text" placeholder="Search Fundrisers"/>

          </div>
          <div className='search__button'>
            <button>Search</button>
          </div>
          
          {showCategoryDropDown && <div className='search__select_category'>
            <div className='search__select_category__items'>
              <div className='search__select_category__items__item'>
                <p>Medical</p>
              </div>
              <div className='search__select_category__items__item'>
                <p>Memorial</p>
              </div>
              <div className='search__select_category__items__item'>
                <p>Nonprofit</p>
              </div>
              <div className='search__select_category__items__item'>
                <p>Animals</p>
              </div>
              <div className='search__select_category__items__item'>
                <p>Education</p>
              </div>
              <div className='search__select_category__items__item'>
                <p>Sports</p>
              </div>
              <div className='search__select_category__items__item'>
                <p>Other</p>
              </div>
            </div>
          </div>}
      </div>
  </div>
  );
}
export default Search;