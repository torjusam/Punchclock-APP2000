// Sets up custom toastContainer for notifications. What's custom about is the  poositioning and initalization of the container.
import React from 'react';
import {ToastContainer} from 'react-toastify';

const CustomToastContainer: React.FC = () => {

    return (
        <>
            <ToastContainer style={{ width: '25rem', padding: '20px' }}
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
                limit={3}
            />
        </>
    );
}

export default CustomToastContainer;