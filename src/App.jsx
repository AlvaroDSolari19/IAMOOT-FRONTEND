import React from 'react'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

/************
 * CONTEXTS *
 ************/
import { LanguageProvider } from './contexts/LanguageContext';
import { RoleProvider } from './contexts/RoleContext';
import { JudgeIDProvider } from './contexts/JudgeIDContext.jsx'

/*********
 * PAGES *
 *********/
import HomePage from './pages/HomePage';
import Login from './pages/Login.jsx'; 
import RequestPassword from './pages/RequestPassword.jsx';
import SetPassword from './pages/SetPassword.jsx';
import DashboardPage from './pages/DashboardPage';
import AdminOralCompPage from './pages/AdminOralCompPage';
import IndividualScoresPage from './pages/IndividualScoresPage.jsx';
import OralRoundsPage from './pages/OralRoundsPage.jsx'; 
import PreliminaryRoundsPage from './pages/PreliminaryRoundsPage.jsx';
import PreliminaryRoundsDecision from './pages/PreliminaryRoundsDecision.jsx';
import SemiFinalRoundsPage from './pages/SemiFinalRoundsPage.jsx';
import OralMatchDetailsPage from './pages/OralMatchDetailsPage.jsx';
import JudgeOralCompPage from './pages/JudgeOralCompPage.jsx';

function App() {

    return (
        <LanguageProvider>
            <RoleProvider>
                <JudgeIDProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<HomePage/>}/>
                            <Route path='/login' element={<Login/>}/>
                            <Route path='/request-password' element={<RequestPassword/>}/>
                            <Route path='/set-password' element={<SetPassword/>}/>
                            <Route path='/dashboard' element={<DashboardPage/>}/>
                            <Route path='/oralcomp/admin' element={<AdminOralCompPage/>}/>
                            <Route path='/oralcomp/judge' element={<JudgeOralCompPage/>}/>
                            <Route path='/individualscores' element={<IndividualScoresPage/>}/>
                            <Route path='/oralrounds/prelims/:matchID' element={<PreliminaryRoundsDecision/>} />
                            <Route path='/oralrounds/prelims' element={<PreliminaryRoundsPage/>}/>
                            <Route path='/oralrounds/semifinals' element={<SemiFinalRoundsPage/>}/>
                            <Route path='/oralrounds/match/:matchID' element={<OralMatchDetailsPage/>}/>
                            <Route path='/oralrounds' element={<OralRoundsPage/>}/>
                        </Routes>
                    </Router>
                </JudgeIDProvider>
            </RoleProvider>
        </LanguageProvider>
    ); 

}

export default App;