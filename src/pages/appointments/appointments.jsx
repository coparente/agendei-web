
import "./appointments.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointment/appointment.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../constants/api.js";


function Appointments() {

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [idDoctor, setIdDoctor] = useState("");
  const [dtStart, setDtStart] = useState("");
  const [dtEnd, setDtEnd] = useState("");

  // Configuração padrão do Toast
  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  // Verifica o token ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("sessionToken");

    if (!token) {
      navigate("/"); // Redireciona para login se não houver token
    }
  }, [navigate]);

  function ClickEdit(id_appointment) {
    navigate("/appointments/edit/" + id_appointment);
  }

  function ClickDelete(id_appointment) {
    toast.error("Deletar " + id_appointment);
  }

  async function LoadDoctors() {


    try {
      const response = await api.get("/doctors");

      if (response.data)
        setDoctors(response.data.doctors)


    } catch (error) {

      let errorMessage = "Erro ao efetuar login. Tente novamente mais tarde";

      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error;
      } else if (error.request) {
        errorMessage = "Sem resposta do servidor";
      }

      toast.error(errorMessage, toastConfig);
      console.error("Login Error:", error);

    }
  }
  async function LoadAppointments() {

    try {
      const response = await api.get("/admin/appointments", {
        params: {
          id_doctor: idDoctor,
          dt_start: dtStart,
          dt_end: dtEnd
        }
      });

      if (response.data)
        setAppointments(response.data.appointments)


    } catch (error) {

      let errorMessage = "Erro ao carregar conteudo. Tente novamente mais tarde";

      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error;


      } else if (error.request) {
        errorMessage = "Sem resposta do servidor";
      }

      toast.error(errorMessage, toastConfig);

      console.error("Login Error:", error);
    }
  }


  function ChangeDoctor(e) {
    setIdDoctor(e.target.value)

  }


  // useEffect(() => {
  //   LoadDoctors();
  //   LoadAppointments();
  // }, []);
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("sessionToken");
      
      if (!token) {
        toast.error("Acesso não autorizado!", toastConfig);
        navigate("/");
        return;
      }
      
      // Garante que o token está atualizado no header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };
    checkAuth();
    LoadDoctors();
    LoadAppointments();
  }, [navigate]);

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
          <input type="date" className="form-control" id="startDate" onChange={(e) => setDtStart(e.target.value)} />
          <span className="m-2">Até</span>
          <input type="date" className="form-control" id="endDate" onChange={(e) => setDtEnd(e.target.value)} />

          <div className="form-control ms-3 me-3">
            <select name="doctor" id="doctor" value={idDoctor} onChange={ChangeDoctor}>
              <option value="">Todos os Médicos</option>

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
