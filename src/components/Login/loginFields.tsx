/**
 * Author: Ask I.P Aspholm
 *
 * components for login screen
 */
import React, { useState } from 'react';
import  Styles  from './layout.module.css';


const LoginFields: React.FC = () => {
    const[mail, setMail] = useState<string>();
    const[password, setPassword] = useState<string>();
    const[errorMsg, setErrorMsg] = useState<string>();


    const handleLogin = (): void => {
        if (mail === 'test@test.com' && password === 'test'){
            alert("yay")
        } else{
            setErrorMsg("blyat")
        }
    };

    return(
        <div>
            <h1> Login </h1>
            <div>
                <label> Mail: </label>
                <input
                type = "text"
                value = {mail}
                onChange = {(e) => setMail(e.target.value)}
                />
            </div>
            <div>
                <label>password:</label>
                <input
                type = "text"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick = {handleLogin}>Login</button>
            {errorMsg && <div style={{color: 'red'}}>{errorMsg}</div>}
        </div>
    );
};
export default LoginFields;