import "./login.css";
import logo from "../../assets/logo.png";
import img from "../../assets/imglogin.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../constants/api.js";



function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
  async function ExecuteLogin() {
    setLoading(true);



    try {

      const response = await api.post("/admin/login", {
        email,
        password
      })

      if (response.data) {
        localStorage.setItem("sessionToken", response.data.user.token)
        localStorage.setItem("sessionId", response.data.user.id_admin)
        localStorage.setItem("sessionEmail", response.data.user.email)
        localStorage.setItem("sessionName", response.data.user.name)
        api.defaults.headers.common['Authorization'] = "Bearer " + response.data.user.token;

        // navigate("/appointments");
        window.location.href = "/appointments";

      } else {
        toast.error("Erro ao efetuar login. Tente novamente mais tarde", toastConfig);
      }
    } catch (error) {
      let errorMessage = "Erro ao efetuar login. Tente novamente mais tarde";

      if (error.response) {
        // Extrai mensagem do servidor
        errorMessage = error.response.data?.message || error.response.data?.error;
      } else if (error.request) {
        errorMessage = "Sem resposta do servidor";
      }

      toast.error(errorMessage, toastConfig);
      console.error("Login Error:", error);

    } finally {
      setLoading(false);
    }


  }

  return (
    <div className="row">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin">
          <img src={logo} className="logo mb-4" />
          <h5 className="mb-5">Gerencie seus agendamentos
            de forma descomplicada.</h5>
          <h5 className="mb-4 text-secondary">Acesse sua conta</h5>

          <div className="mt-4 ">
            <input type="email" placeholder="E-mail" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mt-2">
            <input type="password" placeholder="Senha" value={password} className="form-control" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="mt-3 mb-5">
            {/* <button onClick={ExecuteLogin} className="btn btn-primary w-100" type="button">Login</button> */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
              onClick={ExecuteLogin}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              ) : "Login"}
            </button>
          </div>
          {/* {
            msg.length > 0 &&
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          } */}


          <div>
            <span className="me-1">Não tenho uma conta.</span>
            <Link to="/register" >Criar agora!</Link>
          </div>
        </form>
      </div>

      <div className="col-sm-7 d-flex">
        <img src={img} className="background-login" />
      </div>

    </div>
  )
}

export default Login;
