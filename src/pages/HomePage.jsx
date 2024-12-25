import React from 'react'; 
import NavigateButton from '../components/NavigateButton';

const HomePage = () => {
    return <div className='d-grid gap-2'>
        <h1>Language Selection</h1>
        <NavigateButton to='/login'>English</NavigateButton>
        <NavigateButton>Español</NavigateButton>
        <NavigateButton>Português</NavigateButton>
    </div>
};

export default HomePage; 