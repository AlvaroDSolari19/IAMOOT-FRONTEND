import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import axios from 'axios'; 

const PreliminaryRoundsPage = () => { 

    const dayToDateMap = {
        Monday: '2025-05-19', 
        Tuesday: '2025-05-20', 
        Wednesday: '2025-05-21'
    }

    const dateToDayMap = {
        '2025-05-19': 'Monday', 
        '2025-05-20': 'Tuesday', 
        '2025-05-21': 'Wednesday'
    }

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const [showResults, setShowResults] = useState(false); 
    const [selectedDay, setSelectedDay] = useState();
    const [matchesForDay, setMatchesForDay] = useState([]); 

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

    /**************************************************************
     * FETCHES MATCHES FOR A SINGLE DAY WHEN SELECTED DAY CHANGES *
     **************************************************************/
    useEffect(() => {
        if (!selectedDay) return; 

        const fetchMatches = async () => {
            try {
                const matchResponse = await axios.get('http://localhost:3000/api/preliminary-matches', {
                    params: {matchDate: selectedDay }
                });
                setMatchesForDay(matchResponse.data); 
            } catch (error) {
                console.error('Failed to fetch matches: ', error)
            }
        };
        fetchMatches(); 
    }, [selectedDay]);

    const renderRoundsPerDay = () => {
        if (!selectedDay){
            return null; 
        }

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
                    {matchesForDay.length === 0 ? (
                        <tr><td colSpan={5} className='text-center'>No matches for this day!</td></tr>
                    ) : (
                        matchesForDay.map((currentMatch, matchIndex) => (
                            <tr key={currentMatch.matchID || matchIndex} onClick={() => performNavigation(`/oralrounds/prelims/${currentMatch.matchID}`)} style={{cursor: 'pointer'}}>
                                <td>{currentMatch.matchID}</td>
                                <td>{currentMatch.firstTeam} vs {currentMatch.secondTeam}</td>
                                <td>{dateToDayMap[selectedDay]} at {currentMatch.matchTime}</td>
                                <td>{currentMatch.roomNumber}</td>
                                <td></td>
                            </tr>
                        ))
                    )}
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
                {Object.keys(dayToDateMap).map(currentDay => (
                    <Button key={currentDay} variant={selectedDay === dayToDateMap[currentDay] ? 'primary' : 'outline-primary'} onClick={() => setSelectedDay(dayToDateMap[currentDay])}>{currentDay}</Button>
                ))}
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