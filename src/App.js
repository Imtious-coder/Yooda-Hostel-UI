import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Edit_Student from './Components/Edit_Student/Edit_Student';
import Foods from './Components/Foods/Foods';
import Food_Form from './Components/Food_Form/Food_Form';
import Home from './Components/Home/Home';
import Serve_Form from './Components/Serve_Form/Serve_Form';
import Students from './Components/Students/Students';
import Student_Form from './Components/Student_Form/Student_Form';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-food" element={<Food_Form />} />
        <Route path="/show-foods" element={<Foods />} />
        <Route path="/add-students" element={<Student_Form />} />
        <Route path="/show-students" element={<Students />} />
        <Route path="/show-students/:id" element={<Edit_Student />} />
        {/* <Route path="/distribution-food" element={<DistributeFood />} /> */}
        <Route path="/serve-students/:id/:shift" element={<Serve_Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
