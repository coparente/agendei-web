import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import { doctors, doctors_services } from "../../constants/data";

function AppointmentAdd() {

const { id_appointment } = useParams();

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-page">
        <div className="row col-lg-4 offset-lg-4">
          <div className="col-12 mt-2">
            <h2>{ id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"}</h2>
          </div>

          <div className="col-12 mt-4">
            <label htmlFor="doctor" className="form-label">
              Médico
            </label>
            <div className="form-control mb-2">
              <select name="doctor" id="doctor">
                <option value="">Selecione o Médico</option>

                {doctors.map((doc) => {
                  return (
                    <option key={doc.id_doctor} value={doc.id_doctor}>
                      {doc.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              Serviços
            </label>
            <div className="form-control mb-2">
              <select name="service" id="service">
                <option value="">Selecione o Serviço</option>

                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.description}>
                      {d.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Data
            </label>
            <input type="date" className="form-control" name="bookingDate" />
          </div>

          <div className="col-6 mt-3">
            <label htmlFor="bookingHour" className="form-label">
              Horário
            </label>
            <div className="form-control mb-2">
              <select name="bookingHour" id="bookingHour">
                <option value="0">Horários</option>
                <option value="09:00">09:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
                <option value="08:00">08:00</option>
                <option value="09:30">09:30</option>
              </select>
            </div>
          </div>

          <div className="col-12 mt-3">
            <div className="d-flex justify-content-end">
                <Link to="/appointments" className="btn btn-outline-primary me-3">Cancelar</Link>
                <button type="button" className="btn btn-primary">Salvar Dados</button>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default AppointmentAdd;
