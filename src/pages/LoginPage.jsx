import React, { useContext } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Form} from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from '../contexts/RoleContext'; 

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

    const pageText = {
        EN: {mainTitle: 'Access the Platform', theUsername: 'Username', userPlaceholder: 'Enter email', thePassword: 'Password', theButton: 'Sign In'},
        ES: {mainTitle: 'Acceso a la Plataforma', theUsername: 'Usuario', userPlaceholder: 'Ingrese el correo electronico', thePassword: 'Contraseña', theButton: 'Iniciar Sesion'}, 
        POR: {mainTitle: 'Acesse a Plataforma', theUsername: 'Usuário', userPlaceholder: 'Insira o email', thePassword: 'Senha', theButton: 'Entrar'}
    };

    const actualText = pageText[currentLanguage]

    return <div>
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3 px-4'>
                <div className="d-flex align-items-center">
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.theUsername}</Form.Label>
                    <Form.Control type='email' placeholder={actualText.userPlaceholder} {...register('username', {required: true})} />
                </div>
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <div className="d-flex align-items-center">
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.thePassword}</Form.Label>
                    <Form.Control type='password' placeholder={actualText.thePassword} {...register('password', {required: true})} />
                </div>
            </Form.Group>

            <div className='d-grid gap-2'><Button variant='primary' type='submit'>{actualText.theButton}</Button></div>
        </Form>
    </div>
};

export default LoginPage; 