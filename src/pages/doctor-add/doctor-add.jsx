import "./doctor-add.css"
import Navbar from '../../components/navbar/navbar';
import { Link, useParams } from "react-router-dom";

function DoctorAdd() {


    const { id_doctor } = useParams();

    return (
        <>
          <Navbar />
          <div className="container-fluid mt-page">
            <div className="row col-lg-4 offset-lg-4">
              <div className="col-12 mt-2">
                <h2>{ id_doctor > 0 ? "Editar Médico" : "Novo Médico"}</h2>
              </div>
    
              <div className="col-12 mt-4">
                <label htmlFor="doctor" className="form-label">
                  Médico
                </label>
                <input type="text" className="form-control mb-2" name="name" />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="service" className="form-label">
                  Especialidades
                </label>
                  <input type="text" className="form-control mb-2" name="specialty" />
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="icon" className="form-label">
                  Icon
                </label>
                <div className="form-control mb-2">
                  <select name="icon" id="icon">
                    <option value="">Selecione o icon</option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>
             
              <div className="col-12 mt-3">
                <div className="d-flex justify-content-end">
                    <Link to="/doctors" className="btn btn-outline-primary me-3">Cancelar</Link>
                    <button type="button" className="btn btn-primary">Salvar Dados</button>
                </div>
    
              </div>
    
            </div>
          </div>
        </>
      );
}

export default DoctorAdd;