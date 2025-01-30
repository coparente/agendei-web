import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import Appointments from "./pages/appointments/appointments.jsx";
import AppointmentAdd from "./pages/appointment-add/appointment-add.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Doctors from "./pages/doctors/doctors.jsx";
import DoctorAdd from "./pages/doctor-add/doctor-add.jsx";


function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/appointments/add" element={<ProtectedRoute><AppointmentAdd /></ProtectedRoute>} />
        <Route path="/appointments/edit/:id_appointment" element={<AppointmentAdd />} />
        <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path="/doctors/add" element={<ProtectedRoute><DoctorAdd /></ProtectedRoute>} />
        <Route path="/doctors/edit/:id_doctor" element={<ProtectedRoute><DoctorAdd /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
