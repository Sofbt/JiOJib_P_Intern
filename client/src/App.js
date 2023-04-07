import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './signup/signup';
import AdminInterface from './components/adminInterface'
import UserLoggedInDetails from './components/userLoggedInDetails'
import Validrecords from './components/views/validrecords'
import FormC from "./components/FormC";
import Phonesignup from "./Phonesignup";
import RecordList from "./components/views/recordList"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={< Signup/>} />
        <Route path="/admin" element={<AdminInterface/>}/>
        <Route path="/userLoggedInDetails" element={<UserLoggedInDetails/>}/>
         <Route path="/validrecords" element={<Validrecords/>}/>
         <Route path="/Products"exact element={<FormC/>}/>
         <Route path="/Phonesignup"exact element={<Phonesignup/>}/>
         <Route path="/validrecords" element={<Validrecords/>}/>
         <Route path="/recordList" element={<RecordList/>}/>
         <Route path="/FormC" element={<FormC/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
