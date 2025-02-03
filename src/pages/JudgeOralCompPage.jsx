import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const JudgeOralCompPage = () => { 

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
        if (currentRole !== 'Judge'){
            handleSignOut(); 
        }
    }, [currentRole]);
    
    return <div className='d-grid gap-2'>
        <h1>Judge Oral Competition</h1>
        <p>The user would see a page that contains a list oof items including the location and the matches he has been assigned to.</p>
        <p>Upon clicking on the item, it will take you to a new page where it the teams competing and prompts him to select a winner.</p>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default JudgeOralCompPage; 