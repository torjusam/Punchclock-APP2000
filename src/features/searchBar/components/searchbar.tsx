/*
    Author: Torjus A.M
    Searchbar to search employees on the homepage. Updates the sortedEmployees array from the global context. 
    This array is the one used to display the employees on the frontpage: src/components/frontpageTable/employeeTable.tsx
*/
import React, {ChangeEvent, FormEvent, useEffect, useState, FC} from 'react';
import Search from '../../../assets/search.svg';
import {useEmployeeContext, sortEmployees} from '../../../context/employeeContext';
import {Employee} from '../../../lib/types/employee';
import styles from './searchbar.module.css';

interface Props {
    onShowKeyboard: () => void;
    searchInput: string;
    onChangeInput: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBarForm: FC<Props> = ({onShowKeyboard, searchInput, onChangeInput}) => {
    const {employees, setSortedEmployees} = useEmployeeContext();
    // Boolean to keep track of if search returns no results.
    const [emptySearch, setEmptySearch] = useState(false);

    // Hook updates the sortedEmployees array by filtering it on the search input.
    useEffect(() => {
        if (searchInput.length > 0 || searchInput) {
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

    return (
        <form onSubmit={handleSubmit} role="search" className={styles.form}>
            <Search className={styles.icon}/>
            <input
                className={styles.input}
                id="search"
                type="search"
                placeholder="Søk ansatte..."
                value={searchInput}
                /* Throw event to parents method */
                onChange={e => onChangeInput(e)}
                /* Searchbar input is selected: tell keyboard by updating state */
                onFocus={onShowKeyboard}
            />
            <button type="submit" className={styles.button}>Søk</button>
        </form>
    );
};

export default SearchBarForm;