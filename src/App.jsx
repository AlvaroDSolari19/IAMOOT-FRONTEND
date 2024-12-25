import React from 'react'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

/*********
 * PAGES *
 *********/
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import CompSelectPage from './pages/CompSelectPage';
import OralCompPage from './pages/OralCompPage'
import WrittenCompPage from './pages/WrittenCompPage'

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/compselect' element={<CompSelectPage/>} />
                <Route path='/oralcomp' element={<OralCompPage/>}/>
                <Route path='/writtencomp' element={<WrittenCompPage/>} />
            </Routes>
        </Router>
    ); 

}

export default App;