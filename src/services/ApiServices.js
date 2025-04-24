import apiClient from "./apiClient";

export default {
  login(userCredentials) {
    return apiClient.post("/auth/login", userCredentials);
  },
  registerClient(clientData) {
    return apiClient.post("/register-client", clientData);
  },
  getAllAdmins() {
    return apiClient.get("/get-all-admins");
  },
  getAllClient() {
    return apiClient.get("/get-all-clients");
  },
  registerUser(userData) {
    return apiClient.post("/register-user", userData);
  },
  getUserById(id) {
    return apiClient.get("/get-user/" + id);
  },
  updateUser(id, userData) {
    return apiClient.put("/update-user/" + id, userData);
  },
  deleteUser(id) {
    return apiClient.delete("/delete-user/" + id);
  },
};
