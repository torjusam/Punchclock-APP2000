// Author: Torjus A.M
import React, { useState, ChangeEvent } from 'react';
import { SearchInput } from '../SearchInput';

const HomePageNav: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    return (
        <nav>
             {/*<SearchInput value={searchTerm} onChange={handleSearchChange} />*/}
        </nav>
    );
};

}
export default HomePageNav;