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
import AdminOralCompPage from './pages/AdminOralCompPage';
import AdminWrittenCompPage from './pages/AdminWrittenCompPage';
import IndividualAwardsPage from './pages/IndividualAwardsPage';
import TeamAwardsPage from './pages/TeamAwardsPage.jsx'; 
import JudgeOralCompPage from './pages/JudgeOralCompPage.jsx';
import JudgeWrittenCompPage from './pages/JudgeWrittenCompPage.jsx';

function App() {

    return (
        <LanguageProvider>
            <RoleProvider>
                <Router>
                    <Routes>
                        <Route path='/' element={<HomePage/>} />
                        <Route path='/login' element={<LoginPage/>} />
                        <Route path='/dashboard' element={<DashboardPage/>} />
                        <Route path='/oralcomp/admin' element={<AdminOralCompPage/>}/>
                        <Route path='/oralcomp/judge' element={<JudgeOralCompPage/>}/>
                        <Route path='/individualawards' element={<IndividualAwardsPage/>} />
                        <Route path='/teamawards' element={<TeamAwardsPage/>} />
                        <Route path='/writtencomp/admin' element={<AdminWrittenCompPage/>} />
                        <Route path='/writtencomp/judge' element={<JudgeWrittenCompPage/>} />
                    </Routes>
                </Router>
            </RoleProvider>
        </LanguageProvider>
    ); 

}

export default App;