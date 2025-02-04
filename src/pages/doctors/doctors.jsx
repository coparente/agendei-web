import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import "./doctors.css";
import Doctor from "../../components/doctor/doctor";
// import { doctors } from "../../constants/data";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";


function Doctors() {


    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [name, setName] = useState("")

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

    function ClickEdit(id_doctor) {
        navigate("/doctors/edit/" + id_doctor);
    }

    function ClickDelete(id_doctor) {
        // toast.error("Deletar " + id_doctor);
        showDeleteModal(id_doctor);
    }

    function showDeleteModal(id_doctor) {
        setIdToDelete(id_doctor);
        const modal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
        modal.show();
      }
      
      async function confirmDelete() {
        if (!idToDelete) return;
      
        try {
          await api.delete(`/doctors/${idToDelete}`);
          toast.success("Médico deletado com sucesso!");
          LoadDoctors(); // Atualiza a lista após deletar
        } catch (error) {
          toast.error("Erro ao deletar o médico.");
        }
      
        setIdToDelete(null);
      }

    async function LoadDoctors() {

        try {
            const response = await api.get("/doctors", {
                params: {
                    name: name
                }
            });

            // console.log(response.data);

            if (response.data)
                setDoctors(response.data.doctors)


        } catch (error) {

            let errorMessage = "Erro ao carregar conteudo. Tente novamente mais tarde";

            if (error.response) {
                errorMessage = error.response.data?.message || error.response.data?.error;

            } else if (error.request) {
                errorMessage = "Sem resposta do servidor";
            }

            toast.error(errorMessage, toastConfig);

            console.error("Load doctors Error:", error);
        }
    }

    useEffect(() => {
        LoadDoctors();
    }, []);

    return (
        <div className="container-fluid mt-page">
            <Navbar />

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="d-inline">Médicos</h2>
                    <Link
                        to="/doctors/add"
                        className="btn btn-outline-primary ms-5 mb-2"
                    >
                        Novo Médico
                    </Link>
                </div>

                <div className="d-flex justify-content-end">

                    <input type="text" placeholder="Buscar médico" className="form-control ms-3 me-3" id="name" onChange={(e) => setName(e.target.value)} />

                    <button onClick={LoadDoctors} className="btn btn-primary" type="button">Filtrar</button>
                </div>
            </div>
            <hr />
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Médico</th>
                            <th scope="col">Especialidade</th>
                            <th scope="col" className="col-buttons"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((d) => {
                                return <Doctor key={d.id_doctor}
                                    id_doctor={d.id_doctor}
                                    name={d.name}
                                    specialty={d.specialty}
                                    clickEdit={ClickEdit}
                                    clickDelete={ClickDelete}
                                />
                            })
                        }
                    </tbody>
                </table>
                {
                    doctors.length == 0 && <div className="text-center">
                        <p>Nenhum médico encontrado...</p>
                    </div>
                }
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
                            Tem certeza que deseja excluir este Médico?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete} data-bs-dismiss="modal">Deletar</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Doctors;
