import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Table } from 'react-bootstrap'; 
import axios from 'axios';

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const SemiFinalRoundsPage = () => { 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [displayRound, setDisplayRound] = useState(false); 
    const [displayStateRanking, setDisplayStates] = useState(false);
    const [displayVictimRanking, setDisplayVictims] = useState(false); 

    const [semifinalMatches, setSemifinalMatches] = useState([]); 

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
            <h2>Semifinals Schedule</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Match ID</th>
                        <th>Matchup</th>
                        <th>Classroom</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {semifinalMatches.map((currentMatch) => (
                        <tr key={currentMatch.matchID}>
                            <td>{currentMatch.matchID}</td>
                            <td>{currentMatch.firstTeamName} <strong>({currentMatch.firstTeam})</strong> vs {currentMatch.secondTeamName} <strong>({currentMatch.secondTeam})</strong></td>
                            <td>{currentMatch.roomNumber || 'TBD'}</td>
                            <td>{currentMatch.matchTime || 'TBD'}</td>
                        </tr>
                    ))}
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
    
    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>Semifinal Rounds</Card.Header>
        </Card>

        <div className='d-grid gap-2'>
            <Button variant='primary' onClick={async () => {
                if (!displayRound){

                    try{
                        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/semifinal-matches`);
                        setSemifinalMatches(response.data); 
                        setDisplayRound(true);
                    } catch (err){
                        console.error('Error fetching semifinal matches: ', err); 
                        alert('Failed to load semifinal schedule.'); 
                    }

                } else {
                    setDisplayRound(false); 
                }
            }}>
                {displayRound ? 'Hide Schedule' : 'Show Schedule'}
            </Button>
            {renderRoundTable()}
            <Button variant='primary' onClick={() => {setDisplayStates(true)}}>State Rankings</Button>
            {renderStateTable()}
            <Button variant='primary' onClick={() => {setDisplayVictims(true)}}>Victim Rankings</Button>
            {renderVictimTable()}
            <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
        </div>
    </div>

};

export default SemiFinalRoundsPage; 