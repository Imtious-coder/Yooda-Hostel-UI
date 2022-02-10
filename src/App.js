import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Foods from './Components/Foods/Foods';
import Food_Form from './Components/Food_Form/Food_Form';
import Home from './Components/Home/Home';
// import DistributeFood from './pages/DistributeFood';
// import EditStudent from './pages/EditStudent';
// import ServeForm from './pages/ServeForm';
// import ShowStudents from './pages/ShowStudents';
// import StudentForm from './pages/StudentForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-food" element={<Food_Form />} />
        <Route path="/show-foods" element={<Foods />} />
        {/* <Route path="/add-students" element={<StudentForm />} />
        <Route path="/show-students" element={<ShowStudents />} />
        <Route path="/show-students/:id" element={<EditStudent />} />
        <Route path="/distribution-food" element={<DistributeFood />} />
        <Route path="/serve-students/:id/:shift" element={<ServeForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
