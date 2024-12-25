import React from 'react'; 
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 

import Button from 'react-bootstrap/Button'; 

/*********
 * PAGES *
 *********/
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'; 
import CompSelectPage from './pages/CompSelectPage';
import OralCompPage from './pages/OralCompPage'
import WrittenCompPage from './pages/WrittenCompPage'

//import './App.css'

function App() {

  return (
    <div className='d-grid gap-2'>
        <Button variant='primary'>English</Button> 
        <Button variant='primary'>Español</Button>
        <Button variant='primary'>Português</Button>
    </div>
  );
}
/*
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

}*/

export default App;
