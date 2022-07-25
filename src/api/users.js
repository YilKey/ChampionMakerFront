import { axios } from "../authContext/index";
import { useQuery } from "react-query";

export const fetchUser = async (name) => {
  const { data } = await axios.get(`users/${name}`);
  return data;
};

export const login = async (email, password) => {
  const { data } = await axios.post(`users/login`, {
    email,
    password,
  });
  return data;
};

export const register = async ({ name, email, password }) => {
  const { data } = await axios.post(`users/register`, {
    name,
    email,
    password,
  });
  return data;
};

export const useUser = (name) => {
  return useQuery("user", () => fetchUser(name));
};
