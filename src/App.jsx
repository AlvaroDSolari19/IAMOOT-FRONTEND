import React from 'react'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

/************
 * CONTEXTS *
 ************/
import { LanguageProvider } from './contexts/LanguageContext';
import { RoleProvider } from './contexts/RoleContext';

/*********
 * PAGES *
 *********/
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage';
import OralCompPage from './pages/OralCompPage'
import WrittenCompPage from './pages/WrittenCompPage'

function App() {

    return (
        <LanguageProvider>
            <RoleProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<HomePage/>} />
                        <Route path='/login' element={<LoginPage/>} />
                        <Route path='/dashboard' element={<DashboardPage/>} />
                        <Route path='/oralcomp' element={<OralCompPage/>}/>
                        <Route path='/writtencomp' element={<WrittenCompPage/>} />
                    </Routes>
                </Router>
            </RoleProvider>
        </LanguageProvider>
    ); 

}

export default App;