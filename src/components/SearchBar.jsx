import React from 'react';

class SearchBar extends React.Component {
    render() {
        return (
            <form className="wd-100 flex-row">
                <input type="text" className="searchBar" placeholder="Wyszukaj" />
                <button className="searchBtn">Wyszukaj</button>
            </form>)
    }
}

export default SearchBar;