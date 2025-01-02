import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap';

import LanguageContext from '../contexts/LanguageContext';

import NavigateButton from '../components/NavigateButton';

const CompSelectPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
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
        <h1>{actualText.mainTitle}</h1>
        <NavigateButton to='/oralcomp'>{actualText.oralComp}</NavigateButton>
        <NavigateButton to='/writtencomp'>{actualText.writtenComp}</NavigateButton>
        <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
    </div>
};

export default CompSelectPage; 