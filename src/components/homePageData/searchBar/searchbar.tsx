/**
 * @file Searchbar component for the frontpage. Contains a search input and a button to show the keyboard.
 * @module Homepage
 * @author Torjus A.M
 */
import React, {ChangeEvent, FormEvent, useEffect, FC} from 'react';
import Search from '../../../assets/search.svg';
import {useEmployeeContext} from '../../../features/context/employeeContext';
import Employee from '../../../utils/employee';
import {sortEmployees} from "../../../features/context/services/sortEmployees";
import styles from './searchbar.module.css';

interface SearchBarProps {
    onShowKeyboard: () => void;
    searchInput: string;
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarForm: FC<SearchBarProps> = ({onShowKeyboard, searchInput, onChangeInput}) => {
    const {employees, setSortedEmployees} = useEmployeeContext();

    // Hook updates the sortedEmployees array by filtering it on the search input.
    useEffect(() => {
        if (searchInput.length > 0 || searchInput) {
            const searchResults = employees.filter((employee: Employee) =>
                employee.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setSortedEmployees(searchResults);
        } else {
            const sortedArray = sortEmployees(employees);
            setSortedEmployees(sortedArray);
        }
        // Set to re-run everytime the input in the searchbar changes. 
    }, [searchInput]);

    // Prevents the form from submitting, as we want to handle the search ourselves.
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit} role="search" className={styles.form}>
            <Search className={styles.icon}/>
            <input
                className={styles.input}
                id="search"
                type="search"
                placeholder="Søk ansatte..."
                value={searchInput}
                onChange={e => onChangeInput(e)}
                /* Searchbar input is selected: tell keyboard by updating state */
                onFocus={onShowKeyboard}
            />
            <button type="submit" className={styles.button}>Søk</button>
        </form>
    );
};

export default SearchBarForm;