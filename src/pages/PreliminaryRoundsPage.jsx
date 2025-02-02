import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const PreliminaryRoundsPage = () => { 

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
        <h1>Preliminary Rounds</h1>
        <p>The schedule would display here ... We need to discuss the format and what it includes.</p>
        <p>So far I'm assuming the name of the teams participating on the match, location, and time.</p>
        <p>Regarding the format, I'm thinking a list perhaps. Upon clicking it, it opens another page where you enter the winner.</p>
        <Button variant='primary' onClick={() => {}}>Results</Button>
        <p>Upon clicking the results, it will show you a table with: Team Number, School, Number of Victories, Number of Defeats</p>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default PreliminaryRoundsPage; 