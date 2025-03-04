import React, { useContext, useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Form } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const PreliminaryRoundsDecision = () => {

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { register, handleSubmit, watch, formState: { errors } } = useForm(); 
    const performNavigation = useNavigate(); 

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

    const onSubmit = (someData) => {
        console.log(`${someData.roundWinner} has been selected as the winner`);
        performNavigation('/oralrounds/prelims');
    }

    return <div>
        
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>Team 1 vs Team 2</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)} className='text-center'>
            <Form.Group>
                <Form.Label className='fw-bold'>Please select the winner of this round:</Form.Label>
                <div className='d-flex justify-content-center mb-2'>
                    <Form.Check type='radio' label='Team 1' value='Team 1' className='mx-2' {...register('roundWinner', {required: 'Please select a winner'})}/>
                    <Form.Check type='radio' label='Team 2' value='Team 2' className='mx-2' {...register('roundWinner', {required: 'Please select a winner'})}/>
                </div>
                {errors.roundWinner && <p className='text-danger mt-2 fw-semibold fs-italic'>{errors.roundWinner.message}</p>}
            </Form.Group>

            <div className='d-grid gap-2'>
                <Button variant='success' type='submit'>Submit</Button>
            </div>

        </Form>

    </div>

}

export default PreliminaryRoundsDecision; 