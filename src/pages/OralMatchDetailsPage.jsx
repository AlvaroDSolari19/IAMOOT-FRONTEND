import React, { useContext, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Accordion, Button, Card, Form, ListGroup } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const OralMatchDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { matchID } = useParams(); 
    const performNavigation = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm(); 

    const matchParticipants = ['Participant 1 of Team 1', 'Participant 2 of Team 1', 'Participant 1 of Team 2', 'Participant 2 of Team 2'];

    const questionText = {
        EN: [
                {
                    currentCategory: 'Legal Arguments (0-30)', 
                    minValue: 0, 
                    maxValue: 30,
                    currentCriteria: [
                        'General Knowledge of the Inter-American human rights system',
                        'Understanding and analysis of the issues presented',
                        'Knowledge of the facts of the case',
                        'Use of case law and secondary sources'  
                    ],
                    currentTemplate: [
                        'Poor (0-6)',
                        'Below Average (7-12)',
                        'Average (13-18)',
                        'Above Average (19-24)',
                        'Exceptional (25-30)' 
                    ]
                },
                {
                    currentCategory: 'Organization of Presentation (0-20)', 
                    minValue: 0, 
                    maxValue: 20,
                    currentCriteria: [
                        'Structure and clarity of the presentation',
                        'Ability to synthesize factual material with the legal argument',
                        'Use of time',
                        'Claim of relief'  
                    ],
                    currentTemplate: [
                        'Poor (0-4)',
                        'Below Average (5-8)',
                        'Average (9-12)',
                        'Above Average (13-16)',
                        'Exceptional (17-20)' 
                    ]
                },
                {
                    currentCategory: 'General Evaluation (0-15)', 
                    minValue: 0, 
                    maxValue: 15,
                    currentCriteria: [
                        'Persuasiveness',
                        'Ability to maintain line of argumentation after interruptions',
                        'Originality'
                    ],
                    currentTemplate: [
                        'Poor (0-3)',
                        'Below Average (4-6)',
                        'Average (7-9)',
                        'Above Average (10-12)',
                        'Exceptional (13-15)' 
                    ]
                },
                {
                    currentCategory: 'Responsiveness to Opponents (0-10)',
                    minValue: 0, 
                    maxValue: 10, 
                    currentCriteria: [
                        'Ability to respond to the opponent\'s arguments',
                        'Ability to counter each of the opponent\'s arguments',
                        'Ability to anticipate the opponent\'s arguments'
                    ],
                    currentTemplate: [
                        'Poor (0-2)',
                        'Below Average (3-4)',
                        'Average (5-6)',
                        'Above Average (7-8)',
                        'Exceptional (9-10)' 
                    ]
                },
                {
                    currentCategory: 'Responsiveness to Judges (0-10)', 
                    minValue: 0, 
                    maxValue: 10,
                    currentCriteria: [
                        'Ability to respond to the judges\'s questions',
                        'Did they really respond to or evade the questions?',
                        'Throughness in answering the questions presented',
                        'Ability to deal with hypothetical questions'
                    ],
                    currentTemplate: [
                        'Poor (0-2)',
                        'Below Average (3-4)',
                        'Average (5-6)',
                        'Above Average (7-8)',
                        'Exceptional (9-10)' 
                    ]
                },
                {
                    currentCategory: 'Delivery (0-15)', 
                    minValue: 0, 
                    maxValue: 15,
                    currentCriteria: [
                        'Tone of voice',
                        'Composure',
                        'Eye-contact',
                        'Body language'
                    ],
                    currentTemplate: [
                        'Poor (0-3)',
                        'Below Average (4-6)',
                        'Average (7-9)',
                        'Above Average (10-12)',
                        'Exceptional (13-15)' 
                    ]
                }
        ],
        ES: {},
        POR: {}
    }

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