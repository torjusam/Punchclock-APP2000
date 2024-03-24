/**
 * Author: Ask I.P Aspholm
 *
 * login screen
 */

import React from 'react';
import LoginFields from './loginFields';

const LoginScreen: React.FC = () => {
    return(
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <LoginFields/>
        </div>
    );
};
export default LoginScreen;