import { get } from "store";
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
  getAllCategory() {
    return apiClient.get("/get-all-categories");
  },
  registerCatogory(data) {
    return apiClient.post("/register-category", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getCategoryById(id) {
    return apiClient.get("/get-category/" + id);
  },
  updateCategoryById(id, data) {
    return apiClient.put("/update-category/" + id, data);
  },
  deleteCategoryById(id) {
    return apiClient.delete("/delete-category/" + id);
  },
  registerProduct(data) {
    return apiClient.post("/register-product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getAllProducts() {
    return apiClient.get("/get-all-products");
  },
  getProductById(id) {
    return apiClient.get("/get-product/" + id);
  },
  updateProductById(id, data) {
    return apiClient.put("/update-product/" + id, data);
  },
  deleteProductById(id) {
    return apiClient.delete("/delete-product/" + id);
  },
  getAllOrders() {
    return apiClient.get("/get-all-orders");
  },
  getProductByCategoryId(id) {
    return apiClient.get("/get-product-by-category/" + id);
  },

  addToCart(data) {
    return apiClient.post("/register-cart", data);
  },
  getClientCart(userId) {
    return apiClient.get("/client-carts/" + userId);
  },

  registerOrder(data) {
    return apiClient.post("/register-order", data);
  },
  getClientOrders(userId) {
    return apiClient.get("/client-orders/" + userId);
  },

  // images api

  getCatetoryImage(image_name) {
    return apiClient.get("/uploads/categories/" + image_name, {
      responseType: "blob",
    });
  },
  getProductImage(image_name) {
    return apiClient.get("/uploads/products/" + image_name, {
      responseType: "blob",
    });
  },
};
