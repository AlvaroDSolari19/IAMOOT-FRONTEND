import React, { useContext, useEffect, useState, useRef } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Accordion, Button, Card, Form, ListGroup } from 'react-bootstrap'; 
import axios from 'axios'

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import questionText from '../data/oralRubric';

const OralMatchDetailsPage = () => { 

    const { matchID } = useParams(); 
    const [matchData, setMatchData] = useState(null); 
    const [allSpeakers, setSpeakerList] = useState([]); 

    const { currentLanguage } = useContext(LanguageContext);
    const { currentRole } = useContext(RoleContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();  
    const performNavigation = useNavigate(); 

    const [openPanel, setOpenPanel] = useState(null);
    const accordionRefs = useRef({}); 

    const pageText = {
        EN: {evaluationMsg: 'Evaluation Criteria', templateMsg: 'Scoring Template', labelPrompt: 'Enter score', errorMsg: 'Please enter a value for the above field', submitMsg: 'Submit all evaluations'}, 
        ES: {evaluationMsg: 'Criterios de Evaluación', templateMsg: 'Guía de Puntuación', labelPrompt: 'Ingrese la puntuación', errorMsg: 'Por favor, ingrese un valor para el campo anterior', submitMsg: 'Enviar todas las evaluaciones'},
        POR: {evaluationMsg: 'Critérios de Avaliação', templateMsg: 'Modelo de Pontuação', labelPrompt: 'Insira a pontuação', errorMsg: 'Por favor, insira um valor no campo acima', submitMsg: 'Enviar todas as avaliações'}
    }

    const actualText = pageText[currentLanguage]; 
    const actualFormText = questionText[currentLanguage]; 

    /********************
     * FETCH MATCH INFO *
     ********************/
    useEffect(() => {
        async function fetchMatch(){
            try{
                const matchResponse = await axios.get(`http://localhost:3000/api/oralrounds/match/${matchID}`);
                const rawData = matchResponse.data; 

                setMatchData(rawData);
                setSpeakerList(rawData.allSpeakers); 
            } catch (err) {
                console.error(`Error fetching match data: ${err}`)
            }
        }

        fetchMatch(); 
    }, [matchID]);
    
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
            console.log(`${currentParticipant} made a total score of ${totalScore}`);
        })
        performNavigation('/oralcomp/judge');
    }

    if (!matchData) {
        return <p className="text-center mt-5">Loading match details...</p>;
    }

    console.log(allSpeakers); 
        
    return <div className='d-grid gap-2'>
        
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>{matchData.firstTeam} vs {matchData.secondTeam}</Card.Header>
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
                
                {allSpeakers.map((currentParticipant, participantIndex) => (
                    <Accordion.Item eventKey={participantIndex.toString()} key={participantIndex} ref={(el) => accordionRefs.current[participantIndex] = el}>
                        <Accordion.Header>{currentParticipant.speakerName}</Accordion.Header>
                        <Accordion.Body>
                            {actualFormText.map( (currentQuestion, questionIndex) => (                    
                                <Card key={questionIndex} className='mb-4'>
                                    <Card.Body>
                                        <Card.Title>{currentQuestion.currentCategory}</Card.Title>
                                
                                        <Card.Subtitle className='mt-3 mb-2'>{actualText.evaluationMsg}</Card.Subtitle>
                                        <ListGroup variant='flush'>
                                            {currentQuestion.currentCriteria.map( (currentCriterion, criteriaIndex) => (
                                                <ListGroup.Item key={criteriaIndex}>{currentCriterion}</ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        <Card.Subtitle className='mt-3 mb-2'>{actualText.templateMsg}</Card.Subtitle>
                                        <ListGroup variant='flush'>
                                            {currentQuestion.currentTemplate.map( (differentScores, scoreIndex) => (
                                                <ListGroup.Item key={scoreIndex}>{differentScores}</ListGroup.Item>
                                            ))}
                                        </ListGroup>

                                        <Form.Group className='w-100'>
                                            <div className='d-flex align-items-center gap-2'>
                                                <Form.Label className='fw-bold text-nowrap mb-0 me-2 d-flex align-items-center' style={{height: '38px'}}>{actualText.labelPrompt}</Form.Label>
                                                <Form.Control 
                                                    type='number' 
                                                    min={currentQuestion.minValue} 
                                                    max={currentQuestion.maxValue}
                                                    onWheel={(someEvent) => someEvent.target.blur()}
                                                    {...register(`submittedScores.${currentParticipant.speakerID}.${questionIndex}`, {
                                                        required: actualText.errorMsg, 
                                                        min: currentQuestion.minValue,
                                                        max: currentQuestion.maxValue,
                                                    })} 
                                                    onBlur={(someEvent) => {
                                                        let targetValue = Number(someEvent.target.value);
                                                        if (targetValue < currentQuestion.minValue) setValue(`submittedScores.${currentParticipant.speakerID}.${questionIndex}`, currentQuestion.minValue, {shouldValidate: true}); 
                                                        if (targetValue > currentQuestion.maxValue) setValue(`submittedScores.${currentParticipant.speakerID}.${questionIndex}`, currentQuestion.maxValue, {shouldValidate: true});   
                                                    }}
                                                />
                                            </div>
                                            {errors.submittedScores?.[currentParticipant.speakerID]?.[questionIndex] && (
                                                <div className='text-danger mt-2 fw-semibold fs-italic'>
                                                    {errors.submittedScores[currentParticipant][questionIndex].message}
                                                </div>
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
                <Button variant='success' type='submit'>{actualText.submitMsg}</Button>
            </div>
        </Form>
    </div>
};

export default OralMatchDetailsPage; 