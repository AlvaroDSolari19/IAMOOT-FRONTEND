import React, { createContext, useState } from 'react'; 

export const RoleContext = createContext(); 

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