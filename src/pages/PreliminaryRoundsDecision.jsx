import React, { useContext, useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { Button, Card, Form } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import axios from 'axios';

const PreliminaryRoundsDecision = () => {

    const { matchID } = useParams(); 

    const { resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const performNavigation = useNavigate(); 

    const [matchDetails, setMatchDetails] = useState(null);

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

    /***********************************************************************
     * FETCHES MATCHES FROM A PARTICULAR MATCH TO DISPLAY ON DECISION PAGE *
     ***********************************************************************/
    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const matchResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/preliminary-matches/${matchID}`);
                setMatchDetails(matchResponse.data); 
            } catch (err){
                console.error('Failed to fetch match: ', err); 
            }
        }
        fetchMatch();
    }, [matchID])

    const onSubmit = async (formData) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/preliminary-matches/${matchID}`, {
                matchWinner: formData.roundWinner
            });

            alert(`Winner ${formData.roundWinner} submitted successfully!`);
            performNavigation('/oralrounds/prelims');
        } catch (err) {
            console.error('Error submitting match winner: ', err); 
            alert('Failed to submit winner. Please try again.');
        }
    }

    return <div>
        
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>
                {matchDetails ? `Team ${matchDetails.firstTeam} vs Team ${matchDetails.secondTeam}` : `Loading match...`}
            </Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)} className='text-center'>
            <Form.Group>
                <Form.Label className='fw-bold'>Please select the winner of this round:</Form.Label>
                {matchDetails ? (
                    <div className='d-flex justify-content-center mb-2'>
                        <Form.Check type='radio' label={`${matchDetails.firstTeamName} (${matchDetails.firstTeam})`} value={matchDetails.firstTeam} className='mx-2' {...register('roundWinner', {required: 'Please select a winner'})}/>
                        <Form.Check type='radio' label={`${matchDetails.secondTeamName} (${matchDetails.secondTeam})`} value={matchDetails.secondTeam} className='mx-2' {...register('roundWinner', {required: 'Please select a winner'})}/>
                    </div>
                ) : (
                    <p className='text-muted'>Loading team names...</p>
                )}
                
            </Form.Group>

            <div className='d-grid gap-2'>
                <Button variant='success' type='submit'>Submit</Button>
            </div>

        </Form>

    </div>

}

export default PreliminaryRoundsDecision; 