import React, { useContext } from 'react'; 
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import LanguageContext from '../contexts/LanguageContext';

const HomePage = () => {

    const { changeLanguage } = useContext(LanguageContext); 
    const performNavigation = useNavigate(); 

    const performLanguageChange = (someLanguage, someRoute) => {
        changeLanguage(someLanguage)
        performNavigation(someRoute)
    }

    return <div className='d-grid gap-2'>
        <h1>Language Selection</h1>
        <Button variant='primary' onClick={() => (performLanguageChange('EN', '/login'))}>English</Button>
        <Button variant='primary' onClick={() => (performLanguageChange('ES', '/login'))}>Español</Button>
        <Button variant='primary' onClick={() => (performLanguageChange('POR', '/login'))}>Português</Button>
    </div>
}; 

export default HomePage; 