import React, {createContext, useState} from 'react'; 

/* React Context is a way to store items throughout a React application without having to pass it to each particular element. 
 * For example, instead of passing the language to each of the different componenets, you are simply storing it in the LanguageContext. */
const LanguageContext = createContext(); 

export const LanguageProvider = ({ children }) => {

    const [currentLanguage, setLanguage] = useState(''); 
    
    const changeLanguage = (someLanguage) => {
        setLanguage(someLanguage); 
    }

    return (
        <LanguageContext.Provider value={{currentLanguage, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    );

};

export default LanguageContext; 