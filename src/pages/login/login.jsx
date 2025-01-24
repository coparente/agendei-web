import "./login.css";
import logo from "../../assets/logo.png";
import img from "../../assets/imglogin.png";

function Login() {
  return (
    <div className="row">
      <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form className="form-signin">
          <img src={logo} alt="" />
          <h5>Gerencie seus agendamentos
            de forma descomplicada.</h5>
          <h5>Acesse sua conta</h5>

          <div>
            <input type="email" placeholder="E-mail" />
          </div>

          <div>
            <input type="password" placeholder="Senha" />
          </div>

          <div>
            <button>Login</button>
          </div>

          <div>
            <span>Não tenho uma conta.</span>
            <a href="#">Criar agora!</a>
          </div>
        </form>
      </div>

      <div className="col-sm-7 d-flex">
        <img src={img} alt="" />
      </div>

    </div>
  )
}

export default Login;
