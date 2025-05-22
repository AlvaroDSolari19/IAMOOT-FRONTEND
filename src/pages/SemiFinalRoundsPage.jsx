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
    const [semiTeams, setSemiTeams] = useState([]); 

    const handleSignOut = () => {
        resetLanguage(); 
        assignRole(''); 
        performNavigation('/');
    };

    const fetchSemiTeamRankings = async () => {
        try {
            const [teamsResponse, matchesResponse] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/semi-team-rankings`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/semifinal-matches`)
            ]);

            setSemiTeams(teamsResponse.data);
            setSemifinalMatches(matchesResponse.data);  
        } catch (err) {
            console.error('Failed to fetch semifinal rankings: ', err); 
            alert('Failed to load semifinal rankings'); 
        }
    }

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

    /***********************************************
     * HELPER FUNCTION FOR STATE AND VICTIM TABLES *
     ***********************************************/
    const getTeamRoleMap = () => {
        const teamRoleMap = new Map(); 

        semifinalMatches.forEach(currentSemifinalMatch => {
            const { firstTeam, firstTeamRole, secondTeam, secondTeamRole } = currentSemifinalMatch; 

            teamRoleMap.set(firstTeam, firstTeamRole);
            teamRoleMap.set(secondTeam, secondTeamRole); 
        });

        return teamRoleMap; 
    }

    const renderStateTable = () => {
        if (!displayStateRanking){
            return null;
        }

        const roleMap = getTeamRoleMap(); 
        const stateTeams = semiTeams
            .filter(currentTeam => roleMap.get(currentTeam.teamID) === 'State')
            .sort((teamA, teamB) => (teamB.averageSemiScore ?? 0) - (teamA.averageSemiScore ?? 0));

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
                    {stateTeams.map(currentTeam => (
                        <tr key={currentTeam.teamID}>
                            <td>{currentTeam.universityName}</td>
                            <td>{currentTeam.teamID}</td>
                            <td>{currentTeam.averageSemiScore ?? '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    }

    const renderVictimTable = () => {
        if (!displayVictimRanking){
            return null;
        }

        const teamRoleMap = getTeamRoleMap(); 

        const victimTeams = semiTeams
            .filter(currentTeam => teamRoleMap.get(currentTeam.teamID) === 'Victim')
            .sort((teamA, teamB) => (teamB.averageSemiScore ?? 0) - (teamA.averageSemiScore ?? 0));

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
                    {victimTeams.map(currentTeam => (
                        <tr key={currentTeam.teamID}>
                            <td>{currentTeam.universityName}</td>
                            <td>{currentTeam.teamID}</td>
                            <td>{currentTeam.averageSemiScore ?? '-'}</td>
                        </tr>
                    ))}
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
            <Button variant='primary' onClick={async () => {
                if (!displayStateRanking){
                    await fetchSemiTeamRankings(); 
                }
                setDisplayStates(!displayStateRanking);
            }}>
                {displayStateRanking ? 'Hide State Rankings' : 'Show State Rankings'}
            </Button>
            {renderStateTable()}
            <Button variant='primary' onClick={async () => {
                if (!displayVictimRanking){
                    await fetchSemiTeamRankings(); 
                }
                setDisplayVictims(!displayVictimRanking);
            }}>
                {displayVictimRanking ? 'Hide Victim Rankings' : 'Show Victim Rankings'}
            </Button>
            {renderVictimTable()}
            <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
        </div>
    </div>

};

export default SemiFinalRoundsPage; 