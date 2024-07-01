import React, {FC} from 'react';
import CrudPageNav from './crudNav';
import CrudPageData from "../../features/CRUD-page-features";

const CrudPage: FC = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '2.3rem'}}>
            <CrudPageNav/>
            <CrudPageData/>
        </div>
    );
};

export default CrudPage;