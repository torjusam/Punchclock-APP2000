/*
    Author: Torjus A.M
    Searchbar to search employees for the navbar on the homepage.
*/
import React from 'react';
import styles from './searchbar.module.css';

interface SearchBarProps {

}

const SearchBar: React.FC<SearchBarProps> = () => {

    const handleSubmit = (event: React.FormEvent) => {
        // Prevents the default form submission, which is a page refresh.
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} role="search">
            <label htmlFor="search">Search for stuff</label>
            <input id="search" type="search" placeholder="Search..." autoFocus required />
            <button type="submit">Go</button>
        </form>
    );
};

export default SearchBar;