/**
 * @file Button that calls on the signOut function from next-auth.
 * @module Authentication
 * @description Only implemented on the extra CRUD page.
 * To be properly implemented would have to add a signin-authentication first before you can sign out.
 * @author Torjus A.M
 */
import React, {FC} from 'react';
import {signOut, useSession} from 'next-auth/react';
import styles from '../CRUD-page/crudNav.module.css';

const SignOutBtn: FC = () => {
    const {status} = useSession();

    return (
        <button
            className={styles.signOutBtn}
            onClick={status ? () => signOut() : undefined}
            disabled={!status}
        >
            {status ? 'Sign out' : 'Disabled'}
        </button>
    );
};

export default SignOutBtn;


