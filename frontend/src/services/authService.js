import { api, requestConfig } from "../utils/config";

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(api + "/users/register", config);

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro HTTP! Status: ${response.status}`);
    }

    const res = await response.json();
    localStorage.setItem("user", JSON.stringify(res));
    return res; // Retorna a resposta para que a chamada possa processá-la
  } catch (error) {
    console.log("Erro ao registrar o usuário:", error.message);
    throw error; // Lança o erro para ser tratado externamente
  }
};

const authService = {
  register,
};

export default authService;
