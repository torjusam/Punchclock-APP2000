/*
    Author: Torjus A.M
    Searchbar to search employees for the navbar on the homepage.
*/
import React from 'react';
import Search from '../../../assets/search.svg';
import styles from './searchbar.module.css';

interface SearchBarFormProps {

}

const SearchBarForm: React.FC<SearchBarFormProps> = () => {

    const handleSubmit = (event: React.FormEvent) => {
        // Prevents the default form submission, which is a page refresh.
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} role="search" className={styles.form}>
            <Search className={styles.icon}/>
            <input id="search" type="search" placeholder="Søk ansatte..." autoFocus required className={styles.input} />
            <button type="submit" className={styles.button}>Søk</button>
        </form>
    );
};

export default SearchBarForm;