import { REACT_APP_API_AUTOMATION } from "./endpoints.js";

export const getAutomation = async (_id) => {
  const response = await fetch(`${REACT_APP_API_AUTOMATION}/report/${_id}`, {
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

export const getAutomations = async (query = "") => {
  const response = await fetch(`${REACT_APP_API_AUTOMATION}/report?${query}`, {
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
