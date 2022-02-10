import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
// import DistributeFood from './pages/DistributeFood';
// import EditStudent from './pages/EditStudent';
// import FoodForm from './pages/FoodForm';
// import ServeForm from './pages/ServeForm';
// import ShowFoods from './pages/ShowFoods';
// import ShowStudents from './pages/ShowStudents';
// import StudentForm from './pages/StudentForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/add-food" element={<FoodForm />} />
        <Route path="/show-foods" element={<ShowFoods />} />
        <Route path="/add-students" element={<StudentForm />} />
        <Route path="/show-students" element={<ShowStudents />} />
        <Route path="/show-students/:id" element={<EditStudent />} />
        <Route path="/distribution-food" element={<DistributeFood />} />
        <Route path="/serve-students/:id/:shift" element={<ServeForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
