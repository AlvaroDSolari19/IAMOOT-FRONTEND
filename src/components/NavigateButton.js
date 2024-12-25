import React from 'react'; 
import { Button } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom'; 

/* useNavigate() returns a function that is assigned to performNavigation. 
 * The function takes a to parameter that is the route that it will take you to. 
 * Therefore, when you call the function handleNavigation, it will use that method performNavigation with the provided route. 
 * 
 * On the other hand, NavigateButton also has children and variant as parameters. 
 * children makes that anything within the NavigateButton will be passed as content for the Button. 
 * variant was also given a value in the parameter, which means that if no value is given variant will be 'primary'. 
 * */
const NavigateButton = ({ to, children, variant = 'primary', ...props}) => {
    const performNavigation = useNavigate(); 
    const handleNavigation = () => performNavigation(to);

    return (
        <Button variant={variant} onClick={handleNavigation} {...props}>
            {children}
        </Button>
    );
};

export default NavigateButton; 