import React, { useContext, useEffect } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { Button, Card, Form, ListGroup } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import questionText from '../data/writtenRubric';

const WrittenMatchDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { memorandumID } = useParams(); 
    const performNavigation = useNavigate(); 

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
        
    return <div>
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>Memorandum {memorandumID}</Card.Header>
        </Card>

        <Form>
            {actualFormText.map( (currentQuestion, questionIndex) => (
            <Card key={questionIndex} className='mb-4'>
                    <Card.Body>
                        <Card.Title>{currentQuestion.currentCategory}</Card.Title>
                        <ListGroup variant='flush'>
                            {currentQuestion.currentCriteria.map( (currentCriterion, criteriaIndex) => (
                                <ListGroup.Item key={criteriaIndex}>{currentCriterion}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
            </Card> 
            ))}
            <div className='d-grid gap-2'><Button variant='success' type='submit'>Submit</Button></div>
        </Form>

    </div>
};

export default WrittenMatchDetailsPage; 