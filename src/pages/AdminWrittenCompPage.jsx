import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const AdminWrittenCompPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const handleSignOut = () => {
        resetLanguage(); 
        assignRole(''); 
        performNavigation('/');
    };

    /*********************************
     * CHECKS THAT THE ROLE IS ADMIN *
     *********************************/
    useEffect(() => {
        if (currentRole !== 'Admin'){
            handleSignOut(); 
        }
    }, [currentRole]);
    
    return <div className='d-grid gap-2'>
        <h1>Admin Written Competition</h1>
        <Button variant='primary'>Generate Report</Button>
        <Button variant='primary'>Show All Memorandums</Button>
        <Button variant='primary'>English Memorandums</Button>
        <Button variant='primary'>Spanish Memorandums</Button>
        <Button variant='primary'>Portuguese Memorandums</Button>
        <p>Table will display here</p>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

        
};

export default AdminWrittenCompPage; 