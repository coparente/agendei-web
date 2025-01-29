
import "./appointments.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
// import { doctors } from "../../constants/data.js";
import Appointment from "../../components/appointment/appointment.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";


function Appointments() {

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [idDoctor, setIdDoctor] = useState(0);


  function ClickEdit(id_appointment) {
    navigate("/appointments/edit/" + id_appointment);
  }

  function ClickDelete(id_appointment) {
    console.log("Deletar " + id_appointment);
  }

  async function LoadDoctors() {


    try {
      const response = await api.get("/doctors");

      if (response.data)
        setDoctors(response.data.doctors)


    } catch (error) {
      if (error.response?.data.error)
        alert(error.response?.data.message);
      else
        alert("Erro ao carregar conteudo. Tente novamente mais tarde");
      console.log(error);

    }
  }
  async function LoadAppointments() {

    try {
      const response = await api.get("/admin/appointments", {
        params: {
          id_doctor: idDoctor
        }
      });

      console.log(response.data);
      if (response.data)
        setAppointments(response.data.appointments)


    } catch (error) {
      if (error.response?.data.error)
        alert(error.response?.data.message);
      else
        alert("Erro ao carregar conteudo. Tente novamente mais tarde");
      console.log(error);

    }
  }

  function ChangeDoctor(e){
    setIdDoctor(e.target.value)

  }


  useEffect(() => {
    LoadDoctors();
    LoadAppointments();
  }, []);

  return (
    <div className="container-fluid mt-page">
      <Navbar />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="d-inline">Agendamento</h2>
          <Link
            to="/appointments/add"
            className="btn btn-outline-primary ms-5 mb-2"
          >
            Novo Agendamento
          </Link>
        </div>

        <div className="d-flex justify-content-end">
          <input type="date" className="form-control" id="startDate" />
          <span className="m-2">Até</span>
          <input type="date" className="form-control" id="endDate" />

          <div className="form-control ms-3 me-3">
            <select name="doctor" id="doctor" value={idDoctor} onChange={ChangeDoctor}>
              <option value="0">Todos os Médicos</option>

              {doctors?.map((doc) => {
                return <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>;
              })}
            </select>
          </div>
          <button onClick={LoadAppointments} className="btn btn-primary" type="button">Filtrar</button>
        </div>
      </div>
      <hr />
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Paciente</th>
              <th scope="col">Médico</th>
              <th scope="col">Serviço</th>
              <th scope="col">Data/Hora</th>
              <th scope="col" className="text-end">Valor</th>
              <th scope="col" className="col-buttons"></th>
            </tr>
          </thead>
          <tbody>
            {
              appointments?.map((ap) => {
                return <Appointment key={ap.id_appointment}
                  id_appointment={ap.id_appointment}
                  user={ap.user}
                  doctor={ap.doctor}
                  service={ap.service}
                  booking_date={ap.booking_date}
                  booking_hour={ap.booking_hour}
                  price={ap.price}
                  clickEdit={ClickEdit}
                  clickDelete={ClickDelete} />
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointments;
