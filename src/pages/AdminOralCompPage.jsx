import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const AdminOralCompPage = () => { 

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
        <h1>Admin Oral Competition</h1>
        <Button variant='primary' onClick={() => {performNavigation('/individualscores')}}>Individual Scores</Button>
        <Button variant='primary' onClick={() => {performNavigation('/oralrounds')}}>Oral Rounds</Button>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default AdminOralCompPage; 