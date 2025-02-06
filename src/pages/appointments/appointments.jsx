
import "./appointments.css";
import Navbar from "../../components/navbar/navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointment/appointment.jsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../constants/api.js";
import logo from "../../assets/logo.png";


function Appointments() {

  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [idDoctor, setIdDoctor] = useState("");
  const [dtStart, setDtStart] = useState("");
  const [dtEnd, setDtEnd] = useState("");

  const [idToDelete, setIdToDelete] = useState(null);

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

  // Estados para paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5); // Número de agendamentos por página
  const [total, setTotal] = useState(1);

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
    showDeleteModal(id_appointment);
    // toast.error("Deletar " + id_appointment);
  }

  function showDeleteModal(id_appointment) {
    setIdToDelete(id_appointment);
    const modal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
    modal.show();
  }

  async function confirmDelete() {
    if (!idToDelete) return;

    try {
      await api.delete(`/appointments/${idToDelete}`);
      toast.success("Agendamento deletado com sucesso!");
      LoadAppointments(); // Atualiza a lista após deletar
    } catch (error) {
      toast.error("Erro ao deletar o agendamento.");
    }

    setIdToDelete(null);
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
  async function LoadAppointments(page = 1) {

    try {
      const response = await api.get("/admin/appointments", {
        params: {
          id_doctor: idDoctor,
          dt_start: dtStart,
          dt_end: dtEnd,
          page: currentPage,
          limit: itemsPerPage
        }
      });
      console.log(response.data.pagination.total);
      if (response.data)
        setAppointments(response.data.appointments)
      setTotalPages(response.data.pagination.pages);
      setTotal(response.data.pagination.total);

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
  }, [currentPage]);

  const Pagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </button>
          </li>
          {pages}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Próxima
            </button>
          </li>
        </ul>
      </nav>
    );
  };

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
          <button
            onClick={() => {
              setCurrentPage(1);
              LoadAppointments();
            }}
            className="btn btn-primary"
            type="button"
          >
            Filtrar
          </button>
        </div>
      </div>
      <hr />
      <div className="text-start mb-2">Total Registros: {total}</div>
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

        {
          appointments.length == 0 && <div className="text-center">
            <p>Nenhum agendamento encontrado...</p>
          </div>
        }

        {/* Paginação */}
        {appointments.length > 0 && <Pagination />}

      </div>
      {/* Modal de Confirmação */}
      <div className="modal fade" id="confirmDeleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Exclusão</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div className="modal-body">
              Tem certeza que deseja excluir este agendamento?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={confirmDelete} data-bs-dismiss="modal">Deletar</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Appointments;
