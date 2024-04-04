import React, {FC, ReactNode} from 'react';
import {signOut, useSession} from 'next-auth/react';
import styles from '../layout/navbar/navbars.module.css';

interface SignOutBtnProps {
    children?: ReactNode;
}

const SignOutBtn: FC = () => {
    const {status} = useSession();

    return (
        <button
            className={styles.signOutBtn}
            onClick={status ? () => signOut() : undefined}
            disabled={!status}
        >
            {status ? 'Sign out' : 'Disabled Button'}
        </button>
    );
};

export default SignOutBtn;


