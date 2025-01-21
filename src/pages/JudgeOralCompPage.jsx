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
        <h1>Judge Written Competition</h1>
        <p>The user would see a page that contains a list of links with all the memorandums assigned to them.</p>
        <p>Upon clicking on a link, it will take you to a new page where it displays the rubric along with the memorandum.</p>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default JudgeOralCompPage; 