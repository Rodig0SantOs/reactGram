import { BrowserRouter, Route, Routes } from "react-router";

// Pages
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

// Components
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const Approuter = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        {/* Adicione as rotas aqui */}
        <div className="container">
          <Routes>
            {/* Adicione a rota de home aqui */}
            <Route path="/" element={<Home />} />

            {/* Adicione a rota de login aqui */}
            <Route path="/login" element={<Login />} />

            {/* Adicione a rota de registro aqui */}
            <Route path="/register" element={<Register />} />

            {/* Adicione mais rotas aqui */}
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Approuter;
