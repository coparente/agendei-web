import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../constants/api";

function AppointmentAdd() {
  const { id_appointment } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctors_services, setDoctorsService] = useState([]);

  const [formData, setFormData] = useState({
    id_doctor: "",
    id_service: "",
    booking_date: "",
    booking_hour: "",
  });

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

  useEffect(() => {
    if (id_appointment) {
      LoadAppointmentDetails();
    }
  }, [id_appointment]);

  async function LoadAppointmentDetails() {
    try {
      const response = await api.get(`/appointments/${id_appointment}`);
      if (response.data) {
        setFormData({
          id_doctor: response.data.id_doctor,
          id_service: response.data.id_service,
          booking_date: response.data.booking_date,
          booking_hour: response.data.booking_hour,
        });
        LoadDoctorsService(response.data.id_doctor);
      }
    } catch (error) {
      toast.error("Erro ao carregar o agendamento");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (name === "id_doctor") {
      LoadDoctorsService(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (id_appointment) {
        await api.put(`/appointments/${id_appointment}`, formData);
        toast.success("Agendamento atualizado!");
      } else {
        await api.post("/appointments", formData);
        toast.success("Agendamento criado!", toastConfig);
      }
      navigate("/appointments");
    } catch (error) {

      let errorMessage = "Erro ao salvar o agendamento. Tente novamente mais tarde";

      if (error.response) {
        errorMessage = "Todos os campos são obrigatórios";
      } else if (error.request) {
        errorMessage = "Sem resposta do servidor";
      }

      toast.error(errorMessage, toastConfig);
      console.error("Login Error:", error);

      // toast.error("Erro ao salvar o agendamento");
    } finally {
      setLoading(false);
    }
  }

  async function LoadDoctors() {
    try {
      const response = await api.get("/doctors");
      if (response.data) setDoctors(response.data.doctors);
    } catch (error) {
      toast.error("Erro ao carregar médicos");
    }
  }

  async function LoadDoctorsService(id_doctor) {
    if (!id_doctor) {
      setDoctorsService([]);
      return;
    }
    try {
      const response = await api.get(`/doctors/${id_doctor}/services`);
      if (response.data) setDoctorsService(response.data.services);
    } catch (error) {
      toast.error("O médico não tem serviços cadastrados.");
    }
  }

  useEffect(() => {
    LoadDoctors();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>{id_appointment ? "Editar Agendamento" : "Novo Agendamento"}</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-12 mt-4">
              <label htmlFor="id_doctor" className="form-label">Médico</label>
              <select name="id_doctor" id="id_doctor" className="form-control mb-2" value={formData.id_doctor} onChange={handleChange}>
                <option value="">Selecione o Médico</option>
                {doctors.map((doc) => (
                  <option key={doc.id_doctor} value={doc.id_doctor}>{doc.name}</option>
                ))}
              </select>
            </div>
            <div className="col-12 mt-3">
              <label htmlFor="id_service" className="form-label">Serviço</label>
              <select name="id_service" id="id_service" className="form-control mb-2" value={formData.id_service} onChange={handleChange}>
                <option value="">Selecione o Serviço</option>
                {doctors_services.map((service) => (
                  <option key={service.id_service} value={service.id_service}>{service.description}</option>
                ))}
              </select>
            </div>
            <div className="col-6 mt-3">
              <label htmlFor="booking_date" className="form-label">Data</label>
              <input type="date" className="form-control" name="booking_date" value={formData.booking_date} onChange={handleChange} />
            </div>
            <div className="col-6 mt-3">
              <label htmlFor="booking_hour" className="form-label">Horário</label>
              <select name="booking_hour" id="booking_hour" className="form-control mb-2" value={formData.booking_hour} onChange={handleChange}>
                <option value="">Horários</option>
                <option value="09:00">09:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="08:00">08:00</option>
                <option value="09:30">09:30</option>
              </select>
            </div>
            <div className="col-12 mt-3">
              <div className="d-flex justify-content-end">
                <Link to="/appointments" className="btn btn-outline-primary me-3">Cancelar</Link>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar Dados"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AppointmentAdd;