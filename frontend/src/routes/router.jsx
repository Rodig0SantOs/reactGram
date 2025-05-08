import { BrowserRouter, Navigate, Route, Routes } from "react-router";

// Hooks
import useAuth from "../Hooks/useAuth";

// Pages
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

// Components
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import EditProfile from "../pages/EditProfile/EditProfile";
import Profile from "../pages/Profile/Profile";
import Photo from "../pages/Photo/Photo";
import Search from "../pages/Search/Search";

const Approuter = () => {
  const { auth, loading } = useAuth();

  console.log(loading);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        {/* Adicione as rotas aqui */}
        <div className="container">
          <Routes>
            {/* Adicione a rota de home aqui */}
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/photos/:id"
              element={auth ? <Photo /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Approuter;
