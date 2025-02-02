import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const SemiFinalRoundsPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [displayRound, setDisplayRound] = useState(false); 
    const [displayStateRanking, setDisplayStates] = useState(false);
    const [displayVictimRanking, setDisplayVictims] = useState(false); 

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

    const renderRoundTable = () => {
        if (!displayRound){
            return null;
        }

        return <div>
            <h2>Round Schedule</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Match Up</th>
                        <th>Classroom</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>American University vs University of West Florida</th>
                        <th>Room 403</th>
                        <th>4:00 PM</th>
                    </tr>
                </tbody>
            </Table>
        </div>
    }

    const renderStateTable = () => {
        if (!displayStateRanking){
            return null;
        }

        return <div>
            <h2>State Rankings</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Team ID</th>
                        <th>Average Score for Round</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>American University</th>
                        <th>202</th>
                        <th>9.0</th>
                    </tr>
                </tbody>
            </Table>
        </div>
    }

    const renderVictimTable = () => {
        if (!displayVictimRanking){
            return null;
        }

        return <div>
            <h2>Victim Rankings</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Team ID</th>
                        <th>Average Score for Round</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>University of West Florida</th>
                        <th>850</th>
                        <th>8.5</th>
                    </tr>
                </tbody>
            </Table>
        </div>
    }
    
    return <div className='d-grid gap-2'>
        <h1>Semifinal Rounds</h1>
        <Button variant='primary' onClick={() => {setDisplayRound(true)}}>Generate Schedule</Button>
        {renderRoundTable()}
        <Button variant='primary' onClick={() => {setDisplayStates(true)}}>State Rankings</Button>
        {renderStateTable()}
        <Button variant='primary' onClick={() => {setDisplayVictims(true)}}>Victim Rankings</Button>
        {renderVictimTable()}
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>

};

export default SemiFinalRoundsPage; 