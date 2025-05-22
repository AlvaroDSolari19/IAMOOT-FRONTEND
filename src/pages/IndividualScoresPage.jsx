import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Table } from 'react-bootstrap'; 
import axios from 'axios'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const IndividualScoresPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [selectedCategory, setSelectedCategory] = useState(null); 
    const [speakerData, setSpeakerData] = useState([]); 

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

    const handleCategorySelection = async (someCategory) => {
        setSelectedCategory(someCategory)

        let languageCode = ''; 
        if (someCategory.includes('English')) languageCode = 'EN'; 
        if (someCategory.includes('Spanish')) languageCode = 'SPA'; 
        if (someCategory.includes('Portuguese')) languageCode = 'POR'; 

        try {
            const speakerResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/speakers?language=${languageCode}`);
            setSpeakerData(speakerResponse.data);
        } catch (error) {
            console.error('Error fetching speaker data: ', error); 
            setSpeakerData([]); 
        }
    }

    const renderContent = () => {
        if (!selectedCategory){
            return null; 
        }

        return <div>
            <h2 className='text-center my-4'>{selectedCategory}</h2>
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
                    {speakerData.map((currentSpeaker, speakerIndex) => (
                        <tr key={currentSpeaker.speakerID || speakerIndex}>
                            <td>{speakerIndex + 1}</td>
                            <td>Placeholder</td>
                            <td>{currentSpeaker.speakerName}</td>
                            <td>{currentSpeaker.preliminaryAverageScore?.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    }
    
    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>Individual Oral Competition</Card.Header>
        </Card>
        <div className='d-grid gap-2'>
            <Button variant='primary' onClick={() => {handleCategorySelection('Individual English Rankings')}}>English Speakers</Button>
            <Button variant='primary' onClick={() => {handleCategorySelection('Individual Spanish Rankings')}}>Spanish Speakers</Button>
            <Button variant='primary' onClick={() => {handleCategorySelection('Individual Portuguese Rankings')}}>Portuguese Speakers</Button>
            {renderContent()}
            <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
        </div>
    </div>

};

export default IndividualScoresPage; 