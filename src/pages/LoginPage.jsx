import React, { useContext } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import { Button, Form} from 'react-bootstrap';

import LanguageContext from '../contexts/LanguageContext';
import RoleContext from '../contexts/RoleContext'; 

const LoginPage = () => {

    const { assignRole } = useContext(RoleContext); 
    const { currentLanguage } = useContext(LanguageContext); 
    const performNavigation = useNavigate(); 
    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    /****************************************************
     * REVIEW LATER ONCE WE HAVE LOGGING IN INFORMATION *
     ****************************************************/
    const onSubmit = (someData) => {
        const roleMapping = {
            'judge@email.com': 'Judge',
            'admin@email.com': 'Admin', 
            'volunteer@email.com': 'Volunteer'
        };

        const currentRole = roleMapping[someData.username]; 

        if (!currentRole){
            alert('Invalid username or roles not assigned.');
            return; 
        }

        assignRole(currentRole); 
        performNavigation('/dashboard')
    };

    const formLabels = {
        EN: {mainTitle: 'Access the Platform', theUsername: 'Username', userPlaceholder: 'Enter email', thePassword: 'Password', theButton: 'Sign In'},
        ES: {mainTitle: 'Acceso a la Plataforma', theUsername: 'Usuario', userPlaceholder: 'Ingrese el correo electronico', thePassword: 'Contraseña', theButton: 'Iniciar Sesion'}, 
        POR: {mainTitle: 'Acesse a Plataforma', theUsername: 'Usuário', userPlaceholder: 'Insira o email', thePassword: 'Senha', theButton: 'Entrar'}
    };

    const actualLabels = formLabels[currentLanguage]

    return <div>
        <h1>{actualLabels.mainTitle}</h1>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3'>
                <Form.Label>{actualLabels.theUsername}</Form.Label>
                <Form.Control type='email' placeholder={actualLabels.userPlaceholder} {...register('username', {required: true})} />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>{actualLabels.thePassword}</Form.Label>
                <Form.Control type='password' placeholder={actualLabels.thePassword} {...register('password', {required: true})} />
            </Form.Group>

            <Button variant='primary' type='submit'>{actualLabels.theButton}</Button>
        </Form>
    </div>
};

export default LoginPage; 