import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res; // Retorna a resposta para que a chamada possa processá-la
  } catch (error) {
    console.log("Erro ao registrar o usuário:", error);
  }
};

// Logout an user
const logout = () => {
  localStorage.removeItem("user");
};

// Sign in an user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log(res);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res; // Retorna a resposta para que a chamada possa processá-la
  } catch (error) {
    console.log("Erro ao fazer login:", error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
