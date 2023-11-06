import { REACT_APP_API_PRODUCT } from "./endpoints.js";

export const getProduct = async (_id) => {
  const response = await fetch(`${REACT_APP_API_PRODUCT}/get-by-ID?id=${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status !== 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const getProducts = async (query = "") => {
  const response = await fetch(`${REACT_APP_API_PRODUCT}?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status !== 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const createProductApi = async (data) => {
  const response = await fetch(`${REACT_APP_API_PRODUCT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (response.status !== 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const updateProductApi = async (_id, data) => {
  const response = await fetch(`${REACT_APP_API_PRODUCT}?id=${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (response.status !== 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const deleteProductApi = async (_id) => {
  const response = await fetch(`${REACT_APP_API_PRODUCT}?id=${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status !== 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const getProductStatus = async () => {
  const result = [
    { value: "available", key: "available" },
    { value: "unavailable", key: "unavailable" },
  ];

  return result;
};

export const getProductAproval = async () => {
  const result = [
    { value: "approved", key: "approved" },
    { value: "pending", key: "pending" },
    { value: "not", key: "not" },
  ];

  return result;
};