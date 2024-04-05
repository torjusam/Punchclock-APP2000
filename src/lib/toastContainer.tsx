// Sets up the toastContainer for notifications, uses the toastify library.
import React, {FC} from 'react';
import {ToastContainer} from 'react-toastify';

const CustomToastContainer: FC = () => {

    return (
        <>
            <ToastContainer
                style={{width: '25rem', padding: '20px'}}
                position="bottom-left"
                autoClose={4000} // Four seconds
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="light"
                limit={3} // Max 3 at a time
            />
        </>
    );
}

export default CustomToastContainer;