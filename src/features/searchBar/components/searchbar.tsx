/*
    Author: Torjus A.M
    Searchbar to search employees on the homepage. Updates the sortedEmployees array from the global context. 
    This array is the one used to display the employees on the frontpage: src/components/frontpageTable/employeeTable.tsx
*/
import React, { ChangeEvent, FormEvent, useEffect, useState, FC } from 'react';
import Search from '../../../assets/search.svg';
import { useEmployeeContext, sortEmployees } from '../../../context/employeeContext';
import { Employee } from '../../../lib/employee';
import styles from './searchbar.module.css';

const SearchBarForm: FC = () => {
    const { employees, setSortedEmployees } = useEmployeeContext();
    const [searchInput, setSearchInput] = useState("");
    // Boolean to keep track of if search returns no results.
    const [emptySearch, setEmptySearch] = useState(false);

    // Hook updates the sortedEmployees array by filtering it on the search input.
    useEffect(() => {
        if (searchInput.length > 0 || searchInput ) {
            const searchResults = employees.filter((employee: Employee) =>
                employee.name.toLowerCase().includes(searchInput.toLowerCase())
            );
            setSortedEmployees(searchResults);
            // When a search returns no results, the emptySearch state variable is set to true.
            setEmptySearch(searchResults.length === 0);
        } else {
            const sortedArray = sortEmployees(employees);
            // When the search input is cleared, the array is reset to its original sorting (by status and recency of clock-operations).
            setSortedEmployees(sortedArray);
            setEmptySearch(false);
        }
        // Set to re-run everytime the input in the searchbar changes. 
    }, [searchInput]);

    // Prevents the form from submitting, as we want to handle the search ourselves.
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    // Updates search input state variable whenever change is registered.
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit} role="search" className={styles.form}>
            <Search className={styles.icon}/>
            <input id="search" type="search" placeholder="Søk ansatte..." autoFocus required className={styles.input} onChange={handleChange} value={searchInput} />
            <button type="submit" className={styles.button}>Søk</button>
        </form>
    );
};

export default SearchBarForm;