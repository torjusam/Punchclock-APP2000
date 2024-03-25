/**
 * Author: Ask I.P Aspholm
 *
 * components for login screen
 * adds two input fields, one is for mail the other for passwords
 */
import React, { useState } from 'react';
import  Styles  from './login.module.css';


const LoginFields: React.FC = () => {
    const[mail, setMail] = useState<string>();
    const[password, setPassword] = useState<string>();
    const[errorMsg, setErrorMsg] = useState<string>();

    // TODO connect to db
    const handleLogin = (): void => {
        if (mail === 'test@test.com' && password === 'test'){ 
            setErrorMsg("Login successfull") // this is temporary and will be removed when signing is done
        } else{
            setErrorMsg("ivalid username or password")
        }
    };

    return(
        <div className= {Styles.loginContainer}>
            <h1> Write mail and password </h1>
            <div className={Styles.loginInputPair}>
                <label>sign in with E-mail</label>
                <input className={Styles.loginInput}
                type = "text"
                value = {mail}
                onChange = {(e) => setMail(e.target.value)}
                />
            </div>
            <div className={Styles.loginInputPair}>
                <label>Password</label>
                <input className={Styles.loginInput}
                type = "password"
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className={Styles.loginBtn} onClick = {handleLogin}>Login</button>
            {errorMsg && <div style={{color: 'red'}}>{errorMsg}</div>}
        </div>
    );
};
export default LoginFields;