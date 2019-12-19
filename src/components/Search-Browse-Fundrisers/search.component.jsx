import React, { useState } from 'react';
import './search.styles.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCategoryDropDown: false,
      categoryText: 'Category',
      categories: ['Medical', 'Memorial', 'Nonprofit', 'Animals', 'Education', 'Sports', 'Other'],
      keyword: ''
    };
    this.setField = this.setField.bind(this)
  }

  clickedCategory = () => {
    this.setState({
      showCategoryDropDown: !this.state.showCategoryDropDown
    })
  }
  chosenCateogry = (item) => {
    this.setState({
      showCategoryDropDown: false,
      categoryText: item
    },() => {this.clickedSearch()})
  }
  setField(field, e) {
    this.setState({
      [field]: e.target.value
    })
  }
  clickedSearch = () =>{
    let query = (this.state.categoryText != 'Category' ? '&category=' + this.state.categoryText : '')+(this.state.keyword != '' ? '&keyword=' + this.state.keyword : "")
    this.props.clickedSearch(query)
  }
  render() {
    const elements = this.state.categories.map((item, index) => (
      <div key={index} className='search__select_category__items__item' onClick={() => { this.chosenCateogry(item) }}>
        <p>{item}</p>
      </div>
    ))
    return (

      <div className='browse__search'>
        <h1>Browse fundraisers</h1>
        <p>People around the world are raising money for what they are passionate about.</p>
        <div className='search'>
          <div className='search__selected_category' >
            {/* onClick = {() => setshowCategoryDropDown(!showCategoryDropDown)}> */}
            <p onClick={this.clickedCategory}> {this.state.categoryText}</p>
            {this.state.categoryText !='Category' && <div className='search__selected_category__remove' onClick={() => { this.chosenCateogry('Category') }}>
              <p>x</p>
            </div>}
          </div>
          <div className='search__input'>
            {/* <input type="text"/> */}
            <input className='signin__box__credentials__input' type="text" placeholder="Search Fundrisers" value={this.state.keyword} onChange={this.setField.bind(null, 'keyword')} />

          </div>
          <div className='search__button'>
            <button onClick={ this.clickedSearch }>Search</button>
          </div>

          {this.state.showCategoryDropDown && <div className='search__select_category'>
            <div className='search__select_category__items'>
              {elements}
            </div>
          </div>}
        </div>
      </div>
    );
  }
}
export default Search;