import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom' 
import { Button, Card } from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from '../contexts/RoleContext'; 

const DashboardPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const buttonsText = {
        EN: {welcomeMsg: 'Welcome ', mainTitle: 'Select the Competition', oralComp: 'Oral Competition', writtenComp: 'Written Competition', buttonText: 'Sign Out'},
        ES: {welcomeMsg: 'Bienvenido/a', mainTitle: 'Seleccione la Competencia', oralComp: 'Competencia Oral', writtenComp: 'Competencia Escrita', buttonText: 'Cerrar Sesión'},
        POR: {welcomeMsg: 'Bem-vindo/a', mainTitle: 'Selecione a Competição', oralComp: 'Competição Oral', writtenComp: 'Competição Escrita', buttonText: 'Sair'}
    };

    const actualText = buttonsText[currentLanguage];

    const handleSignOut = () => {
        resetLanguage(); 
        assignRole(''); 
        performNavigation('/');
    };

    /****************************************
     * CHECKS THAT THE USER HAS EITHER ROLE *
     ****************************************/
    useEffect(() => {
        if (!['Admin', 'Judge', 'Volunteer'].includes(currentRole)){
            handleSignOut(); 
        }
    }, [currentRole]);

    const renderContentForRole = () => {

        if (currentRole === 'Admin'){
            return (<div className='d-grid gap-2'>
                <Card className='text-center mb-2'>
                    <Card.Header as='h1' className='display-5 fw-bold'>Welcome Admin</Card.Header>
                    <Card.Header as='h1' className='display-6 fw-bold'>Select the Competition</Card.Header>
                </Card>
                <Button variant='primary' onClick={() => {performNavigation('/oralcomp/admin')}}>Oral Competition</Button>
                <Button variant='primary' onClick={() => {performNavigation('/writtencomp/admin')}}>Written Competition</Button>
                <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
            </div>);
        } else if (currentRole === 'Judge'){
            return (<div className='d-grid gap-2'>
                <Card className='text-center mb-2'>
                    <Card.Header as='h1' className='display-5 fw-bold'>{actualText.welcomeMsg} {currentRole}</Card.Header>
                    <Card.Header as='h1' className='display-6 fw-bold'>{actualText.mainTitle}</Card.Header>
                </Card>
                <Button variant='primary' onClick={() => {performNavigation('/oralcomp/judge')}}>{actualText.oralComp}</Button>
                <Button variant='primary' onClick={() => {performNavigation('/writtencomp/judge')}}>{actualText.writtenComp}</Button>
                <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
            </div>);
        } else if (currentRole === 'Volunteer'){
            return (<div className='d-grid gap-2'>
                <Card className='text-center mb-2'>
                    <Card.Header as='h1' className='display-5 fw-bold'>Welcome Volunteer</Card.Header>
                </Card>
                <p>Table with the restrictions will appear here</p>
                <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
            </div>)
        } 
        return null; 
    }

    return <div>
        {renderContentForRole()}
    </div>
};

export default DashboardPage; 