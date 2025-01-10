import "./Auth.css";

import { Link } from "react-router";

const Login = () => {
  return (
    <div id="login">
      <h2>ReactGram</h2>
      <p className="subtitle">Faça o login para ver o que há de novo.</p>
      <form>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
      <p>
        Não tem uma conta ? <Link to="/register">Clique aqui</Link>
      </p>
    </div>
  );
};

export default Login;
