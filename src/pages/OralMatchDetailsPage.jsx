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

    /**************************
     * HANDLE FORM SUBMISSION *
     **************************/
    const onSubmit = (someData) => {
        
        console.log('onSubmit is triggering');
        const missingFields = []; 

        /* Goes through all of matchParticipants and through all of the actualFormText. 
         * If someData is not found for any question, then it will add that question to the missingFields array. */
        matchParticipants.forEach( (currentParticipant, participantIndex) => {
            actualFormText.forEach( (currentQuestion, questionIndex) => {
                const categoryName = `submittedScored.${currentParticipant}.${questionIndex}`;
                if (!someData.submittedScores || !someData.submittedScores[currentParticipant] || someData.submittedScores[currentParticipant][questionIndex] === undefined){
                    console.log('Item added to missing fields'); 
                    missingFields.push(`${currentParticipant} - Question ${questionIdex + 1}: "${currentQuestion.currentCategory}"`)
                }
            });
        });

        /* If there are missing fields by the time it cycles over all the questions, then show an alert button without submitting. */
        if (missingFields.length > 0){
            alert(`The following fields need to be filled:\n\n${missingFields.join('\n')}`);
            return;
        }
        

        console.log ('Submitted Scores: ', someData); 
    }
        
    return <div className='d-grid gap-2'>
        
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>Match {matchID}: Team 1 vs Team 2</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Accordion defaultActiveKey={null}>
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