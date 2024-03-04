// Author: Torjus A.M
import { useRouter } from 'next/router';
import React, { use } from 'react';
import HomePageNav from './homePageNav';
import CrudPageNav from './CrudPageNav';
import PersonalPageNav from './personalPageNav';
import styles from './nav.module.css';

const NavContainer: React.FC = () => {
    const router = useRouter();
    const pathname = router.pathname;

    // Renders nav bar content depending on the current page
    return (
        <nav className={styles.navContainer}>
            {pathname === '/' && <HomePageNav />}
            {pathname === '/crudTest' && <CrudPageNav />}
            {pathname.includes('/employeeId') && <PersonalPageNav />}
        </nav>
    );
};

export default NavContainer;