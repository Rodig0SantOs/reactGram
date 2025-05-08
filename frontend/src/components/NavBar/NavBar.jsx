import { Link, NavLink, useNavigate } from "react-router";
import "./NavBar.css";
import {
  BsFillCameraFill,
  BsFillPersonFill,
  BsHouseDoorFill,
  BsSearch,
} from "react-icons/bs";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../Hooks/useAuth";

// Redux
import { logout, reset } from "../../slices/authSlice";
import { useState } from "react";

const NavBar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispath = useDispatch();

  const handleLogout = () => {
    dispath(logout());
    dispath(reset());

    navigate("/login");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav id="nav">
      <Link to="/">Reactgram</Link>

      <form id="search-form" onSubmit={handleSearch}>
        <BsSearch />
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <ul id="nav-links">
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill />
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill />
              </NavLink>
            </li>
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register">Cadastra</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
