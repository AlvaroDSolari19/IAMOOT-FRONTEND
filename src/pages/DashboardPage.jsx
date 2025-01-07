import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap';

import LanguageContext from '../contexts/LanguageContext';
import RoleContext from '../contexts/RoleContext'; 

const DashboardPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const buttonsText = {
        EN: {mainTitle: 'Select the Competition', oralComp: 'Oral Competition', writtenComp: 'Written Competition', buttonText: 'Sign Out'},
        ES: {mainTitle: 'Seleccione la Competencia', oralComp: 'Competencia Oral', writtenComp: 'Competencia Escrita', buttonText: 'Cerrar Sesion'},
        POR: {mainTitle: 'Selecione a Competição', oralComp: 'Competição Oral', writtenComp: 'Competição Escrita', buttonText: 'Sair'}
    };

    const actualText = buttonsText[currentLanguage];

    const handleSignOut = () => {
        resetLanguage(); 
        performNavigation('/');
    };

    return <div className='d-grid gap-2'>
        <h1>Welcome, {currentRole}</h1>
        <h2>{actualText.mainTitle}</h2>
        <Button variant='primary' onClick={() => {performNavigation('/oralcomp')}}>{actualText.oralComp}</Button>
        <Button variant='primary' onClick={() => {performNavigation('/writtencomp')}}>{actualText.writtenComp}</Button>
        <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
    </div>
};

export default DashboardPage; 