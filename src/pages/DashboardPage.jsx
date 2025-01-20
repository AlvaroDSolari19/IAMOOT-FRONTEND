import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from '../contexts/RoleContext'; 

const DashboardPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const buttonsText = {
        EN: {welcomeMsg: 'Welcome ', mainTitle: 'Select the Competition', oralComp: 'Oral Competition', writtenComp: 'Written Competition', buttonText: 'Sign Out'},
        ES: {welcomeMsg: 'Bienvenido/a', mainTitle: 'Seleccione la Competencia', oralComp: 'Competencia Oral', writtenComp: 'Competencia Escrita', buttonText: 'Cerrar Sesion'},
        POR: {welcomeMsg: 'Bem-vindo/a!', mainTitle: 'Selecione a Competição', oralComp: 'Competição Oral', writtenComp: 'Competição Escrita', buttonText: 'Sair'}
    };

    const actualText = buttonsText[currentLanguage];

    const handleSignOut = () => {
        resetLanguage(); 
        assignRole(''); 
        performNavigation('/');
    };

    useEffect(() => {
        if (!['Admin', 'Judge', 'Volunteer'].includes(currentRole)){
            handleSignOut(); 
        }
    }, [currentRole]);

    const renderContentForRole = () => {

        if (currentRole === 'Admin'){
            return (<div className='d-grid gap-2'>
                <h1>Welcome Admin</h1>
                <h2>Select the Competition</h2>
                <Button variant='primary' onClick={() => {performNavigation('/oralcomp')}}>Oral Competition</Button>
                <Button variant='primary' onClick={() => {performNavigation('/writtencomp')}}>Written Competition</Button>
                <Button variant='danger' onClick={handleSignOut}>Sign Out</Button>
            </div>);
        } else if (currentRole === 'Judge'){
            return (<div className='d-grid gap-2'>
                <h1>{actualText.welcomeMsg} {currentRole}</h1>
                <h2>{actualText.mainTitle}</h2>
                <Button variant='primary' onClick={() => {performNavigation('/oralcomp')}}>{actualText.oralComp}</Button>
                <Button variant='primary' onClick={() => {performNavigation('/writtencomp')}}>{actualText.writtenComp}</Button>
                <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
            </div>);
        } else if (currentRole === 'Volunteer'){
            return (<div className='d-grid gap-2'>
                <h1>Welcome Volunteer</h1>
                <p>There should be a table here</p>
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