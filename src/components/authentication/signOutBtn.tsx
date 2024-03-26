import React, {FC, ReactNode} from 'react';
import {signOut, useSession} from 'next-auth/react';

interface SignOutBtnProps {
    children?: ReactNode;
}

const SignOutBtn: FC<SignOutBtnProps> = () => {
    const {status} = useSession();

    if (!status) {
        return <button disabled={true}></button>
    }

    return (
        <button onClick={() => signOut()}>Sign out</button>
    );
};

export default SignOutBtn;