import React from 'react'; 
import NavigateButton from '../components/NavigateButton';

const LoginPage = () => {
    return <div>
        <h1>Access Dashboard</h1>
        <p>Contains a form with email and password and a button below it to submit.</p>
        <p>Because a form acts different than regular buttons for navigation, I will have to do more research on how to set it up.</p>
        <NavigateButton to='/compselect'>Proceed</NavigateButton>
    </div>
};

export default LoginPage; 