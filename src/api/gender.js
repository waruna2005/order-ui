import { REACT_APP_API_VOTER } from "./endpoints.js";

export const getGenders = async () => {
  const result = [
    { value: "Male", key: "male" },
    { value: "FeMale", key: "female" },
  ];

  return result;
};
