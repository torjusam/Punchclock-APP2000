/* 
    Author: Torjus A.M
    This is the signin page for the application. Redirects to this page if the user is not authenticated.
*/
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

export default function SignInPage() {
    const router = useRouter()
    const [userInfo, setUserInfo] = useState({ email: '', password: '' })

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const res = await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
        });

        console.log(res);

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={userInfo.email}
                
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                required />
            <input
                value={userInfo.password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                required />
            <button type="submit">Login</button>
        </form>
    )
}