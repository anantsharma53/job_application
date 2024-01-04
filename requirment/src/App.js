import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Sign from './components/SignUp/Sign';
import JobApplicationForm from './components/JobForm/JobFrom';
import FormPreview from './components/FormPre/FormPre';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/form' element={<JobApplicationForm />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Sign />} />
        
        <Route path='/preview' element={<FormPreview />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
