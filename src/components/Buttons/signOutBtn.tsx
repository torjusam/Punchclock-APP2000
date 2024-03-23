import React, { FC, ReactNode, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface SignOutBtnProps {
    children?: ReactNode;
}

const SignOutBtn: FC<SignOutBtnProps> = ({ children }) => {
    const { status, data } = useSession();
    console.log(status);
    
    if (!status) {
        return <button disabled={true}>Loadng</button>
    }

    return (
        <button onClick={() => signOut()}>LOGOUT</button>
    );
};

export default SignOutBtn;