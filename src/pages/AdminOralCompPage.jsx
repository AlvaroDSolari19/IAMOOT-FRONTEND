import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card } from 'react-bootstrap'; 

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
    
    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>Admin Oral Competition</Card.Header>
        </Card>
        <div className='d-grid gap-2'>
            <Button variant='primary' onClick={() => {performNavigation('/individualscores')}}>Individual Scores</Button>
            <Button variant='primary' onClick={() => {performNavigation('/oralrounds')}}>Oral Rounds</Button>
            <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
        /</div>
    </div>

};

export default AdminOralCompPage; 