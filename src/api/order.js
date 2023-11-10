import { REACT_APP_API_ORDER } from "./endpoints.js";

export const getOrder = async (_id) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/customer-dashboard?id=${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  return result;
};

export const getOrdersForCustomer = async (query = "") => {
  const response = await fetch(`${REACT_APP_API_ORDER}/customer-dashboard/all?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  return result;
};


export const updateOrderApiByCustomer = async (_id,data) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/customer-dashboard/update?id=${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};


export const getOrderSupplier = async (_id) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/supplier-dashboard?id=${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  return result;
};

export const getOrdersForSupplier = async (query = "") => {
  const response = await fetch(`${REACT_APP_API_ORDER}/supplier-dashboard/all?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  return result;
};

export const updateOrderApiBySupplier = async (id, data) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/supplier-dashboard/update?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};

export const createOrderApi = async (sessionID, data) => {
  const response = await fetch(`${REACT_APP_API_ORDER}?sessionID=${sessionID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (response.status !== 200) {
    const errorBody = result.message ?? "";
    throw new Error(errorBody || "Something went wrong");
  }

  return result;
};

export const deleteOrderApi = async (_id) => {
  const response = await fetch(`${REACT_APP_API_ORDER}?id=${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status !== 200) {
    const errorBody = result.message ?? "";
    throw new Error(errorBody || "Something went wrong");
  }

  return result;
};

export const createCartApi = async (data) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/cart?sessionID=`+data.sessionID, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

export const getCartById = async (_id) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/cart?sessionID=${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  return result;
};

export const updateCartApi = async (id, data) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/cart?sessionID=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};

export const deleteCartApi = async (_id, sessionID) => {
  const response = await fetch(`${REACT_APP_API_ORDER}/cart?id=${_id}&sessionID=${sessionID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  return result;
};