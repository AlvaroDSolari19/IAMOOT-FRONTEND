import React, { useContext, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { Button,  } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const WrittenMatchDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { memorandumID } = useParams(); 
    const performNavigation = useNavigate(); 

    const handleSignOut = () => {
            resetLanguage(); 
            assignRole(''); 
            performNavigation('/');
        };
    
    /*********************************
     * CHECKS THAT THE ROLE IS JUDGE *
    *********************************/
    useEffect(() => {
        if (currentRole !== 'Judge'){
            handleSignOut(); 
        }
    }, [currentRole]);
        
    return <div>
        <h1>Memorandum {memorandumID}</h1>
        <p>The rubric for the written competition will be here</p>
    </div>
};

export default WrittenMatchDetailsPage; 