import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const SemiFinalRoundsPage = () => { 

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
        <h1>Semifinal Rounds</h1>
        <p>Regenerates a schedule for the semifinals and displays it similar to the link list</p>
        <p>So out of all the teams remaining, we need to find out the best victim and best state correct?</p>
        <p>I was thinking maybe have a button for state and another one for victims.</p>
        <p>When clicking each button, it will show you the teams that participated along with their info</p>
        <p>What info do you need from them for the semifinal round? </p>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default SemiFinalRoundsPage; 