import React from 'react';
import PinCode from '../../components/PinAuthentication/pinCodeV4';

const PinEntryPage = () => {
  return (
    <div className="pin-entry-page-container h-full flex flex-col justify-center items-center flex grow 1">
      <h1>Enter PIN</h1>
      <PinCode onSuccess={() => {
        // Bruk relevant routing av choice her senere
        window.location.href = '/crud';
      }} />
    </div>
  );
};

export default PinEntryPage;
