import {
  REACT_APP_API_USER_LOGIN,
  REACT_APP_API_USER,
  REACT_APP_API_CHANGE_PASSWORD,
} from "./endpoints";

export const getUserApi = async (data) => {
  const response = await fetch(`${REACT_APP_API_USER_LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  // if (response.status !== 200) {
  //   const errorBody = result.message ?? "Something went wrong";
  //   throw new Error(errorBody);
  // }

  return result;
};

export const getUserById = async (_id) => {
  const response = await fetch(`${REACT_APP_API_USER}/?sysco_id=${_id}`, {
    method: "GET",
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

export const getUsers = async (queryValues) => {

  let query = "";
  if (queryValues !== "") {
    query = "userRole=all"
    +"&userStatus=all"
    + "&page="+((query.page) ? query.page : 0)
    + "&size="+((query.size) ? query.size : 10);
  }

  const response = await fetch(`${REACT_APP_API_USER}/by-role?${query}`, {
    method: "GET",
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

export const createUserApi = async (data) => {
  const response = await fetch(`${REACT_APP_API_USER}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  // if (response.status !== 200) {
  //   const errorBody = result.message ?? "";
  //   throw new Error(errorBody || "Something went wrong");
  // }

  return result;
};

export const changePasswordApi = async (data) => {
  const response = await fetch(`${REACT_APP_API_CHANGE_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export const updateUserApi = async (_id, data) => {
  const response = await fetch(`${REACT_APP_API_USER}?sysco_id=${data.userSyscoID}`, {
    method: "PUT",
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

export const deleteUserApi = async (_id) => {
  const response = await fetch(`${REACT_APP_API_USER}/${_id}`, {
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

export const getUserRoles = async () => {
  const result = [
    { value: "admin", key: "admin" },
    { value: "supplier", key: "supplier" },
    { value: "customer", key: "customer" },
  ];

  return result;
};
