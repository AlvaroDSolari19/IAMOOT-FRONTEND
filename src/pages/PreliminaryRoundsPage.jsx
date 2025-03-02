import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const PreliminaryRoundsPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [showResults, setShowResults] = useState(false); 

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
        <p>The schedule would display here ... We need to discuss the format and what it includes.</p>
        <p>So far I'm assuming the name of the teams participating on the match, location, and time.</p>
        <p>Regarding the format, I'm thinking a list perhaps. Upon clicking it, it opens another page where you enter the winner.</p>
        
        <div className='d-grid gap-2'>
            <Button variant='primary' onClick={() => {setShowResults((previousState) => !previousState)}}>{showResults ? 'Hide Results' : 'Show Results'}</Button>
            {renderContent()}
            <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
        </div>
    </div>

};

export default PreliminaryRoundsPage; 