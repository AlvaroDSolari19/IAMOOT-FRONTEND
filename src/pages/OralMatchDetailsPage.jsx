import React, { useContext, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Accordion, Button, Card, Form, ListGroup } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import questionText from '../data/oralRubric';

const OralMatchDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { matchID } = useParams(); 
    const performNavigation = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const matchParticipants = ['Participant 1 of Team 1', 'Participant 2 of Team 1', 'Participant 1 of Team 2', 'Participant 2 of Team 2'];

    const actualFormText = questionText[currentLanguage]; 

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
        
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>Match {matchID}: Team 1 vs Team 2</Card.Header>
        </Card>

        <Form>
            <Accordion defaultActiveKey='0'>
                {matchParticipants.map((eachParticipant, participantIndex) => (
                    <Accordion.Item eventKey={participantIndex.toString()} key={participantIndex} >
                        <Accordion.Header>{eachParticipant}</Accordion.Header>
                        <Accordion.Body>
                            {actualFormText.map( (currentQuestion, questionIndex) => (                    
                                <Card key={questionIndex} className='mb-4'>
                                    <Card.Body>
                                        <Card.Title>{currentQuestion.currentCategory}</Card.Title>
                                
                                        <Card.Subtitle className='mt-3 mb-2'>Evaluation Criteria</Card.Subtitle>
                                        <ListGroup variant='flush'>
                                            {currentQuestion.currentCriteria.map( (currentCriterion, criteriaIndex) => (
                                                <ListGroup.Item key={criteriaIndex}>{currentCriterion}</ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        <Card.Subtitle className='mt-3 mb-2'>Scoring Template</Card.Subtitle>
                                        <ListGroup variant='flush'>
                                            {currentQuestion.currentTemplate.map( (differentScores, scoreIndex) => (
                                                <ListGroup.Item key={scoreIndex}>{differentScores}</ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        <Form.Group>
                                            <Form.Label>Enter score</Form.Label>
                                            <Form.Control type='number' min={currentQuestion.minValue} max={currentQuestion.maxValue} required/>
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Form>
        <Button variant='success'>Submit All Evaluations</Button>
        <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
    </div>
};

export default OralMatchDetailsPage; 