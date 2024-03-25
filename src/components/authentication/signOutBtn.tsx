import React, { FC, ReactNode } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface SignOutBtnProps {
    children?: ReactNode;
}

const SignOutBtn: FC<SignOutBtnProps> = () => {
    const { status, data } = useSession();

    if (!status) {
        return <button disabled={true}></button>
    }

    return (
        <button onClick={() => signOut()}></button>
    );
};

export default SignOutBtn;