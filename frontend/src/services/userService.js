import { api, requestConfig } from "../utils/config";

// Get user details
const profile = async (data, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res; // Retorna a resposta para que a chamada possa processá-la
  } catch (error) {
    console.log("Erro ao buscar dados do perfil:", error);
  }
};

// Update user details
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res; // Retorna a resposta para que a chamada possa processá-la
  } catch (error) {
    console.log(error);
  }
};

// Get user details
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/users/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res; // Retorna a resposta para que a chamada poss
  } catch (error) {
    console.log("Erro ao buscar dados do perfil:", error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
