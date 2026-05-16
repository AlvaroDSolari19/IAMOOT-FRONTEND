import React, { useContext, useEffect, useState} from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Alert, Button, Card, Table, ListGroup, Spinner } from 'react-bootstrap'; 
import axios from 'axios'; 

import { LanguageContext } from '../contexts/LanguageContext';
import api from '../services/api';

const JudgeOralCompPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const performNavigation = useNavigate(); 

    const [assignedMatches, setAssignedMatches] = useState([]);
    const [isLoadingMatches, setIsLoadingMatches] = useState(true);
    const [loadError, setLoadError] = useState('');

    const pageText = {
        EN: {welcomeMsg: 'My Assigned Rounds', matchupText: 'Matchup', locationText: 'Location', classroomText: 'Room', timeText: 'Time', noMatchesText: 'No remaining oral rounds to score', loadingText: 'Loading assigned oral rounds...', logoutText: 'Sign Out'}, 
        SPA: {welcomeMsg: 'Mis Rondas Asignadas', matchupText: 'Emparejamiento', locationText: 'Ubicación', classroomText: 'Aula', timeText: 'Hora', noMatchesText: 'No hay rondas orales pendientes por calificar', loadingText: 'Cargando rondas orales asignadas...', logoutText: 'Cerrar Sesión'},
        POR: {welcomeMsg: 'Minhas Rodadas Atribuídas', matchupText: 'Confronto', locationText: 'Localização', classroomText: 'Sala de Aula', timeText: 'Hora', noMatchesText: 'Não há rodadas orais restantes para avaliar', loadingText: 'Carregando rondas orais atribuídas...', logoutText: 'Sair'}
    };

    const actualText = pageText[currentLanguage] || pageText['EN'];; 

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        resetLanguage();  
        performNavigation('/');
    };

    useEffect(() => {
        async function loadAssignedMatches() {
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
                performNavigation('/login', {replace: true});
                return;
            }

            try {
                setIsLoadingMatches(true);
                setLoadError('')

                const response = await api.get('/api/oralrounds/me/matches');

                setAssignedMatches(response.data || []);
            } catch (error) {
                console.error('ERROR LOADING ASSIGNED ORAL MATCHES:', error);

                if (error.response?.status === 401) {
                    handleSignOut();
                    return;
                }

                setLoadError(
                    error.response?.data?.message ||
                    error.message ||
                    'Unable to load assgined oral rounds'
                );
            } finally {
                setIsLoadingMatches(false);
            }
        }

        loadAssignedMatches();
    }, []);


    return (
        <div className='d-grid gap-2'>
            <Card className='text-center mb-3'>
                <Card.Header as='h1' className='display-5 fw-bold'>
                    {actualText.welcomeMsg}
                </Card.Header>
            </Card>

            {loadError && (
                <Alert variant="dange" className="text-center fw-semibold">
                    {loadError}
                </Alert>
            )}

            <ListGroup>
                {isLoadingMatches ? (
                    <ListGroup.Item className="text-center">
                        <Spinner animation="border" size="sm" /> {actualText.loadingText}
                    </ListGroup.Item>
                ) : assignedMatches.length === 0 ? (
                    <ListGroup.Item className="text-center">
                        {actualText.noMatchesText}
                    </ListGroup.Item>
                ) : (
                    assignedMatches.map((currentMatch) => (
                        <ListGroup.Item
                            key={currentMatch.matchID}
                            action
                            onClick={() => performNavigation(`/oralrounds/match/${currentMatch.matchID}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <strong>{actualText.matchupText}:</strong>{' '}
                            {currentMatch.firstTeam} ({currentMatch.firstTeamRole}) vs{' '}
                            {currentMatch.secondTeam} ({currentMatch.secondTeamRole})
                            <br />

                            <strong>{actualText.classroomText}:</strong>{' '}
                            {currentMatch.roomNumber || 'N/A'}
                            <br />

                            <strong>{actualText.timeText}:</strong>{' '}
                            {currentMatch.matchTime || 'N/A'}
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
            
            <Button variant='danger' className="w-100" onClick={handleSignOut}>
                {actualText.logoutText}
            </Button>
        </div>
    );
};

export default JudgeOralCompPage; 