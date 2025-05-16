import React, { useContext, useEffect, useState} from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Table } from 'react-bootstrap'; 
import axios from 'axios'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";
import { JudgeIDContext } from '../contexts/JudgeIDContext';

const JudgeOralCompPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { judgeID } = useContext(JudgeIDContext); 
    const performNavigation = useNavigate(); 

    const pageText = {
        EN: {welcomeMsg: 'My Assigned Rounds', matchupText: 'Matchup', locationText: 'Location', classroomText: 'Room', timeText: 'Time', buttonText: 'Sign Out'}, 
        ES: {welcomeMsg: 'Mis Rondas Asignadas', matchupText: 'Emparejamiento', locationText: 'Ubicación', classroomText: 'Aula', timeText: 'Hora', buttonText: 'Cerrar Sesión'},
        POR: {welcomeMsg: 'Minhas Rodadas Atribuídas', matchupText: 'Confronto', locationText: 'Localização', classroomText: 'Sala de Aula', timeText: 'Hora', buttonText: 'Sair'}
    };

    const actualText = pageText[currentLanguage]; 

    const [assignedMatches, setMatches] = useState([]); 
    const [isLoading, setLoading] = useState(true); 

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

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const assignedMatchesResult = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/oralrounds/judge/${judgeID}`)
                setMatches(assignedMatchesResult.data); 
            } catch (err) {
                console.error(`Error fetching matches: ${err}`)
            } finally {
                setLoading(false); 
            }
        };

        if (judgeID){
            fetchMatches(); 
        }

    }, [judgeID])
    
    return <div className='d-grid gap-2'>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.welcomeMsg}</Card.Header>
        </Card>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>{actualText.matchupText}</td>
                    <td>{actualText.locationText}</td>
                    <td>{actualText.timeText}</td>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading ? (<tr><td colSpan={3}>Loading...</td></tr>) : 
                    assignedMatches.length === 0 ? (<tr><td colSpan={3}>No matches assigned to you</td></tr>) : 
                    (assignedMatches.map((currentMatch) => (
                        <tr key={currentMatch.matchID} onClick={() => performNavigation(`/oralrounds/match/${currentMatch.matchID}`)} style={{ cursor: 'pointer'}}>
                            <td>{currentMatch.firstTeam} vs {currentMatch.secondTeam}</td>
                            <td>{actualText.classroomText} {currentMatch.roomNumber}</td>
                            <td>{currentMatch.matchDate} @ {currentMatch.matchTime}</td>
                        </tr>
                    )))
                }
            </tbody>
        </Table>
        
        <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
    </div>

};

export default JudgeOralCompPage; 