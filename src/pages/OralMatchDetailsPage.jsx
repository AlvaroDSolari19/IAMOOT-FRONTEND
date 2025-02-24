import React, { useContext, useEffect, useState, useRef } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Accordion, Button, Card, Form, ListGroup } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import questionText from '../data/oralRubric';

const OralMatchDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();  
    const { matchID } = useParams(); 
    const performNavigation = useNavigate(); 

    const [openPanel, setOpenPanel] = useState(null);
    const accordionRefs = useRef({}); 

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

    /**************************
     * HANDLE FORM SUBMISSION *
     **************************/
    const onSubmit = (someData) => {
        Object.keys(someData.submittedScores).forEach( (currentParticipant) => {
            let totalScore = 0; 
            const participantScores = someData.submittedScores[currentParticipant]; 
            participantScores.forEach(currentScore => {
                totalScore = totalScore + Number(currentScore); 
            })
            console.log(`${currentParticipant} made a total score of ${totalScore}`)
        })

        performNavigation('/oralcomp/judge');
    }
        
    return <div className='d-grid gap-2'>
        
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>Match {matchID}: Team 1 vs Team 2</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Accordion activeKey={openPanel} onSelect={(eventKey) => {
                setOpenPanel(eventKey);
                setTimeout(() => {
                    if (eventKey !== null){
                        const panelRef = accordionRefs.current[eventKey];
                        if (panelRef){
                            panelRef.scrollIntoView({behavior: 'smooth', block: 'start'});
                        }
                    }
                }, 350);
            }}>
                
                {matchParticipants.map((eachParticipant, participantIndex) => (
                    <Accordion.Item eventKey={participantIndex.toString()} key={participantIndex} ref={(el) => accordionRefs.current[participantIndex] = el}>
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
                                            <Form.Control 
                                                type='number' 
                                                min={currentQuestion.minValue} 
                                                max={currentQuestion.maxValue}
                                                onWheel={(someEvent) => someEvent.target.blur()}
                                                {...register(`submittedScores.${eachParticipant}.${questionIndex}`, {
                                                    required: 'Score is required', 
                                                    min: currentQuestion.minValue,
                                                    max: currentQuestion.maxValue,
                                                })} 
                                                onBlur={(someEvent) => {
                                                    let targetValue = Number(someEvent.target.value);
                                                    if (targetValue < currentQuestion.minValue) someEvent.target.value = currentQuestion.minValue; 
                                                    if (targetValue > currentQuestion.maxValue) someEvent.target.value = currentQuestion.maxValue;   
                                                }}
                                            />
                                            {errors.submittedScores?.[eachParticipant]?.[questionIndex] && (
                                                <p className='text-danger'>
                                                    {errors.submittedScores[eachParticipant][questionIndex].message}
                                                </p>
                                            )}
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <div className='d-grid gap-2'>
                <Button variant='success' type='submit'>Submit All Evaluations</Button>
                <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
            </div>

        </Form>
    </div>
};

export default OralMatchDetailsPage; 