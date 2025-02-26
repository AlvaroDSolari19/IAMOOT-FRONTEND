import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Table } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const JudgeOralCompPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const pageText = {
        EN: {welcomeMsg: 'My Assigned Rounds', matchupText: 'Matchup', locationText: 'Location', classroomText: 'Room', timeText: 'Time', buttonText: 'Sign Out'}, 
        ES: {welcomeMsg: 'Mis Rondas Asignadas', matchupText: 'Emparejamiento', locationText: 'Ubicación', classroomText: 'Aula', timeText: 'Hora', buttonText: 'Cerrar Sesión'},
        POR: {welcomeMsg: 'Minhas Rodadas Atribuídas', matchupText: 'Confronto', locationText: 'Localização', classroomText: 'Sala de Aula', timeText: 'Hora', buttonText: 'Sair'}
    };

    const actualText = pageText[currentLanguage]; 

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
                <tr onClick={() => performNavigation('/oralrounds/match/1')} style={{cursor: 'pointer'}}>
                    <td>American University vs University of West Florida</td>
                    <td>{actualText.classroomText} 403</td>
                    <td>4:00 PM</td>
                </tr>
            </tbody>
        </Table>
        
        <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
    </div>

};

export default JudgeOralCompPage; 