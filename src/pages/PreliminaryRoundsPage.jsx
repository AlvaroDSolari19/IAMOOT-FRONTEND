import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const PreliminaryRoundsPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [showResults, setShowResults] = useState(false); 
    const [selectedDay, setSelectedDay] = useState(); 

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

    const renderRoundsPerDay = () => {
        if (!selectedDay){
            return null; 
        }

        /* Retrieve an Array with all the matches that will take place on selectedDay. Then use that to fill the content of the table. 
         * However, because we do not have an array for now with the matchups yet, we will just display a table with a single record for now. */

        return <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>Match ID</td>
                        <td>Matchup</td>
                        <td>Date and Time</td>
                        <td>Location</td>
                        <td>Winner</td>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => performNavigation('/oralrounds/prelims/1')} style={{cursor: 'pointer'}}>
                        <td>Match 1</td>
                        <td>Team 1 vs Team 2</td>
                        <td>{selectedDay} at 4:00 PM</td>
                        <td>Room 403</td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </div>
    }

    const renderContent = () => {
        if (!showResults){
            return null; 
        }

        return <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <td>School</td>
                        <td>Team ID</td>
                        <td>Number of Victories</td>
                        <td>Number of Defeats</td>
                        <td>Average Score for Memorandums</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>American University</td>
                        <td>202</td>
                        <td>2</td>
                        <td>1</td>
                        <td>8.5</td>
                    </tr>
                    <tr>
                        <td>University of West Florida</td>
                        <td>850</td>
                        <td>1</td>
                        <td>1</td>
                        <td>7.25</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    }
    
    return <div>
        
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>Preliminary Rounds</Card.Header>
        </Card>

        <div className='d-flex justify-content-center mb-3'>
            <ButtonGroup>
                <Button variant={selectedDay === 'Monday' ? 'primary': 'outline-primary'} onClick={() => setSelectedDay('Monday')}>Monday</Button>
                <Button variant={selectedDay === 'Tuesday' ? 'primary': 'outline-primary'} onClick={() => setSelectedDay('Tuesday')}>Tuesday</Button>
                <Button variant={selectedDay === 'Wednesday' ? 'primary': 'outline-primary'} onClick={() => setSelectedDay('Wednesday')}>Wednesday</Button>
            </ButtonGroup>
        </div>
        {renderRoundsPerDay()}
        
        <div className='d-grid gap-2'>
            <Button variant='primary' onClick={() => {setShowResults((previousState) => !previousState)}}>{showResults ? 'Hide Results' : 'Show Results'}</Button>
            {renderContent()}
            <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
        </div>
    </div>

};

export default PreliminaryRoundsPage; 