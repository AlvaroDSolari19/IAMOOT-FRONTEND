import React, { createContext, useState } from 'react'; 

const RoleContext = createContext(); 

export const RoleProvider = ({ children }) => {
    const [currentRole, setRole] = useState(''); 

    const assignRole = (newRole) => {
        setRole(newRole)
    };

    return (
        <RoleContext.Provider value={{ currentRole, assignRole}}>
            {children}
        </RoleContext.Provider>
    );

};



export default RoleContext; 