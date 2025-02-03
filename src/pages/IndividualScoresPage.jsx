import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const IndividualScoresPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [selectedCategory, setSelectedCategory] = useState(null); 

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

    const handleCategorySelection = (someCategory) => {
        setSelectedCategory(someCategory)
    }

    const renderContent = () => {
        if (!selectedCategory){
            return null; 
        }

        return <div>
            <h2>{selectedCategory}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Ranking</td>
                        <td>School</td>
                        <td>Participant's Name</td>
                        <td>Average Score for Preliminary</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>American University</td>
                        <td>Alvaro Solari</td>
                        <td>9.0</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>American University</td>
                        <td>Santiago Yara</td>
                        <td>8.75</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    }
    
    return <div className='d-grid gap-2'>
        <h1>Individual Oral Competition</h1>
        <Button variant='primary' onClick={() => {handleCategorySelection('Individual English Rankings')}}>English Speakers</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('Individual Spanish Rankings')}}>Spanish Speakers</Button>
        <Button variant='primary' onClick={() => {handleCategorySelection('Individual Portuguese Rankings')}}>Portuguese Speakers</Button>
        {renderContent()}
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default IndividualScoresPage; 