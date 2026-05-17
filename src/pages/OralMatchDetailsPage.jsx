import React, { useContext, useEffect, useState, useRef } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Accordion, Alert, Button, Card, Form, ListGroup, Spinner } from 'react-bootstrap'; 

import api from '../services/api';
import { LanguageContext } from '../contexts/LanguageContext';

import questionText from '../data/oralRubric';

const OralMatchDetailsPage = () => { 

    const { matchID } = useParams(); 
    const [matchData, setMatchData] = useState(null); 
    const [allSpeakers, setSpeakerList] = useState([]); 
    const [isLoadingMatch, setIsLoadingMatch] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [submitError, setSubmitError] = useState('');

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();  
    const performNavigation = useNavigate(); 

    const [openPanel, setOpenPanel] = useState(null);
    const accordionRefs = useRef({}); 

    const pageText = {
        EN: {evaluationMsg: 'Evaluation Criteria', templateMsg: 'Scoring Template', labelPrompt: 'Enter score', errorMsg: 'Please enter a numeric value for the above field', submitMsg: 'Submit all evaluations', loadingMsg: 'Loading match details...', accessDeniedMsg: 'Access denied. You are not assigned to this match.', alreadyGradedMsg: 'You have already graded this match.', submitSuccessMsg: 'Scores submitted successfully.', submitErrorMsg: 'An error occurred while submitting the scores. Please try again.', allSpeakersRequiredMsg: 'All 4 speakers must be graded before submitting'}, 
        SPA: {evaluationMsg: 'Criterios de Evaluación', templateMsg: 'Guía de Puntuación', labelPrompt: 'Ingrese la puntuación', errorMsg: 'Por favor, ingrese un valor numérico en el campo anterior', submitMsg: 'Enviar todas las evaluaciones', loadingMsg: 'Cargando detalles del enfrentamiento...', accessDeniedMsg: 'Acceso denegado. No estás asignado a este enfrentamiento.', alreadyGradedMsg: 'Ya has calificado este enfrentamiento.', submitSuccessMsg: 'Puntuaciones enviadas con éxito.', submitErrorMsg: 'Ocurrió un error al enviar las puntuaciones. Por favor, inténtalo de nuevo.', allSpeakersRequiredMsg: 'Todas los 4 oradores deben ser calificados antes de enviar'},
        POR: {evaluationMsg: 'Critérios de Avaliação', templateMsg: 'Modelo de Pontuação', labelPrompt: 'Insira a pontuação', errorMsg: 'Por favor, insira um valor numérico no campo acima.', submitMsg: 'Enviar todas as avaliações', loadingMsg: 'Carregando detalhes do confronto...', accessDeniedMsg: 'Acesso negado. Você não está designado para esta partida.', alreadyGradedMsg: 'Você já avaliou esta partida.', submitSuccessMsg: 'Pontuações enviadas com sucesso.', submitErrorMsg: 'Ocorreu um erro ao enviar as pontuações. Por favor, tente novamente.', allSpeakersRequiredMsg: 'Todos os 4 oradores devem ser avaliados antes de enviar'}
    }

    const actualText = pageText[currentLanguage] || pageText.EN; 
    const actualFormText = questionText[currentLanguage] || questionText.EN; 

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        resetLanguage(); 
        performNavigation('/login', {replace: true});
    };

    /********************
     * FETCH MATCH INFO *
     ********************/
    useEffect(() => {
        async function fetchMatch(){
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
                performNavigation('/login', {replace: true});
                return;
            }

            try{
                setIsLoadingMatch(true);
                setLoadError('');
                setSubmitError('');

                const matchResponse = await api.get(`/api/oralrounds/match/${matchID}`);
                const rawData = matchResponse.data;

                setMatchData(rawData);
                setSpeakerList(rawData.allSpeakers || []); 
            } catch (err) {
                if(err.response?.status === 403){
                    const errorMsg = err.response.data?.message; 

                    if (errorMsg === 'You have already graded this match.'){
                        alert('You have already graded this match.');
                    } else {
                        alert('Access denied. You are not assigned to this match.'); 
                    }
                    
                    performNavigation(`/oralcomp/judge`)
                
                } else {
                    console.error(`Error fetching match data: ${err}`)
                }
            } finally {
                setIsLoadingMatch(false);
            }
        }

        fetchMatch(); 
    }, [matchID]);


    /**************************
     * HANDLE FORM SUBMISSION *
     **************************/
    const onSubmit = async (formData) => {

        const scoresFromForm = formData.submittedScores || {}; 

        /* VALIDATION */
        if (Object.keys(scoresFromForm).length !== 4){
            alert('All 4 speakers must be graded before submitting'); 
            return; 
        }

        for (const speakerID of Object.keys(scoresFromForm)){
            const scoreArray = scoresFromForm[speakerID]; 

            if (!Array.isArray(scoreArray) || scoreArray.length === 0){
                alert(`Missing scores for speaker: ${speakerID}`);
                return; 
            }

            for (const currentScore of scoreArray){
                const numericScore = Number(currentScore); 
                if (isNaN(numericScore)){
                    alert(`Invalid score entered for speaker ${speakerID}. Please enter a number.`)
                    return; 
                }
            }
        }

        /* TRANSFORMATION TO SOMETHING POST CAN UPDATE */ 
        const finalScores = [];
        Object.keys(scoresFromForm).forEach( (speakerID) => {
            const scoreArray = scoresFromForm[speakerID]; 
            const totalScore = scoreArray.reduce((acc, score) => acc + Number(score), 0);
            finalScores.push({ speakerID, finalScore: totalScore }); 
            console.log(`${speakerID} made a total score of ${totalScore}`);
        })

        try {
            setSubmitError('');

            await api.post('/api/oralrounds/submitscores', { 
                matchID,
                finalScores
            });

            alert(actualText.submitSuccessMsg); 
            performNavigation(`/oralcomp/judge`)
        } catch (err) {
            console.error('Error submitting scores: ', err);
            
            if (err.response?.status === 401) {
                handleSignOut();
                return;
            }

            setSubmitError(
                err.response?.data?.message ||
                err.message ||
                actualText.submitErrorMsg
            );
        }
    };

    if (isLoadingMatch) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" size="sm" /> {actualText.loadingMsg}
            </div>
        );
    }

    if (loadError) {
        return (
            <Alert variant="danger" className="text-center fw-semibold mt-4">
                {loadError}
            </Alert>
        );
    }

    if (!matchData) {
        return (
            <Alert variant="danger" className="text-center fw-semibold mt-4">
                Unable to load match details.
            </Alert>
        );
    }
        
    return <div className='d-grid gap-2'>
        
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>{matchData.firstTeam} vs {matchData.secondTeam}</Card.Header>
        </Card>

        {submitError && (
            <Alert variant="danger" className="fw-semibold">
                {submitError}
            </Alert>
        )}
        
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
                                                    {errors.submittedScores[currentParticipant.speakerID][questionIndex].message}
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