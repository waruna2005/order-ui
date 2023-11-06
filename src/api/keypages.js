import { REACT_APP_API_KEY_PAGES } from "./endpoints.js";

export const getKeyPage = async (_id) => {
  const response = await fetch(`${REACT_APP_API_KEY_PAGES}/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status != 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const getKeyPages = async (query = "") => {
  const userDistrictId = localStorage.getItem("districtId");
  if (userDistrictId) {
    query = "districtId=" + userDistrictId;
  }
  const response = await fetch(`${REACT_APP_API_KEY_PAGES}?${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status != 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const createKeyPage = async (data) => {
  const response = await fetch(`${REACT_APP_API_KEY_PAGES}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (response.status != 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const updateKeyPage = async (_id, data) => {
  const response = await fetch(`${REACT_APP_API_KEY_PAGES}/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  if (response.status != 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};

export const deleteKeyPageApi = async (_id) => {
  const response = await fetch(`${REACT_APP_API_KEY_PAGES}/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-authorization": localStorage.getItem("token"),
    },
  });
  const result = await response.json();

  if (response.status != 200)
    throw new Error(result.error || "Something went wrong");

  return result;
};
