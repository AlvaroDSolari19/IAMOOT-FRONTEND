import React from 'react'; 
import NavigateButton from '../components/NavigateButton';

const CompSelectPage = () => { 
    return <div className='d-grid gap-2'>
        <h1>Select the Competition</h1>
        <NavigateButton to='/oralcomp'>Oral Competition</NavigateButton>
        <NavigateButton to='/writtencomp'>Written Competition</NavigateButton>
    </div>
};

export default CompSelectPage; 