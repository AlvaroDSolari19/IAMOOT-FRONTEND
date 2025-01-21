import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const IndividualAwardsPage = () => { 

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
        <h1>Individual Oral Competition</h1>
        <Button variant='primary'>Generate Report</Button>
        <Button variant='primary'>Show All Speakers</Button>
        <Button variant='primary'>English Speakers</Button>
        <Button variant='primary'>Spanish Speakers</Button>
        <Button variant='primary'>Portuguese Speakers</Button>
        <p>Table will display here</p>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default IndividualAwardsPage; 