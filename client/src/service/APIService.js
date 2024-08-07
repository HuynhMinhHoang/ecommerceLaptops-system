import axios from "../utils/AxiosConfig";

const loginUser = (username, password) => {
  return axios.post("/api/v1/user/login", {
    username,
    password,
  });
};

const refreshTokenService = (refreshToken) => {
  return axios.post("/api/v1/user/refresh-token", null, {
    params: {
      refreshToken: refreshToken,
    },
  });
};

const registerUser = (formData) => {
  return axios.post("/api/v1/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getListCategory = () => {
  return axios.get("/api/v1/categories");
};

const createProduct = (formData) => {
  return axios.post("/api/v1/product/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getListProductAdmin = () => {
  return axios.get("/api/v1/product/list-admin");
};

const getListProductHome = (category) => {
  return axios.get("/api/v1/product/list", {
    params: {
      category: category,
    },
  });
};

const updateProduct = (productId, formData) => {
  return axios.put(`/api/v1/product/update/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteImageFromProduct = (idImages) => {
  return axios.delete(`/api/v1/images/delete`, {
    data: idImages,
  });
};

const getListUser = () => {
  return axios.get("/api/v1/admin/list-user");
};

const deleteProduct = (idProduct) => {
  return axios.delete(`/api/v1/product/delete/${idProduct}`);
};

const updateAccount = (idUser, formData) => {
  return axios.put(`/api/v1/admin/user/${idUser}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getRoles = () => {
  return axios.get("/api/v1/admin/roles");
};

const createAccountByAdmin = (formData) => {
  return axios.post("/api/v1/admin/user/create-user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getProductById = (id) => {
  return axios.get(`/api/v1/product/${id}`);
};

const getPaymentVNPay = (
  amount,
  bankCode,
  shippingAddress,
  note,
  accountId,
  paymentTypeId
) => {
  return axios.get("/api/v1/user/payment/vn-pay", {
    params: {
      amount: amount,
      bankCode: bankCode,
      shippingAddress: shippingAddress,
      note: note,
      accountId: accountId,
      paymentTypeId: paymentTypeId,
    },
  });
};

const getPaymentCOD = (shippingAddress, note, accountId, paymentTypeId) => {
  return axios.post("/api/v1/user/payment/cod", {
    shippingAddress: shippingAddress,
    note: note,
    accountId: accountId,
    paymentTypeId: paymentTypeId,
  });
};

export {
  loginUser,
  registerUser,
  refreshTokenService,
  createProduct,
  getListCategory,
  getListProductAdmin,
  getListProductHome,
  updateProduct,
  deleteImageFromProduct,
  getListUser,
  deleteProduct,
  updateAccount,
  getRoles,
  createAccountByAdmin,
  getProductById,
  getPaymentVNPay,
  getPaymentCOD,
};
